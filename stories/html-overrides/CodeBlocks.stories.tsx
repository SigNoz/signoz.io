import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RegionAwarePre } from '@/components/Region/RegionAwareComponents'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const meta = {
  title: 'MDX Components/HTML Overrides/Code Blocks (pre, code)',
  component: RegionAwarePre,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RegionAwarePre>

export default meta

type Story = StoryObj<typeof meta>

const fixtureStory = (markdown: string): Story => ({
  loaders: [async () => ({ tree: await markdownToHast(markdown) })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
})

export const Basic: Story = fixtureStory(
  ['```bash', 'docker compose up -d', 'kubectl get pods -n signoz', '```'].join('\n')
)

export const TitledWithLineHighlight: Story = fixtureStory(
  [
    '```yaml:otel-collector-config.yaml {4}',
    'receivers:',
    '  otlp:',
    '    protocols:',
    '      grpc:',
    '      http:',
    '```',
  ].join('\n')
)

export const Diff: Story = fixtureStory(
  [
    '```diff',
    ' receivers:',
    '-  jaeger:',
    '+  otlp:',
    '+    protocols:',
    '+      grpc:',
    '```',
  ].join('\n')
)

export const Minimap: Story = fixtureStory(
  [
    '```yaml minimap',
    ...Array.from({ length: 30 }, (_, i) => `key_${i + 1}: value_${i + 1}`),
    '```',
  ].join('\n')
)

export const Collapsible: Story = fixtureStory(
  [
    '```bash collapse={5}',
    ...Array.from({ length: 15 }, (_, i) => `echo "step ${i + 1}"`),
    '```',
  ].join('\n')
)

export const RegionAware: Story = fixtureStory(
  [
    '```bash',
    'export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"',
    'export OTEL_EXPORTER_OTLP_HEADERS="signoz-ingestion-key=<your-ingestion-key>"',
    '```',
  ].join('\n')
)

export const InlineCode: Story = fixtureStory(
  'Set `OTEL_SERVICE_NAME` before starting the service. Region-aware inline code like `https://ingest.<region>.signoz.cloud:443` substitutes the selected region too.'
)
