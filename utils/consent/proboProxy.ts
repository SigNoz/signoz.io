import { getConsentProvider, getProboSettings } from './provider'

const FORWARDED_REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'user-agent',
  'x-sdk-version',
]
const MAX_BODY_BYTES = 64 * 1024
const UPSTREAM_TIMEOUT_MS = 8000

const clientIp = (headers: Headers) =>
  headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip')?.trim() || null

const forwardedFor = (ip: string) => (ip.includes(':') ? `for="[${ip}]"` : `for=${ip}`)

const plain = (status: number) =>
  new Response(null, { status, headers: { 'cache-control': 'no-store' } })

export async function proxyToProbo(request: Request, path: string[]): Promise<Response> {
  const { bannerId, apiUrl } = getProboSettings()
  if (getConsentProvider() !== 'probo' || !bannerId || !apiUrl || path[0] !== bannerId) {
    return plain(404)
  }

  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite && fetchSite !== 'same-origin') return plain(403)

  const headers = new Headers()
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  const ip = clientIp(request.headers)
  if (ip) headers.set('forwarded', forwardedFor(ip))

  let body: string | undefined
  if (request.method === 'POST') {
    body = await request.text()
    if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return plain(413)
  }

  const { search } = new URL(request.url)
  const upstream = `${apiUrl.replace(/\/$/, '')}/api/cookie-banner/v1/${path.map(encodeURIComponent).join('/')}${search}`

  let response: Response
  try {
    response = await fetch(upstream, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch {
    return plain(502)
  }

  const responseHeaders = new Headers({ 'cache-control': 'no-store' })
  const contentType = response.headers.get('content-type')
  if (contentType) responseHeaders.set('content-type', contentType)
  const responseBody = response.status === 204 ? null : await response.arrayBuffer()
  return new Response(responseBody, { status: response.status, headers: responseHeaders })
}
