import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const staticRoutes = [
    'datadog-alternative',
    'grafana-alternative',
    'newrelic-alternative',
    'clickstack-alternative',
    'cloudwatch-alternative',
    'product-comparison',
    'product-comparison/datadog-savings',
    'product-comparison/migrate-from-datadog',
    'product-comparison/migrate-from-dynatrace',
    'product-comparison/migrate-from-newrelic',
    'product-comparison/newrelic-savings',
    'product-comparison/signoz-vs-dynatrace',
  ].map((route) => ({
    url: `${siteUrl}/${route}/`,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes]
}
