'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { ensureDecimalScript } from '@/utils/decimal'

const IDLE_INJECT_TIMEOUT_MS = 4000
const FALLBACK_INJECT_DELAY_MS = 2500

export default function DecimalClient() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't load the chat widget inside the docs onboarding flow.
    if (isDocsOnboardingPathname(pathname)) return

    // Idle-deferred; openDecimalChat() loads the script on demand regardless.
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const inject = () => ensureDecimalScript()
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(inject, { timeout: IDLE_INJECT_TIMEOUT_MS })
    } else {
      timeoutId = setTimeout(inject, FALLBACK_INJECT_DELAY_MS)
    }

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId)
      if (timeoutId !== null) clearTimeout(timeoutId)
    }
  }, [pathname])

  return null
}
