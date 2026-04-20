import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { caseStudies, opentelemetries } = await fetchAllCMSContent(deploymentStatus)

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  if (caseStudies) {
    caseStudyRoutes = caseStudies.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  if (opentelemetries) {
    opentelemetryRoutes = opentelemetries.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: opentelemetry.date || opentelemetry.updatedAt || opentelemetry.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  }

  const staticRoutes = ['pricing', 'teams', 'opentelemetry', 'case-study'].map((route) => ({
    url: `${siteUrl}/${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes, ...opentelemetryRoutes, ...caseStudyRoutes]
}
