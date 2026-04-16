'use client'

import { useRegion } from '../Region/RegionContext'

interface MCPInstallButtonProps {
  /** Which MCP client to generate a deep link for. */
  client: 'cursor' | 'vscode'
  /** Display label, e.g. "Add to Cursor" */
  children: React.ReactNode
  /** Which client icon to show */
  icon?: 'cursor' | 'vscode'
}

const ICON_SRCS: Record<string, string> = {
  cursor: '/img/docs/cursor-icon.webp',
  vscode: '/img/docs/vscode-icon.webp',
}

const buildDeepLink = (client: 'cursor' | 'vscode', region: string): string => {
  const mcpUrl = `https://mcp.${region}.signoz.cloud/mcp`

  switch (client) {
    case 'cursor': {
      const config = btoa(JSON.stringify({ url: mcpUrl }))
      return `cursor://anysphere.cursor-deeplink/mcp/install?name=SigNoz&config=${config}`
    }
    case 'vscode': {
      const json = JSON.stringify({
        name: 'signoz',
        config: { type: 'http', url: mcpUrl },
      })
      return `vscode:mcp/install?${encodeURIComponent(json)}`
    }
    default:
      return '#'
  }
}

const dedupeRegions = (regions: string[]): string[] => {
  const seen = new Set<string>()
  const result: string[] = []

  for (const region of regions) {
    const normalized = region.trim().toLowerCase()
    if (!normalized || seen.has(normalized)) continue
    seen.add(normalized)
    result.push(normalized)
  }

  return result
}

const MCPInstallButton: React.FC<MCPInstallButtonProps> = ({ client, children, icon }) => {
  const { regions, region: contextRegion } = useRegion()
  const availableRegions = dedupeRegions(regions.map((r) => r.name))
  const selectedRegion = contextRegion?.trim().toLowerCase() || null
  const hasSelectedRegion = selectedRegion ? availableRegions.includes(selectedRegion) : false

  const renderInstallLink = (href: string, label: React.ReactNode) => (
    <a
      href={href}
      className="not-prose inline-flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3.5 py-1.5 text-sm font-semibold leading-none text-gray-900 no-underline shadow-sm transition-colors hover:bg-zinc-100 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {icon && ICON_SRCS[icon] && (
        <img
          src={ICON_SRCS[icon]}
          alt=""
          width={18}
          height={18}
          className="not-prose m-0 block shrink-0 rounded-sm p-0"
        />
      )}
      <span className="leading-none">{label}</span>
    </a>
  )

  return (
    <div className="not-prose my-1 w-fit">
      {hasSelectedRegion && selectedRegion ? (
        renderInstallLink(buildDeepLink(client, selectedRegion), children)
      ) : (
        <div className="not-prose flex flex-wrap items-center gap-2">
          {availableRegions.map((region) =>
            renderInstallLink(
              buildDeepLink(client, region),
              <>
                {children} ({region.toUpperCase()})
              </>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default MCPInstallButton
