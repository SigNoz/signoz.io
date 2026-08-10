import { buildRoutesSitemapMarkdown, ALTERNATIVES_SITEMAP_ROUTES } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'

export function GET(request: Request) {
  return agentResponse(
    request,
    buildRoutesSitemapMarkdown(
      'SigNoz Alternatives & Migration Sitemap',
      ALTERNATIVES_SITEMAP_ROUTES
    )
  )
}
