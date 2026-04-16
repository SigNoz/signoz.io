// Docs collection utilities - updated for custom content pipeline
import { readContentJson, readContentJsonSync } from './contentLoader'

export interface DocMeta {
  title: string
  id: string
  slug: string
  path: string
  filePath: string
  description?: string
  summary?: string
  tags?: string[]
  docTags: string[]
  readingTime: { minutes: number; words: number; text: string }
  draft?: boolean
  sidebar_label?: string
  date?: string
  lastmod?: string
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

export interface Doc extends DocMeta {
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
  hide_table_of_contents?: boolean
}

// Production-only cache (dev mode always reads fresh)
let docsMetaCache: DocMeta[] | null = null

/**
 * Load lightweight doc metadata for listings/search.
 */
export async function getAllDocsMeta(): Promise<DocMeta[]> {
  if (process.env.NODE_ENV === 'production' && docsMetaCache) {
    return docsMetaCache
  }
  const data = await readContentJson<DocMeta[]>('Doc/meta.json')
  if (process.env.NODE_ENV === 'production') {
    docsMetaCache = data
  }
  return data
}

/**
 * Sync version for use in synchronous contexts.
 */
export function getAllDocsMetaSync(): DocMeta[] {
  if (process.env.NODE_ENV === 'production' && docsMetaCache) {
    return docsMetaCache
  }
  const data = readContentJsonSync<DocMeta[]>('Doc/meta.json')
  if (process.env.NODE_ENV === 'production') {
    docsMetaCache = data
  }
  return data
}

/**
 * Load full docs. Only use in generateStaticParams.
 */
export async function getAllDocs(): Promise<Doc[]> {
  const meta = await getAllDocsMeta()
  const docs = await Promise.all(
    meta.map(async (m) => {
      try {
        return await readContentJson<Doc>(`Doc/${m.slug}.json`)
      } catch {
        console.warn(`Failed to load doc: ${m.slug}`)
        return null
      }
    })
  )
  return docs.filter((d): d is Doc => d !== null)
}

/**
 * Load a single doc by slug.
 */
export async function getDocBySlug(slug: string): Promise<Doc | undefined> {
  try {
    return await readContentJson<Doc>(`Doc/${slug}.json`)
  } catch {
    return undefined
  }
}
