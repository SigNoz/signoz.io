import { v4 as uuidv4, v7 as uuidv7 } from 'uuid'
import Cookies from 'js-cookie'
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_KEY, COOKIE_EXPIRY_DAYS } from '@/constants/anonymousId'

const LEGACY_ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'
const ANALYTICS_SESSION_ID_KEY = 'app_analytics_session_id'
const ANALYTICS_SESSION_LAST_ACTIVITY_KEY = 'app_analytics_session_last_activity'
const LEGACY_POSTHOG_SESSION_ID_KEY = 'app_posthog_session_id'
const LEGACY_POSTHOG_SESSION_LAST_ACTIVITY_KEY = 'app_posthog_session_last_activity'
const ANALYTICS_SESSION_TIMEOUT_MS = 30 * 60 * 1000

export const getOrCreateAnonymousId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    const id =
      localStorage.getItem(ANONYMOUS_ID_KEY) ||
      Cookies.get(ANONYMOUS_ID_COOKIE) ||
      localStorage.getItem(LEGACY_ANONYMOUS_ID_KEY) ||
      uuidv4()

    localStorage.setItem(ANONYMOUS_ID_KEY, id)
    localStorage.setItem(LEGACY_ANONYMOUS_ID_KEY, id)
    Cookies.set(ANONYMOUS_ID_COOKIE, id, {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'lax',
      path: '/',
    })

    return id || undefined
  } catch {
    return undefined
  }
}

export const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    return localStorage.getItem(USER_ID_KEY) || undefined
  } catch {
    return undefined
  }
}

export const getOrCreateAnalyticsSessionId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    const now = Date.now()

    const existingSessionId =
      localStorage.getItem(ANALYTICS_SESSION_ID_KEY) ||
      localStorage.getItem(LEGACY_POSTHOG_SESSION_ID_KEY)
    const lastActivity = Number(
      localStorage.getItem(ANALYTICS_SESSION_LAST_ACTIVITY_KEY) ||
        localStorage.getItem(LEGACY_POSTHOG_SESSION_LAST_ACTIVITY_KEY)
    )
    const hasActiveSession =
      existingSessionId &&
      Number.isFinite(lastActivity) &&
      now - lastActivity <= ANALYTICS_SESSION_TIMEOUT_MS

    const sessionId = hasActiveSession ? existingSessionId : uuidv7()

    localStorage.setItem(ANALYTICS_SESSION_ID_KEY, sessionId)
    localStorage.setItem(ANALYTICS_SESSION_LAST_ACTIVITY_KEY, String(now))
    localStorage.removeItem(LEGACY_POSTHOG_SESSION_ID_KEY)
    localStorage.removeItem(LEGACY_POSTHOG_SESSION_LAST_ACTIVITY_KEY)

    return sessionId
  } catch {
    return undefined
  }
}
