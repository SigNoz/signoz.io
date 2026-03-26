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
  cursor: '/img/docs/cursor-icon.png',
  vscode: '/img/docs/vscode-icon.png',
}

const DEFAULT_REGIONS = ['us', 'eu', 'in', 'us2', 'eu2', 'in2'] as const

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

const normalizeRegionList = (regions: string[]): string[] => {
  const uniqueRegions = new Set<string>()

  for (const region of [...DEFAULT_REGIONS, ...regions]) {
    const normalizedRegion = region.trim().toLowerCase()
    if (!normalizedRegion) continue
    uniqueRegions.add(normalizedRegion)
  }

  return Array.from(uniqueRegions)
}

const formatRegionLabel = (region: string): string => region.toUpperCase()

const MCPInstallButton: React.FC<MCPInstallButtonProps> = ({ client, children, icon }) => {
  const { regions, region: contextRegion } = useRegion()
  const availableRegions = normalizeRegionList(regions.map((region) => region.name))
  const selectedRegion = contextRegion?.trim().toLowerCase() || null
  const hasSelectedRegion = selectedRegion ? availableRegions.includes(selectedRegion) : false

  const buildRegionalLabel = (region: string): React.ReactNode => (
    <>
      {children} ({formatRegionLabel(region)})
    </>
  )

  const renderInstallLink = (href: string, label: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="not-prose mcp-install-button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: '6px',
        backgroundColor: '#fff',
        padding: '6px 14px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#111',
        textDecoration: 'none',
        border: '1px solid rgba(0,0,0,0.1)',
        cursor: 'pointer',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        lineHeight: '1',
        width: 'auto',
        height: 'auto',
      }}
    >
      {icon && ICON_SRCS[icon] && (
        <img
          src={ICON_SRCS[icon]}
          alt=""
          width={18}
          height={18}
          className="not-prose"
          style={{
            flexShrink: 0,
            borderRadius: '2px',
            margin: 0,
            padding: 0,
            display: 'block',
          }}
        />
      )}
      <span style={{ lineHeight: '1' }}>{label}</span>
    </a>
  )

  return (
    <div className="not-prose" style={{ width: 'fit-content', margin: '4px 0' }}>
      {hasSelectedRegion && selectedRegion ? (
        renderInstallLink(buildDeepLink(client, selectedRegion), children)
      ) : (
        <div className="not-prose flex flex-wrap items-center gap-2">
          {availableRegions.map((region) =>
            renderInstallLink(buildDeepLink(client, region), buildRegionalLabel(region))
          )}
        </div>
      )}
      <style>{`
        .mcp-install-button {
          transition: background-color 0.15s, box-shadow 0.15s;
        }
        .mcp-install-button:hover,
        .mcp-install-button:focus-visible {
          background-color: #f4f4f5 !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15) !important;
        }
        .mcp-install-button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}

export default MCPInstallButton
