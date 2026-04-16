import type { Blog } from '../../.contentlayer/generated/types'

// Lightweight metadata type (no body/code)
export type BlogMeta = Omit<Blog, 'body' | '_raw'>

let blogsMetaPromise: Promise<BlogMeta[]> | null = null
let blogsFullPromise: Promise<Blog[]> | null = null

/**
 * Load lightweight blog metadata for listings.
 * Use this for blog listings, pagination, search, etc.
 * ~2.5MB instead of ~48MB
 */
export async function getAllBlogsMeta(): Promise<BlogMeta[]> {
  if (!blogsMetaPromise) {
    blogsMetaPromise = import('../../.contentlayer/generated/Blog/_index-meta.json')
      .then((module) => module.default as BlogMeta[])
      .catch(() => {
        // Fallback to full index if meta doesn't exist yet
        console.warn('Blog _index-meta.json not found, falling back to full index')
        return getAllBlogs() as Promise<BlogMeta[]>
      })
  }
  return blogsMetaPromise
}

/**
 * Load full blog data. Only use in generateStaticParams (build-time only).
 * WARNING: This imports 48MB - never use in page components!
 */
export async function getAllBlogs(): Promise<Blog[]> {
  if (!blogsFullPromise) {
    blogsFullPromise = import('../../.contentlayer/generated/Blog/_index.json').then(
      (module) => module.default as Blog[]
    )
  }
  return blogsFullPromise
}

/**
 * Load a single blog post by slug.
 * Uses full index lookup - individual imports are unreliable due to dynamic import limitations.
 * This is acceptable because getBlogBySlug is only called from page components
 * which use generateStaticParams, meaning it only runs at build time.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await getAllBlogs()
  return blogs.find((blog) => blog.slug === slug)
}
