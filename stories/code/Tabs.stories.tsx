import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Tabs from '@/components/Tabs'
import TabItem from '@/components/TabItem'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const pythonContent = [
  'Install the OpenTelemetry Python distro and exporter:',
  '',
  '```bash',
  'pip install opentelemetry-distro opentelemetry-exporter-otlp',
  'opentelemetry-bootstrap --action=install',
  '```',
  '',
  'Then run your application with auto-instrumentation:',
  '',
  '```bash',
  'OTEL_SERVICE_NAME=my-service opentelemetry-instrument python app.py',
  '```',
].join('\n')

const javascriptContent = [
  'Install the OpenTelemetry Node.js packages:',
  '',
  '```bash',
  'npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node',
  '```',
  '',
  'Load the instrumentation before your application code with `--require`.',
].join('\n')

const javaContent = [
  'Download the OpenTelemetry Java agent and attach it to your JVM:',
  '',
  '```bash',
  'java -javaagent:opentelemetry-javaagent.jar -jar my-service.jar',
  '```',
  '',
  'No code changes are required for auto-instrumentation.',
].join('\n')

const cloudContent =
  'Create a [SigNoz Cloud account](https://signoz.io/teams/) and copy your ingestion key from **Settings → Ingestion Settings**.'

const selfHostContent =
  'Install SigNoz with Docker or Helm, see the [install docs](https://signoz.io/docs/install/), then point your exporter at `http://localhost:4317`.'

const manualContent =
  'Manual instrumentation gives you full control over spans. Create a tracer with `trace.getTracer()` and wrap the operations you care about.'

const autoContent =
  'Auto-instrumentation covers popular frameworks (HTTP servers, database clients, message queues) with zero code changes. Recommended starting point.'

const languageTabsMdx = `
{/* entityName syncs the selected tab to a ?language= query param; default marks the initially active tab */}
<Tabs entityName="language">
<TabItem value="python" label="Python" default>

${pythonContent}

</TabItem>
<TabItem value="javascript" label="JavaScript">

${javascriptContent}

</TabItem>
<TabItem value="java" label="Java">

${javaContent}

</TabItem>
</Tabs>
`

const pillVariantMdx = `
{/* variant="pill" renders compact pill-style tabs; without entityName the selection is local only */}
<Tabs variant="pill">
<TabItem value="cloud" label="SigNoz Cloud" default>

${cloudContent}

</TabItem>
<TabItem value="self-host" label="Self-Host">

${selfHostContent}

</TabItem>
</Tabs>
`

const defaultOnSecondTabMdx = `
{/* default on any TabItem picks the initially active tab */}
<Tabs>
<TabItem value="manual" label="Manual">

${manualContent}

</TabItem>
<TabItem value="auto" label="Automatic" default>

${autoContent}

</TabItem>
</Tabs>
`

const previewMdx = [languageTabsMdx, pillVariantMdx, defaultOnSecondTabMdx].join('\n')

const meta = {
  title: 'MDX Components/Code/Tabs',
  component: Tabs,
  parameters: {
    mdxUsage: languageTabsMdx,
    chromatic: { disableSnapshot: true },
  },
  args: {
    children: null,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'pill'],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({
      python: await markdownToHast(pythonContent),
      javascript: await markdownToHast(javascriptContent),
      java: await markdownToHast(javaContent),
      cloud: await markdownToHast(cloudContent),
      selfHost: await markdownToHast(selfHostContent),
      manual: await markdownToHast(manualContent),
      auto: await markdownToHast(autoContent),
    }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-6">
      <Tabs entityName="language">
        <TabItem value="python" label="Python" default>
          {renderHast(loaded.python)}
        </TabItem>
        <TabItem value="javascript" label="JavaScript">
          {renderHast(loaded.javascript)}
        </TabItem>
        <TabItem value="java" label="Java">
          {renderHast(loaded.java)}
        </TabItem>
      </Tabs>
      <Tabs variant="pill">
        <TabItem value="cloud" label="SigNoz Cloud" default>
          {renderHast(loaded.cloud)}
        </TabItem>
        <TabItem value="self-host" label="Self-Host">
          {renderHast(loaded.selfHost)}
        </TabItem>
      </Tabs>
      <Tabs>
        <TabItem value="manual" label="Manual">
          {renderHast(loaded.manual)}
        </TabItem>
        <TabItem value="auto" label="Automatic" default>
          {renderHast(loaded.auto)}
        </TabItem>
      </Tabs>
    </div>
  ),
}

export const LanguageTabs: Story = {
  parameters: { mdxUsage: languageTabsMdx },
  loaders: [
    async () => ({
      python: await markdownToHast(pythonContent),
      javascript: await markdownToHast(javascriptContent),
      java: await markdownToHast(javaContent),
    }),
  ],
  render: (_args, { loaded }) => (
    <Tabs entityName="language">
      <TabItem value="python" label="Python" default>
        {renderHast(loaded.python)}
      </TabItem>
      <TabItem value="javascript" label="JavaScript">
        {renderHast(loaded.javascript)}
      </TabItem>
      <TabItem value="java" label="Java">
        {renderHast(loaded.java)}
      </TabItem>
    </Tabs>
  ),
}

export const PillVariant: Story = {
  parameters: { mdxUsage: pillVariantMdx },
  loaders: [
    async () => ({
      cloud: await markdownToHast(cloudContent),
      selfHost: await markdownToHast(selfHostContent),
    }),
  ],
  render: (_args, { loaded }) => (
    <Tabs variant="pill">
      <TabItem value="cloud" label="SigNoz Cloud" default>
        {renderHast(loaded.cloud)}
      </TabItem>
      <TabItem value="self-host" label="Self-Host">
        {renderHast(loaded.selfHost)}
      </TabItem>
    </Tabs>
  ),
}

export const DefaultOnSecondTab: Story = {
  parameters: { mdxUsage: defaultOnSecondTabMdx },
  loaders: [
    async () => ({
      manual: await markdownToHast(manualContent),
      auto: await markdownToHast(autoContent),
    }),
  ],
  render: (_args, { loaded }) => (
    <Tabs>
      <TabItem value="manual" label="Manual">
        {renderHast(loaded.manual)}
      </TabItem>
      <TabItem value="auto" label="Automatic" default>
        {renderHast(loaded.auto)}
      </TabItem>
    </Tabs>
  ),
}
