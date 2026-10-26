import { getDocsRouteTree, type DocsRouteTreeItem } from '@/utils/docs/agentDiscovery'
import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

// Agents read this file out of context, so every link is an absolute URL to
// the page's markdown version (e.g. https://signoz.io/docs/install.md).
// Fragments are kept on the markdown URL (e.g. /docs/page.md#section).
const formatSitemapRoute = (route: string): string => {
  const [pathWithQuery, fragment] = route.split('#')
  const pathname = pathWithQuery.split('?')[0].replace(/\/+$/, '')
  const docsPath = pathname === '/docs' || pathname === '' ? '/docs/introduction' : pathname
  const markdownUrl = `${siteMetadata.siteUrl}${docsPath}.md`

  return fragment ? `${markdownUrl}#${fragment}` : markdownUrl
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
    'Every link below points to the markdown version of the page. Drop the `.md` suffix for the HTML page.',
    '',
    renderTree(tree),
    '',
  ].join('\n')

  return agentResponse(markdown)
}
