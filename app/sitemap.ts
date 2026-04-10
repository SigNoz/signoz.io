import { MetadataRoute } from 'next'
import { allBlogs, allDocs, allGuides } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import {
  CANONICAL_SITEMAP_STATIC_ROUTES,
  normalizeSeoPath,
  shouldExcludeFromSitemap,
  shouldUseTrailingSlash,
} from '@/utils/canonicalRoutes'

const toSitemapUrl = (siteUrl: string, rawPath: string) => {
  const path = normalizeSeoPath(rawPath)

  return `${siteUrl}/${path}${shouldUseTrailingSlash(path) ? '/' : ''}`
}

const dedupeRoutes = (routes: MetadataRoute.Sitemap) => {
  const byUrl = new Map<string, (typeof routes)[number]>()

  for (const route of routes) {
    byUrl.set(route.url, route)
  }

  return Array.from(byUrl.values())
}

const mapChangeFrequency = (
  frequency: string
): 'weekly' | 'always' | 'hourly' | 'daily' | 'monthly' | 'yearly' | 'never' => {
  switch (frequency) {
    case 'weekly':
    case 'always':
    case 'hourly':
    case 'daily':
    case 'monthly':
    case 'yearly':
    case 'never':
      return frequency
    default:
      return 'weekly'
  }
}

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft && !shouldExcludeFromSitemap(post.path))
    .map((post) => ({
      url: toSitemapUrl(siteUrl, post.path),
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const docRoutes = allDocs
    .filter((post) => !post.draft && !shouldExcludeFromSitemap(post.path))
    .map((post) => ({
      url: toSitemapUrl(siteUrl, post.path),
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const guideRoutes = allGuides
    .filter((post) => !post.draft && !shouldExcludeFromSitemap(post.path))
    .map((post) => ({
      url: toSitemapUrl(siteUrl, post.path),
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.7,
    }))

  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries, comparisons } =
    await fetchAllCMSContent(deploymentStatus)

  let faqRoutes: MetadataRoute.Sitemap = []
  if (faqs) {
    const data = faqs
    faqRoutes = data.data.map((faq) => ({
      url: toSitemapUrl(siteUrl, `faqs${faq.path}`),
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  }

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  if (caseStudies) {
    const data = caseStudies
    caseStudyRoutes = data.data.map((caseStudy) => ({
      url: toSitemapUrl(siteUrl, `case-study${caseStudy.path}`),
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  if (opentelemetries) {
    const data = opentelemetries
    opentelemetryRoutes = data.data
      .filter((opentelemetry) => !shouldExcludeFromSitemap(`opentelemetry${opentelemetry.path}`))
      .map((opentelemetry) => ({
        url: toSitemapUrl(siteUrl, `opentelemetry${opentelemetry.path}`),
        lastModified: opentelemetry.date || opentelemetry.updatedAt || opentelemetry.publishedAt,
        changeFrequency: mapChangeFrequency('weekly'),
        priority: 0.5,
      }))
  }

  let comparisonRoutes: MetadataRoute.Sitemap = []
  if (comparisons) {
    const data = comparisons
    comparisonRoutes = data.data
      .filter((comparison) => !shouldExcludeFromSitemap(`comparisons${comparison.path}`))
      .map((comparison) => ({
        url: toSitemapUrl(siteUrl, `comparisons${comparison.path}`),
        lastModified: comparison.date || comparison.updatedAt || comparison.publishedAt,
        changeFrequency: mapChangeFrequency('weekly'),
        priority: 0.5,
      }))
  }

  const routes = CANONICAL_SITEMAP_STATIC_ROUTES.map((route) => ({
    url: toSitemapUrl(siteUrl, route),
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: mapChangeFrequency('weekly'),
  }))

  return dedupeRoutes([
    ...routes,
    ...blogRoutes,
    ...opentelemetryRoutes,
    ...docRoutes,
    ...guideRoutes,
    ...faqRoutes,
    ...caseStudyRoutes,
    ...comparisonRoutes,
  ])
}
