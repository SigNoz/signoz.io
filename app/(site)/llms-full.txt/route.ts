import { buildLlmsFullMarkdown } from '@/utils/docs/buildLlmsFullMarkdown'
import { agentResponse } from '@/utils/agentResponseHeaders'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const body = await buildLlmsFullMarkdown()

  // Statically rendered (force-static): conditional 304s are left to the CDN.
  return agentResponse(body, { contentType: 'text/plain; charset=utf-8' })
}
