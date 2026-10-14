import { agentResponse, agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { buildApiReferenceMarkdown } from '@/utils/openapiMarkdown'
import { getLatestOpenAPISpec } from '@/utils/openapiSpec'

export const revalidate = 86400 // 24h — keep in sync with API_SPEC_REVALIDATE_SECONDS (Next requires a literal)

/** Markdown twin of /api-reference, built from the latest OpenAPI spec. */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/api-reference.md')

  return agentResponse(buildApiReferenceMarkdown(spec), { varyAccept: true })
}
