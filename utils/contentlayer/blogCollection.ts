// Blog collection utilities - updated for custom content pipeline
// Type will be generated at .content/generated/types.d.ts

// Lightweight metadata type (no body/code)
export interface BlogMeta {
  title: string
  date: string
  tags: string[]
  slug: string
  path: string
  filePath: string
  summary?: string
  description?: string
  image?: string
  authors: string[]
  readingTime: { minutes: number; words: number; text: string }
  draft?: boolean
  [key: string]: unknown
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
}

let blogsMetaPromise: Promise<BlogMeta[]> | null = null

/**
 * Load lightweight blog metadata for listings.
 * Use this for blog listings, pagination, search, etc.
 */
export async function getAllBlogsMeta(): Promise<BlogMeta[]> {
  if (!blogsMetaPromise) {
    blogsMetaPromise = import('../../.content/Blog/meta.json').then(
      (module) => module.default as BlogMeta[]
    )
  }
  return blogsMetaPromise
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
        const mod = await import(`../../.content/Blog/${m.slug}.json`)
        return mod.default as Blog
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
    const mod = await import(`../../.content/Blog/${slug}.json`)
    return mod.default as Blog
  } catch {
    return undefined
  }
}
