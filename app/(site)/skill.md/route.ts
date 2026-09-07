import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

const SKILL_MD = `---
name: signoz
description: Use SigNoz documentation to instrument applications, query metrics, logs and traces, build dashboards, manage alerts, and troubleshoot observability workflows.
---

# SigNoz Agent Skills

SigNoz publishes Agent Skills that teach AI coding assistants to work with SigNoz: search the docs, generate queries over traces, logs, and metrics, write ClickHouse queries, create and modify dashboards, manage alerts and saved Explorer views, orchestrate observability setup, and reduce telemetry cost.

## Install

Install every SigNoz skill with skills.sh (works with Codex, Cursor, Gemini, OpenCode, and other compatible agents):

\`\`\`bash
npx skills add SigNoz/agent-skills
\`\`\`

Or install the SigNoz plugin, which bundles all skills plus the MCP server registration, for Claude Code, Codex, Cursor, Gemini CLI, Devin CLI, and Antigravity CLI. Per-client steps: ${siteMetadata.siteUrl}/docs/ai/agent-skills/

## When the SigNoz MCP server is required

Docs-only skills such as signoz-searching-docs work standalone. Skills that act on your observability data — querying traces, logs, and metrics, creating or modifying dashboards, managing alerts and saved views — require the SigNoz MCP server: \`https://mcp.<region>.signoz.cloud/mcp\` for SigNoz Cloud, or your self-hosted MCP URL. skills.sh installs the skill files only, so connect the MCP server separately: ${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/

## Canonical sources

- [Agent Skills installation guide](${siteMetadata.siteUrl}/docs/ai/agent-skills/)
- [SigNoz/agent-skills on GitHub](https://github.com/SigNoz/agent-skills)
- [SigNoz skills on skills.sh](https://skills.sh/signoz/agent-skills)
- [SigNoz MCP Server](${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/)
- [AI Use Cases](${siteMetadata.siteUrl}/docs/ai/use-cases/)
`

export async function GET() {
  return agentResponse(SKILL_MD)
}
