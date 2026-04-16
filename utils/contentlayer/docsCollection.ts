import type { Doc } from '../../.contentlayer/generated/types'

export type DocMeta = Omit<Doc, 'body' | '_raw'>

let docsMetaPromise: Promise<DocMeta[]> | null = null
let docsFullPromise: Promise<Doc[]> | null = null

/**
 * Load lightweight doc metadata for listings/search.
 * ~4MB instead of ~75MB
 */
export async function getAllDocsMeta(): Promise<DocMeta[]> {
  if (!docsMetaPromise) {
    docsMetaPromise = import('../../.contentlayer/generated/Doc/_index-meta.json')
      .then((module) => module.default as DocMeta[])
      .catch(() => {
        console.warn('Doc _index-meta.json not found, falling back to full index')
        return getAllDocs() as Promise<DocMeta[]>
      })
  }
  return docsMetaPromise
}

/**
 * Load full docs. Only use in generateStaticParams.
 */
export async function getAllDocs(): Promise<Doc[]> {
  if (!docsFullPromise) {
    docsFullPromise = import('../../.contentlayer/generated/Doc/_index.json').then(
      (module) => module.default as Doc[]
    )
  }
  return docsFullPromise
}

/**
 * Load a single doc by slug.
 * Uses full index lookup (only runs at build time via generateStaticParams).
 */
export async function getDocBySlug(slug: string): Promise<Doc | undefined> {
  const docs = await getAllDocs()
  return docs.find((doc) => doc.slug === slug)
}
