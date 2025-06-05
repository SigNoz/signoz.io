'use client'

import { useEffect } from 'react'
import { getOrCreateAnonymousId } from '@/utils/userUtils'

/**
 * Component that syncs the anonymous ID from localStorage to cookies
 * This allows the server component to access the anonymous ID for hash generation
 */
export default function ChatbaseCookieSync() {
  useEffect(() => {
    const anonymousId = getOrCreateAnonymousId()

    if (anonymousId) {
      // Set the anonymous ID as a cookie so the server can access it
      document.cookie = `app_anonymous_id=${anonymousId}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    }
  }, [])

  return null
}
