import { agentResponse, agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { buildApiReferenceMarkdown } from '@/utils/openapiMarkdown'
import { getLatestOpenAPISpec } from '@/utils/openapiSpec'

export const revalidate = 86400 // 24h — see API_SPEC_REVALIDATE_SECONDS

/** Markdown twin of /api-reference, built from the latest OpenAPI spec. */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/api-reference.md')

  return agentResponse(buildApiReferenceMarkdown(spec), { varyAccept: true })
}
