import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import {
  AGENT_MARKDOWN_SELF_FETCH_HEADER,
  shouldRewritePageToMarkdown,
} from '@/utils/agentMarkdownRouting'
import { slugFromParams } from '@/utils/docs/markdownRouting'
import { renderPageHtmlToAgentMarkdown } from '@/utils/pageHtmlToMarkdown'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function generateStaticParams() {
  return []
}

const notFoundResponse = () =>
  new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })

const isLocalHost = (host: string): boolean =>
  host === 'localhost' || host === '127.0.0.1' || host.startsWith('localhost:')

/**
 * Resolve the origin to self-fetch from. The incoming host is only trusted
 * when it is one of our own deployments; anything else falls back to the
 * canonical site URL so a spoofed Host header cannot point the fetch at an
 * arbitrary server.
 */
const resolveSelfOrigin = (request: Request): string => {
  const canonicalHost = new URL(siteMetadata.siteUrl).host
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host

  if (isLocalHost(host)) {
    return `http://${host}`
  }

  if (host === canonicalHost || host === `www.${canonicalHost}` || host.endsWith('.vercel.app')) {
    return `https://${host}`
  }

  return siteMetadata.siteUrl
}

export async function GET(request: Request, props: { params: Promise<{ path?: string[] }> }) {
  // Belt and braces: the self-fetch sends Accept: text/html so the proxy never
  // rewrites it, but bail out if a crafted request slips through anyway.
  if (request.headers.get(AGENT_MARKDOWN_SELF_FETCH_HEADER)) {
    return notFoundResponse()
  }

  const pagePath = slugFromParams((await props.params).path || [])
  const pathname = pagePath ? `/${pagePath}` : '/'

  // Direct calls bypass the proxy: only serve paths the proxy would rewrite.
  if (!shouldRewritePageToMarkdown(pathname, true)) {
    return notFoundResponse()
  }

  const origin = resolveSelfOrigin(request)
  const targetUrl = pathname === '/' ? `${origin}/` : `${origin}${pathname}/`

  let htmlResponse: Response
  try {
    htmlResponse = await fetch(targetUrl, {
      headers: {
        Accept: 'text/html',
        [AGENT_MARKDOWN_SELF_FETCH_HEADER]: '1',
        // Forward cookies so protected preview deployments can self-fetch.
        ...(request.headers.get('cookie') ? { cookie: request.headers.get('cookie')! } : {}),
      },
      redirect: 'follow',
      cache: 'no-store',
    })
  } catch (error) {
    console.error(`Page markdown self-fetch failed for "${pathname}":`, error)
    return notFoundResponse()
  }

  const finalHost = new URL(htmlResponse.url || targetUrl).host
  const contentType = htmlResponse.headers.get('content-type') || ''

  if (
    !htmlResponse.ok ||
    finalHost !== new URL(origin).host ||
    !contentType.includes('text/html')
  ) {
    return notFoundResponse()
  }

  const markdown = await renderPageHtmlToAgentMarkdown(await htmlResponse.text(), {
    fallbackCanonicalUrl: `${siteMetadata.siteUrl}${pathname === '/' ? '/' : `${pathname}/`}`,
  })

  if (!markdown) {
    return notFoundResponse()
  }

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
      Vary: 'Accept',
    },
  })
}
