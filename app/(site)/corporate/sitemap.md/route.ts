import { buildRoutesSitemapMarkdown, CORPORATE_SITEMAP_ROUTES } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'

export function GET(request: Request) {
  return agentResponse(
    request,
    buildRoutesSitemapMarkdown('SigNoz Company Pages Sitemap', CORPORATE_SITEMAP_ROUTES)
  )
}
