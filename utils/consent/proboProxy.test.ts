// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { proxyToProbo } from './proboProxy'

const BANNER = 'banner-1'
const SITE = 'https://signoz-cookie-test.vercel.app'

const request = (path: string, init: RequestInit & { headers?: Record<string, string> } = {}) =>
  new Request(`${SITE}/api/site-preferences/${path}`, init)

let upstream: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_CONSENT_PROVIDER', 'probo')
  vi.stubEnv('NEXT_PUBLIC_PROBO_BANNER_ID', BANNER)
  vi.stubEnv('NEXT_PUBLIC_PROBO_API_URL', 'https://test.probo.com/')
  upstream = vi.fn(async () => Response.json({ ok: true }, { status: 201 }))
  vi.stubGlobal('fetch', upstream)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const sent = () => {
  const [url, init] = upstream.mock.calls[0] as [string, RequestInit]
  return { url, init, headers: new Headers(init.headers) }
}

describe('proxyToProbo', () => {
  it("forwards to Probo's cookie banner API with the query string", async () => {
    const res = await proxyToProbo(request(`${BANNER}/config?lang=en`), [BANNER, 'config'])

    expect(sent().url).toBe(`https://test.probo.com/api/cookie-banner/v1/${BANNER}/config?lang=en`)
    expect(res.status).toBe(201)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toEqual({ ok: true })
  })

  it("passes the visitor's IP and drops cookies and the Origin", async () => {
    await proxyToProbo(
      request(`${BANNER}/consents`, {
        method: 'POST',
        body: '{"action":"ACCEPT_ALL"}',
        headers: {
          'content-type': 'application/json',
          cookie: 'gb_anonymous_id=abc',
          origin: SITE,
          'sec-fetch-site': 'same-origin',
          'x-forwarded-for': '91.0.0.1, 10.0.0.1',
          'x-sdk-version': '0.22.0',
        },
      }),
      [BANNER, 'consents']
    )

    const { init, headers } = sent()
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"action":"ACCEPT_ALL"}')
    expect(headers.get('forwarded')).toBe('for=91.0.0.1')
    expect(headers.get('content-type')).toBe('application/json')
    expect(headers.get('x-sdk-version')).toBe('0.22.0')
    expect(headers.get('cookie')).toBeNull()
    expect(headers.get('origin')).toBeNull()
  })

  it('brackets IPv6 addresses', async () => {
    await proxyToProbo(
      request(`${BANNER}/config`, { headers: { 'x-real-ip': '2a00:1450:4001::1' } }),
      [BANNER, 'config']
    )
    expect(sent().headers.get('forwarded')).toBe('for="[2a00:1450:4001::1]"')
  })

  it('refuses other banners, cross-site callers and oversized bodies', async () => {
    expect((await proxyToProbo(request('other/config'), ['other', 'config'])).status).toBe(404)
    expect(
      (
        await proxyToProbo(
          request(`${BANNER}/consents`, {
            method: 'POST',
            body: '{}',
            headers: { 'sec-fetch-site': 'cross-site' },
          }),
          [BANNER, 'consents']
        )
      ).status
    ).toBe(403)
    expect(
      (
        await proxyToProbo(
          request(`${BANNER}/report`, { method: 'POST', body: 'x'.repeat(64 * 1024 + 1) }),
          [BANNER, 'report']
        )
      ).status
    ).toBe(413)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('answers 404 when Probo is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_PROBO_API_URL', '')
    expect((await proxyToProbo(request(`${BANNER}/config`), [BANNER, 'config'])).status).toBe(404)
  })

  it('answers 404 when CookieYes is the selected provider', async () => {
    vi.stubEnv('NEXT_PUBLIC_CONSENT_PROVIDER', 'cookieyes')
    expect((await proxyToProbo(request(`${BANNER}/config`), [BANNER, 'config'])).status).toBe(404)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('answers 502 when Probo is unreachable', async () => {
    upstream.mockRejectedValueOnce(new TypeError('fetch failed'))
    expect((await proxyToProbo(request(`${BANNER}/config`), [BANNER, 'config'])).status).toBe(502)
  })

  it('passes an empty 204 through', async () => {
    upstream.mockResolvedValueOnce(new Response(null, { status: 204 }))
    const res = await proxyToProbo(request(`${BANNER}/report`, { method: 'POST', body: '{}' }), [
      BANNER,
      'report',
    ])
    expect(res.status).toBe(204)
    expect(await res.text()).toBe('')
  })
})
