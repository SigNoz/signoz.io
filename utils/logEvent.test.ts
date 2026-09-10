import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isAnalyticsExcludedUserAgent, logEvent } from './logEvent'

describe('logEvent', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', 'https://tunnel.example.com')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('sends website events only to the tunnel endpoint', async () => {
    await logEvent({
      eventName: 'Website Page View',
      eventType: 'track',
      attributes: { pageLocation: '/docs/introduction' },
    })

    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, request] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://tunnel.example.com/log')

    const body = JSON.parse(request?.body as string)
    expect(body).toMatchObject({
      eventName: 'Website Page View',
      eventType: 'track',
      attributes: { pageLocation: '/docs/introduction' },
    })
    expect(body.timestamp).toBeTruthy()
  })

  it('sends page-leave events as keepalive fetches, never via sendBeacon', async () => {
    const sendBeacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon })

    await logEvent(
      {
        eventName: 'Website Page Leave',
        eventType: 'track',
        attributes: {
          $session_id: 'session-1',
          pageDurationSeconds: 12.5,
          scrollDepthPercentage: 80,
        },
      },
      { transport: 'beacon' }
    )

    // sendBeacon forces credentials mode "include", which the cross-origin
    // tunnel's wildcard CORS policy rejects.
    expect(sendBeacon).not.toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, request] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://tunnel.example.com/log')
    expect(request).toMatchObject({ method: 'POST', keepalive: true })

    const body = JSON.parse(request?.body as string)
    expect(body.attributes).toMatchObject({
      $session_id: 'session-1',
      pageDurationSeconds: 12.5,
      scrollDepthPercentage: 80,
    })
  })

  it('does not send anywhere when no tunnel endpoint is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', '')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    await logEvent({ eventName: 'Website Page View', eventType: 'track' })

    expect(fetch).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalled()
  })
})

describe('isAnalyticsExcludedUserAgent', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('excludes user agents containing a configured substring, case-insensitively', () => {
    vi.stubEnv('ANALYTICS_EXCLUDED_USER_AGENTS', 'acme-crawler')

    expect(isAnalyticsExcludedUserAgent('Acme-Crawler/1.2.0')).toBe(true)
    expect(isAnalyticsExcludedUserAgent('node-fetch acme-crawler')).toBe(true)
    expect(isAnalyticsExcludedUserAgent('Mozilla/5.0 (Macintosh)')).toBe(false)
  })

  it('supports a comma-separated list and ignores surrounding whitespace', () => {
    vi.stubEnv('ANALYTICS_EXCLUDED_USER_AGENTS', 'acme-crawler, sample-probe ,,')

    expect(isAnalyticsExcludedUserAgent('Sample-Probe/0.1')).toBe(true)
    expect(isAnalyticsExcludedUserAgent('acme-crawler')).toBe(true)
    expect(isAnalyticsExcludedUserAgent('curl/8.0')).toBe(false)
  })

  it('excludes nothing when the env var is unset or the user agent is empty', () => {
    expect(isAnalyticsExcludedUserAgent('acme-crawler')).toBe(false)

    vi.stubEnv('ANALYTICS_EXCLUDED_USER_AGENTS', 'acme-crawler')
    expect(isAnalyticsExcludedUserAgent('')).toBe(false)
  })
})
