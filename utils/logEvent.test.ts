import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logEvent } from './logEvent'

describe('logEvent', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_TUNNEL_ENDPOINT', 'https://mixpanel.example')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('sends a website event only to the Mixpanel tunnel', async () => {
    await logEvent({
      eventName: 'Website Page View',
      eventType: 'track',
      attributes: { pageLocation: '/docs/' },
    })

    expect(fetch).toHaveBeenCalledTimes(1)

    const [url, request] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('https://mixpanel.example/log')
    expect(request).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const body = JSON.parse(request?.body as string)
    expect(body).toMatchObject({
      eventName: 'Website Page View',
      eventType: 'track',
      attributes: { pageLocation: '/docs/' },
    })
  })

  it('sends a page-leave beacon to the Mixpanel tunnel', async () => {
    const sendBeacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon })

    await logEvent(
      {
        eventName: 'Website Page Leave',
        eventType: 'track',
        attributes: {
          pageDurationSeconds: 3,
          scrollDepthPercentage: 80,
        },
      },
      { transport: 'beacon' }
    )

    expect(sendBeacon).toHaveBeenCalledTimes(1)
    expect(sendBeacon).toHaveBeenCalledWith('https://mixpanel.example/log', expect.any(Blob))
    expect(fetch).not.toHaveBeenCalled()
  })
})
