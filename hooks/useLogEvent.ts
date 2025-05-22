import { useCallback, useEffect } from 'react'
import { logEvent, LogEventPayload } from '../utils/logEvent'
import { v4 as uuidv4 } from 'uuid'

const ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'
const INITIAL_REFERRER_KEY = 'app_initial_referrer'

const getOrCreateAnonymousId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    let id = localStorage.getItem(ANONYMOUS_ID_KEY)

    if (!id) {
      id = uuidv4()
      localStorage.setItem(ANONYMOUS_ID_KEY, id || '')
    }

    return id || undefined
  } catch (error) {
    return undefined
  }
}

const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    return localStorage.getItem(USER_ID_KEY) || undefined
  } catch (error) {
    return undefined
  }
}

const extractGroupIdFromEmail = (email?: string): string | undefined => {
  if (!email) return undefined
  const parts = email.split('@')
  return parts.length === 2 ? parts[1] : undefined
}

const getInitialReferrer = (): string | undefined => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return undefined

  try {
    let initialReferrer = sessionStorage.getItem(INITIAL_REFERRER_KEY)

    if (initialReferrer === null) {
      initialReferrer = document.referrer || 'direct'
      sessionStorage.setItem(INITIAL_REFERRER_KEY, initialReferrer)
    }

    return initialReferrer || undefined
  } catch (error) {
    return undefined
  }
}

const getUserAgent = (): string => {
  if (typeof window === 'undefined') return ''
  return window.navigator.userAgent
}

const getWebdriver = (): boolean => {
  return typeof window !== 'undefined' && !!window.navigator.webdriver
}

const isHeadless = (): boolean => {
  return /HeadlessChrome/.test(getUserAgent())
}

const getOS = (): string => {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = getUserAgent().toLowerCase()

  if (userAgent.indexOf('win') !== -1) return 'Windows'
  if (userAgent.indexOf('ipad') !== -1) return 'iPad'
  if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('like mac') !== -1) return 'iOS'
  if (userAgent.indexOf('mac') !== -1) return 'MacOS'
  if (userAgent.indexOf('android') !== -1) return 'Android'
  if (userAgent.indexOf('linux') !== -1) return 'Linux'
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
      // Use provided groupId or extract it from userId if available
      const resolvedGroupId = groupId || extractGroupIdFromEmail(userId)

      const enhancedAttributes = {
        ...attributes,
        custom_os: getOS(),
        custom_initial_referrer: getInitialReferrer(),
        custom_user_agent: getUserAgent(),
        custom_webdriver: getWebdriver(),
        custom_headless: isHeadless(),
        custom_source: 'web',
      }

      const eventPayload: LogEventPayload = {
        eventName,
        attributes: enhancedAttributes,
        eventType,
        userId,
        anonymousId,
      }

      // Only add groupId if it exists
      if (resolvedGroupId) {
        eventPayload.groupId = resolvedGroupId
      }

      logEvent(eventPayload)
    },
    []
  )
}
