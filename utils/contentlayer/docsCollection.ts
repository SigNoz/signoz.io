// Docs collection utilities - updated for custom content pipeline
import { readContentJson, readContentJsonSync, readContentDocument } from './contentLoader'
import type { Doc, DocMeta } from '@/types/content'

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
        return await readContentDocument<Doc>(`Doc/${m.slug}`)
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
    return await readContentDocument<Doc>(`Doc/${slug}`)
  } catch {
    return undefined
  }
}
