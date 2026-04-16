// Blog collection utilities - updated for custom content pipeline
// Type will be generated at .content/generated/types.d.ts
import { readContentJson, readContentJsonSync } from './contentLoader'

// Lightweight metadata type (no body/code)
export interface BlogMeta {
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
  images?: string[]
  authors: string[]
  readingTime: { minutes: number; words: number; text: string }
  draft?: boolean
  excludeFromSitemap?: boolean
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

export interface RelatedArticle {
  title: string
  url: string
  publishedOn: string
  slug?: string
  date?: string
}

export interface Blog extends BlogMeta {
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
  is_newsroom?: boolean
  relatedArticles?: RelatedArticle[]
}

// Production-only cache (dev mode always reads fresh)
let blogsMetaCache: BlogMeta[] | null = null

/**
 * Load lightweight blog metadata for listings.
 * Use this for blog listings, pagination, search, etc.
 */
export async function getAllBlogsMeta(): Promise<BlogMeta[]> {
  if (process.env.NODE_ENV === 'production' && blogsMetaCache) {
    return blogsMetaCache
  }
  const data = await readContentJson<BlogMeta[]>('Blog/meta.json')
  if (process.env.NODE_ENV === 'production') {
    blogsMetaCache = data
  }
  return data
}

/**
 * Sync version for use in synchronous contexts.
 */
export function getAllBlogsMetaSync(): BlogMeta[] {
  if (process.env.NODE_ENV === 'production' && blogsMetaCache) {
    return blogsMetaCache
  }
  const data = readContentJsonSync<BlogMeta[]>('Blog/meta.json')
  if (process.env.NODE_ENV === 'production') {
    blogsMetaCache = data
  }
  return data
}

/**
 * Load full blog data. Loads all individual files.
 * WARNING: Only use in generateStaticParams (build-time only).
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const meta = await getAllBlogsMeta()
  const blogs = await Promise.all(
    meta.map(async (m) => {
      try {
        return await readContentJson<Blog>(`Blog/${m.slug}.json`)
      } catch {
        console.warn(`Failed to load blog: ${m.slug}`)
        return null
      }
    })
  )
  return blogs.filter((b): b is Blog => b !== null)
}

/**
 * Load a single blog post by slug.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    return await readContentJson<Blog>(`Blog/${slug}.json`)
  } catch {
    return undefined
  }
}
