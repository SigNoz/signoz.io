import { NextResponse } from 'next/server'
import { getDocsRouteTree, type DocsRouteTreeItem } from '@/utils/docs/agentDiscovery'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

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
  const tree = getDocsRouteTree()
  const markdown = [
    '# SigNoz Docs Sitemap',
    '',
    `Canonical docs base: ${siteMetadata.siteUrl}/docs/`,
    '',
    renderTree(tree),
    '',
  ].join('\n')

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
