import { buildRoutesSitemapMarkdown, PRODUCT_SITEMAP_ROUTES } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'

export function GET(request: Request) {
  return agentResponse(
    request,
    buildRoutesSitemapMarkdown('SigNoz Product Pages Sitemap', PRODUCT_SITEMAP_ROUTES)
  )
}
