import Cookies from 'js-cookie'
import { ConsentSnapshot, UNDECIDED_CONSENT, decidedConsent } from '../parse'
import type { ConsentAdapter, ConsentAdapterCallbacks } from './types'

export const COOKIEYES_COOKIE = 'cookieyes-consent'

type CookieYesUpdateDetail = { accepted?: string[]; rejected?: string[] }
type CookieYesLoadDetail = {
  categories?: Record<string, boolean>
  isUserActionCompleted?: boolean
}

declare global {
  interface Window {
    getCkyConsent?: () => CookieYesLoadDetail
    revisitCkyConsent?: () => void
  }
}

// Cookie value: consentid:<id>,consent:yes|no,action:yes|,necessary:yes,functional:no,...,lastRenewedDate:<ms>
export const parseCookieYesCookie = (raw: string | null | undefined): ConsentSnapshot => {
  if (!raw) return UNDECIDED_CONSENT

  let value = raw
  try {
    value = decodeURIComponent(raw)
  } catch {
    // keep raw value
  }

  const fields = new Map<string, string>()
  for (const pair of value.split(',')) {
    const separator = pair.indexOf(':')
    if (separator === -1) continue
    fields.set(pair.slice(0, separator).trim(), pair.slice(separator + 1).trim())
  }

  // Opt-in only: categories count only after an explicit choice (action:yes), never from
  // defaults the banner may pre-set.
  if (fields.get('action') !== 'yes') return UNDECIDED_CONSENT

  return decidedConsent({
    functional: fields.get('functional') === 'yes',
    analytics: fields.get('analytics') === 'yes',
    performance: fields.get('performance') === 'yes',
    advertisement: fields.get('advertisement') === 'yes',
  })
}

export const consentFromCategoryList = (accepted: string[]): ConsentSnapshot =>
  decidedConsent(Object.fromEntries(accepted.map((category) => [category, true])))

const readCookie = () => parseCookieYesCookie(Cookies.get(COOKIEYES_COOKIE))

// Opt-in everywhere: until the visitor chooses, nothing optional is granted.
const applyBannerState = (
  { onLoad }: ConsentAdapterCallbacks,
  detail: CookieYesLoadDetail | undefined
) => onLoad(detail?.isUserActionCompleted ? readCookie() : UNDECIDED_CONSENT)

const poll = (callbacks: ConsentAdapterCallbacks) => {
  if (typeof window.getCkyConsent !== 'function') return false
  try {
    applyBannerState(callbacks, window.getCkyConsent())
    return true
  } catch {
    return false
  }
}

export const cookieYesAdapter: ConsentAdapter = {
  cookieName: COOKIEYES_COOKIE,
  parseCookie: parseCookieYesCookie,
  readStoredConsent: readCookie,
  start: (callbacks) => {
    // The banner script can finish before React hydrates, so read its state now and also listen.
    document.addEventListener('cookieyes_banner_load', (event) =>
      applyBannerState(callbacks, (event as CustomEvent<CookieYesLoadDetail>).detail)
    )

    // CookieYes also fires this while initialising, before any visitor action.
    document.addEventListener('cookieyes_consent_update', (event) => {
      const banner = window.getCkyConsent?.()
      if (banner && !banner.isUserActionCompleted) {
        applyBannerState(callbacks, banner)
        return
      }
      const detail = (event as CustomEvent<CookieYesUpdateDetail>).detail
      callbacks.onChoice(consentFromCategoryList(detail?.accepted ?? []))
    })

    poll(callbacks)
  },
  poll,
  openPreferences: () => window.revisitCkyConsent?.(),
}
