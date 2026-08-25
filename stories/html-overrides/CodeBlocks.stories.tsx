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
const TITLED_NOTE = '{/* :filename adds a title bar; {4} highlights line 4 */}'
const DIFF_NOTE = '{/* The diff language renders +/- lines as additions and removals */}'
const MINIMAP_NOTE = '{/* minimap adds a scroll minimap for long blocks */}'
const COLLAPSIBLE_NOTE = '{/* collapse={5} folds the block after the first 5 lines */}'
const REGION_NOTE = "{/* <region> is substituted with the reader's selected SigNoz Cloud region */}"
const INLINE_NOTE =
  '{/* Inline code spans are plain backticks; <region> is substituted there too */}'

const withNote = (markdown: string, note: string) => `\n${note}\n${markdown}\n`

const PREVIEW_BLOCKS = [
  [basicMarkdown, BASIC_NOTE],
  [titledWithLineHighlightMarkdown, TITLED_NOTE],
  [diffMarkdown, DIFF_NOTE],
  [minimapMarkdown, MINIMAP_NOTE],
  [collapsibleMarkdown, COLLAPSIBLE_NOTE],
  [regionAwareMarkdown, REGION_NOTE],
  [inlineCodeMarkdown, INLINE_NOTE],
] as const

const previewMdx = PREVIEW_BLOCKS.map(([markdown, note]) => withNote(markdown, note)).join('\n')

const meta = {
  title: 'MDX Components/HTML Overrides/Code Blocks (pre, code)',
  component: RegionAwarePre,
  parameters: {
    layout: 'padded',
    mdxUsage: withNote(basicMarkdown, BASIC_NOTE),
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof RegionAwarePre>

export default meta

type Story = StoryObj<typeof meta>

const fixtureStory = (markdown: string, note: string): Story => ({
  parameters: { mdxUsage: withNote(markdown, note) },
  loaders: [async () => ({ tree: await markdownToHast(markdown) })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
})

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({
      trees: await Promise.all(PREVIEW_BLOCKS.map(([markdown]) => markdownToHast(markdown))),
    }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-6">
      {loaded.trees.map((tree, index) => (
        <div key={PREVIEW_BLOCKS[index][1]}>{renderHast(tree)}</div>
      ))}
    </div>
  ),
}

export const Basic: Story = fixtureStory(basicMarkdown, BASIC_NOTE)

export const TitledWithLineHighlight: Story = fixtureStory(
  titledWithLineHighlightMarkdown,
  TITLED_NOTE
)

export const Diff: Story = fixtureStory(diffMarkdown, DIFF_NOTE)

export const Minimap: Story = fixtureStory(minimapMarkdown, MINIMAP_NOTE)

export const Collapsible: Story = fixtureStory(collapsibleMarkdown, COLLAPSIBLE_NOTE)

export const RegionAware: Story = fixtureStory(regionAwareMarkdown, REGION_NOTE)

export const InlineCode: Story = fixtureStory(inlineCodeMarkdown, INLINE_NOTE)
