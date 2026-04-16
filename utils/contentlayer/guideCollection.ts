// Guide collection utilities - updated for custom content pipeline
import { readContentJson, readContentJsonSync } from './contentLoader'

export interface GuideMeta {
  title: string
  date: string
  lastmod?: string
  tags: string[]
  slug: string
  path: string
  filePath: string
  summary?: string
  description?: string
  image?: string
  authors?: string[]
  readingTime: { minutes: number; words: number; text: string }
  draft?: boolean
}

export interface TocItem {
  url: string
  depth: number
  value: string
}

export interface StructuredData {
  '@type'?: string
  '@context'?: string
  mainEntityOfPage?: { '@type'?: string; '@id'?: string }
  url?: string
  [key: string]: unknown
}

export interface Guide extends GuideMeta {
  body: {
    raw: string
    code: string
  }
  _file: {
    path: string
    directory: string
    name: string
  }
  toc: TocItem[]
  structuredData?: StructuredData
  layout?: string
}

// Production-only cache (dev mode always reads fresh)
let guidesMetaCache: GuideMeta[] | null = null

/**
 * Load lightweight guide metadata for listings.
 */
export async function getAllGuidesMeta(): Promise<GuideMeta[]> {
  if (process.env.NODE_ENV === 'production' && guidesMetaCache) {
    return guidesMetaCache
  }
  const data = await readContentJson<GuideMeta[]>('Guide/meta.json')
  if (process.env.NODE_ENV === 'production') {
    guidesMetaCache = data
  }
  return data
}

/**
 * Sync version for use in synchronous contexts.
 */
export function getAllGuidesMetaSync(): GuideMeta[] {
  if (process.env.NODE_ENV === 'production' && guidesMetaCache) {
    return guidesMetaCache
  }
  const data = readContentJsonSync<GuideMeta[]>('Guide/meta.json')
  if (process.env.NODE_ENV === 'production') {
    guidesMetaCache = data
  }
  return data
}

/**
 * Load full guides. Only use in generateStaticParams.
 */
export async function getAllGuides(): Promise<Guide[]> {
  const meta = await getAllGuidesMeta()
  const guides = await Promise.all(
    meta.map(async (m) => {
      try {
        return await readContentJson<Guide>(`Guide/${m.slug}.json`)
      } catch {
        console.warn(`Failed to load guide: ${m.slug}`)
        return null
      }
    })
  )
  return guides.filter((g): g is Guide => g !== null)
}

/**
 * Load a single guide by slug.
 */
export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  try {
    return await readContentJson<Guide>(`Guide/${slug}.json`)
  } catch {
    return undefined
  }
}
