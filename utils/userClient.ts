import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_KEY, COOKIE_EXPIRY_DAYS } from '@/constants/anonymousId'

const LEGACY_ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'

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
