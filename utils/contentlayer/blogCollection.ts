// Blog collection utilities - updated for custom content pipeline
import { readContentJson, readContentJsonSync, readContentDocument } from './contentLoader'
import type { Blog, BlogMeta } from '@/types/content'

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
        return await readContentDocument<Blog>(`Blog/${m.slug}`)
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
    return await readContentDocument<Blog>(`Blog/${slug}`)
  } catch {
    return undefined
  }
}
