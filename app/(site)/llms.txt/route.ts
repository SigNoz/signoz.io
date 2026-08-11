import siteMetadata from '@/data/siteMetadata'
import { getLlmStarterLinks } from '@/utils/docs/agentDiscovery'
import { agentResponse } from '@/utils/agentResponseHeaders'

export async function GET() {
  const starters = await getLlmStarterLinks()
  const starterLines =
    starters.length > 0
      ? starters.map((item) => `- ${item.label}: ${siteMetadata.siteUrl}${item.route}/`).join('\n')
      : `- Docs index: ${siteMetadata.siteUrl}/docs/introduction/`

  const body = [
    '# SigNoz Documentation for AI Agents',
    '',
    'SigNoz is an open-source observability platform for metrics, traces, and logs.',
    '',
    `Docs root: ${siteMetadata.siteUrl}/docs/introduction/`,
    '',
    '## Fetching pages as markdown',
    `- Append ".md" to any SigNoz page URL to receive markdown page content — docs (${siteMetadata.siteUrl}/docs/introduction.md), blog posts (${siteMetadata.siteUrl}/blog/<slug>.md), comparisons, guides, and product pages like ${siteMetadata.siteUrl}/pricing.md`,
    '- Or request any page with "Accept: text/markdown".',
    '',
    '## Agent tooling',
    'SigNoz ships Agent Skills and an MCP server so agents can read the docs and act on your observability data (query traces/logs/metrics, build dashboards, manage alerts).',
    `- Agent Skills & plugin: ${siteMetadata.siteUrl}/docs/ai/agent-skills/`,
    `- MCP server: ${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/`,
    '- Install all skills: npx skills add SigNoz/agent-skills',
    `- AI use cases: ${siteMetadata.siteUrl}/docs/ai/use-cases/`,
    '',
    '## Starter docs',
    starterLines,
    '',
    '## Discovery',
    `- Markdown sitemap: ${siteMetadata.siteUrl}/docs/sitemap.md`,
    '',
  ].join('\n')

  return agentResponse(body, { contentType: 'text/plain; charset=utf-8' })
}
