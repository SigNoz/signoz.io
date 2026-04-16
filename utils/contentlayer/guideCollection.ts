import type { Guide } from '../../.contentlayer/generated/types'

export type GuideMeta = Omit<Guide, 'body' | '_raw'>

let guidesMetaPromise: Promise<GuideMeta[]> | null = null
let guidesFullPromise: Promise<Guide[]> | null = null

/**
 * Load lightweight guide metadata for listings.
 * ~3MB instead of ~54MB
 */
export async function getAllGuidesMeta(): Promise<GuideMeta[]> {
  if (!guidesMetaPromise) {
    guidesMetaPromise = import('../../.contentlayer/generated/Guide/_index-meta.json')
      .then((module) => module.default as GuideMeta[])
      .catch(() => {
        console.warn('Guide _index-meta.json not found, falling back to full index')
        return getAllGuides() as Promise<GuideMeta[]>
      })
  }
  return guidesMetaPromise
}

/**
 * Load full guides. Only use in generateStaticParams.
 */
export async function getAllGuides(): Promise<Guide[]> {
  if (!guidesFullPromise) {
    guidesFullPromise = import('../../.contentlayer/generated/Guide/_index.json').then(
      (module) => module.default as Guide[]
    )
  }
  return guidesFullPromise
}

/**
 * Load a single guide by slug.
 * Uses full index lookup (only runs at build time via generateStaticParams).
 */
export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const guides = await getAllGuides()
  return guides.find((guide) => guide.slug === slug)
}
