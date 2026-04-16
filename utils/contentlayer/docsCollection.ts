// Docs collection utilities - updated for custom content pipeline

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
}

let docsMetaPromise: Promise<DocMeta[]> | null = null

/**
 * Load lightweight doc metadata for listings/search.
 */
export async function getAllDocsMeta(): Promise<DocMeta[]> {
  if (!docsMetaPromise) {
    docsMetaPromise = import('../../.content/Doc/meta.json').then(
      (module) => module.default as DocMeta[]
    )
  }
  return docsMetaPromise
}

/**
 * Load full docs. Only use in generateStaticParams.
 */
export async function getAllDocs(): Promise<Doc[]> {
  const meta = await getAllDocsMeta()
  const docs = await Promise.all(
    meta.map(async (m) => {
      try {
        const mod = await import(`../../.content/Doc/${m.slug}.json`)
        return mod.default as Doc
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
    const mod = await import(`../../.content/Doc/${slug}.json`)
    return mod.default as Doc
  } catch {
    return undefined
  }
}
