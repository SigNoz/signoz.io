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

type ProboReadyDetail = { config?: { version?: number } }

export const proboAdapter: ConsentAdapter = {
  cookieName: PROBO_COOKIE,
  // Probo's own integration grants everything when its config request fails, so it stays off.
  handlesGoogleConsentMode: false,
  parseCookie: (raw) => parseProboCookie(raw),
  // Probo decides whether a stored choice is still valid (banner version, expiry), so
  // nothing counts as consent until it has loaded.
  readStoredConsent: () => UNDECIDED_CONSENT,
  hasPendingChoice: () => parseProboCookie(Cookies.get(PROBO_COOKIE)).status === 'decided',
  start: ({ onLoad, onChoice }) => {
    document.addEventListener('probo-ready', (event) => {
      const version = (event as CustomEvent<ProboReadyDetail>).detail?.config?.version
      const raw = Cookies.get(PROBO_COOKIE)
      const cookie = decodeProboCookie(raw)

      if (cookie && cookie.v === version) {
        onLoad(parseProboCookie(raw))
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
