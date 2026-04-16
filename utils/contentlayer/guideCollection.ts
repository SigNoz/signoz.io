// Guide collection utilities - updated for custom content pipeline

export interface GuideMeta {
  title: string
  date: string
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
}

let guidesMetaPromise: Promise<GuideMeta[]> | null = null

/**
 * Load lightweight guide metadata for listings.
 */
export async function getAllGuidesMeta(): Promise<GuideMeta[]> {
  if (!guidesMetaPromise) {
    guidesMetaPromise = import('../../.content/Guide/meta.json').then(
      (module) => module.default as GuideMeta[]
    )
  }
  return guidesMetaPromise
}

/**
 * Load full guides. Only use in generateStaticParams.
 */
export async function getAllGuides(): Promise<Guide[]> {
  const meta = await getAllGuidesMeta()
  const guides = await Promise.all(
    meta.map(async (m) => {
      try {
        const mod = await import(`../../.content/Guide/${m.slug}.json`)
        return mod.default as Guide
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
    const mod = await import(`../../.content/Guide/${slug}.json`)
    return mod.default as Guide
  } catch {
    return undefined
  }
}
