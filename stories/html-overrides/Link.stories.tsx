import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CustomLink from '@/components/Link'

const INTERNAL_LINK = {
  href: 'https://signoz.io/docs/instrumentation/',
  children: 'instrumentation docs',
}

const ANCHOR_LINK = {
  href: '#send-traces-to-signoz',
  children: 'Send traces to SigNoz',
}

const EXTERNAL_LINK = {
  href: 'https://opentelemetry.io/docs/collector/configuration/',
  children: 'OpenTelemetry Collector configuration reference',
}

const internalDocsLinkMdx = `
{/* Internal links: plain markdown with absolute signoz.io URLs */}
Once the collector is running, follow the [instrumentation docs](https://signoz.io/docs/instrumentation/) to send traces from your application to SigNoz.
`

const anchorLinkMdx = `
{/* Anchor links jump to a heading on the same page */}
Already have the OpenTelemetry SDK installed? Jump ahead to [Send traces to SigNoz](#send-traces-to-signoz) to configure the exporter.
`

const externalLinkMdx = `
{/* External links must use the anchor form with these rel attributes */}
The full list of receiver and processor options is covered in the <a href="https://opentelemetry.io/docs/collector/configuration/" target="_blank" rel="noopener noreferrer nofollow">OpenTelemetry Collector configuration reference</a>. External links open in a new tab with \`rel="noopener noreferrer nofollow"\`.
`

const previewMdx = [internalDocsLinkMdx, anchorLinkMdx, externalLinkMdx].join('\n')

const meta = {
  title: 'MDX Components/HTML Overrides/Link (a)',
  component: CustomLink,
  parameters: {
    mdxUsage: internalDocsLinkMdx,
    chromatic: { disableSnapshot: true },
  },
  args: INTERNAL_LINK,
} satisfies Meta<typeof CustomLink>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <p>
        Once the collector is running, follow the <CustomLink {...INTERNAL_LINK} /> to send traces
        from your application to SigNoz.
      </p>
      <p>
        Already have the OpenTelemetry SDK installed? Jump ahead to <CustomLink {...ANCHOR_LINK} />{' '}
        to configure the exporter.
      </p>
      <p>
        The full list of receiver and processor options is covered in the{' '}
        <CustomLink {...EXTERNAL_LINK} />. External links open in a new tab with{' '}
        <code>rel=&quot;noopener noreferrer nofollow&quot;</code>.
      </p>
    </div>
  ),
}

export const InternalDocsLink: Story = {
  parameters: { mdxUsage: internalDocsLinkMdx },
  render: (args) => (
    <p>
      Once the collector is running, follow the <CustomLink {...args} /> to send traces from your
      application to SigNoz.
    </p>
  ),
}

export const AnchorLink: Story = {
  parameters: { mdxUsage: anchorLinkMdx },
  args: ANCHOR_LINK,
  render: (args) => (
    <p>
      Already have the OpenTelemetry SDK installed? Jump ahead to <CustomLink {...args} /> to
      configure the exporter.
    </p>
  ),
}

export const ExternalLink: Story = {
  parameters: { mdxUsage: externalLinkMdx },
  args: EXTERNAL_LINK,
  render: (args) => (
    <p>
      The full list of receiver and processor options is covered in the <CustomLink {...args} />.
      External links open in a new tab with{' '}
      <code>rel=&quot;noopener noreferrer nofollow&quot;</code>.
    </p>
  ),
}
