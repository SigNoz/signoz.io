// utils/logEvent.ts

export type EventType = 'identify' | 'group' | 'track'

export type LogEventPayload = {
  eventName: string
  attributes?: Record<string, any>
  eventType: EventType
  userId?: string
  groupId?: string
  anonymousId?: string
  timestamp?: string
}

export type LogEventOptions = {
  queryParams?: Record<string, string>
  sendToTunnel?: boolean
  transport?: 'fetch' | 'beacon'
}

const SITE_LOG_ENDPOINT = process.env.NEXT_PUBLIC_SITE_LOG_ENDPOINT || '/log'

const POSTHOG_EVENT_NAMES = new Set([
  'Website Page View',
  'Website Page Leave',
  'Website Click',
  'Website Form Submitted',
  'HubSpot Form Submitted',
  'User Signed Up',
  'User Associated with Company',
  'experiment_viewed',
])

const shouldSendToPostHog = (payload: LogEventPayload) => {
  return POSTHOG_EVENT_NAMES.has(payload.eventName)
}

const buildQueryString = (queryParams?: Record<string, string>) => {
  if (!queryParams) return ''

  const sanitized = Object.entries(queryParams).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (typeof value === 'string' && value.trim() !== '') {
        acc[key] = value
      }
      return acc
    },
    {}
  )

  const searchParams = new URLSearchParams(sanitized)
  const serialized = searchParams.toString()
  return serialized ? `?${serialized}` : ''
}

const sendBeaconRequest = (url: string, body: string) => {
  if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
    return false
  }

  return navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))
}

const sendLogRequest = (url: string, body: string, transport?: LogEventOptions['transport']) => {
  if (transport === 'beacon' && sendBeaconRequest(url, body)) {
    return Promise.resolve()
  }

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: transport === 'beacon',
  })
}

export const logEvent = async (payload: LogEventPayload, options?: LogEventOptions) => {
  const endpoint = process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT

  try {
    const queryString = buildQueryString(options?.queryParams)
    const timestampedPayload = {
      ...payload,
      timestamp: payload.timestamp || new Date().toISOString(),
    }

    const requests: Promise<Response | void>[] = []

    const body = JSON.stringify(timestampedPayload)

    if (options?.sendToTunnel !== false) {
      if (endpoint) {
        requests.push(sendLogRequest(`${endpoint}/log${queryString}`, body, options?.transport))
      } else {
        console.warn('No tunnel endpoint configured for client-side logging')
      }
    }

    if (shouldSendToPostHog(payload)) {
      requests.push(sendLogRequest(SITE_LOG_ENDPOINT, body, options?.transport))
    }

    await Promise.allSettled(requests)
  } catch (err) {
    console.error('Error logging event:', err)
  }
}

// Server-side compatible logging function
export const logEventServerSide = async (
  payload: LogEventPayload,
  tunnelEndpoint?: string,
  options?: LogEventOptions
) => {
  try {
    const endpoint = tunnelEndpoint || process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT
    if (!endpoint) {
      console.warn('No tunnel endpoint available for server-side logging')
      return
    }

    const queryString = buildQueryString(options?.queryParams)

    await fetch(`${endpoint}/log${queryString}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: payload.timestamp || new Date().toISOString(),
      }),
    })
  } catch (err) {
    console.error('Error logging server-side event:', err)
  }
}

// Re-export bot detection utilities for backwards compatibility
export { BOT_USER_AGENT_PATTERNS, detectBotFromUserAgent, detectBotClientSide } from './botPatterns'
