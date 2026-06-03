import { sortPosts } from 'pliny/utils/contentlayer.js'
import { allDocs } from 'contentlayer/generated'
import { MDXContentApiResponse } from '@/utils/strapi'
import { normaliseSlug } from '../../../scripts/rssFeed.mjs'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { mapRelationKeys, mapTaxonomyValues } from '@/utils/contentHelpers'

const buildFaqSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`faqs${cleanedPath}`)
}

const getDeploymentStatus = () => (process.env.VERCEL_ENV === 'production' ? 'live' : 'staging')

const mapFaqEntries = (faqs: MDXContentApiResponse | undefined) => {
  if (!faqs?.data?.length) {
    return []
  }

  return faqs.data.map((faq) => ({
    ...faq,
    slug: buildFaqSlug(faq.path),
    date: faq.date ?? faq.publishedAt ?? faq.updatedAt ?? faq.createdAt,
    tags: mapTaxonomyValues(faq.tags),
    authors: mapRelationKeys(faq?.authors),
  }))
}

const mapComparisonEntries = (comparisons: MDXContentApiResponse | undefined) => {
  return comparisons?.data.map((comparison) => ({
    ...comparison,
    slug: buildComparisonSlug(comparison.path),
    date: comparison.date ?? comparison.publishedAt ?? comparison.updatedAt ?? comparison.createdAt,
    tags: mapTaxonomyValues(comparison.tags),
    authors: mapRelationKeys(comparison?.authors),
  }))
}

const buildComparisonSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`comparisons${cleanedPath}`)
}

const buildOpentelemetrySlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`opentelemetry${cleanedPath}`)
}

const mapOpentelemetryEntries = (opentelemetries: MDXContentApiResponse | undefined) => {
  return opentelemetries?.data.map((opentelemetry) => ({
    ...opentelemetry,
    slug: buildOpentelemetrySlug(opentelemetry.path),
    date:
      opentelemetry.date ??
      opentelemetry.publishedAt ??
      opentelemetry.updatedAt ??
      opentelemetry.createdAt,
  }))
}

const buildGuideSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`guides${cleanedPath}`)
}

const mapGuideEntries = (guides: MDXContentApiResponse | undefined) => {
  if (!guides?.data?.length) {
    return []
  }

  return guides.data.map((guide) => ({
    ...guide,
    slug: buildGuideSlug(guide.path),
    date: guide.date ?? guide.publishedAt ?? guide.updatedAt ?? guide.createdAt,
    tags: mapTaxonomyValues(guide.tags),
    authors: mapRelationKeys(guide?.authors),
  }))
}

const buildBlogSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`blog${cleanedPath}`)
}

const mapBlogEntries = (blogs: MDXContentApiResponse | undefined) => {
  if (!blogs?.data?.length) {
    return []
  }

  return blogs.data.map((blog) => ({
    ...blog,
    slug: buildBlogSlug(blog.path),
    date: blog.date ?? blog.publishedAt ?? blog.updatedAt ?? blog.createdAt,
    tags: mapTaxonomyValues(blog.tags),
    authors: mapRelationKeys(blog?.authors),
  }))
}

export const loadPublishedPosts = async () => {
  const deploymentStatus = getDeploymentStatus()
  const { faqs, opentelemetries, comparisons, guides, blogs } =
    await fetchAllCMSContent(deploymentStatus)

  const faqPosts = mapFaqEntries(faqs)
  const opentelemetryPosts = mapOpentelemetryEntries(opentelemetries)
  const comparisonPosts = mapComparisonEntries(comparisons)
  const guidePosts = mapGuideEntries(guides)
  const blogPosts = mapBlogEntries(blogs)

  const combinedPosts = [
    ...faqPosts,
    ...blogPosts,
    ...(opentelemetryPosts || []),
    ...allDocs,
    ...guidePosts,
    ...(comparisonPosts || []),
  ]

  return sortPosts(combinedPosts.filter((post: any) => post?.draft !== true) as any[])
}
