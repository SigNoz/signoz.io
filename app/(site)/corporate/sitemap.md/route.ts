import { buildRoutesSitemapMarkdown, getCorporateSitemapRoutes } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'

export function GET() {
  return agentResponse(
    buildRoutesSitemapMarkdown('SigNoz Company Pages Sitemap', getCorporateSitemapRoutes())
  )
}
