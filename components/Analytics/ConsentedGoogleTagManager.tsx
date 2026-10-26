'use client'

import { useLayoutEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { useConsent } from '@/hooks/useConsent'
import { syncGoogleConsentMode } from '@/utils/consent/googleConsentMode'
import { isConsentManagerEnabled } from '@/utils/consent/parse'
import { getConsentAdapter } from '@/utils/consent/providers'

// GTM only loads once the visitor allows analytics or advertisement, so no tag can fire
// before consent even if the consent manager fails to load.
export default function ConsentedGoogleTagManager({ gtmId }: { gtmId: string }) {
  const consent = useConsent()
  const { analytics, advertisement } = consent.categories
  const shouldLoad = !isConsentManagerEnabled() || analytics || advertisement

  // Layout effects run before next/script injects GTM, so the consent state is queued first.
  useLayoutEffect(() => {
    if (!shouldLoad || getConsentAdapter()?.handlesGoogleConsentMode !== false) return
    syncGoogleConsentMode(consent)
  }, [consent, shouldLoad])

  if (!shouldLoad) return null

  return <GoogleTagManager gtmId={gtmId} />
}
