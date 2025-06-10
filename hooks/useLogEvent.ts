import { useCallback, useEffect } from 'react'
import { logEvent, LogEventPayload, detectBotClientSide } from '../utils/logEvent'
import { getOrCreateAnonymousId, getUserId, extractGroupIdFromEmail } from '../utils/userUtils'

const INITIAL_REFERRER_KEY = 'app_initial_referrer'

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

      // Detect bots on client side for additional coverage
      const clientBotDetection = detectBotClientSide()

      const enhancedAttributes = {
        ...attributes,
        custom_os: getOS(),
        custom_initial_referrer: getInitialReferrer(),
        custom_user_agent: getUserAgent(),
        custom_webdriver: getWebdriver(),
        custom_headless: isHeadless(),
        custom_source: 'web',
        // Enhanced bot detection attributes
        custom_is_bot_client: clientBotDetection.isBot,
        custom_bot_type_client: clientBotDetection.botType,
        custom_bot_detection_reason: clientBotDetection.reason,
        custom_has_javascript: true, // This runs in JS context
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
