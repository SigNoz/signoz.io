import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

/**
 * `/agents.md` is a widely-adopted agent entry point, and agents request it
 * unprompted (it was the single most-requested missing `.md` path in
 * production logs). Its job is to hand over the map: benchmarks of agent docs
 * navigation show that linking an index like /llms.txt — not markdown alone —
 * is what stops agents guessing URLs that were never real.
 */
const AGENTS_MD = `# SigNoz for agents

SigNoz is an open-source, OpenTelemetry-native observability platform for traces, metrics, and logs.

## Start here

- [llms.txt](${siteMetadata.siteUrl}/llms.txt): index of every section, with titles and descriptions. Read this before guessing a URL.
- [llms-full.txt](${siteMetadata.siteUrl}/llms-full.txt): the same map expanded with per-section markdown sitemaps.
- [Docs sitemap](${siteMetadata.siteUrl}/docs/sitemap.md): every documentation page as markdown.

## Fetching markdown

Every page on signoz.io serves a markdown representation two ways:

- Append \`.md\` to the page URL — ${siteMetadata.siteUrl}/docs/introduction.md, ${siteMetadata.siteUrl}/blog/<slug>.md, ${siteMetadata.siteUrl}/pricing.md
- Send \`Accept: text/markdown\` to the canonical URL

Both return identical bytes. Use the flat page URL: \`/docs/install/docker.md\`, not \`/docs/install/docker/index.html.md\`.

## Tooling

- [Agent Skills](${siteMetadata.siteUrl}/skill.md): install SigNoz skills for coding agents.
- [MCP server](${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/): query traces, logs, and metrics, and manage dashboards and alerts.
- [API reference](${siteMetadata.siteUrl}/api-reference/): programmatic access to your telemetry data.
`

export async function GET() {
  return agentResponse(AGENTS_MD)
}
