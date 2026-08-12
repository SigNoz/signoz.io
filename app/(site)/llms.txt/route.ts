import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { getLlmStarterLinks } from '@/utils/docs/agentDiscovery'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function GET() {
  const starters = await getLlmStarterLinks()
  const starterLines =
    starters.length > 0
      ? starters.map((item) => `- ${item.label}: ${siteMetadata.siteUrl}${item.route}/`).join('\n')
      : `- Docs index: ${siteMetadata.siteUrl}/docs/introduction/`

  const body = [
    '# SigNoz Documentation for AI Agents',
    '',
    'SigNoz is the company behind the open-source SigNoz observability project.',
    'SigNoz Cloud is the managed service; Self-Hosted SigNoz is the user-managed open-source deployment.',
    '',
    `Docs root: ${siteMetadata.siteUrl}/docs/introduction/`,
    '',
    '## Fetching docs pages',
    `- Request ${siteMetadata.siteUrl}/docs/... with "Accept: text/markdown" to receive markdown page content.`,
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

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
