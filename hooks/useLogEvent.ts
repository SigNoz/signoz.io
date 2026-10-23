// hooks/useLogEvent.ts

import { useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { logEvent, LogEventPayload, LogEventOptions, detectBotClientSide } from '../utils/logEvent'
import {
  clearAnalyticsIdentity,
  getOrCreateAnonymousId,
  getOrCreateAnalyticsSessionId,
  getUserId,
} from '../utils/userClient'
import { extractGroupIdFromEmail } from '../utils/userShared'
import {
  getOS,
  getTimezone,
  getTimezoneAnalysis,
  getUserAgentString,
  getWebdriver,
  isHeadless,
  getBrowserEnvironmentSignals,
  getJSCapabilitySignals,
  getAnalyticsHealthSignals,
} from '../utils/browserSignals'
import { getConsent, isConsentSettled, onConsentChange } from '../utils/consent/client'
import Cookies from 'js-cookie'

const INITIAL_REFERRER_KEY = 'app_initial_referrer'
const UTM_PARAMS_KEY = 'app_utm_params'
const UTM_PARAM_NAMES = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
]

const MAX_BUFFERED_EVENTS = 50

// Events with no value without a visitor identity are dropped instead of sent cookieless.
const IDENTITY_ONLY_EVENTS = new Set(['Website Page Leave'])

const PERSONAL_ATTRIBUTE_PATTERN =
  /(email|phone|first_?name|last_?name|full_?name|^name$|company|hubspot_field_|(^|_)ip$|user_?id|user_?agent|time_?zone|session_id|message|url$)/i
const EMAIL_VALUE_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/

type QueuedEvent = {
  payload: LogEventPayload
  options?: LogEventOptions
}

let pendingEvents: QueuedEvent[] = []
let consentListenerRegistered = false
// In-memory only: lets cookieless events from one page load be counted together without
// reading or writing anything on the device.
let pageLoadId: string | null = null
let memoryInitialReferrer: string | undefined
let memoryUtmParams: Record<string, string> = {}

const getPageLoadId = () => {
  if (!pageLoadId) pageLoadId = uuidv4()
  return pageLoadId
}

const readUtmParamsFromUrl = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}

  const searchParams = new URLSearchParams(window.location.search)
  return UTM_PARAM_NAMES.reduce<Record<string, string>>((acc, key) => {
    const value = searchParams.get(key)
    if (value) acc[key] = value
    return acc
  }, {})
}

const captureAttributionInMemory = () => {
  if (typeof window === 'undefined') return

  if (memoryInitialReferrer === undefined) {
    memoryInitialReferrer = document.referrer || 'direct'
  }

  const utmParams = readUtmParamsFromUrl()
  if (Object.keys(utmParams).length > 0) {
    memoryUtmParams = utmParams
  }
}

const getInitialReferrer = (): string | undefined => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return undefined

  try {
    let initialReferrer = sessionStorage.getItem(INITIAL_REFERRER_KEY)

    if (initialReferrer === null) {
      initialReferrer = memoryInitialReferrer || document.referrer || 'direct'
      sessionStorage.setItem(INITIAL_REFERRER_KEY, initialReferrer)
    }

    return initialReferrer || undefined
  } catch (error) {
    return undefined
  }
}

const persistUtmParams = () => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return
  if (Object.keys(memoryUtmParams).length === 0) return

  try {
    sessionStorage.setItem(UTM_PARAMS_KEY, JSON.stringify(memoryUtmParams))
  } catch (error) {
    // Ignore storage errors
  }
}

const getStoredUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem(UTM_PARAMS_KEY)
    if (!stored) return {}

    const parsed = JSON.parse(stored) as Record<string, string>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (error) {
    return {}
  }
}

const stripQueryAndHash = (url?: string): string | undefined => {
  if (!url) return undefined
  try {
    const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : undefined)
    return `${parsed.origin}${parsed.pathname}`
  } catch {
    return undefined
  }
}

const withPageContext = (payload: LogEventPayload): LogEventPayload => {
  const providedAttributes = payload.attributes || {}

  return {
    ...payload,
    timestamp: payload.timestamp || new Date().toISOString(),
    attributes: {
      ...providedAttributes,
      pageUrl:
        providedAttributes.pageUrl ||
        (typeof window !== 'undefined' ? window.location.href : undefined),
      pageTitle:
        providedAttributes.pageTitle ||
        (typeof document !== 'undefined' ? document.title : undefined),
      pageReferrer:
        providedAttributes.pageReferrer ||
        (typeof document !== 'undefined' ? document.referrer : undefined),
    },
  }
}

const sendIdentifiedEvent = ({ payload, options }: QueuedEvent) => {
  const {
    eventName,
    attributes,
    eventType,
    groupId,
    timestamp,
    userId: explicitUserId,
    anonymousId: explicitAnonymousId,
  } = payload

  getInitialReferrer()
  persistUtmParams()

  const userId = explicitUserId || getUserId()
  const anonymousId = explicitAnonymousId || getOrCreateAnonymousId()
  // Use provided groupId or extract it from userId if available
  const resolvedGroupId = groupId || extractGroupIdFromEmail(userId)

  // Detect bots on client side for additional coverage
  const clientBotDetection = detectBotClientSide()

  const utmParams = { ...getStoredUtmParams(), ...memoryUtmParams }
  const userIp = Cookies.get('user_ip')
  const vercelIp = Cookies.get('vercel_ip')
  const sessionId = getOrCreateAnalyticsSessionId()
  const providedAttributes = attributes || {}

  const enhancedAttributes = {
    ...providedAttributes,
    $session_id: providedAttributes.$session_id || sessionId,
    custom_ip: userIp || 'unknown',
    custom_vercel_ip: vercelIp || 'unknown',
    custom_os: getOS(),
    custom_timezone: getTimezone(),
    ...getTimezoneAnalysis(),
    custom_initial_referrer: getInitialReferrer(),
    custom_user_agent: getUserAgentString(),
    custom_webdriver: getWebdriver(),
    custom_headless: isHeadless(),
    custom_source: 'web',
    // Enhanced bot detection attributes
    custom_is_bot_client: clientBotDetection.isBot,
    custom_bot_type_client: clientBotDetection.botType,
    custom_bot_detection_reason: clientBotDetection.reason,
    custom_has_javascript: true, // This runs in JS context
    // Browser environment signals for bot detection
    ...getBrowserEnvironmentSignals(),
    ...getJSCapabilitySignals(),
    ...getAnalyticsHealthSignals(),
    ...utmParams,
  }

  const eventPayload: LogEventPayload = {
    eventName,
    attributes: enhancedAttributes,
    eventType,
    userId,
    anonymousId,
    timestamp,
  }

  // Only add groupId if it exists
  if (resolvedGroupId) {
    eventPayload.groupId = resolvedGroupId
  }

  logEvent(eventPayload, {
    queryParams: utmParams,
    ...options,
  })
}

const toCookielessAttributes = (attributes: Record<string, any> = {}) =>
  Object.entries(attributes).reduce<Record<string, string | number | boolean>>(
    (acc, [key, value]) => {
      const isPrimitive = ['string', 'number', 'boolean'].includes(typeof value)
      if (!isPrimitive || PERSONAL_ATTRIBUTE_PATTERN.test(key)) return acc
      if (typeof value === 'string' && EMAIL_VALUE_PATTERN.test(value)) return acc
      acc[key] = value
      return acc
    },
    {}
  )

// Sent when analytics consent is missing: no stored identifiers, no IP, no fingerprinting
// signals and no personal fields, so nothing is read from or written to the device.
const sendCookielessEvent = ({ payload, options }: QueuedEvent) => {
  if (IDENTITY_ONLY_EVENTS.has(payload.eventName)) return

  const attributes = payload.attributes || {}

  logEvent(
    {
      eventName: payload.eventName,
      eventType: 'track',
      anonymousId: getPageLoadId(),
      timestamp: payload.timestamp,
      attributes: {
        ...toCookielessAttributes(attributes),
        pageUrl: stripQueryAndHash(attributes.pageUrl),
        pageReferrer: stripQueryAndHash(attributes.pageReferrer),
        custom_source: 'web',
        custom_consent: 'denied',
        ...memoryUtmParams,
      },
    },
    {
      queryParams: memoryUtmParams,
      transport: options?.transport,
    }
  )
}

const flushPendingEvents = (send: (event: QueuedEvent) => void, transport?: 'beacon') => {
  const events = pendingEvents
  pendingEvents = []
  events.forEach((event) =>
    send(transport ? { ...event, options: { ...event.options, transport } } : event)
  )
}

const dispatchEvent = (event: QueuedEvent) => {
  const consent = getConsent()

  if (consent.categories.analytics) {
    sendIdentifiedEvent(event)
    return
  }

  if (isConsentSettled()) {
    sendCookielessEvent(event)
    return
  }

  // Hold events until the visitor chooses so accepted visits keep their first page view and UTMs.
  if (pendingEvents.length >= MAX_BUFFERED_EVENTS) {
    const oldest = pendingEvents.shift()
    if (oldest) sendCookielessEvent(oldest)
  }
  pendingEvents.push(event)
}

const registerConsentListener = () => {
  if (consentListenerRegistered || typeof window === 'undefined') return
  consentListenerRegistered = true

  onConsentChange((next, previous) => {
    if (previous.categories.analytics && !next.categories.analytics) {
      clearAnalyticsIdentity()
    }

    if (next.categories.analytics) {
      flushPendingEvents(sendIdentifiedEvent)
    } else if (isConsentSettled()) {
      flushPendingEvents(sendCookielessEvent)
    }
  })

  // Visitors who leave without choosing are still counted, cookieless.
  window.addEventListener('pagehide', () => flushPendingEvents(sendCookielessEvent, 'beacon'))
}

export const useLogEvent = () => {
  useEffect(() => {
    captureAttributionInMemory()
    registerConsentListener()
  }, [])

  return useCallback((payload: LogEventPayload, options?: LogEventOptions) => {
    captureAttributionInMemory()
    registerConsentListener()
    dispatchEvent({ payload: withPageContext(payload), options })
  }, [])
}
