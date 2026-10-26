import {
  BROWSER_OPT_OUT_CONSENT,
  ConsentCategory,
  ConsentSnapshot,
  UNDECIDED_CONSENT,
  UNMANAGED_CONSENT,
} from './parse'
import { getConsentAdapter } from './providers'
import type { ConsentAdapterCallbacks } from './providers/types'

type ConsentListener = (next: ConsentSnapshot, previous: ConsentSnapshot) => void

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean
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

const withBrowserOptOut = (snapshot: ConsentSnapshot): ConsentSnapshot =>
  snapshot.status === 'undecided' && hasBrowserOptOut() ? BROWSER_OPT_OUT_CONSENT : snapshot

const readStoredSnapshot = (): ConsentSnapshot => {
  const adapter = getConsentAdapter()
  if (!adapter) return UNMANAGED_CONSENT
  try {
    const stored = adapter.readStoredConsent()
    // A stored choice the consent manager hasn't confirmed yet beats DNT/GPC: wait for it.
    if (stored.status === 'undecided' && adapter.hasPendingChoice?.()) return stored
    return withBrowserOptOut(stored)
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
  const adapter = getConsentAdapter()
  if (!adapter) return

  const callbacks: ConsentAdapterCallbacks = {
    onLoad: (stored) => {
      bannerLoaded = true
      setConsent(withBrowserOptOut(stored))
    },
    onChoice: (next) => {
      const previous = getConsent()
      setConsent(next)
      // Tags already running (GTM, RB2B) cannot be unloaded, so a withdrawal starts a clean page.
      if (!isWithdrawal(previous, next)) return
      const reload = () => window.location.reload()
      if (adapter.beforeReload) adapter.beforeReload().then(reload, reload)
      else reload()
    },
  }

  adapter.start(callbacks)

  window.setTimeout(() => {
    if (bannerLoaded || adapter.poll?.(callbacks) || getConsent().status !== 'undecided') return
    loadTimedOut = true
    listeners.forEach((listener) => listener(getConsent(), getConsent()))
  }, CONSENT_LOAD_TIMEOUT_MS)
}

export const getConsent = (): ConsentSnapshot => {
  if (typeof window === 'undefined') return UNDECIDED_CONSENT
  ensureInitialized()
  if (!current) current = readStoredSnapshot()
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
  getConsentAdapter()?.openPreferences()
}
