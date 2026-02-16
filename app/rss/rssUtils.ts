import { sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs, allDocs } from 'contentlayer/generated'
import { MDXContentApiResponse } from '../../utils/strapi'
import { normaliseSlug } from '../../scripts/rssFeed.mjs'
import { fetchAllCMSContent } from '@/utils/cmsContent'

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
    tags: faq.tags?.map((tag) => tag?.value),
    authors: faq?.authors?.map((author) => author?.key),
  }))
}

const mapComparisonEntries = (comparisons: MDXContentApiResponse | undefined) => {
  return comparisons?.data.map((comparison) => ({
    ...comparison,
    slug: buildComparisonSlug(comparison.path),
    date: comparison.date ?? comparison.publishedAt ?? comparison.updatedAt ?? comparison.createdAt,
    tags: comparison.tags?.map((tag) => tag?.value),
    authors: comparison?.authors?.map((author) => author?.key),
  }))
}

const buildComparisonSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`comparisons${cleanedPath}`)
}

const buildGuideSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`guides${cleanedPath}`)
}

const mapGuideEntries = (guides: MDXContentApiResponse | undefined) => {
  return guides?.data.map((guide) => ({
    ...guide,
    slug: buildGuideSlug(guide.path),
    date: guide.date ?? guide.publishedAt ?? guide.updatedAt ?? guide.createdAt,
    tags: guide.tags?.map((tag) => tag?.value),
    authors: guide?.authors?.map((author) => author?.key),
  }))
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

export const loadPublishedPosts = async () => {
  const deploymentStatus = getDeploymentStatus()
  const { faqs, opentelemetries, comparisons, guides } = await fetchAllCMSContent(deploymentStatus)

  const faqPosts = mapFaqEntries(faqs)
  const opentelemetryPosts = mapOpentelemetryEntries(opentelemetries)
  const comparisonPosts = mapComparisonEntries(comparisons)
  const guidePosts = mapGuideEntries(guides)

  const combinedPosts = [
    ...faqPosts,
    ...allBlogs,
    ...(opentelemetryPosts || []),
    ...allDocs,
    ...(comparisonPosts || []),
    ...(guidePosts || []),
  ]

  return sortPosts(combinedPosts.filter((post: any) => post?.draft !== true) as any[])
}
