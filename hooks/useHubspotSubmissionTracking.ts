'use client'

import { useEffect } from 'react'
import { useLogEvent } from '@/hooks/useLogEvent'
import {
  createSubmissionRelayId,
  sendSubmissionRelayInBackground,
} from '@/utils/submissionRelayClient'

type HubspotSubmissionValues = Record<string, unknown>

type HubspotFormCallbackPayload = {
  type?: string
  eventName?: string
  id?: string
  data?: {
    conversionId?: string
    redirectUrl?: string
    submissionValues?: HubspotSubmissionValues
  }
}

// Keep dedupe at module scope so duplicate HubSpot callbacks are suppressed across remounts
// within the same browser page session.
const seenHubspotSubmissions = new Set<string>()
const EXCLUDED_SUBMISSION_FIELDS = new Set(['hs_context'])
const EMAIL_FIELD_NAMES = new Set(['email', 'workemail', 'companyemail', 'businessemail'])

const normalizeFieldKey = (key: string) =>
  key
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()

const serializeValue = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map((item) => serializeValue(item)).join(', ')
  if (value === null || typeof value === 'undefined') return ''

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const flattenSubmissionValues = (values: HubspotSubmissionValues) =>
  Object.fromEntries(
    Object.entries(values)
      .filter(([key]) => !EXCLUDED_SUBMISSION_FIELDS.has(key.toLowerCase()))
      .map(([key, value]) => [`hubspot_field_${normalizeFieldKey(key)}`, serializeValue(value)])
  )

const filterSubmissionValues = (values: HubspotSubmissionValues) =>
  Object.fromEntries(
    Object.entries(values).filter(([key]) => !EXCLUDED_SUBMISSION_FIELDS.has(key.toLowerCase()))
  )

const getHubspotKeyVariants = (key: string) => {
  const lowerKey = key.toLowerCase().trim()
  const lastPathSegment = lowerKey.split('/').pop() || lowerKey

  return [
    lowerKey,
    lastPathSegment,
    lowerKey.replace(/[^a-z0-9]/g, ''),
    lastPathSegment.replace(/[^a-z0-9]/g, ''),
  ]
}

const extractEmailFromSubmissionValues = (values: HubspotSubmissionValues) => {
  const emailEntry = Object.entries(values).find(([key, value]) => {
    if (typeof value !== 'string') return false

    return getHubspotKeyVariants(key).some((variant) => EMAIL_FIELD_NAMES.has(variant))
  })

  return emailEntry && typeof emailEntry[1] === 'string' ? emailEntry[1] : undefined
}

const isHubspotFormSubmittedMessage = (payload: unknown): payload is HubspotFormCallbackPayload => {
  if (!payload || typeof payload !== 'object') return false

  const candidate = payload as HubspotFormCallbackPayload

  return candidate.type === 'hsFormCallback' && candidate.eventName === 'onFormSubmitted'
}

export function useHubspotSubmissionTracking(formId: string, formName?: string) {
  const logEvent = useLogEvent()

  useEffect(() => {
    const handleHubspotMessage = (event: MessageEvent<unknown>) => {
      if (!isHubspotFormSubmittedMessage(event.data)) return
      if (event.data.id !== formId) return

      const submissionValues = event.data.data?.submissionValues ?? {}
      const submittedEmail = extractEmailFromSubmissionValues(submissionValues)
      const dedupeKey = `${formId}:${event.timeStamp}`

      if (seenHubspotSubmissions.has(dedupeKey)) return

      seenHubspotSubmissions.add(dedupeKey)
      if (seenHubspotSubmissions.size > 500) {
        seenHubspotSubmissions.clear()
        seenHubspotSubmissions.add(dedupeKey)
      }

      logEvent({
        eventName: 'HubSpot Form Submitted',
        eventType: 'track',
        attributes: {
          pageLocation: window.location.pathname,
          formName: formName || event.data.id || formId,
          hubspot_form_id: event.data.id,
          hubspot_form_name: formName || event.data.id || formId,
          hubspot_event_name: event.data.eventName,
          hubspot_conversion_id: event.data.data?.conversionId ?? '',
          hubspot_redirect_url: event.data.data?.redirectUrl ?? '',
          hubspot_message_origin: event.origin,
          hubspot_page_path: window.location.pathname,
          hubspot_page_url: window.location.href,
          ...flattenSubmissionValues(submissionValues),
        },
      })

      if (submittedEmail) {
        sendSubmissionRelayInBackground({
          email: submittedEmail,
          signupId: event.data.data?.conversionId || createSubmissionRelayId('hubspot'),
          source: 'hubspot-form',
          createdAt: new Date().toISOString(),
          formName: formName || event.data.id || formId,
          pageLocation: window.location.pathname,
          pageUrl: window.location.href,
          formId: event.data.id || formId,
          conversionId: event.data.data?.conversionId ?? '',
          details: filterSubmissionValues(submissionValues),
        })
      }
    }

    window.addEventListener('message', handleHubspotMessage)
    return () => window.removeEventListener('message', handleHubspotMessage)
  }, [formId, formName, logEvent])
}
