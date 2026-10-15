import siteMetadata from '@/data/siteMetadata'
import { buildAlgoliaHeaders, buildAlgoliaQueryUrl, getAlgoliaConfig } from '@/utils/algoliaConfig'

export type DocsSearchResult = {
  title: string
  section?: string
  url: string
  markdownUrl: string
  snippet?: string
}

type DocsSearchHit = {
  url?: string
  title?: string
  content?: string | null
  hierarchy?: Record<string, string | null | undefined>
  _snippetResult?: { content?: { value?: string } }
}

export class DocsSearchUnavailableError extends Error {}

// Algolia returns one record per heading, so over-fetch and collapse to pages.
const HITS_PER_RESULT = 4
const MAX_ALGOLIA_HITS = 100
const SNIPPET_WORDS = 40
const SEARCH_REVALIDATE_SECONDS = 300

const HIERARCHY_LEVELS = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6']

const cleanText = (value?: string | null): string | undefined => {
  if (!value) return undefined
  const text = value
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text || undefined
}

/** `/docs/a/b/` → `https://signoz.io/docs/a/b.md` (the URL the site serves markdown at). */
export const toDocsMarkdownUrl = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '')
  return `${siteMetadata.siteUrl}${trimmed === '/docs' ? '/docs/introduction' : trimmed}.md`
}

const parseDocsUrl = (rawUrl: string): URL | null => {
  try {
    const parsed = new URL(rawUrl, siteMetadata.siteUrl)
    return parsed.pathname.startsWith('/docs/') ? parsed : null
  } catch {
    return null
  }
}

const getHitLevels = (hit: DocsSearchHit): string[] =>
  HIERARCHY_LEVELS.map((level) => cleanText(hit.hierarchy?.[level])).filter(
    (value): value is string => Boolean(value)
  )

export const mapDocsSearchHits = (hits: DocsSearchHit[], limit: number): DocsSearchResult[] => {
  const results: DocsSearchResult[] = []
  const seenPages = new Set<string>()

  for (const hit of hits) {
    if (!hit.url) continue
    const parsed = parseDocsUrl(hit.url)
    if (!parsed) continue

    const pagePath = parsed.pathname.replace(/\/+$/, '')
    if (seenPages.has(pagePath)) continue

    const levels = getHitLevels(hit)
    // lvl0 is the docs category; lvl1 is the page title.
    const title = cleanText(hit.title) || levels[1] || levels[0]
    if (!title) continue

    seenPages.add(pagePath)
    const section = levels.length > 2 ? levels[levels.length - 1] : undefined
    const snippet = cleanText(hit._snippetResult?.content?.value) || cleanText(hit.content)

    results.push({
      title,
      ...(section && section !== title ? { section } : {}),
      url: `${siteMetadata.siteUrl}${parsed.pathname}${parsed.hash}`,
      markdownUrl: toDocsMarkdownUrl(parsed.pathname),
      ...(snippet ? { snippet } : {}),
    })

    if (results.length >= limit) break
  }

  return results
}

/** Search the docs Algolia index (the same index the site search uses), docs pages only. */
export async function searchDocsWithAlgolia(
  query: string,
  limit: number
): Promise<DocsSearchResult[]> {
  const config = getAlgoliaConfig()
  if (!config) {
    throw new DocsSearchUnavailableError('Docs search is not configured on this deployment.')
  }

  const response = await fetch(buildAlgoliaQueryUrl(config), {
    method: 'POST',
    headers: buildAlgoliaHeaders(config),
    body: JSON.stringify({
      query,
      hitsPerPage: Math.min(limit * HITS_PER_RESULT, MAX_ALGOLIA_HITS),
      attributesToSnippet: [`content:${SNIPPET_WORDS}`],
      highlightPreTag: '',
      highlightPostTag: '',
    }),
    next: { revalidate: SEARCH_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new DocsSearchUnavailableError(`Docs search failed with HTTP ${response.status}.`)
  }

  const data = (await response.json()) as { hits?: DocsSearchHit[] }
  return mapDocsSearchHits(data.hits || [], limit)
}
