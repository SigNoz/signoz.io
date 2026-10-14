import { agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { getLatestOpenAPISpec, openapiSpecResponse } from '@/utils/openapiSpec'

export const revalidate = 86400 // 24h — keep in sync with API_SPEC_REVALIDATE_SECONDS (Next requires a literal)

/**
 * Canonical, version-agnostic OpenAPI endpoint for the SigNoz API. Agents and
 * spec tooling look for /openapi.json; the per-release specs stay available at
 * /api-reference/<version> and /api/api-reference-openapi/<version>.
 */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/openapi.json')

  return openapiSpecResponse(spec, 'json')
}
