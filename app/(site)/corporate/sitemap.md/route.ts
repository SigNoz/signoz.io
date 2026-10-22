import { buildRoutesSitemapMarkdown, CORPORATE_SITEMAP_ROUTES } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'
import { getLegalRoutes } from '@/utils/legal'

export function GET() {
  return agentResponse(
    buildRoutesSitemapMarkdown('SigNoz Company Pages Sitemap', [
      ...CORPORATE_SITEMAP_ROUTES,
      ...getLegalRoutes(),
    ])
  )
}
