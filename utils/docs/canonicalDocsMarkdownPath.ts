import siteMetadata from '@/data/siteMetadata'
import { servesMarkdownAlternate } from '@/utils/agentMarkdownRouting'

/**
 * Docs redirects live in next.config.js and are applied by Next before
 * middleware runs. A markdown request never benefits from them: the proxy
 * rewrites `/docs/<slug>.md` straight to the docs markdown API, so a legacy
 * slug that resolves fine as HTML 404s as markdown.
 *
 * Rather than duplicate several hundred redirect rules here, ask the site
 * itself where the HTML page went and reuse the answer. Only runs when the slug
 * misses, so the happy path pays nothing.
 */

// Trailing-slash normalisation costs a hop of its own, so allow headroom
// beyond the one or two real redirects a chain usually has.
const MAX_HOPS = 5

const REDIRECT_STATUSES = new Set([301, 302, 307, 308])

const isLocalHost = (host: string): boolean =>
  host === 'localhost' || host === '127.0.0.1' || host.startsWith('localhost:')

/** Deployment hosts whose redirect rules we trust as our own. */
const trustedHosts = (): Set<string> => {
  const canonical = new URL(siteMetadata.siteUrl).host
  return new Set([canonical, `www.${canonical}`, 'staging.signoz.io', 'signoz-web.vercel.app'])
}

/**
 * Origin to self-fetch from. The incoming host is only trusted when it is one
 * of our own deployments, so a spoofed Host header cannot point the lookup at
 * an arbitrary server. Staging is included deliberately: resolving its
 * redirects against production would answer with rules staging does not have.
 */
const resolveSelfOrigin = (request: Request): string => {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host

  if (isLocalHost(host)) {
    return `http://${host}`
  }

  const isPreviewHost = host.startsWith('signoz-web-') && host.endsWith('.vercel.app')

  if (trustedHosts().has(host) || isPreviewHost) {
    return `https://${host}`
  }

  return siteMetadata.siteUrl
}

const stripTrailingSlash = (pathname: string): string => pathname.replace(/\/+$/, '') || '/'

const headOrNull = (url: string): Promise<Response | null> =>
  fetch(url, {
    method: 'HEAD',
    headers: { Accept: 'text/html' },
    redirect: 'manual',
    cache: 'no-store',
  }).catch(() => null)

/**
 * The markdown URL for a path the redirect chain landed on. Docs paths and any
 * other page with a markdown twin get `.md`; anything else resolves to the page
 * itself, which beats 404-ing a URL the site still serves.
 */
const markdownPathFor = (pathname: string): string => {
  const normalized = stripTrailingSlash(pathname)

  if (normalized === '/docs' || normalized.startsWith('/docs/')) {
    return `${normalized}.md`
  }

  return servesMarkdownAlternate(normalized) ? `${normalized}.md` : normalized
}

/**
 * Follow the HTML redirect chain for a docs slug and return the URL a markdown
 * request should be sent to, or null when nothing moves it. Redirects that
 * leave the docs tree are preserved rather than dropped.
 */
export async function resolveCanonicalDocsMarkdownPath(
  request: Request,
  slug: string
): Promise<string | null> {
  const origin = resolveSelfOrigin(request)
  const start = `/docs/${slug}`
  // Raw pathnames, so a trailing-slash hop is followed rather than mistaken
  // for a cycle. Only a genuine repeat stops the walk.
  const seen = new Set<string>([start])
  let current = start

  for (let hop = 0; hop < MAX_HOPS; hop += 1) {
    const response = await headOrNull(`${origin}${current}`)
    const location = response?.headers.get('location')

    if (!response || !REDIRECT_STATUSES.has(response.status) || !location) break

    let target: URL
    try {
      target = new URL(location, origin)
    } catch {
      break
    }

    // No /docs/ redirect leaves the origin today. If one ever does, send the
    // client off-site rather than keeping the path and serving it as ours.
    if (target.origin !== new URL(origin).origin) return target.toString()

    const next = target.pathname
    if (seen.has(next)) break
    seen.add(next)
    current = next
  }

  return stripTrailingSlash(current) === stripTrailingSlash(start) ? null : markdownPathFor(current)
}
