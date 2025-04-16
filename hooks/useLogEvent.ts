import { useCallback } from 'react'
import { logEvent, LogEventPayload } from '../utils/logEvent'
import { v4 as uuidv4 } from 'uuid'

const ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'

const getOrCreateAnonymousId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined
  let id = localStorage.getItem(ANONYMOUS_ID_KEY)

  if (!id) {
    id = uuidv4()
    localStorage.setItem(ANONYMOUS_ID_KEY, id || '')
  }

  return id || undefined
}

const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined
  return localStorage.getItem(USER_ID_KEY) || undefined
}

export const useLogEvent = () => {
  return useCallback(
    ({
      eventName,
      attributes,
      eventType,
      groupId,
    }: Omit<LogEventPayload, 'userId' | 'anonymousId'>) => {
      const userId = getUserId()
      const anonymousId = getOrCreateAnonymousId()

      logEvent({
        eventName,
        attributes,
        eventType,
        groupId,
        userId,
        anonymousId,
      })
    },
    []
  )
}
