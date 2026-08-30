import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import TableWrapper from '@/components/TableWrapper'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const TABLE_NOTE = '{/* Plain GFM markdown tables, no component needed */}'

const withNote = (markdown: string) => `\n${TABLE_NOTE}\n${markdown}\n`

const collectorReceiversMarkdown = [
  '| Signal  | Receiver      | Protocol | Default endpoint      |',
  '| ------- | ------------- | -------- | --------------------- |',
  '| Traces  | `otlp`        | gRPC     | `0.0.0.0:4317`        |',
  '| Traces  | `otlp`        | HTTP     | `0.0.0.0:4318`        |',
  '| Metrics | `hostmetrics` | -        | scraped every 60s     |',
  '| Logs    | `filelog`     | -        | `/var/log/**/*.log`   |',
].join('\n')

const withLinksMarkdown = [
  '| Environment variable            | Purpose                        | Docs                                                                          |',
  '| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------- |',
  '| `OTEL_EXPORTER_OTLP_ENDPOINT`   | Where telemetry is sent        | [Instrumentation overview](https://signoz.io/docs/instrumentation/)           |',
  '| `OTEL_EXPORTER_OTLP_HEADERS`    | Carries the ingestion key      | [Ingestion overview](https://signoz.io/docs/ingestion/signoz-cloud/overview/) |',
  '| `OTEL_SERVICE_NAME`             | Names the service in SigNoz    | [Send traces](https://signoz.io/docs/instrumentation/javascript/opentelemetry-nodejs/) |',
].join('\n')

const wideTableMarkdown = [
  '| Language | SDK package | Auto-instrumentation | Traces | Metrics | Logs | Propagators | Recommended exporter protocol |',
  '| -------- | ----------- | -------------------- | ------ | ------- | ---- | ----------- | ----------------------------- |',
  '| Python | `opentelemetry-distro` | `opentelemetry-instrument` | Stable | Stable | Stable | W3C TraceContext, B3 | OTLP over gRPC |',
  '| Node.js | `@opentelemetry/auto-instrumentations-node` | `--require` hook | Stable | Stable | In development | W3C TraceContext, B3 | OTLP over HTTP |',
  '| Java | `opentelemetry-javaagent.jar` | Java agent | Stable | Stable | Stable | W3C TraceContext, B3, Jaeger | OTLP over gRPC |',
  '| Go | `go.opentelemetry.io/otel` | Manual only | Stable | Stable | Beta | W3C TraceContext | OTLP over gRPC |',
].join('\n')

const previewMarkdown = [collectorReceiversMarkdown, withLinksMarkdown, wideTableMarkdown].join(
  '\n\n'
)

const meta = {
  title: 'MDX Components/HTML Overrides/Table',
  component: TableWrapper,
  parameters: {
    mdxUsage: withNote(collectorReceiversMarkdown),
    chromatic: { disableSnapshot: true },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof TableWrapper>

export default meta

type Story = StoryObj<typeof meta>

const fixtureStory = (markdown: string): Story => ({
  parameters: { mdxUsage: withNote(markdown) },
  loaders: [async () => ({ tree: await markdownToHast(markdown) })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
})

export const Preview: Story = {
  parameters: {
    mdxUsage: withNote(previewMarkdown),
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({
      receivers: await markdownToHast(collectorReceiversMarkdown),
      withLinks: await markdownToHast(withLinksMarkdown),
      wide: await markdownToHast(wideTableMarkdown),
    }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-6">
      {renderHast(loaded.receivers)}
      {renderHast(loaded.withLinks)}
      {renderHast(loaded.wide)}
    </div>
  ),
}

export const CollectorReceivers: Story = fixtureStory(collectorReceiversMarkdown)

export const WithLinks: Story = fixtureStory(withLinksMarkdown)

export const WideTable: Story = fixtureStory(wideTableMarkdown)
