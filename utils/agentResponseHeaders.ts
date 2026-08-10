import { createHash } from 'node:crypto'

/**
 * Shared response headers for agent-facing plaintext/markdown endpoints
 * (/api/docs-markdown, /api/content-markdown, /api/page-markdown, /llms.txt,
 * /docs/sitemap.md).
 *
 * Vercel strips `s-maxage`/`stale-while-revalidate` from `Cache-Control`
 * before it reaches the client, which previously left a bare `public`. Split
 * the concerns instead:
 * - `Cache-Control` carries the client-visible policy.
 * - `Vercel-CDN-Cache-Control` keeps edge caching + SWR and is consumed (and
 *   stripped) by Vercel's CDN.
 */
export const AGENT_CACHE_CONTROL = 'public, max-age=300, must-revalidate'
export const AGENT_CDN_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export const computeWeakEtag = (body: string): string =>
  `W/"${createHash('sha1').update(body).digest('hex')}"`

/** Weak comparison per RFC 9110: W/"x" matches both W/"x" and "x". */
export const etagMatches = (ifNoneMatch: string | null, etag: string): boolean => {
  if (!ifNoneMatch) return false
  if (ifNoneMatch.trim() === '*') return true

  const opaque = etag.replace(/^W\//, '')
  return ifNoneMatch
    .split(',')
    .map((candidate) => candidate.trim())
    .some((candidate) => candidate === etag || candidate === opaque)
}

export type AgentResponseOptions = {
  /** Defaults to markdown. */
  contentType?: string
  /**
   * Agent representations are exact duplicates of canonical HTML pages;
   * noindex (default) keeps them out of search results without hiding the
   * URLs from crawlers the way robots.txt disallow would.
   */
  noindex?: boolean
  /** Set on negotiated URLs that also serve HTML. */
  varyAccept?: boolean
}

/**
 * Build a cacheable agent response: shared cache headers, a weak ETag, and a
 * 304 short-circuit when the request's If-None-Match matches.
 */
export function agentResponse(
  request: Request | null,
  body: string,
  options: AgentResponseOptions = {}
): Response {
  const {
    contentType = 'text/markdown; charset=utf-8',
    noindex = true,
    varyAccept = false,
  } = options

  const etag = computeWeakEtag(body)
  const headers = new Headers({
    'Cache-Control': AGENT_CACHE_CONTROL,
    'Vercel-CDN-Cache-Control': AGENT_CDN_CACHE_CONTROL,
    ETag: etag,
  })

  if (noindex) {
    headers.set('X-Robots-Tag', 'noindex')
  }

  if (varyAccept) {
    headers.set('Vary', 'Accept')
  }

  if (request && etagMatches(request.headers.get('if-none-match'), etag)) {
    return new Response(null, { status: 304, headers })
  }

  headers.set('Content-Type', contentType)
  return new Response(body, { status: 200, headers })
}
