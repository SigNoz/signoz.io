import { cacheLife, cacheTag } from 'next/cache'
import {
  transformBlog,
  transformComparison,
  transformDoc,
  transformFaq,
  transformGuide,
} from './mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import {
  getAllContent,
  getContentBySlug,
  getDeploymentStatus,
  isLocalContentOverlayEnabled,
} from './contentRepository'
import { getTagValues } from './contentHelpers'
import type { MDXContent } from './strapi'
import type { CustomerStory } from '@/components/Customers/Customers.types'

// --- Shared fallbacks ---

function throwIfEmpty<T>(result: T[], cacheKey: string): T[] {
  if (!result || result.length === 0) {
    throw new Error(`Empty content received for ${cacheKey}, skipping cache`)
  }
  return result
}

async function getListWithFallback<T>(
  label: string,
  getCached: (deploymentStatus: string) => Promise<T[]>,
  fetchDirect: (deploymentStatus: string) => Promise<T[]>
): Promise<T[]> {
  const deploymentStatus = getDeploymentStatus()

  try {
    return await getCached(deploymentStatus)
  } catch (cacheError) {
    console.warn(`Cached ${label} fetch failed, retrying without cache:`, cacheError)

    try {
      return await fetchDirect(deploymentStatus)
    } catch (directError) {
      console.error(`Direct ${label} fetch also failed:`, directError)
      return []
    }
  }
}

async function getBySlugWithFallback<T>(
  label: string,
  slug: string,
  getCached: (slug: string, deploymentStatus: string) => Promise<T | null>,
  fetchDirect: (slug: string, deploymentStatus: string) => Promise<T | null>
): Promise<T | null> {
  const deploymentStatus = getDeploymentStatus()

  try {
    const result = await getCached(slug, deploymentStatus)
    if (result) return result
  } catch (cacheError) {
    console.warn(
      `Cached single ${label} fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )
  }

  const directResult = await fetchDirect(slug, deploymentStatus)
  if (!directResult) {
    const contentLabel = label.charAt(0).toUpperCase() + label.slice(1)
    console.warn(
      `${contentLabel} content not found for slug: "${slug}" (deployment: ${deploymentStatus})`
    )
  }
  return directResult
}

// --- Comparisons ---

async function fetchComparisons(deploymentStatus: string) {
  const comparisons = await getAllContent('comparisons', deploymentStatus)
  return comparisons.map((comparison) => transformComparison(comparison))
}

async function cachedFetchComparisons(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'comparisons-list')
  return throwIfEmpty(await fetchComparisons(deploymentStatus), 'cached-comparisons-list')
}

export function getCachedComparisons(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchComparisons(deploymentStatus)
  return cachedFetchComparisons(deploymentStatus)
}

export function fetchAllComparisonsForPage() {
  return getListWithFallback('comparisons', getCachedComparisons, fetchComparisons)
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

export function fetchComparisonBySlug(slug: string) {
  return getBySlugWithFallback('comparison', slug, getCachedSingleComparison, fetchSingleComparison)
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
  return throwIfEmpty(await fetchGuides(deploymentStatus), 'cached-guides-list')
}

export function getCachedGuides(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchGuides(deploymentStatus)
  return cachedFetchGuides(deploymentStatus)
}

export function fetchAllGuidesForPage() {
  return getListWithFallback('guides', getCachedGuides, fetchGuides)
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

export function fetchGuideBySlug(slug: string) {
  return getBySlugWithFallback('guide', slug, getCachedSingleGuide, fetchSingleGuide)
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
  return throwIfEmpty(await fetchBlogs(deploymentStatus), 'cached-blogs-list')
}

export function getCachedBlogs(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchBlogs(deploymentStatus)
  return cachedFetchBlogs(deploymentStatus)
}

export function fetchAllBlogsForPage() {
  return getListWithFallback('blogs', getCachedBlogs, fetchBlogs)
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

export function fetchBlogBySlug(slug: string) {
  return getBySlugWithFallback('blog', slug, getCachedSingleBlog, fetchSingleBlog)
}

// --- FAQs ---

async function fetchFaqs(deploymentStatus: string) {
  const faqs = await getAllContent('faqs', deploymentStatus)
  return faqs.map((faq) => transformFaq(faq))
}

async function cachedFetchFaqs(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'faqs-list')
  return throwIfEmpty(await fetchFaqs(deploymentStatus), 'cached-faqs-list')
}

export function getCachedFaqs(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchFaqs(deploymentStatus)
  return cachedFetchFaqs(deploymentStatus)
}

export function fetchAllFaqsForPage() {
  return getListWithFallback('FAQs', getCachedFaqs, fetchFaqs)
}

async function fetchSingleFaq(slug: string, deploymentStatus: string) {
  const content = await getContentBySlug('faqs', slug, deploymentStatus)
  if (!content || !content.title || !content.content) return null
  return content
}

async function cachedFetchSingleFaq(slug: string, deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', `faqs-${slug}`, `mdx-content-${slug}`)
  return await fetchSingleFaq(slug, deploymentStatus)
}

export function getCachedSingleFaq(slug: string, deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchSingleFaq(slug, deploymentStatus)
  return cachedFetchSingleFaq(slug, deploymentStatus)
}

export function fetchFaqBySlug(slug: string) {
  return getBySlugWithFallback('FAQ', slug, getCachedSingleFaq, fetchSingleFaq)
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
  return throwIfEmpty(await fetchCaseStudies(deploymentStatus), 'cached-case-studies-list')
}

export function getCachedCaseStudies(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchCaseStudies(deploymentStatus)
  return cachedFetchCaseStudies(deploymentStatus)
}

export function fetchAllCaseStudiesForPage(): Promise<CustomerStory[]> {
  return getListWithFallback('case studies', getCachedCaseStudies, fetchCaseStudies)
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
  return throwIfEmpty(await fetchDocs(deploymentStatus), 'cached-docs-list')
}

export function getCachedDocs(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchDocs(deploymentStatus)
  return cachedFetchDocs(deploymentStatus)
}

export function fetchAllDocsForPage() {
  return getListWithFallback('docs', getCachedDocs, fetchDocs)
}

// Fields only; no `content`. The full docs list serializes to ~16MB, which is
// over the data cache's 2MB per-item limit, so its cache writes always fail.
// This 445KB index caches reliably for consumers that never read doc bodies.
const DOCS_INDEX_FIELDS = [
  'title',
  'path',
  'date',
  'published_date',
  'updated_date',
  'description',
  'updatedAt',
  'publishedAt',
]

export type DocsIndexEntry = {
  slug: string
  path: string
  title?: string
  description?: string
  summary?: string
  date?: string | null
  published_date?: string | null
  updated_date?: string | null
  lastmod?: string | null
}

async function fetchDocsIndex(deploymentStatus: string): Promise<DocsIndexEntry[]> {
  const docs = await getAllContent('docs', deploymentStatus, DOCS_INDEX_FIELDS)
  return docs.map((doc) => {
    const { slug, path, title, description, summary, date, published_date, updated_date, lastmod } =
      transformDoc(doc)
    return { slug, path, title, description, summary, date, published_date, updated_date, lastmod }
  })
}

async function cachedFetchDocsIndex(deploymentStatus: string) {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('mdx-content-list', 'docs-list')
  return throwIfEmpty(await fetchDocsIndex(deploymentStatus), 'cached-docs-index')
}

export function getCachedDocsIndex(deploymentStatus: string) {
  if (isLocalContentOverlayEnabled()) return fetchDocsIndex(deploymentStatus)
  return cachedFetchDocsIndex(deploymentStatus)
}

export function fetchAllDocsIndex(): Promise<DocsIndexEntry[]> {
  return getListWithFallback('docs index', getCachedDocsIndex, fetchDocsIndex)
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

export function fetchDocBySlug(slug: string) {
  return getBySlugWithFallback('doc', slug, getCachedSingleDoc, fetchSingleDoc)
}
