import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CodeTab, CodeTabs } from '@/components/CodeBlock'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const fence = (lang: string, ...lines: string[]) => ['```' + lang, ...lines, '```'].join('\n')

const npmInstall = fence(
  'bash',
  'npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node'
)
const yarnInstall = fence(
  'bash',
  'yarn add @opentelemetry/api @opentelemetry/auto-instrumentations-node'
)
const pnpmInstall = fence(
  'bash',
  'pnpm add @opentelemetry/api @opentelemetry/auto-instrumentations-node'
)

const grpcExporter = fence(
  'yaml',
  'exporters:',
  '  otlp:',
  '    endpoint: "ingest.us.signoz.cloud:443"',
  '    tls:',
  '      insecure: false',
  '    headers:',
  '      "signoz-ingestion-key": "<your-ingestion-key>"'
)
const httpExporter = fence(
  'yaml',
  'exporters:',
  '  otlphttp:',
  '    endpoint: "https://ingest.us.signoz.cloud:443"',
  '    headers:',
  '      "signoz-ingestion-key": "<your-ingestion-key>"'
)

const dockerCommand = fence('bash', 'docker compose up -d')
const kubernetesCommand = fence(
  'bash',
  'helm repo add signoz https://charts.signoz.io',
  'helm install my-release signoz/signoz -n platform --create-namespace'
)

const installCommandsMdx = `
{/* default marks the initially active tab; each tab wraps a fenced code block */}
<CodeTabs>
<CodeTab value="npm" label="npm" default>

${npmInstall}

</CodeTab>
<CodeTab value="yarn" label="yarn">

${yarnInstall}

</CodeTab>
<CodeTab value="pnpm" label="pnpm">

${pnpmInstall}

</CodeTab>
</CodeTabs>
`

const exporterProtocolsMdx = `
{/* Tab labels are free text; value is the stable id */}
<CodeTabs>
<CodeTab value="grpc" label="OTLP gRPC" default>

${grpcExporter}

</CodeTab>
<CodeTab value="http" label="OTLP HTTP">

${httpExporter}

</CodeTab>
</CodeTabs>
`

const defaultOnSecondTabMdx = `
{/* default on any tab (not just the first) picks the initially active one */}
<CodeTabs>
<CodeTab value="docker" label="Docker">

${dockerCommand}

</CodeTab>
<CodeTab value="kubernetes" label="Kubernetes" default>

${kubernetesCommand}

</CodeTab>
</CodeTabs>
`

const meta = {
  title: 'MDX Components/Code/CodeTabs',
  component: CodeTabs,
  parameters: {
    layout: 'padded',
    mdxUsage: installCommandsMdx,
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof CodeTabs>

export default meta

type Story = StoryObj<typeof meta>

export const InstallCommands: Story = {
  parameters: { mdxUsage: installCommandsMdx },
  loaders: [
    async () => ({
      npm: await markdownToHast(npmInstall),
      yarn: await markdownToHast(yarnInstall),
      pnpm: await markdownToHast(pnpmInstall),
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
  parameters: { mdxUsage: exporterProtocolsMdx },
  loaders: [
    async () => ({
      grpc: await markdownToHast(grpcExporter),
      http: await markdownToHast(httpExporter),
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
  parameters: { mdxUsage: defaultOnSecondTabMdx },
  loaders: [
    async () => ({
      docker: await markdownToHast(dockerCommand),
      kubernetes: await markdownToHast(kubernetesCommand),
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
