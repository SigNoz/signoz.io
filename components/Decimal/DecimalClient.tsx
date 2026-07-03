'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { ensureDecimalScript } from '@/utils/decimal'

export default function DecimalClient() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't load the chat widget inside the docs onboarding flow.
    if (isDocsOnboardingPathname(pathname)) return
    ensureDecimalScript()
  }, [pathname])

  return null
}
