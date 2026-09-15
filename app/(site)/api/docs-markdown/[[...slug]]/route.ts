import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { buildIntroductionAgentMarkdown } from '@/utils/docs/buildIntroductionAgentMarkdown'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { fetchDocBySlug } from '@/utils/cachedData'
import { agentResponse, agentNotFoundResponse } from '@/utils/agentResponseHeaders'

export async function generateStaticParams() {
  return []
}

const notFoundResponse = agentNotFoundResponse

export async function GET(_: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const slug = resolveDocsMarkdownSlug(params.slug)

  if (slug === 'introduction') {
    return agentResponse(buildIntroductionAgentMarkdown(), { varyAccept: true })
  }

  const doc = await fetchDocBySlug(slug)

  if (!doc) {
    return notFoundResponse(`/docs/${slug}`)
  }

  const markdown = await renderDocMarkdownForAgents(doc)

  return agentResponse(markdown, { varyAccept: true })
}
