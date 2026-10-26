import { MetadataRoute } from 'next'
import { getCorporateSitemapRoutes, routeUrl } from '@/utils/sitemapRoutes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getCorporateSitemapRoutes().map((route) => ({
    url: routeUrl(route),
    changeFrequency: 'weekly' as const,
  }))
}
