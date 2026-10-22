import { MetadataRoute } from 'next'
import { CORPORATE_SITEMAP_ROUTES, routeUrl } from '@/utils/sitemapRoutes'
import { getLegalRoutes } from '@/utils/legal'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...CORPORATE_SITEMAP_ROUTES, ...getLegalRoutes()].map((route) => ({
    url: routeUrl(route),
    changeFrequency: 'weekly' as const,
  }))
}
