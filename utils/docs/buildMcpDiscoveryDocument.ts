import siteMetadata from '@/data/siteMetadata'

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
