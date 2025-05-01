// Import the cookie key constant
import { ANONYMOUS_ID_COOKIE } from '../hooks/useAnonymousId'

// Server-side helper to get anonymous ID from cookies
export const getAnonymousIdFromCookies = (cookieHeader?: string): string | undefined => {
  if (!cookieHeader) return undefined

  const cookies = cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    },
    {} as Record<string, string>
  )

  return cookies[ANONYMOUS_ID_COOKIE]
}
