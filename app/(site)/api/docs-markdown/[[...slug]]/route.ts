import { NextResponse } from 'next/server'
import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { buildIntroductionAgentMarkdown } from '@/utils/docs/buildIntroductionAgentMarkdown'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { fetchDocBySlug } from '@/utils/cachedData'
import { agentResponse } from '@/utils/agentResponseHeaders'
import { resolveCanonicalDocsMarkdownPath } from '@/utils/docs/canonicalDocsMarkdownPath'

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

export async function GET(request: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const slug = resolveDocsMarkdownSlug(params.slug)

  if (slug === 'introduction') {
    return agentResponse(buildIntroductionAgentMarkdown(), { varyAccept: true })
  }

  const doc = await fetchDocBySlug(slug)

  if (!doc) {
    // Legacy slugs redirect as HTML but reach this API unresolved, so mirror
    // the HTML redirect instead of 404-ing a URL the site still serves.
    const canonical = await resolveCanonicalDocsMarkdownPath(request, slug)
    if (canonical) {
      return Response.redirect(new URL(canonical, request.url), 308)
    }

    return notFoundResponse()
  }

  const markdown = await renderDocMarkdownForAgents(doc)

  return agentResponse(markdown, { varyAccept: true })
}
