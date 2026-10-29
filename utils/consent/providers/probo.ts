import Cookies from 'js-cookie'
import { ConsentSnapshot, UNDECIDED_CONSENT, decidedConsent } from '../parse'
import { getProboSettings } from '../provider'
import type { ConsentAdapter } from './types'

export const PROBO_COOKIE = 'probo_consent'

// The cookie Probo writes after every choice: {bid, v, vid, action, data: {<category slug>: bool}}
type ProboConsentCookie = {
  bid?: unknown
  v?: unknown
  action?: unknown
  data?: unknown
}

const decodeProboCookie = (raw: string | null | undefined): ProboConsentCookie | null => {
  if (!raw) return null
  for (const candidate of [raw, safeDecode(raw)]) {
    try {
      const value = JSON.parse(candidate)
      if (value && typeof value === 'object') return value as ProboConsentCookie
    } catch {
      // try the next form
    }
  }
  return null
}

const safeDecode = (raw: string) => {
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export const parseProboCookie = (
  raw: string | null | undefined,
  bannerId = getProboSettings().bannerId
): ConsentSnapshot => {
  const cookie = decodeProboCookie(raw)
  if (!cookie || !bannerId || cookie.bid !== bannerId) return UNDECIDED_CONSENT

  const data = (cookie.data && typeof cookie.data === 'object' ? cookie.data : {}) as Record<
    string,
    unknown
  >

  switch (cookie.action) {
    case 'ACCEPT_ALL':
    case 'CUSTOMIZE':
      return decidedConsent({
        functional: data.functional === true,
        analytics: data.analytics === true,
        advertisement: data.advertising === true,
      })
    case 'REJECT_ALL':
    case 'GPC':
      return decidedConsent({})
    // ACKNOWLEDGE belongs to notice-only banners and is never consent.
    default:
      return UNDECIDED_CONSENT
  }
}

const visitorIdKey = (bannerId: string) => `${PROBO_COOKIE}:${bannerId}:vid`

// Probo restores an expired choice from its server using the visitor ID it keeps in
// localStorage. Dropping that ID once the consent cookie is gone makes the cookie's expiry
// the consent's expiry, so the visitor is asked again.
export const discardExpiredProboVisitor = () => {
  const { bannerId } = getProboSettings()
  if (!bannerId) return
  const cookie = decodeProboCookie(Cookies.get(PROBO_COOKIE))
  if (cookie?.bid === bannerId) return
  try {
    localStorage.removeItem(visitorIdKey(bannerId))
  } catch {
    // Ignore storage errors
  }
}

type ProboTracker = { name: string; tracker_type?: string }
type ProboCategory = { slug: string; kind?: string; cookies?: ProboTracker[] }
type ProboReadyDetail = { config?: { version?: number; categories?: ProboCategory[] } }

let publishedCategories: ProboCategory[] = []

const patternToRegExp = (pattern: string) =>
  new RegExp(
    `^${pattern
      .split('*')
      .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*')}$`
  )

const cookieDomains = (hostname: string) => {
  const parts = hostname.split('.')
  const domains: string[] = []
  for (let i = 0; i < parts.length - 1; i++) {
    const domain = parts.slice(i).join('.')
    domains.push(domain, `.${domain}`)
  }
  return domains
}

// Deletes what the published banner lists under the categories the visitor does not allow: our
// origin's cookies and storage. Cookies vendors keep on their own domains are out of reach.
export const removeDeniedTrackers = (
  categories: ProboCategory[],
  granted: Record<string, unknown>
) => {
  const denied = categories.filter(
    (category) => category.kind !== 'NECESSARY' && granted[category.slug] !== true
  )
  const patternsFor = (type: string) =>
    denied.flatMap((category) =>
      (category.cookies ?? [])
        .filter((tracker) => tracker.tracker_type === type)
        .map((tracker) => patternToRegExp(tracker.name))
    )

  const cookiePatterns = patternsFor('COOKIE')
  for (const name of Object.keys(Cookies.get())) {
    if (!cookiePatterns.some((pattern) => pattern.test(name))) continue
    Cookies.remove(name, { path: '/' })
    cookieDomains(location.hostname).forEach((domain) =>
      Cookies.remove(name, { path: '/', domain })
    )
  }

  const stores: [string, () => Storage][] = [
    ['LOCAL_STORAGE', () => localStorage],
    ['SESSION_STORAGE', () => sessionStorage],
  ]
  for (const [type, getStore] of stores) {
    const patterns = patternsFor(type)
    try {
      const store = getStore()
      Object.keys(store)
        .filter((key) => patterns.some((pattern) => pattern.test(key)))
        .forEach((key) => store.removeItem(key))
    } catch {
      // Ignore storage errors
    }
  }
}

const removeTrackersDeniedByCookie = () => {
  const cookie = decodeProboCookie(Cookies.get(PROBO_COOKIE))
  const granted = (cookie?.data && typeof cookie.data === 'object' ? cookie.data : {}) as Record<
    string,
    unknown
  >
  removeDeniedTrackers(publishedCategories, granted)
}

export const proboAdapter: ConsentAdapter = {
  cookieName: PROBO_COOKIE,
  parseCookie: (raw) => parseProboCookie(raw),
  // Probo decides whether a stored choice is still valid (banner version, expiry), so
  // nothing counts as consent until it has loaded.
  readStoredConsent: () => UNDECIDED_CONSENT,
  hasPendingChoice: () => parseProboCookie(Cookies.get(PROBO_COOKIE)).status === 'decided',
  start: ({ onLoad, onChoice }) => {
    document.addEventListener('probo-ready', (event) => {
      const config = (event as CustomEvent<ProboReadyDetail>).detail?.config
      publishedCategories = config?.categories ?? []
      const raw = Cookies.get(PROBO_COOKIE)
      const cookie = decodeProboCookie(raw)

      if (cookie && cookie.v === config?.version) {
        const stored = parseProboCookie(raw)
        // Also clears trackers left from before the choice, for example from before this banner.
        if (stored.status === 'decided') removeTrackersDeniedByCookie()
        onLoad(stored)
        return
      }

      // A choice made on an earlier banner version no longer counts: remove what it allowed.
      if (cookie) {
        Cookies.remove(PROBO_COOKIE, { path: '/' })
        void import('@/utils/userClient').then(({ clearAnalyticsIdentity }) =>
          clearAnalyticsIdentity()
        )
      }
      onLoad(UNDECIDED_CONSENT)
    })

    // Probo writes the cookie before it dispatches the event.
    document.addEventListener('probo-consent', () =>
      onChoice(parseProboCookie(Cookies.get(PROBO_COOKIE)))
    )
  },
  openPreferences: () => document.dispatchEvent(new CustomEvent('probo-open-preferences')),
  beforeReload: () =>
    new Promise((resolve) => {
      const { bannerId } = getProboSettings()
      let observer: PerformanceObserver | undefined
      const done = () => {
        observer?.disconnect()
        window.clearTimeout(timer)
        removeTrackersDeniedByCookie()
        resolve()
      }
      const timer = window.setTimeout(done, 1500)
      try {
        observer = new PerformanceObserver((list) => {
          if (list.getEntries().some((entry) => entry.name.includes(`/${bannerId}/consents`)))
            done()
        })
        observer.observe({ type: 'resource' })
      } catch {
        // PerformanceObserver unavailable: the timeout still lets the request finish
      }
    }),
}
