import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'

const ANONYMOUS_ID_KEY = 'app_anonymous_id'
const USER_ID_KEY = 'app_user_id'

/**
 * Get or create anonymous ID for the user (client-side only)
 */
export const getOrCreateAnonymousId = (): string | undefined => {
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

/**
 * Get user ID from localStorage (client-side only)
 */
export const getUserId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    return localStorage.getItem(USER_ID_KEY) || undefined
  } catch (error) {
    return undefined
  }
}

/**
 * Generate user hash for identity verification (server-side only)
 */
export const generateUserHash = (userId: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(userId).digest('hex')
}

/**
 * Extract group ID from email
 */
export const extractGroupIdFromEmail = (email?: string): string | undefined => {
  if (!email) return undefined
  const parts = email.split('@')
  return parts.length === 2 ? parts[1] : undefined
}
