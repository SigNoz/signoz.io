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

  const { comparisons } = await fetchAllCMSContent(deploymentStatus)

  let comparisonRoutes: MetadataRoute.Sitemap = []
  if (comparisons) {
    comparisonRoutes = comparisons.data.map((comparison) => ({
      url: `${siteUrl}/comparisons${comparison.path}/`,
      lastModified: comparison.date || comparison.updatedAt || comparison.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  }

  const staticRoutes = [
    'comparisons',
    'datadog-alternative',
    'grafana-alternative',
    'newrelic-alternative',
  ].map((route) => ({
    url: `${siteUrl}/${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes, ...comparisonRoutes]
}
