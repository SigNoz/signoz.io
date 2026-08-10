import { fetchAllCMSContent } from 'utils/cmsContent'
import { buildCmsContentSitemapMarkdown } from '@/utils/sitemapRoutes'
import { agentResponse } from '@/utils/agentResponseHeaders'

export async function GET(request: Request) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const content = await fetchAllCMSContent(deploymentStatus)

  return agentResponse(request, buildCmsContentSitemapMarkdown(content))
}
