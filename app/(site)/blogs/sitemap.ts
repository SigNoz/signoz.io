import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from 'utils/cmsContent'
import { compareSitemapEntries, toSitemapDateOnly } from 'utils/sitemapXml'
import { resolveLatestDate } from '@/utils/dateUtils'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries, comparisons, guides, blogs } =
    await fetchAllCMSContent(deploymentStatus)

  let faqRoutes: MetadataRoute.Sitemap = []
  if (faqs) {
    faqRoutes = faqs.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: resolveLatestDate(faq),
    }))
  }

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  if (caseStudies) {
    caseStudyRoutes = caseStudies.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      lastModified: resolveLatestDate(caseStudy),
    }))
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  if (opentelemetries) {
    opentelemetryRoutes = opentelemetries.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: resolveLatestDate(opentelemetry),
    }))
  }

  let comparisonRoutes: MetadataRoute.Sitemap = []
  if (comparisons) {
    comparisonRoutes = comparisons.data.map((comparison) => ({
      url: `${siteUrl}/comparisons${comparison.path}/`,
      lastModified: resolveLatestDate(comparison),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  }

  let guideRoutes: MetadataRoute.Sitemap = []
  if (guides) {
    guideRoutes = guides.data.map((guide) => ({
      url: `${siteUrl}/guides${guide.path}/`,
      lastModified: resolveLatestDate(guide),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  }

  let blogRoutes: MetadataRoute.Sitemap = []
  if (blogs) {
    blogRoutes = blogs.data
      .filter((post) => !post.excludeFromSitemap)
      .map((post) => ({
        url: `${siteUrl}/blog${post.path}/`,
        lastModified: resolveLatestDate(post),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
  }

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
