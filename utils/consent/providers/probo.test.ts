import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UNDECIDED_CONSENT } from '../parse'
import {
  discardExpiredProboVisitor,
  parseProboCookie,
  proboAdapter,
  removeDeniedTrackers,
} from './probo'

const BANNER = 'banner-1'

const cookie = (value: Record<string, unknown>) =>
  encodeURIComponent(JSON.stringify({ bid: BANNER, v: 1, vid: 'visitor', ...value }))

const setCookie = (value: Record<string, unknown>) => {
  document.cookie = `probo_consent=${cookie(value)}; path=/`
}

const clearCookies = () =>
  document.cookie.split(';').forEach((c) => {
    document.cookie = `${c.split('=')[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })

describe('parseProboCookie', () => {
  it('treats a missing or malformed cookie as undecided', () => {
    expect(parseProboCookie(undefined, BANNER)).toEqual(UNDECIDED_CONSENT)
    expect(parseProboCookie('not-json', BANNER)).toEqual(UNDECIDED_CONSENT)
    expect(parseProboCookie(encodeURIComponent('"string"'), BANNER)).toEqual(UNDECIDED_CONSENT)
  })

  it('ignores a cookie written for another banner', () => {
    const raw = cookie({ bid: 'other', action: 'ACCEPT_ALL', data: { analytics: true } })
    expect(parseProboCookie(raw, BANNER)).toEqual(UNDECIDED_CONSENT)
  })

  it('maps a customised choice, renaming advertising to advertisement', () => {
    const raw = cookie({
      action: 'CUSTOMIZE',
      data: { necessary: true, analytics: true, functional: false, advertising: true },
    })
    expect(parseProboCookie(raw, BANNER)).toEqual({
      status: 'decided',
      categories: { functional: false, analytics: true, performance: false, advertisement: true },
    })
  })

  it('reads the value whether or not it is still URI-encoded', () => {
    const value = { action: 'ACCEPT_ALL', data: { analytics: true } }
    expect(parseProboCookie(decodeURIComponent(cookie(value)), BANNER).categories.analytics).toBe(
      true
    )
  })

  it('reads reject all and GPC as decided with everything denied', () => {
    for (const action of ['REJECT_ALL', 'GPC']) {
      const raw = cookie({ action, data: { necessary: true, analytics: true } })
      expect(parseProboCookie(raw, BANNER)).toEqual({
        status: 'decided',
        categories: {
          functional: false,
          analytics: false,
          performance: false,
          advertisement: false,
        },
      })
    }
  })

  it('never treats a notice acknowledgement as consent', () => {
    const raw = cookie({ action: 'ACKNOWLEDGE', data: { analytics: true, advertising: true } })
    expect(parseProboCookie(raw, BANNER)).toEqual(UNDECIDED_CONSENT)
  })

  it('only counts categories set to true', () => {
    const raw = cookie({ action: 'CUSTOMIZE', data: { analytics: 'yes', advertising: 1 } })
    expect(parseProboCookie(raw, BANNER).categories).toMatchObject({
      analytics: false,
      advertisement: false,
    })
  })
})

describe('proboAdapter', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_PROBO_BANNER_ID', BANNER)
    localStorage.clear()
    clearCookies()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('reports nothing as consent until Probo has loaded', () => {
    setCookie({ action: 'ACCEPT_ALL', data: { analytics: true } })
    expect(proboAdapter.readStoredConsent()).toEqual(UNDECIDED_CONSENT)
  })

  it('accepts a stored choice only for the published banner version', () => {
    const onLoad = vi.fn()
    proboAdapter.start({ onLoad, onChoice: vi.fn() })

    setCookie({ v: 2, action: 'ACCEPT_ALL', data: { analytics: true } })
    document.dispatchEvent(new CustomEvent('probo-ready', { detail: { config: { version: 2 } } }))
    expect(onLoad).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: 'decided',
        categories: expect.objectContaining({ analytics: true }),
      })
    )

    document.dispatchEvent(new CustomEvent('probo-ready', { detail: { config: { version: 3 } } }))
    expect(onLoad).toHaveBeenLastCalledWith(UNDECIDED_CONSENT)
    expect(document.cookie).not.toContain('probo_consent')
  })

  it('reports each choice from the cookie Probo just wrote', () => {
    const onChoice = vi.fn()
    proboAdapter.start({ onLoad: vi.fn(), onChoice })

    setCookie({ action: 'REJECT_ALL', data: { necessary: true } })
    document.dispatchEvent(new CustomEvent('probo-consent'))

    expect(onChoice).toHaveBeenCalledWith(expect.objectContaining({ status: 'decided' }))
  })

  it('forgets the visitor ID once the consent cookie has expired', () => {
    localStorage.setItem(`probo_consent:${BANNER}:vid`, 'visitor')
    discardExpiredProboVisitor()
    expect(localStorage.getItem(`probo_consent:${BANNER}:vid`)).toBeNull()
  })

  it('keeps the visitor ID while the consent cookie is present', () => {
    localStorage.setItem(`probo_consent:${BANNER}:vid`, 'visitor')
    setCookie({ action: 'REJECT_ALL', data: {} })
    discardExpiredProboVisitor()
    expect(localStorage.getItem(`probo_consent:${BANNER}:vid`)).toBe('visitor')
  })

  it('opens the preference panel through Probo’s event', () => {
    const listener = vi.fn()
    document.addEventListener('probo-open-preferences', listener)
    proboAdapter.openPreferences()
    expect(listener).toHaveBeenCalledTimes(1)
    document.removeEventListener('probo-open-preferences', listener)
  })
})

describe('removeDeniedTrackers', () => {
  const categories = [
    {
      slug: 'necessary',
      kind: 'NECESSARY',
      cookies: [{ name: 'probo_consent', tracker_type: 'COOKIE' }],
    },
    {
      slug: 'analytics',
      kind: 'NORMAL',
      cookies: [
        { name: '_ga', tracker_type: 'COOKIE' },
        { name: '_ga_*', tracker_type: 'COOKIE' },
        { name: '_cltk', tracker_type: 'SESSION_STORAGE' },
      ],
    },
    {
      slug: 'advertising',
      kind: 'NORMAL',
      cookies: [{ name: 'li_adsId', tracker_type: 'LOCAL_STORAGE' }],
    },
  ]

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    clearCookies()
    document.cookie = '_ga=GA1.1; path=/'
    document.cookie = '_ga_ABC123=GS1.1; path=/'
    document.cookie = 'probo_consent=x; path=/'
    document.cookie = 'unlisted=1; path=/'
    sessionStorage.setItem('_cltk', 'x')
    localStorage.setItem('li_adsId', 'x')
  })

  it('removes the listed cookies and storage of every denied category, including patterns', () => {
    removeDeniedTrackers(categories, { necessary: true, analytics: false, advertising: false })

    expect(document.cookie).not.toMatch(/_ga/)
    expect(document.cookie).toContain('probo_consent')
    expect(document.cookie).toContain('unlisted')
    expect(sessionStorage.getItem('_cltk')).toBeNull()
    expect(localStorage.getItem('li_adsId')).toBeNull()
  })

  it('keeps what the visitor still allows', () => {
    removeDeniedTrackers(categories, { necessary: true, analytics: true, advertising: false })

    expect(document.cookie).toContain('_ga=')
    expect(document.cookie).toContain('_ga_ABC123')
    expect(sessionStorage.getItem('_cltk')).toBe('x')
    expect(localStorage.getItem('li_adsId')).toBeNull()
  })

  it('runs when Probo loads a stored refusal, clearing trackers left from before the choice', () => {
    vi.stubEnv('NEXT_PUBLIC_PROBO_BANNER_ID', BANNER)
    proboAdapter.start({ onLoad: vi.fn(), onChoice: vi.fn() })
    setCookie({ v: 4, action: 'REJECT_ALL', data: { necessary: true, analytics: false } })

    document.dispatchEvent(
      new CustomEvent('probo-ready', { detail: { config: { version: 4, categories } } })
    )

    expect(document.cookie).not.toMatch(/_ga/)
    expect(localStorage.getItem('li_adsId')).toBeNull()
    vi.unstubAllEnvs()
  })
})
