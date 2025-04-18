import { useCallback, useEffect } from 'react'
import { logEvent, LogEventPayload } from '../utils/logEvent'
import { v4 as uuidv4 } from 'uuid'

const ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'
const INITIAL_REFERRER_KEY = 'app_initial_referrer'

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

const getInitialReferrer = (): string | undefined => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return undefined

  let initialReferrer = sessionStorage.getItem(INITIAL_REFERRER_KEY)

  if (initialReferrer === null) {
    initialReferrer = document.referrer || 'direct'
    sessionStorage.setItem(INITIAL_REFERRER_KEY, initialReferrer)
  }

  return initialReferrer || undefined
}

const getOS = (): string => {
  if (typeof window === 'undefined') return 'unknown'
  const userAgent = window.navigator.userAgent
  if (userAgent.indexOf('Win') !== -1) return 'Windows'
  if (userAgent.indexOf('Mac') !== -1) return 'MacOS'
  if (userAgent.indexOf('Linux') !== -1) return 'Linux'
  if (userAgent.indexOf('Android') !== -1) return 'Android'
  if (userAgent.indexOf('like Mac') !== -1) return 'iOS'
  return 'unknown'
}

export const useLogEvent = () => {
  useEffect(() => {
    getInitialReferrer()
  }, [])

  return useCallback(
    ({
      eventName,
      attributes,
      eventType,
      groupId,
    }: Omit<LogEventPayload, 'userId' | 'anonymousId'>) => {
      const userId = getUserId()
      const anonymousId = getOrCreateAnonymousId()

      const enhancedAttributes = {
        ...attributes,
        custom_os: getOS(),
        custom_initial_referrer: getInitialReferrer(),
      }

      logEvent({
        eventName,
        attributes: enhancedAttributes,
        eventType,
        groupId,
        userId,
        anonymousId,
      })
    },
    []
  )
}
