import { NextResponse } from 'next/server'
import { stringify } from 'yaml'
import { agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { getLatestOpenAPISpec } from '@/utils/openapiSpec'
import { API_SPEC_REVALIDATE_SECONDS } from '@/constants/apiReference'

export const revalidate = 86400 // 24h — see API_SPEC_REVALIDATE_SECONDS

/** YAML twin of /openapi.json for tooling that expects a .yaml spec. */
export async function GET() {
  const spec = await getLatestOpenAPISpec()
  if (!spec) return agentNotFoundResponse('/openapi.yaml')

  return new NextResponse(stringify(spec.document), {
    headers: {
      'Content-Type': 'application/yaml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${API_SPEC_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      'X-SigNoz-API-Version': spec.version,
    },
  })
}
