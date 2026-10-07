import { getDocsRouteTree, type DocsRouteTreeItem } from '@/utils/docs/agentDiscovery'
import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

const formatSitemapRoute = (route: string): string => {
  // Preserve fragment/query routes as-is (e.g. /docs/page#section).
  if (route.includes('#') || route.includes('?')) {
    return route
  }

  return route.endsWith('/') ? route : `${route}/`
}

const renderTree = (items: DocsRouteTreeItem[], indent = ''): string => {
  return items
    .map((item) => {
      const linkLine = item.route
        ? `${indent}- [${item.label}](${formatSitemapRoute(item.route)})`
        : `${indent}- ${item.label}`
      const children =
        item.children.length > 0 ? `\n${renderTree(item.children, `${indent}  `)}` : ''
      return `${linkLine}${children}`
    })
    .join('\n')
}

export async function GET() {
  const tree = await getDocsRouteTree()
  const markdown = [
    '# SigNoz Docs Sitemap',
    '',
    `Canonical docs base: ${siteMetadata.siteUrl}/docs/`,
    '',
    renderTree(tree),
    '',
  ].join('\n')

  return agentResponse(markdown)
}
