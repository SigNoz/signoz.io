import siteMetadata from '@/data/siteMetadata'
import {
  getLlmStarterLinks,
  INTRO_DESCRIPTION,
  type LlmStarterLink,
} from '@/utils/docs/agentDiscovery'
import { agentResponse } from '@/utils/agentResponseHeaders'

const AGENT_TOOLING_ROUTE_PREFIX = '/docs/ai/'

const formatLink = (item: LlmStarterLink): string => {
  const url = `${siteMetadata.siteUrl}${item.route}/`
  return item.description
    ? `- [${item.label}](${url}): ${item.description}`
    : `- [${item.label}](${url})`
}

const FALLBACK_STARTER_LINES = formatLink({
  label: 'Get Started',
  route: '/docs/introduction',
  description: INTRO_DESCRIPTION,
})

const FALLBACK_AGENT_TOOLING_LINES = [
  formatLink({ label: 'Agent Skills', route: '/docs/ai/agent-skills' }),
  formatLink({ label: 'SigNoz MCP Server', route: '/docs/ai/signoz-mcp-server' }),
  formatLink({ label: 'AI Use Cases', route: '/docs/ai/use-cases' }),
].join('\n')

export async function GET() {
  const starters = await getLlmStarterLinks()
  const starterDocs = starters.filter((item) => !item.route.startsWith(AGENT_TOOLING_ROUTE_PREFIX))
  const agentTooling = starters.filter((item) => item.route.startsWith(AGENT_TOOLING_ROUTE_PREFIX))

  const starterLines =
    starterDocs.length > 0 ? starterDocs.map(formatLink).join('\n') : FALLBACK_STARTER_LINES
  const agentToolingLines =
    agentTooling.length > 0 ? agentTooling.map(formatLink).join('\n') : FALLBACK_AGENT_TOOLING_LINES

  const body = [
    '# SigNoz',
    '',
    '> SigNoz is an open-source observability platform for metrics, traces, and logs.',
    '',
    `Markdown versions of every page are available: append ".md" to any signoz.io page URL — docs (${siteMetadata.siteUrl}/docs/introduction.md), blog posts (${siteMetadata.siteUrl}/blog/<slug>.md), comparisons, guides, and product pages like ${siteMetadata.siteUrl}/pricing.md — or request any page with "Accept: text/markdown".`,
    '',
    '## Starter docs',
    '',
    starterLines,
    '',
    '## Agent tooling',
    '',
    'SigNoz ships Agent Skills and an MCP server so agents can read the docs and act on your observability data (query traces/logs/metrics, build dashboards, manage alerts). Install all skills: npx skills add SigNoz/agent-skills',
    '',
    agentToolingLines,
    '',
    '## Optional',
    '',
    `- [Docs sitemap (markdown)](${siteMetadata.siteUrl}/docs/sitemap.md): Markdown index of every SigNoz documentation page.`,
    '',
  ].join('\n')

  return agentResponse(body, { contentType: 'text/plain; charset=utf-8' })
}
