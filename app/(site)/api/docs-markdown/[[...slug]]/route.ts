import { NextResponse } from 'next/server'
import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { buildIntroductionAgentMarkdown } from '@/utils/docs/buildIntroductionAgentMarkdown'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { fetchDocBySlug } from '@/utils/cachedData'
import { agentResponse } from '@/utils/agentResponseHeaders'

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
    return agentResponse(request, buildIntroductionAgentMarkdown(), { varyAccept: true })
  }

  const doc = await fetchDocBySlug(slug)

  if (!doc) {
    return notFoundResponse()
  }

  const markdown = await renderDocMarkdownForAgents(doc)

  return agentResponse(request, markdown, { varyAccept: true })
}
