import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { buildIntroductionAgentMarkdown } from '@/utils/docs/buildIntroductionAgentMarkdown'
import { fetchDocBySlug } from '@/utils/cachedData'

/**
 * Agent markdown for one docs page, exactly as served at /docs/<slug>.md.
 * Returns null when the page does not exist.
 */
export async function getDocMarkdownBySlug(slug: string): Promise<string | null> {
  if (slug === 'introduction') {
    return buildIntroductionAgentMarkdown()
  }

  const doc = await fetchDocBySlug(slug)
  if (!doc) {
    return null
  }

  return renderDocMarkdownForAgents(doc)
}
