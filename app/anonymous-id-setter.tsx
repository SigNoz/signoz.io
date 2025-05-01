'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_KEY, COOKIE_EXPIRY_DAYS } from '../hooks/useAnonymousId'
import { v4 as uuidv4 } from 'uuid'

export function AnonymousIdSetter() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    // Get or generate a persistent anonymous ID
    const storedId = localStorage.getItem(ANONYMOUS_ID_KEY)
    const anonymousId = storedId || uuidv4()

    // Save if it was newly generated
    if (!storedId) {
      localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId)
    }

    // Set cookie with the anonymous ID so it's available for server-side rendering
    Cookies.set(ANONYMOUS_ID_COOKIE, anonymousId, {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'lax',
      path: '/',
    })
  }, [])

  // This is a client component that doesn't render anything
  return null
}
