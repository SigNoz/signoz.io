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
    'SigNoz Cloud brings your traces, metrics, and logs into one OpenTelemetry-native platform. Simple usage-based pricing, and the freedom to run on your infrastructure with Self-Hosted SigNoz.',
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
    `- [skill.md](${siteMetadata.siteUrl}/skill.md): Root Agent Skill file describing SigNoz skills and when the MCP server is required.`,
    '',
    '## Pricing',
    '',
    `- [pricing.md](${siteMetadata.siteUrl}/pricing.md): Plan tiers, per-signal rates at every retention tier, what the base fee includes, worked bill examples, and the plan feature matrix.`,
    '',
    '## Optional',
    '',
    `- [Docs sitemap (markdown)](${siteMetadata.siteUrl}/docs/sitemap.md): Markdown index of every SigNoz documentation page.`,
    `- [Blog & content sitemap (markdown)](${siteMetadata.siteUrl}/blogs/sitemap.md): Markdown index of every blog post, guide, FAQ, case study, OpenTelemetry article, and comparison.`,
    `- [llms-full.txt](${siteMetadata.siteUrl}/llms-full.txt): Entry-point map of all SigNoz content — docs, blog, product, alternatives, and company pages — with links to markdown sitemaps.`,
    '',
  ].join('\n')

  return agentResponse(body, { contentType: 'text/plain; charset=utf-8' })
}
