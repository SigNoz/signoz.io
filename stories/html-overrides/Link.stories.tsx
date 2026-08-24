import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CustomLink from '@/components/Link'

const meta = {
  title: 'MDX Components/HTML Overrides/Link (a)',
  component: CustomLink,
  parameters: {
    mdxUsage: `
{/* Internal links: plain markdown with absolute signoz.io URLs */}
Follow the [instrumentation docs](https://signoz.io/docs/instrumentation/) to send traces to SigNoz.

{/* Anchor links jump to a heading on the same page */}
Already instrumented? Skip ahead to [Send traces to SigNoz](#send-traces-to-signoz).

{/* External links must use the anchor form with these rel attributes */}
See the <a href="https://opentelemetry.io/docs/collector/configuration/" target="_blank" rel="noopener noreferrer nofollow">OpenTelemetry Collector configuration reference</a>.
`,
  },
  args: {
    href: 'https://signoz.io/docs/instrumentation/',
    children: 'instrumentation docs',
  },
} satisfies Meta<typeof CustomLink>

export default meta

type Story = StoryObj<typeof meta>

export const InternalDocsLink: Story = {
  render: (args) => (
    <p>
      Once the collector is running, follow the <CustomLink {...args} /> to send traces from your
      application to SigNoz.
    </p>
  ),
}

export const AnchorLink: Story = {
  args: {
    href: '#send-traces-to-signoz',
    children: 'Send traces to SigNoz',
  },
  render: (args) => (
    <p>
      Already have the OpenTelemetry SDK installed? Jump ahead to <CustomLink {...args} /> to
      configure the exporter.
    </p>
  ),
}

export const ExternalLink: Story = {
  args: {
    href: 'https://opentelemetry.io/docs/collector/configuration/',
    children: 'OpenTelemetry Collector configuration reference',
  },
  render: (args) => (
    <p>
      The full list of receiver and processor options is covered in the <CustomLink {...args} />.
      External links open in a new tab with{' '}
      <code>rel=&quot;noopener noreferrer nofollow&quot;</code>.
    </p>
  ),
}
