import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { getDocsRouteTree } from '@/utils/docs/agentDiscovery'
import {
  buildLlmsTxt,
  docsSlugFromRoute,
  type DocDescriptionLookup,
} from '@/utils/docs/buildLlmsTxt'
import { fetchAllDocsForPage } from '@/utils/cachedData'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

/**
 * Descriptions live in the docs content; the nav only carries labels. A failure
 * here degrades to a map without descriptions rather than to no map at all.
 */
const getDocDescriptions = async (): Promise<DocDescriptionLookup | undefined> => {
  try {
    const docs = await fetchAllDocsForPage()
    const lookup: DocDescriptionLookup = new Map()

    docs.forEach((doc: { slug?: string; description?: string }) => {
      if (!doc?.slug || !doc?.description) return
      lookup.set(docsSlugFromRoute(`/docs/${doc.slug}`), doc.description)
    })

    return lookup
  } catch (error) {
    console.warn('llms.txt: could not load doc descriptions, serving map without them:', error)
    return undefined
  }
}

export async function GET() {
  const [tree, descriptions] = await Promise.all([getDocsRouteTree(), getDocDescriptions()])

  const body = buildLlmsTxt({
    siteUrl: siteMetadata.siteUrl,
    tree,
    descriptions,
  })

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
