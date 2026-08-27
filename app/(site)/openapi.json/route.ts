import { NextResponse } from 'next/server'
import { agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { getLatestOpenAPISpec } from '@/utils/openapiSpec'
import { API_SPEC_REVALIDATE_SECONDS } from '@/constants/apiReference'

export const revalidate = 86400 // 24h — see API_SPEC_REVALIDATE_SECONDS

/**
 * Canonical, version-agnostic OpenAPI endpoint for the SigNoz API. Agents and
 * spec tooling look for /openapi.json; the per-release specs stay available at
 * /api-reference/<version> and /api/api-reference-openapi/<version>.
 */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/openapi.json')

  return new NextResponse(JSON.stringify(spec.document), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, s-maxage=${API_SPEC_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      'X-SigNoz-API-Version': spec.version,
    },
  })
}
