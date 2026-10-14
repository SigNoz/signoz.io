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

/**
 * Agent-facing 404 body. Plain "Not Found" text tells an agent nothing about
 * where to go next, so every markdown endpoint answers a miss with a short
 * markdown document pointing at the discovery surfaces instead.
 */
export function buildAgentNotFoundMarkdown(pathname?: string): string {
  const target = pathname ? `\`${pathname}\`` : 'That path'

  return [
    '# 404 Not Found',
    '',
    `${target} does not exist on signoz.io.`,
    '',
    'Where to look next:',
    '',
    '- [llms.txt](https://signoz.io/llms.txt): index of the docs, markdown endpoints, and agent tooling.',
    '- [Docs](https://signoz.io/docs/introduction/): documentation home.',
    '- [Docs sitemap (markdown)](https://signoz.io/docs/sitemap.md): every documentation page.',
    '- [sitemap.xml](https://signoz.io/sitemap.xml): every indexable URL on the site.',
    '- [openapi.json](https://signoz.io/openapi.json): OpenAPI specification for the SigNoz API.',
    '',
    'Append `.md` to any signoz.io page URL, or send `Accept: text/markdown`, to read the markdown representation of that page.',
    '',
  ].join('\n')
}

/** 404 with a markdown body so agents can recover instead of dead-ending. */
export function agentNotFoundResponse(pathname?: string): Response {
  return new Response(buildAgentNotFoundMarkdown(pathname), {
    status: 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}
