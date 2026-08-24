import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import TableWrapper from '@/components/TableWrapper'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const meta = {
  title: 'MDX Components/HTML Overrides/Table',
  component: TableWrapper,
  parameters: {
    mdxUsage: `
{/* Plain GFM markdown tables, no component needed */}
| Signal  | Receiver      | Protocol | Default endpoint    |
| ------- | ------------- | -------- | ------------------- |
| Traces  | \`otlp\`        | gRPC     | \`0.0.0.0:4317\`      |
| Metrics | \`hostmetrics\` | -        | scraped every 60s   |
| Logs    | \`filelog\`     | -        | \`/var/log/**/*.log\` |
`,
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof TableWrapper>

export default meta

type Story = StoryObj<typeof meta>

const fixtureStory = (markdown: string): Story => ({
  loaders: [async () => ({ tree: await markdownToHast(markdown) })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
})

export const CollectorReceivers: Story = fixtureStory(
  [
    '| Signal  | Receiver      | Protocol | Default endpoint      |',
    '| ------- | ------------- | -------- | --------------------- |',
    '| Traces  | `otlp`        | gRPC     | `0.0.0.0:4317`        |',
    '| Traces  | `otlp`        | HTTP     | `0.0.0.0:4318`        |',
    '| Metrics | `hostmetrics` | -        | scraped every 60s     |',
    '| Logs    | `filelog`     | -        | `/var/log/**/*.log`   |',
  ].join('\n')
)

export const WithLinks: Story = fixtureStory(
  [
    '| Environment variable            | Purpose                        | Docs                                                                          |',
    '| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------- |',
    '| `OTEL_EXPORTER_OTLP_ENDPOINT`   | Where telemetry is sent        | [Instrumentation overview](https://signoz.io/docs/instrumentation/)           |',
    '| `OTEL_EXPORTER_OTLP_HEADERS`    | Carries the ingestion key      | [Ingestion overview](https://signoz.io/docs/ingestion/signoz-cloud/overview/) |',
    '| `OTEL_SERVICE_NAME`             | Names the service in SigNoz    | [Send traces](https://signoz.io/docs/instrumentation/javascript/opentelemetry-nodejs/) |',
  ].join('\n')
)

export const WideTable: Story = fixtureStory(
  [
    '| Language | SDK package | Auto-instrumentation | Traces | Metrics | Logs | Propagators | Recommended exporter protocol |',
    '| -------- | ----------- | -------------------- | ------ | ------- | ---- | ----------- | ----------------------------- |',
    '| Python | `opentelemetry-distro` | `opentelemetry-instrument` | Stable | Stable | Stable | W3C TraceContext, B3 | OTLP over gRPC |',
    '| Node.js | `@opentelemetry/auto-instrumentations-node` | `--require` hook | Stable | Stable | In development | W3C TraceContext, B3 | OTLP over HTTP |',
    '| Java | `opentelemetry-javaagent.jar` | Java agent | Stable | Stable | Stable | W3C TraceContext, B3, Jaeger | OTLP over gRPC |',
    '| Go | `go.opentelemetry.io/otel` | Manual only | Stable | Stable | Beta | W3C TraceContext | OTLP over gRPC |',
  ].join('\n')
)
