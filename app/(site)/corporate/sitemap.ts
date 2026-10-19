import { MetadataRoute } from 'next'
import { CORPORATE_SITEMAP_ROUTES, routeUrl } from '@/utils/sitemapRoutes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return CORPORATE_SITEMAP_ROUTES.map((route) => ({
    url: routeUrl(route),
    changeFrequency: 'weekly' as const,
  }))
}
