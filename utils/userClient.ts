import { v4 as uuidv4 } from 'uuid'

const ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'

export const getOrCreateAnonymousId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    let id = localStorage.getItem(ANONYMOUS_ID_KEY)

    if (!id) {
      id = uuidv4()
      localStorage.setItem(ANONYMOUS_ID_KEY, id || '')
    }

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
