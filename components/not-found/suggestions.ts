import {
  ALGOLIA_CANDIDATE_LIMIT,
  ALGOLIA_SUGGESTIONS_REVALIDATE_SECONDS,
  QUICK_LINK_FALLBACK,
} from './constants'
import { rerankSuggestions, tokenizePathForSuggestions } from './rerank'
import type { AlgoliaHit, SuggestedDoc } from './types'
import {
  buildAlgoliaHeaders,
  buildAlgoliaQueryUrl,
  getAlgoliaConfig,
  hasAlgoliaConfig,
} from '@/utils/algoliaConfig'

export { hasAlgoliaConfig }

const getTitleFromHit = (hit: AlgoliaHit): string | null => {
  return (
    hit.title ||
    hit.hierarchy?.lvl3 ||
    hit.hierarchy?.lvl2 ||
    hit.hierarchy?.lvl1 ||
    hit.hierarchy?.lvl0 ||
    null
  )
}

const toDocsHref = (url: string): string | null => {
  try {
    const parsed = new URL(url, 'https://signoz.io')
    const pathname = decodeURIComponent(parsed.pathname)
    if (!pathname.startsWith('/docs/')) {
      return null
    }
    return `${pathname}${parsed.hash}`
  } catch {
    return null
  }
}

const dedupeByHref = (docs: SuggestedDoc[]): SuggestedDoc[] => {
  const seen = new Set<string>()

  return docs.filter((doc) => {
    if (seen.has(doc.href)) {
      return false
    }

    seen.add(doc.href)
    return true
  })
}

export const getNotFoundSuggestions = async (
  pathname: string,
  count = 3
): Promise<SuggestedDoc[]> => {
  const algoliaConfig = getAlgoliaConfig()
  if (!algoliaConfig) {
    return QUICK_LINK_FALLBACK.slice(0, count)
  }

  const tokens = tokenizePathForSuggestions(pathname)
  const query = tokens.join(' ').trim()

  if (!query) {
    return QUICK_LINK_FALLBACK.slice(0, count)
  }

  try {
    const response = await fetch(buildAlgoliaQueryUrl(algoliaConfig), {
      method: 'POST',
      headers: buildAlgoliaHeaders(algoliaConfig),
      body: JSON.stringify({
        query,
        hitsPerPage: ALGOLIA_CANDIDATE_LIMIT,
      }),
      next: { revalidate: ALGOLIA_SUGGESTIONS_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      return QUICK_LINK_FALLBACK.slice(0, count)
    }

    const data = (await response.json()) as { hits?: AlgoliaHit[] }
    const hits = data.hits || []

    const fromAlgolia = hits
      .map((hit): SuggestedDoc | null => {
        if (!hit.url) return null
        const href = toDocsHref(hit.url)
        const title = getTitleFromHit(hit)
        if (!href || !title) return null
        return { href, title }
      })
      .filter((doc): doc is SuggestedDoc => doc !== null)

    const reranked = rerankSuggestions(dedupeByHref(fromAlgolia), tokens)
    return dedupeByHref([...reranked, ...QUICK_LINK_FALLBACK]).slice(0, count)
  } catch (e) {
    console.error(`Failed to send request to Algolia: `, e)

    return QUICK_LINK_FALLBACK.slice(0, count)
  }
}
