import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

const site = siteMetadata.siteUrl

/**
 * Single source for the agent quick-start skill served at /skill.md and
 * /docs/skill.md. Every command, endpoint, header, and port mirrors the
 * linked docs pages; update them together.
 */
export const SKILL_MD = `---
name: signoz
description: Get started with SigNoz, the OpenTelemetry-native observability platform. Send traces, metrics, and logs to SigNoz Cloud or a self-hosted instance, verify data arrived, and use the SigNoz docs, Agent Skills, and MCP server to query data, build dashboards, manage alerts, and troubleshoot.
---

# SigNoz

SigNoz is an open-source, OpenTelemetry-native observability platform. It brings traces, metrics, and logs into one place, with APM, dashboards, alerts, and exceptions built on top. Applications send data over OTLP using standard OpenTelemetry SDKs and collectors.

## Products

- **[SigNoz Cloud](${site}/teams/)**: fully managed SigNoz. No infrastructure to run.
- **[Self-hosted SigNoz](${site}/docs/install/self-host/)**: run SigNoz on your own infrastructure with Docker or Kubernetes.
- **[SigNoz MCP server](${site}/docs/ai/signoz-mcp-server/)**: query your observability data from AI agents over the Model Context Protocol.
- **[Agent Skills and plugin](${site}/docs/ai/agent-skills/)**: teach AI coding assistants to instrument apps, query data, and manage SigNoz.

## Quick start: SigNoz Cloud

1. Sign up for [SigNoz Cloud](${site}/teams/).
2. In SigNoz, open **Settings** > **Ingestion** to find your region and create an ingestion key. Endpoints follow \`https://ingest.<region>.signoz.cloud:443\` ([ingestion overview](${site}/docs/ingestion/signoz-cloud/overview/)).
3. Send traces from a Python app with OpenTelemetry auto-instrumentation:

\`\`\`bash
export OTEL_RESOURCE_ATTRIBUTES="service.name=<service-name>"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"
export OTEL_EXPORTER_OTLP_HEADERS="signoz-ingestion-key=<your-ingestion-key>"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_METRICS_EXPORTER="none"

pip install opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-bootstrap --action=install
opentelemetry-instrument <your_run_command>
\`\`\`

Guides for other languages and frameworks: ${site}/docs/instrumentation/

## Quick start: self-hosted

Install SigNoz with Docker using Foundry (Docker Engine 20.10+ with Compose v2, at least 4GB of memory for Docker):

\`\`\`bash
# Install the foundryctl CLI
curl -fsSL https://signoz.io/foundry.sh | bash

# Describe the deployment
cat > casting.yaml <<'EOF'
apiVersion: v1alpha1
kind: Installation
metadata:
  name: signoz
spec:
  deployment:
    flavor: compose
    mode: docker
EOF

# Validate, generate, and start the stack
foundryctl cast -f casting.yaml
\`\`\`

Open the UI at \`http://localhost:8080/\`. OTLP ingestion listens on \`4317\` (gRPC) and \`4318\` (HTTP). For the Python example above, set \`OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"\` and drop \`OTEL_EXPORTER_OTLP_HEADERS\`; self-hosted needs no ingestion key ([Docker install](${site}/docs/install/docker/), [Cloud vs self-hosted](${site}/docs/ingestion/cloud-vs-self-hosted/)).

## Verify data arrived

Hit your app a few times, then open **Services** in SigNoz and click **Refresh**; your service should appear, with traces under **Traces**. If nothing shows up, follow ${site}/docs/ingestion/signoz-cloud/troubleshooting/data-not-appearing/

## Documentation

- [Documentation index (llms.txt)](${site}/llms.txt)
- [Docs sitemap (markdown)](${site}/docs/sitemap.md)
- Every docs page serves markdown: append \`.md\` to the URL or send \`Accept: text/markdown\`.

## Agent skills

Install every SigNoz skill with skills.sh (works with Codex, Cursor, Gemini, OpenCode, and other compatible agents):

\`\`\`bash
npx skills add SigNoz/agent-skills
\`\`\`

Or install the SigNoz plugin, which bundles all skills plus the MCP server registration, for Claude Code, Codex, Cursor, Gemini CLI, Devin CLI, and Antigravity CLI. Per-client steps: ${site}/docs/ai/agent-skills/

## When the SigNoz MCP server is required

Docs-only skills such as signoz-searching-docs work standalone. Skills that act on your observability data — querying traces, logs, and metrics, creating or modifying dashboards, managing alerts and saved views — require the SigNoz MCP server: \`https://mcp.<region>.signoz.cloud/mcp\` for SigNoz Cloud, or your self-hosted MCP URL. skills.sh installs the skill files only, so connect the MCP server separately: ${site}/docs/ai/signoz-mcp-server/

## Canonical sources

- [Agent Skills installation guide](${site}/docs/ai/agent-skills/)
- [SigNoz/agent-skills on GitHub](https://github.com/SigNoz/agent-skills)
- [SigNoz skills on skills.sh](https://skills.sh/signoz/agent-skills)
- [SigNoz MCP Server](${site}/docs/ai/signoz-mcp-server/)
- [AI Use Cases](${site}/docs/ai/use-cases/)
`

export function skillMarkdownResponse(): Response {
  return agentResponse(SKILL_MD)
}
