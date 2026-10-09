import { cacheLife } from 'next/cache'
import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { buildIntroductionAgentMarkdown } from '@/utils/docs/buildIntroductionAgentMarkdown'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { fetchDocBySlug, fetchAllDocsIndex } from '@/utils/cachedData'
import { agentResponse } from '@/utils/agentResponseHeaders'

export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

// Caps the 404 entry's ISR lifetime at 10 minutes (route TTL = min across executed caches).
async function markNotFoundCacheWindow() {
  'use cache'
  cacheLife({ revalidate: 600 })
  return true
}

const notFoundResponse = async () => {
  await markNotFoundCacheWindow()
  return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}

export async function GET(_: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const slug = resolveDocsMarkdownSlug(params.slug)

  if (slug === 'introduction') {
    return agentResponse(buildIntroductionAgentMarkdown(), {
      varyAccept: true,
      cacheControlledByIsr: true,
    })
  }

  const doc = await fetchDocBySlug(slug)

  if (!doc) {
    // Throw (never cached) instead of baking a 404 over a good entry when the
    // CMS lookup failed transiently; an empty index means the slug is unverifiable.
    const index = await fetchAllDocsIndex()
    const isKnownDoc = index.some((entry) => entry.slug === slug)
    if (isKnownDoc || index.length === 0) {
      throw new Error(`docs-markdown: content lookup failed for slug "${slug}"`)
    }
    return notFoundResponse()
  }

  const markdown = await renderDocMarkdownForAgents(doc)

  return agentResponse(markdown, { varyAccept: true, cacheControlledByIsr: true })
}
