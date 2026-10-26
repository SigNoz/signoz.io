import type { NextRequest } from 'next/server'
import { BROWSER_OPT_OUT_CONSENT, ConsentSnapshot, UNMANAGED_CONSENT } from './parse'
import { getConsentAdapter } from './providers'

export const readConsentFromRequest = (req: NextRequest): ConsentSnapshot => {
  const adapter = getConsentAdapter()
  if (!adapter) return UNMANAGED_CONSENT
  const stored = adapter.parseCookie(req.cookies.get(adapter.cookieName)?.value)
  const browserOptOut = req.headers.get('sec-gpc') === '1' || req.headers.get('dnt') === '1'
  if (browserOptOut && stored.status === 'undecided') return BROWSER_OPT_OUT_CONSENT
  return stored
}
