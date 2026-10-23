'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { ANONYMOUS_ID_COOKIE, ANONYMOUS_ID_KEY, COOKIE_EXPIRY_DAYS } from '@/constants/anonymousId'
import { v4 as uuidv4 } from 'uuid'
import { hasConsent, onConsentChange } from '@/utils/consent/client'

const persistAnonymousId = () => {
  if (!hasConsent('analytics')) return

  // Get or generate a persistent anonymous ID
  const storedId = localStorage.getItem(ANONYMOUS_ID_KEY)
  const anonymousId = storedId || Cookies.get(ANONYMOUS_ID_COOKIE) || uuidv4()

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
}

export function AnonymousIdSetter() {
  useEffect(() => {
    persistAnonymousId()
    return onConsentChange(persistAnonymousId)
  }, [])

  // This is a client component that doesn't render anything
  return null
}
