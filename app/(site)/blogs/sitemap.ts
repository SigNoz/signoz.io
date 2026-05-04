import { MetadataRoute } from 'next'
import { allBlogs, allGuides } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from 'utils/cmsContent'
import { compareSitemapEntries, toSitemapDateOnly } from 'utils/sitemapXml'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries, comparisons } =
    await fetchAllCMSContent(deploymentStatus)

  let faqRoutes: MetadataRoute.Sitemap = []
  if (faqs) {
    faqRoutes = faqs.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  }

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  if (caseStudies) {
    caseStudyRoutes = caseStudies.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      lastModified: caseStudy.date || caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  if (opentelemetries) {
    opentelemetryRoutes = opentelemetries.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: opentelemetry.date || opentelemetry.updatedAt || opentelemetry.publishedAt,
    }))
  }

  let comparisonRoutes: MetadataRoute.Sitemap = []
  if (comparisons) {
    comparisonRoutes = comparisons.data.map((comparison) => ({
      url: `${siteUrl}/comparisons${comparison.path}/`,
      lastModified: comparison.date || comparison.updatedAt || comparison.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  }

  const blogRoutes = allBlogs
    .filter((post) => !post.draft && !post?.excludeFromSitemap)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  const guideRoutes = allGuides
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const staticRoutes = ['blog', 'guides', 'faqs', 'case-study', 'opentelemetry', 'comparisons'].map(
    (route) => ({
      url: `${siteUrl}/${route}/`,
      changeFrequency: 'weekly' as const,
    })
  )

  const allRoutes: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...faqRoutes,
    ...caseStudyRoutes,
    ...opentelemetryRoutes,
    ...comparisonRoutes,
  ]

  allRoutes.sort(compareSitemapEntries)

  return allRoutes.map((entry) => {
    if (entry.lastModified == null) return entry
    const dateOnly = toSitemapDateOnly(entry.lastModified)
    if (dateOnly == null) {
      const { lastModified: _removed, ...rest } = entry
      return rest as MetadataRoute.Sitemap[number]
    }
    return { ...entry, lastModified: dateOnly }
  })
}
