import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'
import { DOCS_MCP_SERVER_NAME, DOCS_MCP_URL } from '@/utils/docs/docsMcp'

export const MCP_URL_TEMPLATE = 'https://mcp.<region>.signoz.cloud/mcp'

export const REGION_INSTRUCTIONS =
  'Replace <region> with your SigNoz Cloud region. Find it under Settings → Ingestion in SigNoz, or see https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint. Using the wrong region fails authentication.'

type ControlPlaneRegion = { name?: string }
type ControlPlaneRegionsResponse = { status?: string; data?: ControlPlaneRegion[] }

const fetchRegionNames = async (): Promise<string[]> => {
  const controlPlaneUrl = process.env.NEXT_PUBLIC_CONTROL_PLANE_URL
  if (!controlPlaneUrl) return []

  try {
    const response = await fetch(`${controlPlaneUrl}/regions`, { next: { revalidate: 3600 } })
    const data: ControlPlaneRegionsResponse = await response.json()
    if (data.status === 'success' && data.data && data.data.length > 0) {
      return data.data.map((region) => region.name).filter((name): name is string => Boolean(name))
    }
  } catch {
    // Fall through to the placeholder server below.
  }

  return []
}

const regionServer = (region: string) => ({
  name: `signoz-cloud-${region}`,
  description: `SigNoz Cloud MCP server for the ${region} region.`,
  url: `https://mcp.${region}.signoz.cloud/mcp`,
  transport: 'http',
  authentication: 'oauth2',
})

const placeholderServer = () => ({
  name: 'signoz-cloud',
  description: `SigNoz Cloud MCP server. ${REGION_INSTRUCTIONS}`,
  url: MCP_URL_TEMPLATE,
  transport: 'http',
  authentication: 'oauth2',
})

// Public docs-only server; listed apart from `servers` because it needs no account.
const docsServer = () => ({
  name: DOCS_MCP_SERVER_NAME,
  description:
    'Public SigNoz documentation MCP server. Search and read official SigNoz docs with signoz_search_docs and signoz_fetch_doc. No account, region, or credentials required; no access to observability data.',
  url: DOCS_MCP_URL,
  transport: 'http',
  authentication: 'none',
  tools: ['signoz_search_docs', 'signoz_fetch_doc'],
})

export function buildMcpDiscoveryDocument(regionNames: string[]) {
  return {
    version: '1.0.0',
    name: 'SigNoz',
    description:
      'SigNoz Cloud hosted MCP servers for querying your observability data (metrics, traces, logs, alerts, dashboards) through natural language. Connect to the regional endpoint that matches your SigNoz Cloud account.',
    transport: 'http',
    url: MCP_URL_TEMPLATE,
    instructions: REGION_INSTRUCTIONS,
    documentation: `${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/`,
    authentication: {
      type: 'oauth2',
      description:
        'OAuth 2.1 with Dynamic Client Registration (RFC 7591) and Authorization Code + PKCE; auth endpoints are discovered from the server metadata. Clients that cannot run interactive OAuth flows can instead send SIGNOZ-API-KEY and X-SigNoz-URL request headers.',
    },
    servers: regionNames.length > 0 ? regionNames.map(regionServer) : [placeholderServer()],
    docsServer: docsServer(),
    selfHosted: {
      description:
        'Self-hosted SigNoz users run the open-source MCP server locally over stdio or HTTP.',
      repository: 'https://github.com/SigNoz/signoz-mcp-server',
    },
  }
}

export async function getMcpDiscoveryDocument() {
  return buildMcpDiscoveryDocument(await fetchRegionNames())
}

export async function mcpDiscoveryResponse() {
  const body = JSON.stringify(await getMcpDiscoveryDocument(), null, 2)
  return agentResponse(body, { contentType: 'application/json; charset=utf-8' })
}
