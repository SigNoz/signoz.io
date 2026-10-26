import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

const sentBodies = () =>
  vi
    .mocked(fetch)
    .mock.calls.map(([, request]) => JSON.parse((request as RequestInit).body as string))

const loadHook = async () => {
  const { useLogEvent } = await import('./useLogEvent')
  return renderHook(() => useLogEvent()).result.current
}

const clearCookies = () =>
  document.cookie.split(';').forEach((c) => {
    document.cookie = `${c.split('=')[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  })

type ProviderHarness = {
  name: string
  env: Record<string, string>
  // The consent manager has loaded and the visitor hasn't chosen yet.
  loadWithoutChoice: () => void
  // An explicit choice granting these categories (and denying the rest).
  choose: (granted: string[]) => void
}

const cookieYes: ProviderHarness = {
  name: 'CookieYes',
  env: { NEXT_PUBLIC_COOKIEYES_ID: 'test-site' },
  loadWithoutChoice: () => {
    const banner = {
      categories: { necessary: true, analytics: false },
      isUserActionCompleted: false,
    }
    vi.stubGlobal('getCkyConsent', () => banner)
    document.dispatchEvent(new CustomEvent('cookieyes_banner_load', { detail: banner }))
  },
  choose: (granted) => {
    const banner = window.getCkyConsent?.()
    if (banner) banner.isUserActionCompleted = true
    document.dispatchEvent(
      new CustomEvent('cookieyes_consent_update', {
        detail: { accepted: ['necessary', ...granted], rejected: [] },
      })
    )
  },
}

const PROBO_BANNER = 'banner-1'

const setProboCookie = (value: Record<string, unknown>) => {
  document.cookie = `probo_consent=${encodeURIComponent(
    JSON.stringify({ bid: PROBO_BANNER, v: 1, vid: 'visitor', ...value })
  )}; path=/`
}

const probo: ProviderHarness = {
  name: 'Probo',
  env: {
    NEXT_PUBLIC_CONSENT_PROVIDER: 'probo',
    NEXT_PUBLIC_PROBO_BANNER_ID: PROBO_BANNER,
    NEXT_PUBLIC_PROBO_API_URL: 'https://probo.example.com',
  },
  loadWithoutChoice: () =>
    document.dispatchEvent(new CustomEvent('probo-ready', { detail: { config: { version: 1 } } })),
  choose: (granted) => {
    const data = {
      necessary: true,
      functional: granted.includes('functional'),
      analytics: granted.includes('analytics'),
      advertising: granted.includes('advertisement'),
    }
    setProboCookie({ action: granted.length ? 'CUSTOMIZE' : 'REJECT_ALL', data })
    document.dispatchEvent(new CustomEvent('probo-consent'))
  },
}

describe.each([cookieYes, probo])('useLogEvent consent gating with $name', (provider) => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', 'https://tunnel.example.com')
    Object.entries(provider.env).forEach(([key, value]) => vi.stubEnv(key, value))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    localStorage.clear()
    sessionStorage.clear()
    clearCookies()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('buffers events before a choice and flushes them with identity on accept', async () => {
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(fetch).not.toHaveBeenCalled()
    expect(localStorage.getItem('gb_user_anonymous_id')).toBeNull()

    provider.choose(['analytics'])

    expect(fetch).toHaveBeenCalledTimes(1)
    const [body] = sentBodies()
    expect(body.eventName).toBe('Website Page View')
    expect(body.anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
    expect(body.attributes.$session_id).toBeTruthy()
  })

  it('sends cookieless events without personal fields after a reject', async () => {
    const logEvent = await loadHook()
    provider.choose([])

    logEvent({
      eventName: 'User Signed Up',
      eventType: 'identify',
      userId: 'jane@example.com',
      attributes: { email: 'jane@example.com', method: 'email_signup', note: 'jane@example.com' },
    })
    logEvent({ eventName: 'Website Page Leave', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    const [body] = sentBodies()
    expect(body.eventType).toBe('track')
    expect(body.userId).toBeUndefined()
    expect(body.attributes).toMatchObject({ method: 'email_signup', custom_consent: 'denied' })
    expect(JSON.stringify(body)).not.toContain('jane@example.com')
    expect(body.attributes.custom_ip).toBeUndefined()
    expect(localStorage.length).toBe(0)
    expect(sessionStorage.length).toBe(0)
  })

  it('clears stored identity when analytics consent is withdrawn', async () => {
    const logEvent = await loadHook()
    provider.choose(['analytics'])
    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(localStorage.getItem('gb_user_anonymous_id')).toBeTruthy()

    provider.choose([])

    expect(localStorage.getItem('gb_user_anonymous_id')).toBeNull()
    expect(document.cookie).not.toContain('gb_anonymous_id')
  })

  it('keeps buffering once the banner has loaded without a choice', async () => {
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    provider.loadWithoutChoice()
    expect(fetch).not.toHaveBeenCalled()

    provider.choose(['analytics'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })

  it('treats Global Privacy Control as a refusal before any choice', async () => {
    vi.stubGlobal('navigator', { ...navigator, globalPrivacyControl: true })
    const logEvent = await loadHook()
    provider.loadWithoutChoice()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].attributes.custom_consent).toBe('denied')
    expect(localStorage.length).toBe(0)
  })

  it('counts visitors who leave without choosing, cookieless', async () => {
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(fetch).not.toHaveBeenCalled()

    window.dispatchEvent(new Event('pagehide'))

    expect(fetch).toHaveBeenCalledTimes(1)
    const [, request] = vi.mocked(fetch).mock.calls[0]
    expect((request as RequestInit).keepalive).toBe(true)
    expect(sentBodies()[0].attributes.custom_consent).toBe('denied')
  })

  it('treats Do Not Track as a refusal before any choice', async () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: '1' })
    const logEvent = await loadHook()
    provider.loadWithoutChoice()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].attributes.custom_consent).toBe('denied')
  })

  it('lets an explicit accept override Do Not Track', async () => {
    vi.stubGlobal('navigator', { ...navigator, userAgent: navigator.userAgent, doNotTrack: '1' })
    const logEvent = await loadHook()
    provider.choose(['analytics'])

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })
})

describe('useLogEvent consent gating, provider specifics', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', 'https://tunnel.example.com')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    localStorage.clear()
    sessionStorage.clear()
    clearCookies()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('keeps buffering when CookieYes fires its initial update before any choice', async () => {
    Object.entries(cookieYes.env).forEach(([key, value]) => vi.stubEnv(key, value))
    const banner = {
      categories: { necessary: true, analytics: false, functional: false, advertisement: false },
      isUserActionCompleted: false,
    }
    vi.stubGlobal('getCkyConsent', () => banner)
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    document.dispatchEvent(
      new CustomEvent('cookieyes_consent_update', {
        detail: { accepted: ['necessary'], rejected: [] },
      })
    )
    expect(fetch).not.toHaveBeenCalled()

    cookieYes.choose(['analytics'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })

  it('never treats CookieYes banner defaults as consent before a choice', async () => {
    Object.entries(cookieYes.env).forEach(([key, value]) => vi.stubEnv(key, value))
    vi.stubGlobal('getCkyConsent', () => ({
      categories: { necessary: true, analytics: true, functional: true, advertisement: true },
      isUserActionCompleted: false,
    }))
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).not.toHaveBeenCalled()
    expect(localStorage.length).toBe(0)

    window.dispatchEvent(new Event('pagehide'))
    expect(sentBodies()[0].attributes.custom_consent).toBe('denied')
  })

  it('does not trust a Probo cookie until Probo confirms it', async () => {
    Object.entries(probo.env).forEach(([key, value]) => vi.stubEnv(key, value))
    setProboCookie({ action: 'ACCEPT_ALL', data: { analytics: true, advertising: true } })
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(fetch).not.toHaveBeenCalled()

    probo.loadWithoutChoice()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })

  it('waits for Probo to confirm a stored accept before applying Do Not Track', async () => {
    Object.entries(probo.env).forEach(([key, value]) => vi.stubEnv(key, value))
    vi.stubGlobal('navigator', { ...navigator, userAgent: navigator.userAgent, doNotTrack: '1' })
    setProboCookie({ action: 'ACCEPT_ALL', data: { analytics: true } })
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(fetch).not.toHaveBeenCalled()

    probo.loadWithoutChoice()
    expect(sentBodies()[0].attributes.custom_consent).toBeUndefined()
    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })

  it('drops a Probo choice made on an older banner version and its identifiers', async () => {
    Object.entries(probo.env).forEach(([key, value]) => vi.stubEnv(key, value))
    setProboCookie({ v: 1, action: 'ACCEPT_ALL', data: { analytics: true } })
    localStorage.setItem('gb_user_anonymous_id', 'old-visitor')
    document.cookie = 'gb_anonymous_id=old-visitor; path=/'
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    document.dispatchEvent(new CustomEvent('probo-ready', { detail: { config: { version: 2 } } }))
    await vi.dynamicImportSettled()

    expect(fetch).not.toHaveBeenCalled()
    expect(document.cookie).not.toContain('probo_consent')
    expect(document.cookie).not.toContain('gb_anonymous_id')
    expect(localStorage.getItem('gb_user_anonymous_id')).toBeNull()
  })

  it('keeps today’s behaviour when no consent manager is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_COOKIEYES_ID', '')
    vi.stubEnv('NEXT_PUBLIC_CONSENT_PROVIDER', '')
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBeTruthy()
  })
})
