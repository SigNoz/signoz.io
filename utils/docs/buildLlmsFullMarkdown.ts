import siteMetadata from '@/data/siteMetadata'
import { fetchAllDocsForPage } from '@/utils/cachedData'
import { getDocsRouteList, INTRO_DESCRIPTION } from './agentDiscovery'
import {
  buildIntroductionSectionsMarkdown,
  INTRO_MARKDOWN_TITLE,
} from './buildIntroductionAgentMarkdown'
import { buildMarkdownDocument } from './buildMarkdownDocument'
import { INTRODUCTION_SLUG, isListedDoc } from './listedDocs'
import { renderDocMarkdownForAgents } from './renderDocMarkdownForAgents'

export type LlmsFullDoc = {
  slug: string
  title: string
  description?: string
  draft?: boolean
  body: { raw: string }
}

// MDX compilation is CPU-bound; a small pool keeps the CMS-independent work
// overlapped without holding every compiled tree in memory at once.
const RENDER_CONCURRENCY = 8

const pageUrl = (slug: string): string => `${siteMetadata.siteUrl}/docs/${slug}/`
const pageMarkdownUrl = (slug: string): string => `${siteMetadata.siteUrl}/docs/${slug}.md`

const pageSection = (slug: string, markdown: string): string =>
  [`Source: ${pageUrl(slug)}`, `Markdown: ${pageMarkdownUrl(slug)}`, '', markdown].join('\n')

const renderIntroduction = (): string =>
  buildMarkdownDocument({
    title: INTRO_MARKDOWN_TITLE,
    description: INTRO_DESCRIPTION,
    bodyMarkdown: buildIntroductionSectionsMarkdown(),
    includeLlmsDirective: false,
  })

const renderDoc = (doc: LlmsFullDoc): Promise<string> =>
  // Tags are dropped: the docs list query does not fetch them, so the
  // renderer would otherwise print the transform's default tags for every page.
  renderDocMarkdownForAgents(
    { slug: doc.slug, title: doc.title, description: doc.description, body: doc.body },
    { footerLines: [], includeLlmsDirective: false }
  )

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const index = next++
      results[index] = await fn(items[index])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

/**
 * Orders docs by their position in the docs sidebar; docs missing from the
 * sidebar follow in slug order so the output stays deterministic.
 */
export const orderDocsBySidebar = (docs: LlmsFullDoc[], routeOrder: string[]): LlmsFullDoc[] => {
  const position = new Map(routeOrder.map((route, index) => [route, index]))
  const rank = (doc: LlmsFullDoc) => position.get(`/docs/${doc.slug}`) ?? Number.POSITIVE_INFINITY

  return [...docs].sort((a, b) => rank(a) - rank(b) || a.slug.localeCompare(b.slug))
}

/** Builds the corpus from already-fetched docs; separated from I/O for tests. */
export async function buildLlmsFullMarkdownFromDocs(
  docs: LlmsFullDoc[],
  routeOrder: string[] = []
): Promise<string> {
  const listed = orderDocsBySidebar(
    docs.filter((doc) => isListedDoc(doc) && doc.slug.length > 0 && Boolean(doc.title)),
    routeOrder
  )
  const rendered = await mapWithConcurrency(listed, RENDER_CONCURRENCY, renderDoc)

  const header = [
    '# SigNoz Documentation',
    '',
    `> The full text of every SigNoz documentation page (${listed.length + 1} pages) in one markdown file, ordered like the docs sidebar. For the curated index, see ${siteMetadata.siteUrl}/llms.txt. Each page's own markdown is available by appending \`.md\` to its URL.`,
    '',
    `Blog posts, guides, comparisons, and product pages are not included. Their markdown indexes: ${siteMetadata.siteUrl}/blogs/sitemap.md, ${siteMetadata.siteUrl}/products/sitemap.md, ${siteMetadata.siteUrl}/alternatives/sitemap.md, ${siteMetadata.siteUrl}/corporate/sitemap.md.`,
  ].join('\n')

  const sections = [
    pageSection(INTRODUCTION_SLUG, renderIntroduction()),
    ...listed.map((doc, index) => pageSection(doc.slug, rendered[index])),
  ]

  return `${[header, ...sections].join('\n\n---\n\n')}\n`
}

export async function buildLlmsFullMarkdown(): Promise<string> {
  const [docs, routeList] = await Promise.all([fetchAllDocsForPage(), getDocsRouteList()])

  // Fail the prerender (or regeneration) rather than publish an empty corpus;
  // a failed regeneration keeps serving the last good copy.
  if (docs.length === 0) {
    throw new Error('llms-full.txt: docs list is empty, refusing to publish an empty corpus')
  }

  return buildLlmsFullMarkdownFromDocs(
    docs as LlmsFullDoc[],
    routeList.map((item) => item.route)
  )
}
