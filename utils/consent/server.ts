import type { NextRequest } from 'next/server'
import {
  BROWSER_OPT_OUT_CONSENT,
  CONSENT_COOKIE,
  ConsentSnapshot,
  UNMANAGED_CONSENT,
  isConsentManagerEnabled,
  hasExplicitChoice,
  parseConsentCookie,
} from './parse'

export const readConsentFromRequest = (req: NextRequest): ConsentSnapshot => {
  if (!isConsentManagerEnabled()) return UNMANAGED_CONSENT
  const raw = req.cookies.get(CONSENT_COOKIE)?.value
  const browserOptOut = req.headers.get('sec-gpc') === '1' || req.headers.get('dnt') === '1'
  if (browserOptOut && !hasExplicitChoice(raw)) return BROWSER_OPT_OUT_CONSENT
  return parseConsentCookie(raw)
}
