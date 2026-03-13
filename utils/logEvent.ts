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

type LogEventOptions = {
  queryParams?: Record<string, string>
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

export const logEvent = async (payload: LogEventPayload, options?: LogEventOptions) => {
  const endpoint = process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT

  if (!endpoint) {
    console.warn('No tunnel endpoint configured for client-side logging')
    return
  }

  try {
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
