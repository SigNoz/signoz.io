import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_KEY, COOKIE_EXPIRY_DAYS } from '@/constants/anonymousId'

const LEGACY_ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'
const POSTHOG_SESSION_ID_KEY = 'app_posthog_session_id'
const POSTHOG_SESSION_LAST_ACTIVITY_KEY = 'app_posthog_session_last_activity'
const POSTHOG_SESSION_TIMEOUT_MS = 30 * 60 * 1000

const getRandomBytes = (length: number) => {
  const bytes = new Uint8Array(length)

  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes)
    return bytes
  }

  for (let i = 0; i < length; i += 1) {
    bytes[i] = Math.floor(Math.random() * 256)
  }

  return bytes
}

const toHex = (value: number) => value.toString(16).padStart(2, '0')

const createUuidV7 = (timestampMs = Date.now()) => {
  const bytes = new Uint8Array(16)
  const timestamp = BigInt(timestampMs)
  const randomBytes = getRandomBytes(10)

  bytes[0] = Number((timestamp >> 40n) & 0xffn)
  bytes[1] = Number((timestamp >> 32n) & 0xffn)
  bytes[2] = Number((timestamp >> 24n) & 0xffn)
  bytes[3] = Number((timestamp >> 16n) & 0xffn)
  bytes[4] = Number((timestamp >> 8n) & 0xffn)
  bytes[5] = Number(timestamp & 0xffn)
  bytes[6] = 0x70 | (randomBytes[0] & 0x0f)
  bytes[7] = randomBytes[1]
  bytes[8] = 0x80 | (randomBytes[2] & 0x3f)
  bytes[9] = randomBytes[3]
  bytes[10] = randomBytes[4]
  bytes[11] = randomBytes[5]
  bytes[12] = randomBytes[6]
  bytes[13] = randomBytes[7]
  bytes[14] = randomBytes[8]
  bytes[15] = randomBytes[9]

  const hex = Array.from(bytes, toHex).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(
    16,
    20
  )}-${hex.slice(20)}`
}

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

export const getOrCreatePostHogSessionId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    const now = Date.now()
    const existingSessionId = localStorage.getItem(POSTHOG_SESSION_ID_KEY)
    const lastActivity = Number(localStorage.getItem(POSTHOG_SESSION_LAST_ACTIVITY_KEY))
    const hasActiveSession =
      existingSessionId &&
      Number.isFinite(lastActivity) &&
      now - lastActivity <= POSTHOG_SESSION_TIMEOUT_MS

    const sessionId = hasActiveSession ? existingSessionId : createUuidV7(now)

    localStorage.setItem(POSTHOG_SESSION_ID_KEY, sessionId)
    localStorage.setItem(POSTHOG_SESSION_LAST_ACTIVITY_KEY, String(now))

    return sessionId
  } catch {
    return undefined
  }
}
