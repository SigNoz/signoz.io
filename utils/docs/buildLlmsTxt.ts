import type { DocsRouteTreeItem } from './agentDiscovery'

/**
 * Builds /llms.txt as a complete table of contents rather than a handful of
 * starter links.
 *
 * Agents that are handed markdown without a map start inventing `.md` paths
 * and guessing routes, which is the dominant source of 404s against docs
 * sites. Listing every page with its title and description removes the reason
 * to guess, and keeps the map one fetch away instead of two.
 */

export type DocDescriptionLookup = Map<string, string>

export type BuildLlmsTxtOptions = {
  siteUrl: string
  tree: DocsRouteTreeItem[]
  /** Keyed by docs slug (route without the `/docs/` prefix). */
  descriptions?: DocDescriptionLookup
}

/** Trailing slash matches the canonical docs URLs used across the site. */
const canonicalDocsUrl = (siteUrl: string, route: string): string => {
  if (route.includes('#') || route.includes('?')) {
    return `${siteUrl}${route}`
  }
  return route.endsWith('/') ? `${siteUrl}${route}` : `${siteUrl}${route}/`
}

export const docsSlugFromRoute = (route: string): string =>
  route.replace(/^\/docs\/?/, '').replace(/\/+$/, '')

/** Collapses whitespace and trims trailing periods for compact one-line entries. */
const normalizeDescription = (value: string): string =>
  value.replace(/\s+/g, ' ').trim().replace(/\.+$/, '')

const renderEntry = (
  item: DocsRouteTreeItem,
  siteUrl: string,
  descriptions?: DocDescriptionLookup
): string => {
  const url = canonicalDocsUrl(siteUrl, item.route as string)
  const description = descriptions?.get(docsSlugFromRoute(item.route as string))
  const normalized = description ? normalizeDescription(description) : ''
  return normalized ? `- [${item.label}](${url}): ${normalized}` : `- [${item.label}](${url})`
}

/**
 * Flattens a nav subtree into entry lines. Nav depth is intentionally dropped:
 * the section heading carries the grouping, and flat lists are cheaper for
 * agents to scan than nested indentation.
 */
const collectEntries = (
  items: DocsRouteTreeItem[],
  siteUrl: string,
  descriptions: DocDescriptionLookup | undefined,
  output: string[],
  seen: Set<string>
): void => {
  items.forEach((item) => {
    if (item.route && !seen.has(item.route)) {
      seen.add(item.route)
      output.push(renderEntry(item, siteUrl, descriptions))
    }

    if (item.children.length > 0) {
      collectEntries(item.children, siteUrl, descriptions, output, seen)
    }
  })
}

export const buildLlmsTxt = ({ siteUrl, tree, descriptions }: BuildLlmsTxtOptions): string => {
  const seen = new Set<string>()

  const sections = tree
    .map((node) => {
      const entries: string[] = []
      collectEntries([node], siteUrl, descriptions, entries, seen)
      if (entries.length === 0) return null
      return [`## ${node.label}`, '', ...entries].join('\n')
    })
    .filter(Boolean) as string[]

  const lines: string[] = [
    '# SigNoz',
    '',
    'SigNoz is an open-source, OpenTelemetry-native observability platform for logs, traces, and metrics.',
    '',
    '## How to read these docs',
    '',
    `- Append ".md" to any docs URL for markdown: ${siteUrl}/docs/introduction.md`,
    `- Or send "Accept: text/markdown" to any docs URL. Both return identical markdown.`,
    '- Markdown is the same content as the HTML page at a fraction of the size. Prefer it.',
    '- Every page below is listed with its full URL. Do not construct docs URLs that are not in this file.',
    '',
    '## Key pages',
    '',
    `- [Pricing](${siteUrl}/pricing.md): plans, per-retention ingestion rates, and how metric samples are billed`,
    `- [Docs sitemap](${siteUrl}/docs/sitemap.md): the same page list as this file, without descriptions`,
    `- [Get started free](${siteUrl}/teams/): sign up for SigNoz Cloud`,
    `- [Contact sales](${siteUrl}/contact-us/): enterprise and custom plans`,
    '',
    '## Agent tooling',
    '',
    'SigNoz ships Agent Skills and an MCP server so agents can read the docs and act on your observability data (query traces/logs/metrics, build dashboards, manage alerts).',
    '',
    `- [Agent Skills & plugin](${siteUrl}/docs/ai/agent-skills/)`,
    `- [MCP server](${siteUrl}/docs/ai/signoz-mcp-server/)`,
    `- [AI use cases](${siteUrl}/docs/ai/use-cases/)`,
    '- Install all skills: npx skills add SigNoz/agent-skills',
    '',
    '# Documentation',
    '',
    ...sections.flatMap((section) => [section, '']),
  ]

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`
}
