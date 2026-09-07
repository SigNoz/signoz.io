import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logEvent } from './logEvent'

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
