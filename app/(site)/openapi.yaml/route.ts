import { agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { getLatestOpenAPISpec, openapiSpecResponse } from '@/utils/openapiSpec'

export const revalidate = 86400 // 24h — keep in sync with API_SPEC_REVALIDATE_SECONDS (Next requires a literal)

/** YAML twin of /openapi.json for tooling that expects a .yaml spec. */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/openapi.yaml')

  return openapiSpecResponse(spec, 'yaml')
}
