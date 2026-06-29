import { cacheLife, cacheTag } from 'next/cache'
import { transformBlog, transformComparison, transformDoc, transformGuide } from './mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { getAllContent, getContentBySlug, isLocalContentOverlayEnabled } from './contentRepository'

// --- Comparisons ---

async function fetchComparisons(deploymentStatus: string) {
  const comparisons = await getAllContent('comparisons', deploymentStatus)
  return comparisons.map((comparison) => transformComparison(comparison))
}

async function cachedFetchComparisons(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'comparisons-list')
  const result = await fetchComparisons(deploymentStatus)
  if (!result || result.length === 0) {
    throw new Error('Empty content received for cached-comparisons-list, skipping cache')
  }
  return result
}

export function getCachedComparisons(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchComparisons(deploymentStatus)
  return cachedFetchComparisons(deploymentStatus)
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

async function cachedFetchSingleComparison(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `comparisons-${slug}`, `mdx-content-${slug}`)
  const result = await fetchSingleComparison(slug, deploymentStatus)
  if (!result) {
    throw new Error(`Empty content received for cached-comparison-${slug}, skipping cache`)
  }
  return result
}

export function getCachedSingleComparison(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleComparison(slug, deploymentStatus)
  return cachedFetchSingleComparison(slug, deploymentStatus)
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

async function cachedFetchGuides(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'guides-list')
  const result = await fetchGuides(deploymentStatus)
  if (!result || result.length === 0) {
    throw new Error('Empty content received for cached-guides-list, skipping cache')
  }
  return result
}

export function getCachedGuides(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchGuides(deploymentStatus)
  return cachedFetchGuides(deploymentStatus)
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

async function cachedFetchSingleGuide(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `guides-${slug}`, `mdx-content-${slug}`)
  const result = await fetchSingleGuide(slug, deploymentStatus)
  if (!result) {
    throw new Error(`Empty content received for cached-guide-${slug}, skipping cache`)
  }
  return result
}

export function getCachedSingleGuide(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleGuide(slug, deploymentStatus)
  return cachedFetchSingleGuide(slug, deploymentStatus)
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

async function cachedFetchBlogs(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'blogs-list')
  const result = await fetchBlogs(deploymentStatus)
  if (!result || result.length === 0) {
    throw new Error('Empty content received for cached-blogs-list, skipping cache')
  }
  return result
}

export function getCachedBlogs(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchBlogs(deploymentStatus)
  return cachedFetchBlogs(deploymentStatus)
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

async function cachedFetchSingleBlog(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `blogs-${slug}`, `mdx-content-${slug}`)
  const result = await fetchSingleBlog(slug, deploymentStatus)
  if (!result) {
    throw new Error(`Empty content received for cached-blog-${slug}, skipping cache`)
  }
  return result
}

export function getCachedSingleBlog(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleBlog(slug, deploymentStatus)
  return cachedFetchSingleBlog(slug, deploymentStatus)
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

// --- Docs ---

async function fetchDocs(deploymentStatus: string) {
  const docs = await getAllContent('docs', deploymentStatus)
  return docs.map((doc) => transformDoc(doc))
}

async function cachedFetchDocs(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'docs-list')
  const result = await fetchDocs(deploymentStatus)
  if (!result || result.length === 0) {
    throw new Error('Empty content received for cached-docs-list, skipping cache')
  }
  return result
}

export function getCachedDocs(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchDocs(deploymentStatus)
  return cachedFetchDocs(deploymentStatus)
}

export async function fetchAllDocsForPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedDocs(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached docs fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchDocs(deploymentStatus)
    } catch (directError) {
      console.error('Direct docs fetch also failed:', directError)
      return []
    }
  }
}

async function fetchSingleDoc(slug: string, deploymentStatus: string) {
  const content = await getContentBySlug('docs', slug, deploymentStatus)

  if (content) {
    const doc = transformDoc(content)
    if (!doc || !doc.title || !doc.content) {
      throw new Error(`Empty or invalid doc content for slug: ${slug}`)
    }
    return doc
  }

  throw new Error(`Doc content not found for slug: ${slug}`)
}

async function cachedFetchSingleDoc(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `docs-${slug}`, `mdx-content-${slug}`)
  const result = await fetchSingleDoc(slug, deploymentStatus)
  if (!result) {
    throw new Error(`Empty content received for cached-doc-${slug}, skipping cache`)
  }
  return result
}

export function getCachedSingleDoc(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleDoc(slug, deploymentStatus)
  return cachedFetchSingleDoc(slug, deploymentStatus)
}

export async function fetchDocBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedSingleDoc(slug, deploymentStatus)
  } catch (cacheError) {
    console.warn(
      `Cached single doc fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )

    try {
      return await fetchSingleDoc(slug, deploymentStatus)
    } catch (directError) {
      console.error(`Direct single doc fetch also failed for "${slug}":`, directError)
      return undefined
    }
  }
}
