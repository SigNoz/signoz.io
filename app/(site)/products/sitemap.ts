import { MetadataRoute } from 'next'
import { PRODUCT_SITEMAP_ROUTES, routeUrl } from '@/utils/sitemapRoutes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return PRODUCT_SITEMAP_ROUTES.map((route) => ({
    url: routeUrl(route),
    changeFrequency: 'weekly' as const,
  }))
}
