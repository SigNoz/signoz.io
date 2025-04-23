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

export const logEvent = async (payload: LogEventPayload) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT}/log`, {
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
