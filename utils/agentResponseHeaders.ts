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
 *
 * Conditional requests (If-None-Match → 304) are answered by Vercel's edge
 * from the cached response, so the origin only emits the ETag and never
 * handles revalidation itself.
 */
export const AGENT_CACHE_CONTROL = 'public, max-age=300'
export const AGENT_CDN_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export const computeWeakEtag = (body: string): string =>
  `W/"${createHash('sha1').update(body).digest('hex')}"`

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

/** Build a cacheable agent response with shared cache headers and a weak ETag. */
export function agentResponse(body: string, options: AgentResponseOptions = {}): Response {
  const {
    contentType = 'text/markdown; charset=utf-8',
    noindex = true,
    varyAccept = false,
  } = options

  const headers = new Headers({
    'Cache-Control': AGENT_CACHE_CONTROL,
    'Vercel-CDN-Cache-Control': AGENT_CDN_CACHE_CONTROL,
    'Content-Type': contentType,
    ETag: computeWeakEtag(body),
  })

  if (noindex) {
    headers.set('X-Robots-Tag', 'noindex')
  }

  if (varyAccept) {
    headers.set('Vary', 'Accept')
  }

  return new Response(body, { status: 200, headers })
}
