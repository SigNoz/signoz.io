import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RegionAwarePre } from '@/components/Region/RegionAwareComponents'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const basicMarkdown = ['```bash', 'docker compose up -d', 'kubectl get pods -n signoz', '```'].join(
  '\n'
)

const titledWithLineHighlightMarkdown = [
  '```yaml:otel-collector-config.yaml {4}',
  'receivers:',
  '  otlp:',
  '    protocols:',
  '      grpc:',
  '      http:',
  '```',
].join('\n')

const diffMarkdown = [
  '```diff',
  ' receivers:',
  '-  jaeger:',
  '+  otlp:',
  '+    protocols:',
  '+      grpc:',
  '```',
].join('\n')

const minimapMarkdown = [
  '```yaml minimap',
  ...Array.from({ length: 30 }, (_, i) => `key_${i + 1}: value_${i + 1}`),
  '```',
].join('\n')

const collapsibleMarkdown = [
  '```bash collapse={5}',
  ...Array.from({ length: 15 }, (_, i) => `echo "step ${i + 1}"`),
  '```',
].join('\n')

const regionAwareMarkdown = [
  '```bash',
  'export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"',
  'export OTEL_EXPORTER_OTLP_HEADERS="signoz-ingestion-key=<your-ingestion-key>"',
  '```',
].join('\n')

const inlineCodeMarkdown =
  'Set `OTEL_SERVICE_NAME` before starting the service. Region-aware inline code like `https://ingest.<region>.signoz.cloud:443` substitutes the selected region too.'

const BASIC_NOTE =
  '{/* Fenced code blocks are markdown, not JSX. The language enables syntax highlighting */}'

const withNote = (markdown: string, note: string) => `\n${note}\n${markdown}\n`

const meta = {
  title: 'MDX Components/HTML Overrides/Code Blocks (pre, code)',
  component: RegionAwarePre,
  parameters: {
    layout: 'padded',
    mdxUsage: withNote(basicMarkdown, BASIC_NOTE),
  },
} satisfies Meta<typeof RegionAwarePre>

export default meta

type Story = StoryObj<typeof meta>

const fixtureStory = (markdown: string, note: string): Story => ({
  parameters: { mdxUsage: withNote(markdown, note) },
  loaders: [async () => ({ tree: await markdownToHast(markdown) })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
})

export const Basic: Story = fixtureStory(basicMarkdown, BASIC_NOTE)

export const TitledWithLineHighlight: Story = fixtureStory(
  titledWithLineHighlightMarkdown,
  '{/* :filename adds a title bar; {4} highlights line 4 */}'
)

export const Diff: Story = fixtureStory(
  diffMarkdown,
  '{/* The diff language renders +/- lines as additions and removals */}'
)

export const Minimap: Story = fixtureStory(
  minimapMarkdown,
  '{/* minimap adds a scroll minimap for long blocks */}'
)

export const Collapsible: Story = fixtureStory(
  collapsibleMarkdown,
  '{/* collapse={5} folds the block after the first 5 lines */}'
)

export const RegionAware: Story = fixtureStory(
  regionAwareMarkdown,
  "{/* <region> is substituted with the reader's selected SigNoz Cloud region */}"
)

export const InlineCode: Story = fixtureStory(
  inlineCodeMarkdown,
  '{/* Inline code spans are plain backticks; <region> is substituted there too */}'
)
