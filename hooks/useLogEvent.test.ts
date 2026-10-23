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

const fireConsentUpdate = (accepted: string[]) =>
  document.dispatchEvent(
    new CustomEvent('cookieyes_consent_update', { detail: { accepted, rejected: [] } })
  )

describe('useLogEvent consent gating', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', 'https://tunnel.example.com')
    vi.stubEnv('NEXT_PUBLIC_COOKIEYES_ID', 'test-site')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    localStorage.clear()
    sessionStorage.clear()
    document.cookie.split(';').forEach((c) => {
      document.cookie = `${c.split('=')[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
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

    fireConsentUpdate(['necessary', 'analytics'])

    expect(fetch).toHaveBeenCalledTimes(1)
    const [body] = sentBodies()
    expect(body.eventName).toBe('Website Page View')
    expect(body.anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
    expect(body.attributes.$session_id).toBeTruthy()
  })

  it('sends cookieless events without personal fields after a reject', async () => {
    const logEvent = await loadHook()
    fireConsentUpdate(['necessary'])

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
    fireConsentUpdate(['necessary', 'analytics'])
    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    expect(localStorage.getItem('gb_user_anonymous_id')).toBeTruthy()

    fireConsentUpdate(['necessary'])

    expect(localStorage.getItem('gb_user_anonymous_id')).toBeNull()
    expect(document.cookie).not.toContain('gb_anonymous_id')
  })

  it('keeps buffering when CookieYes fires its initial update before any choice', async () => {
    const banner = {
      categories: { necessary: true, analytics: false, functional: false, advertisement: false },
      isUserActionCompleted: false,
    }
    vi.stubGlobal('getCkyConsent', () => banner)
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })
    fireConsentUpdate(['necessary'])
    expect(fetch).not.toHaveBeenCalled()

    banner.isUserActionCompleted = true
    fireConsentUpdate(['necessary', 'analytics'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBe(localStorage.getItem('gb_user_anonymous_id'))
  })

  it('never treats banner defaults as consent before a choice', async () => {
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

  it('treats Global Privacy Control as a refusal before any choice', async () => {
    vi.stubGlobal('navigator', { ...navigator, globalPrivacyControl: true })
    vi.stubGlobal('getCkyConsent', () => ({
      categories: { necessary: true, analytics: false },
      isUserActionCompleted: false,
    }))
    const logEvent = await loadHook()

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

  it('treats Do Not Track as a refusal before any choice, in every region', async () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: '1' })
    vi.stubGlobal('getCkyConsent', () => ({
      categories: { necessary: true, analytics: false },
      isUserActionCompleted: false,
    }))
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].attributes.custom_consent).toBe('denied')
  })

  it('keeps today’s behaviour when no consent manager is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_COOKIEYES_ID', '')
    const logEvent = await loadHook()

    logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(sentBodies()[0].anonymousId).toBeTruthy()
  })
})
