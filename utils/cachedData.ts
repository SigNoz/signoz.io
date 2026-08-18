import { cacheLife, cacheTag } from 'next/cache'
import { transformBlog, transformComparison, transformDoc, transformGuide } from './mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { getAllContent, getContentBySlug, isLocalContentOverlayEnabled } from './contentRepository'
import { getTagValues } from './contentHelpers'
import type { MDXContent } from './strapi'
import type { CustomerStory } from '@/components/Customers/Customers.types'

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
  if (!content) return null

  const comparison = transformComparison(content)
  if (!comparison || !comparison.title || !comparison.content) return null
  return comparison
}

async function cachedFetchSingleComparison(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `comparisons-${slug}`, `mdx-content-${slug}`)
  return await fetchSingleComparison(slug, deploymentStatus)
}

export function getCachedSingleComparison(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleComparison(slug, deploymentStatus)
  return cachedFetchSingleComparison(slug, deploymentStatus)
}

export async function fetchComparisonBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    const result = await getCachedSingleComparison(slug, deploymentStatus)
    if (result) return result
  } catch (cacheError) {
    console.warn(
      `Cached single comparison fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )
  }

  const directResult = await fetchSingleComparison(slug, deploymentStatus)
  if (!directResult) {
    console.warn(
      `Comparison content not found for slug: "${slug}" (deployment: ${deploymentStatus})`
    )
  }
  return directResult
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
  if (!content) return null

  const guide = transformGuide(content)
  if (!guide || !guide.title || !guide.content) return null
  return guide
}

async function cachedFetchSingleGuide(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `guides-${slug}`, `mdx-content-${slug}`)
  return await fetchSingleGuide(slug, deploymentStatus)
}

export function getCachedSingleGuide(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleGuide(slug, deploymentStatus)
  return cachedFetchSingleGuide(slug, deploymentStatus)
}

export async function fetchGuideBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    const result = await getCachedSingleGuide(slug, deploymentStatus)
    if (result) return result
  } catch (cacheError) {
    console.warn(
      `Cached single guide fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )
  }

  const directResult = await fetchSingleGuide(slug, deploymentStatus)
  if (!directResult) {
    console.warn(`Guide content not found for slug: "${slug}" (deployment: ${deploymentStatus})`)
  }
  return directResult
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
  if (!content) return null

  const blog = transformBlog(content)
  if (!blog || !blog.title || !blog.content) return null
  return blog
}

async function cachedFetchSingleBlog(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `blogs-${slug}`, `mdx-content-${slug}`)
  return await fetchSingleBlog(slug, deploymentStatus)
}

export function getCachedSingleBlog(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleBlog(slug, deploymentStatus)
  return cachedFetchSingleBlog(slug, deploymentStatus)
}

export async function fetchBlogBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    const result = await getCachedSingleBlog(slug, deploymentStatus)
    if (result) return result
  } catch (cacheError) {
    console.warn(
      `Cached single blog fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )
  }

  const directResult = await fetchSingleBlog(slug, deploymentStatus)
  if (!directResult) {
    console.warn(`Blog content not found for slug: "${slug}" (deployment: ${deploymentStatus})`)
  }
  return directResult
}

// --- Case studies (customer stories) ---

// Field-projected: no `content` so the cached list stays well under the 2MB cache-item limit.
const CUSTOMER_STORY_LIST_FIELDS = [
  'title',
  'description',
  'path',
  'publishedAt',
  'date',
  'company',
  'person',
  'role',
  'quote',
  'logo',
  'logo_alt',
  'featured',
  'takeaway',
  'takeaway_label',
  'show_company_name_with_logo',
]

function transformCaseStudyToStory(entry: MDXContent): CustomerStory {
  const contentPath = entry.path?.startsWith('/') ? entry.path : `/${entry.path || ''}`
  return {
    type: 'Customer story',
    title: entry.title ?? '',
    description: entry.description ?? '',
    href: `/customers${contentPath}/`,
    company: entry.company ?? '',
    person: entry.person ?? '',
    role: entry.role ?? '',
    quote: entry.quote ?? undefined,
    logo: entry.logo ?? '',
    logoAlt: entry.logo_alt ?? entry.company ?? '',
    filters: getTagValues(entry),
    featured: entry.featured === true,
    takeaway: entry.takeaway ?? undefined,
    takeawayLabel: entry.takeaway_label ?? undefined,
    showCompanyNameWithLogo: entry.show_company_name_with_logo === true,
    publishedAt: entry.date || entry.publishedAt?.split('T')[0] || '',
  }
}

async function fetchCaseStudies(deploymentStatus: string): Promise<CustomerStory[]> {
  const entries = await getAllContent('case-studies', deploymentStatus, CUSTOMER_STORY_LIST_FIELDS)
  return entries.map((entry) => transformCaseStudyToStory(entry))
}

async function cachedFetchCaseStudies(deploymentStatus: string): Promise<CustomerStory[]> {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'case-studies-list')
  const result = await fetchCaseStudies(deploymentStatus)
  if (!result || result.length === 0) {
    throw new Error('Empty content received for cached-case-studies-list, skipping cache')
  }
  return result
}

export function getCachedCaseStudies(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchCaseStudies(deploymentStatus)
  return cachedFetchCaseStudies(deploymentStatus)
}

export async function fetchAllCaseStudiesForPage(): Promise<CustomerStory[]> {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedCaseStudies(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached case studies fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchCaseStudies(deploymentStatus)
    } catch (directError) {
      console.error('Direct case studies fetch also failed:', directError)
      return []
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
  if (!content) return null

  const doc = transformDoc(content)
  if (!doc || !doc.title || !doc.content) return null
  return doc
}

async function cachedFetchSingleDoc(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `docs-${slug}`, `mdx-content-${slug}`)
  return await fetchSingleDoc(slug, deploymentStatus)
}

export function getCachedSingleDoc(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleDoc(slug, deploymentStatus)
  return cachedFetchSingleDoc(slug, deploymentStatus)
}

export async function fetchDocBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    const result = await getCachedSingleDoc(slug, deploymentStatus)
    if (result) return result
  } catch (cacheError) {
    console.warn(
      `Cached single doc fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )
  }

  const directResult = await fetchSingleDoc(slug, deploymentStatus)
  if (!directResult) {
    console.warn(`Doc content not found for slug: "${slug}" (deployment: ${deploymentStatus})`)
  }
  return directResult
}
