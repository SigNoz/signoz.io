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

type HubspotGlobalFormEventDetail = {
  formId?: string
  instanceId?: string
}

type HubspotGlobalFormFieldValue = string | string[]

type HubspotGlobalFormField = {
  name?: string
  value?: HubspotGlobalFormFieldValue
}

type HubspotGlobalFormInstance = {
  getFormId: () => string
  getConversionId: () => string | undefined
  getRedirectUrl?: () => string | undefined
  getFormFieldValues: () => Promise<HubspotGlobalFormField[]>
}

type TrackedHubspotSubmission = {
  hubspotFormId: string
  hubspotEventName: string
  conversionId?: string
  redirectUrl?: string
  messageOrigin?: string
  submissionValues?: HubspotSubmissionValues
  eventTimeStamp: number
}

declare global {
  interface Window {
    HubSpotFormsV4?: {
      getFormFromEvent?: (event: Event) => HubspotGlobalFormInstance | undefined
    }
  }
}

// Keep dedupe at module scope so duplicate HubSpot callbacks are suppressed across remounts
// within the same browser page session.
const seenHubspotSubmissions = new Set<string>()
const EXCLUDED_SUBMISSION_FIELDS = new Set(['hs_context'])
const EMAIL_FIELD_NAMES = new Set(['email', 'workemail', 'companyemail', 'businessemail'])
const HUBSPOT_GLOBAL_SUCCESS_EVENT = 'hs-form-event:on-submission:success'

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

const isHubspotGlobalFormFieldValue = (value: unknown): value is HubspotGlobalFormFieldValue =>
  typeof value === 'string' ||
  (Array.isArray(value) && value.every((item) => typeof item === 'string'))

const mapHubspotGlobalFormValues = (values: HubspotGlobalFormField[]) =>
  Object.fromEntries(
    values.flatMap(({ name, value }) => {
      if (typeof name !== 'string' || !name.trim() || !isHubspotGlobalFormFieldValue(value)) {
        return []
      }

      return [[name, value]]
    })
  )

export function useHubspotSubmissionTracking(formId: string, formName?: string) {
  const logEvent = useLogEvent()

  useEffect(() => {
    const trackHubspotSubmission = ({
      hubspotFormId,
      hubspotEventName,
      conversionId,
      redirectUrl,
      messageOrigin = '',
      submissionValues = {},
      eventTimeStamp,
    }: TrackedHubspotSubmission) => {
      if (hubspotFormId !== formId) return

      const submittedEmail = extractEmailFromSubmissionValues(submissionValues)
      const dedupeKey = conversionId
        ? `${hubspotFormId}:${conversionId}`
        : `${hubspotFormId}:${eventTimeStamp}`

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
          formName: formName || hubspotFormId || formId,
          hubspot_form_id: hubspotFormId,
          hubspot_form_name: formName || hubspotFormId || formId,
          hubspot_event_name: hubspotEventName,
          hubspot_conversion_id: conversionId ?? '',
          hubspot_redirect_url: redirectUrl ?? '',
          hubspot_message_origin: messageOrigin,
          hubspot_page_path: window.location.pathname,
          hubspot_page_url: window.location.href,
          ...flattenSubmissionValues(submissionValues),
        },
      })

      if (submittedEmail) {
        sendSubmissionRelayInBackground({
          email: submittedEmail,
          signupId: conversionId || createSubmissionRelayId('hubspot'),
          source: 'hubspot-form',
          createdAt: new Date().toISOString(),
          formName: formName || hubspotFormId || formId,
          pageLocation: window.location.pathname,
          pageUrl: window.location.href,
          formId: hubspotFormId || formId,
          conversionId: conversionId ?? '',
          details: filterSubmissionValues(submissionValues),
        })
      }
    }

    const handleHubspotMessage = (event: MessageEvent<unknown>) => {
      if (!isHubspotFormSubmittedMessage(event.data)) return
      if (event.data.id !== formId) return

      trackHubspotSubmission({
        hubspotFormId: event.data.id,
        hubspotEventName: event.data.eventName,
        conversionId: event.data.data?.conversionId,
        redirectUrl: event.data.data?.redirectUrl,
        messageOrigin: event.origin,
        submissionValues: event.data.data?.submissionValues ?? {},
        eventTimeStamp: event.timeStamp,
      })
    }

    const handleHubspotGlobalFormSuccess = async (
      event: CustomEvent<HubspotGlobalFormEventDetail>
    ) => {
      if (event.detail?.formId !== formId) return

      const form = window.HubSpotFormsV4?.getFormFromEvent?.(event)
      if (!form) return

      const hubspotFormId = form.getFormId() || event.detail.formId || formId
      const submissionValues = mapHubspotGlobalFormValues(await form.getFormFieldValues())

      trackHubspotSubmission({
        hubspotFormId,
        hubspotEventName: HUBSPOT_GLOBAL_SUCCESS_EVENT,
        conversionId: form.getConversionId(),
        redirectUrl: form.getRedirectUrl?.(),
        submissionValues,
        eventTimeStamp: event.timeStamp,
      })
    }

    const handleHubspotGlobalFormSuccessEvent = (event: Event) => {
      void handleHubspotGlobalFormSuccess(event as CustomEvent<HubspotGlobalFormEventDetail>)
    }

    window.addEventListener('message', handleHubspotMessage)
    window.addEventListener(HUBSPOT_GLOBAL_SUCCESS_EVENT, handleHubspotGlobalFormSuccessEvent)

    return () => {
      window.removeEventListener('message', handleHubspotMessage)
      window.removeEventListener(HUBSPOT_GLOBAL_SUCCESS_EVENT, handleHubspotGlobalFormSuccessEvent)
    }
  }, [formId, formName, logEvent])
}
