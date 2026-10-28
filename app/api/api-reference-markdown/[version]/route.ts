import { agentResponse, agentNotFoundResponse } from '@/utils/agentResponseHeaders'
import { buildApiReferenceMarkdown } from '@/utils/openapiMarkdown'
import { getOpenAPISpecForVersion } from '@/utils/openapiSpec'
import { resolveLatestVersion } from '@/utils/apiReference'

export const revalidate = 86400 // 24h — keep in sync with API_SPEC_REVALIDATE_SECONDS (Next requires a literal)

export async function GET(_: Request, props: { params: Promise<{ version: string }> }) {
  const params = await props.params
  const raw = params.version
  const version = raw === 'latest' ? await resolveLatestVersion() : raw

  if (!version) return agentNotFoundResponse(`/api-reference/${raw}.md`)

  const spec = await getOpenAPISpecForVersion(version)
  if (!spec) return agentNotFoundResponse(`/api-reference/${raw}.md`)

  return agentResponse(buildApiReferenceMarkdown(spec), { varyAccept: true })
}
