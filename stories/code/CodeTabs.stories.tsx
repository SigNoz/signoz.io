import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CodeTab, CodeTabs } from '@/components/CodeBlock'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const meta = {
  title: 'MDX Components/Code/CodeTabs',
  component: CodeTabs,
  parameters: {
    layout: 'padded',
    mdxUsage: `
{/* default marks the initially active tab; each tab wraps a fenced code block */}
<CodeTabs>
<CodeTab value="npm" label="npm" default>

\`\`\`bash
npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node
\`\`\`

</CodeTab>
<CodeTab value="yarn" label="yarn">

\`\`\`bash
yarn add @opentelemetry/api @opentelemetry/auto-instrumentations-node
\`\`\`

</CodeTab>
</CodeTabs>
`,
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof CodeTabs>

export default meta

type Story = StoryObj<typeof meta>

const fence = (lang: string, ...lines: string[]) => ['```' + lang, ...lines, '```'].join('\n')

export const InstallCommands: Story = {
  loaders: [
    async () => ({
      npm: await markdownToHast(
        fence('bash', 'npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node')
      ),
      yarn: await markdownToHast(
        fence('bash', 'yarn add @opentelemetry/api @opentelemetry/auto-instrumentations-node')
      ),
      pnpm: await markdownToHast(
        fence('bash', 'pnpm add @opentelemetry/api @opentelemetry/auto-instrumentations-node')
      ),
    }),
  ],
  render: (_args, { loaded }) => (
    <CodeTabs>
      <CodeTab value="npm" label="npm" default>
        {renderHast(loaded.npm)}
      </CodeTab>
      <CodeTab value="yarn" label="yarn">
        {renderHast(loaded.yarn)}
      </CodeTab>
      <CodeTab value="pnpm" label="pnpm">
        {renderHast(loaded.pnpm)}
      </CodeTab>
    </CodeTabs>
  ),
}

export const ExporterProtocols: Story = {
  loaders: [
    async () => ({
      grpc: await markdownToHast(
        fence(
          'yaml',
          'exporters:',
          '  otlp:',
          '    endpoint: "ingest.us.signoz.cloud:443"',
          '    tls:',
          '      insecure: false',
          '    headers:',
          '      "signoz-ingestion-key": "<your-ingestion-key>"'
        )
      ),
      http: await markdownToHast(
        fence(
          'yaml',
          'exporters:',
          '  otlphttp:',
          '    endpoint: "https://ingest.us.signoz.cloud:443"',
          '    headers:',
          '      "signoz-ingestion-key": "<your-ingestion-key>"'
        )
      ),
    }),
  ],
  render: (_args, { loaded }) => (
    <CodeTabs>
      <CodeTab value="grpc" label="OTLP gRPC" default>
        {renderHast(loaded.grpc)}
      </CodeTab>
      <CodeTab value="http" label="OTLP HTTP">
        {renderHast(loaded.http)}
      </CodeTab>
    </CodeTabs>
  ),
}

// `default` on any tab (not just the first) picks the initially active one.
export const DefaultOnSecondTab: Story = {
  loaders: [
    async () => ({
      docker: await markdownToHast(fence('bash', 'docker compose up -d')),
      kubernetes: await markdownToHast(
        fence(
          'bash',
          'helm repo add signoz https://charts.signoz.io',
          'helm install my-release signoz/signoz -n platform --create-namespace'
        )
      ),
    }),
  ],
  render: (_args, { loaded }) => (
    <CodeTabs>
      <CodeTab value="docker" label="Docker">
        {renderHast(loaded.docker)}
      </CodeTab>
      <CodeTab value="kubernetes" label="Kubernetes" default>
        {renderHast(loaded.kubernetes)}
      </CodeTab>
    </CodeTabs>
  ),
}
