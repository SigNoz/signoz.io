import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Admonition from '@/components/Admonition/Admonition'
import { components } from '@/components/MDXComponents'

const meta = {
  title: 'MDX Components/Callouts/Admonition',
  component: Admonition,
  parameters: {
    mdxUsage: `
<Admonition type="info" title="Before you begin">
  Make sure you have a [SigNoz Cloud account](https://signoz.io/teams/) and
  your ingestion key from **Settings → Ingestion Settings**.
</Admonition>

<Admonition type="warning">
  Restarting the collector drops any telemetry buffered in memory.
</Admonition>

{/* Collapsed by default; type controls the color: note | info | tip | warning | danger | important */}
<Admonition type="tip" title="Optional: advanced configuration" defaultCollapsed>
  Tune batch size with the \`batch\` processor.
</Admonition>
`,
  },
  args: {
    children: (
      <p>
        Use the <code>OTEL_EXPORTER_OTLP_ENDPOINT</code> environment variable to point your service
        at SigNoz. See the{' '}
        <a href="https://signoz.io/docs/instrumentation/">instrumentation docs</a> for details.
      </p>
    ),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['note', 'info', 'tip', 'warning', 'danger', 'important'],
    },
    variant: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
  },
} satisfies Meta<typeof Admonition>

export default meta

type Story = StoryObj<typeof meta>

export const Note: Story = {
  args: { type: 'note' },
}

export const Info: Story = {
  args: { type: 'info' },
}

export const Tip: Story = {
  args: { type: 'tip' },
}

export const Warning: Story = {
  args: { type: 'warning' },
}

export const Danger: Story = {
  args: { type: 'danger' },
}

export const Important: Story = {
  args: { type: 'important' },
}

export const CustomTitle: Story = {
  args: { type: 'info', title: 'Before you begin' },
}

export const Collapsed: Story = {
  args: { type: 'info', title: 'Optional: advanced configuration', defaultCollapsed: true },
}

export const Small: Story = {
  args: { type: 'tip', variant: 'sm' },
}

// KeyPointCallout is a thin MDX-only wrapper around Admonition defined inline
// in MDXComponents.tsx (defaults: title "Note", type "info").
const KeyPointCallout = components.KeyPointCallout as React.ComponentType<{
  title?: string
  type?: string
  children?: React.ReactNode
}>

export const KeyPoint: Story = {
  name: 'KeyPointCallout',
  render: () => (
    <KeyPointCallout title="Key point">
      <p>{'<KeyPointCallout> renders an Admonition with sensible MDX defaults.'}</p>
    </KeyPointCallout>
  ),
}
