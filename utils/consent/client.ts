import Cookies from 'js-cookie'
import {
  BROWSER_OPT_OUT_CONSENT,
  CONSENT_COOKIE,
  ConsentCategory,
  ConsentSnapshot,
  UNDECIDED_CONSENT,
  UNMANAGED_CONSENT,
  consentFromCategoryList,
  hasExplicitChoice,
  isConsentManagerEnabled,
  parseConsentCookie,
} from './parse'

type ConsentListener = (next: ConsentSnapshot, previous: ConsentSnapshot) => void

type CookieYesUpdateDetail = { accepted?: string[]; rejected?: string[] }
type CookieYesLoadDetail = {
  categories?: Record<string, boolean>
  isUserActionCompleted?: boolean
}

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean
  }
  interface Window {
    getCkyConsent?: () => CookieYesLoadDetail
    revisitCkyConsent?: () => void
  }
}

// If the banner script never loads (blocked, offline), stop waiting and treat the visitor as
// not consented so buffered analytics fall back to cookieless events.
export const CONSENT_LOAD_TIMEOUT_MS = 8000

const listeners = new Set<ConsentListener>()
let current: ConsentSnapshot | null = null
let initialized = false
let bannerLoaded = false
let loadTimedOut = false

const hasBrowserOptOut = () =>
  navigator.globalPrivacyControl === true || navigator.doNotTrack === '1'

const readCookieSnapshot = (): ConsentSnapshot => {
  if (!isConsentManagerEnabled()) return UNMANAGED_CONSENT
  try {
    const raw = Cookies.get(CONSENT_COOKIE)
    if (hasBrowserOptOut() && !hasExplicitChoice(raw)) return BROWSER_OPT_OUT_CONSENT
    return parseConsentCookie(raw)
  } catch {
    return UNDECIDED_CONSENT
  }
}

const isWithdrawal = (previous: ConsentSnapshot, next: ConsentSnapshot) =>
  previous.status === 'decided' &&
  Object.entries(previous.categories).some(
    ([category, granted]) => granted && !next.categories[category as ConsentCategory]
  )

const setConsent = (next: ConsentSnapshot) => {
  const previous = getConsent()
  current = next
  if (
    previous.status === next.status &&
    Object.entries(next.categories).every(
      ([category, granted]) => previous.categories[category as ConsentCategory] === granted
    )
  ) {
    return
  }
  listeners.forEach((listener) => listener(next, previous))
}

const ensureInitialized = () => {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  if (!isConsentManagerEnabled()) return

  // The banner script can finish before React hydrates, so read its state now and also listen.
  const applyBannerState = (detail?: CookieYesLoadDetail) => {
    bannerLoaded = true
    // Opt-in everywhere: until the visitor chooses, nothing optional is granted.
    if (!detail?.isUserActionCompleted) {
      setConsent(hasBrowserOptOut() ? BROWSER_OPT_OUT_CONSENT : UNDECIDED_CONSENT)
      return
    }
    setConsent(readCookieSnapshot())
  }

  const readBannerState = () => {
    if (typeof window.getCkyConsent !== 'function') return false
    try {
      applyBannerState(window.getCkyConsent())
      return true
    } catch {
      return false
    }
  }

  document.addEventListener('cookieyes_banner_load', (event) =>
    applyBannerState((event as CustomEvent<CookieYesLoadDetail>).detail)
  )

  // CookieYes also fires this while initialising, before any visitor action.
  document.addEventListener('cookieyes_consent_update', (event) => {
    const banner = window.getCkyConsent?.()
    if (banner && !banner.isUserActionCompleted) {
      applyBannerState(banner)
      return
    }
    const detail = (event as CustomEvent<CookieYesUpdateDetail>).detail
    const previous = getConsent()
    const next = consentFromCategoryList(detail?.accepted ?? [])
    setConsent(next)
    // Tags already running (GTM, RB2B) cannot be unloaded, so a withdrawal starts a clean page.
    if (isWithdrawal(previous, next)) window.location.reload()
  })

  readBannerState()

  window.setTimeout(() => {
    if (bannerLoaded || readBannerState() || getConsent().status !== 'undecided') return
    loadTimedOut = true
    listeners.forEach((listener) => listener(getConsent(), getConsent()))
  }, CONSENT_LOAD_TIMEOUT_MS)
}

export const getConsent = (): ConsentSnapshot => {
  if (typeof window === 'undefined') return UNDECIDED_CONSENT
  ensureInitialized()
  if (!current) current = readCookieSnapshot()
  return current
}

export const hasConsent = (category: ConsentCategory): boolean => getConsent().categories[category]

// True once waiting for a decision no longer makes sense (decided, or the banner never loaded).
export const isConsentSettled = (): boolean => getConsent().status === 'decided' || loadTimedOut

export const onConsentChange = (listener: ConsentListener): (() => void) => {
  ensureInitialized()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const openCookiePreferences = () => {
  if (typeof window === 'undefined') return
  window.revisitCkyConsent?.()
}
