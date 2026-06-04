import { unstable_cache } from 'next/cache'
import { transformBlog, transformComparison, transformGuide } from './mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { getAllContent, getContentBySlug, isLocalContentOverlayEnabled } from './contentRepository'

async function getCachedMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T[]>
): Promise<T[]> {
  if (isLocalContentOverlayEnabled()) {
    return fetchFn()
  }

  const cachedFn = unstable_cache(
    async () => {
      const result = await fetchFn()
      if (!result || result.length === 0) {
        throw new Error(`Empty content received for ${cacheKey}, skipping cache`)
      }
      return result
    },
    [cacheKey, deploymentStatus],
    {
      tags: ['mdx-content-list', ...tags],
      revalidate: CMS_REVALIDATE_INTERVAL,
    }
  )

  return cachedFn()
}

async function getCachedSingleMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T>
): Promise<T> {
  if (isLocalContentOverlayEnabled()) {
    return fetchFn()
  }

  const cachedFn = unstable_cache(
    async () => {
      const result = await fetchFn()
      if (!result) {
        throw new Error(`Empty content received for ${cacheKey}, skipping cache`)
      }
      return result
    },
    [cacheKey, deploymentStatus],
    {
      tags: ['mdx-content-list', ...tags],
      revalidate: CMS_REVALIDATE_INTERVAL,
    }
  )

  return cachedFn()
}

async function fetchComparisons(deploymentStatus: string) {
  const comparisons = await getAllContent('comparisons', deploymentStatus)
  return comparisons.map((comparison) => transformComparison(comparison))
}

export function getCachedComparisons(deploymentStatus: string) {
  return getCachedMDXContent(
    'cached-comparisons-list',
    deploymentStatus,
    ['comparisons-list'],
    () => fetchComparisons(deploymentStatus)
  )
}

export async function fetchAllComparisonsForPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedComparisons(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached comparisons fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchComparisons(deploymentStatus)
    } catch (directError) {
      console.error('Direct comparisons fetch also failed:', directError)
      return []
    }
  }
}

async function fetchSingleComparison(slug: string, deploymentStatus: string) {
  const content = await getContentBySlug('comparisons', slug, deploymentStatus)

  if (content) {
    const comparison = transformComparison(content)
    if (!comparison || !comparison.title || !comparison.content) {
      throw new Error(`Empty or invalid comparison content for slug: ${slug}`)
    }
    return comparison
  }

  throw new Error(`Comparison content not found for slug: ${slug}`)
}

export function getCachedSingleComparison(slug: string, deploymentStatus: string) {
  return getCachedSingleMDXContent(
    `cached-comparison-${slug}`,
    deploymentStatus,
    [`comparisons-${slug}`, `mdx-content-${slug}`],
    () => fetchSingleComparison(slug, deploymentStatus)
  )
}

export async function fetchComparisonBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedSingleComparison(slug, deploymentStatus)
  } catch (cacheError) {
    console.warn(
      `Cached single comparison fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )

    try {
      return await fetchSingleComparison(slug, deploymentStatus)
    } catch (directError) {
      console.error(`Direct single comparison fetch also failed for "${slug}":`, directError)
      return undefined
    }
  }
}

// --- Guides ---

async function fetchGuides(deploymentStatus: string) {
  const guides = await getAllContent('guides', deploymentStatus)
  return guides.map((guide) => transformGuide(guide))
}

export function getCachedGuides(deploymentStatus: string) {
  return getCachedMDXContent('cached-guides-list', deploymentStatus, ['guides-list'], () =>
    fetchGuides(deploymentStatus)
  )
}

export async function fetchAllGuidesForPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedGuides(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached guides fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchGuides(deploymentStatus)
    } catch (directError) {
      console.error('Direct guides fetch also failed:', directError)
      return []
    }
  }
}

async function fetchSingleGuide(slug: string, deploymentStatus: string) {
  const content = await getContentBySlug('guides', slug, deploymentStatus)

  if (content) {
    const guide = transformGuide(content)
    if (!guide || !guide.title || !guide.content) {
      throw new Error(`Empty or invalid guide content for slug: ${slug}`)
    }
    return guide
  }

  throw new Error(`Guide content not found for slug: ${slug}`)
}

export function getCachedSingleGuide(slug: string, deploymentStatus: string) {
  return getCachedSingleMDXContent(
    `cached-guide-${slug}`,
    deploymentStatus,
    [`guides-${slug}`, `mdx-content-${slug}`],
    () => fetchSingleGuide(slug, deploymentStatus)
  )
}

export async function fetchGuideBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedSingleGuide(slug, deploymentStatus)
  } catch (cacheError) {
    console.warn(
      `Cached single guide fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )

    try {
      return await fetchSingleGuide(slug, deploymentStatus)
    } catch (directError) {
      console.error(`Direct single guide fetch also failed for "${slug}":`, directError)
      return undefined
    }
  }
}

// --- Blogs ---

async function fetchBlogs(deploymentStatus: string) {
  const blogs = await getAllContent('blogs', deploymentStatus)
  return blogs.map((blog) => transformBlog(blog))
}

export function getCachedBlogs(deploymentStatus: string) {
  return getCachedMDXContent('cached-blogs-list', deploymentStatus, ['blogs-list'], () =>
    fetchBlogs(deploymentStatus)
  )
}

export async function fetchAllBlogsForPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedBlogs(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached blogs fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchBlogs(deploymentStatus)
    } catch (directError) {
      console.error('Direct blogs fetch also failed:', directError)
      return []
    }
  }
}

async function fetchSingleBlog(slug: string, deploymentStatus: string) {
  const content = await getContentBySlug('blogs', slug, deploymentStatus)

  if (content) {
    const blog = transformBlog(content)
    if (!blog || !blog.title || !blog.content) {
      throw new Error(`Empty or invalid blog content for slug: ${slug}`)
    }
    return blog
  }

  throw new Error(`Blog content not found for slug: ${slug}`)
}

export function getCachedSingleBlog(slug: string, deploymentStatus: string) {
  return getCachedSingleMDXContent(
    `cached-blog-${slug}`,
    deploymentStatus,
    [`blogs-${slug}`, `mdx-content-${slug}`],
    () => fetchSingleBlog(slug, deploymentStatus)
  )
}

export async function fetchBlogBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedSingleBlog(slug, deploymentStatus)
  } catch (cacheError) {
    console.warn(
      `Cached single blog fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )

    try {
      return await fetchSingleBlog(slug, deploymentStatus)
    } catch (directError) {
      console.error(`Direct single blog fetch also failed for "${slug}":`, directError)
      return undefined
    }
  }
}
