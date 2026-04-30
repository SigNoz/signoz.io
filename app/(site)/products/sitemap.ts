import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const staticRoutes = [
    'pricing',
    'pricing/metrics-cost-estimation',
    'teams',
    'why-signoz',
    'observability-for-ai-native-companies',
    'log-management',
    'llm-observability',
    'external-apis',
    'distributed-tracing',
    'metrics-and-dashboards',
    'exceptions-monitoring',
    'alerts-management',
    'application-performance-monitoring',
    'trace-funnels',
    'datadog-migration-tool',
    'datadog-pricing-calculator',
    'upgrade-path',
    'unified-observability',
    'agent-native-observability',
  ].map((route) => ({
    url: `${siteUrl}/${route}/`,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes]
}
