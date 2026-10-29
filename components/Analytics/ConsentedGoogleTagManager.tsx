'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import { useConsent } from '@/hooks/useConsent'
import { isConsentManagerEnabled } from '@/utils/consent/parse'

// GTM only loads once the visitor allows analytics or advertisement, so no tag can fire
// before consent even if the consent manager fails to load.
export default function ConsentedGoogleTagManager({ gtmId }: { gtmId: string }) {
  const { analytics, advertisement } = useConsent().categories
  const shouldLoad = !isConsentManagerEnabled() || analytics || advertisement

  if (!shouldLoad) return null

  return <GoogleTagManager gtmId={gtmId} />
}
