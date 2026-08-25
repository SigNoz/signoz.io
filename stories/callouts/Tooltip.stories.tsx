import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Tooltip from '@/components/ui/Tooltip'

const definitionMdx = `
{/* Inline term definition. Hover the underlined text to see the popup */}
To understand cardinality explosion, you first need to understand how <Tooltip text="metrics" content="A metric is a measurement collected over time, such as CPU usage, request count, or error rate." /> work in time-series databases like Prometheus. Hover the underlined term to see the definition.
`

const withLinkMdx = `
{/* With link, the trigger text becomes a link and the popup gains an "Explore more →" footer link */}
Each trace is a tree of <Tooltip text="spans" content="A span represents a single unit of work in a trace, such as an HTTP request or a database query." link="https://signoz.io/blog/distributed-tracing-span/" /> that shows how a request moved through your services.
`

const customLinkTextMdx = `
{/* linkText customizes the popup's footer link */}
High-throughput services often enable tail-based <Tooltip text="sampling" content="Sampling keeps a subset of traces to control ingestion volume while preserving statistically useful data." link="https://signoz.io/docs/traces-management/guides/tail-sampling/" linkText="Read the sampling guide →" /> in the OpenTelemetry Collector to keep costs predictable.
`

const meta = {
  title: 'MDX Components/Callouts/Tooltip',
  component: Tooltip,
  parameters: {
    mdxUsage: definitionMdx,
  },
  args: {
    text: 'metrics',
    content:
      'A metric is a measurement collected over time, such as CPU usage, request count, or error rate.',
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Definition: Story = {
  parameters: { mdxUsage: definitionMdx },
  render: (args) => (
    <p>
      To understand cardinality explosion, you first need to understand how <Tooltip {...args} />
      work in time-series databases like Prometheus. Hover the underlined term to see the
      definition.
    </p>
  ),
}

// With `link`, the trigger text itself becomes a link and the popup gains an
// "Explore more →" footer link.
export const WithLink: Story = {
  parameters: { mdxUsage: withLinkMdx },
  args: {
    text: 'spans',
    content:
      'A span represents a single unit of work in a trace, such as an HTTP request or a database query.',
    link: 'https://signoz.io/blog/distributed-tracing-span/',
  },
  render: (args) => (
    <p>
      Each trace is a tree of <Tooltip {...args} />
      that shows how a request moved through your services.
    </p>
  ),
}

export const CustomLinkText: Story = {
  parameters: { mdxUsage: customLinkTextMdx },
  args: {
    text: 'sampling',
    content:
      'Sampling keeps a subset of traces to control ingestion volume while preserving statistically useful data.',
    link: 'https://signoz.io/docs/traces-management/guides/tail-sampling/',
    linkText: 'Read the sampling guide →',
  },
  render: (args) => (
    <p>
      High-throughput services often enable tail-based <Tooltip {...args} />
      in the OpenTelemetry Collector to keep costs predictable.
    </p>
  ),
}
