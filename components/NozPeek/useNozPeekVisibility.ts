'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ensureDecimalScript } from '@/utils/decimal'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { useConsent } from '@/hooks/useConsent'

function isDocsIntroPath(pathname: string | null): boolean {
  if (!pathname) return false
  const normalized =
    pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return normalized === '/docs' || normalized === '/docs/introduction'
}

/** Path-derived flags that gate dock behavior. */
export function useNozPeekVisibility() {
  const pathname = usePathname()
  const [pathKey, setPathKey] = useState(pathname)
  const [dismissed, setDismissed] = useState(false)

  // Reset dock when navigating between docs pages (render-time adjust).
  if (pathname !== pathKey) {
    setPathKey(pathname)
    setDismissed(false)
  }

  const enabled = !isDocsOnboardingPathname(pathname)
  const isIntro = isDocsIntroPath(pathname)
  const hasFunctionalConsent = useConsent().categories.functional

  useEffect(() => {
    if (!enabled) return
    document.documentElement.setAttribute('data-docs-route', '')
    return () => {
      document.documentElement.removeAttribute('data-docs-route')
    }
  }, [enabled])

  // Opening the chat always loads it; preloading it is only done with functional consent.
  useEffect(() => {
    if (enabled && hasFunctionalConsent) ensureDecimalScript()
  }, [enabled, hasFunctionalConsent])

  return { enabled, isIntro, pathname, dismissed, setDismissed }
}
