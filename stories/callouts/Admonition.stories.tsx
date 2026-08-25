import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Admonition from '@/components/Admonition/Admonition'
import { components } from '@/components/MDXComponents'

const BODY =
  'Use the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to point your service at SigNoz. See the [instrumentation docs](https://signoz.io/docs/instrumentation/) for details.'

const admonitionMdx = (props: string, note?: string) =>
  [note, `<Admonition ${props}>`, BODY, '</Admonition>'].filter(Boolean).join('\n')

const noteMdx = admonitionMdx(
  'type="note"',
  '{/* type controls the color: note | info | tip | warning | danger | important */}'
)

const meta = {
  title: 'MDX Components/Callouts/Admonition',
  component: Admonition,
  parameters: {
    mdxUsage: noteMdx,
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
  parameters: { mdxUsage: noteMdx },
}

export const Info: Story = {
  args: { type: 'info' },
  parameters: { mdxUsage: admonitionMdx('type="info"') },
}

export const Tip: Story = {
  args: { type: 'tip' },
  parameters: { mdxUsage: admonitionMdx('type="tip"') },
}

export const Warning: Story = {
  args: { type: 'warning' },
  parameters: { mdxUsage: admonitionMdx('type="warning"') },
}

export const Danger: Story = {
  args: { type: 'danger' },
  parameters: { mdxUsage: admonitionMdx('type="danger"') },
}

export const Important: Story = {
  args: { type: 'important' },
  parameters: { mdxUsage: admonitionMdx('type="important"') },
}

export const CustomTitle: Story = {
  args: { type: 'info', title: 'Before you begin' },
  parameters: {
    mdxUsage: admonitionMdx(
      'type="info" title="Before you begin"',
      '{/* title replaces the default heading for the type */}'
    ),
  },
}

export const Collapsed: Story = {
  args: { type: 'info', title: 'Optional: advanced configuration', defaultCollapsed: true },
  parameters: {
    mdxUsage: admonitionMdx(
      'type="info" title="Optional: advanced configuration" defaultCollapsed',
      '{/* defaultCollapsed renders the callout folded */}'
    ),
  },
}

export const Small: Story = {
  args: { type: 'tip', variant: 'sm' },
  parameters: {
    mdxUsage: admonitionMdx(
      'type="tip" variant="sm"',
      '{/* variant="sm" renders the compact callout */}'
    ),
  },
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
  parameters: {
    mdxUsage: `
{/* KeyPointCallout wraps Admonition with MDX defaults: title "Note", type "info" */}
<KeyPointCallout title="Key point">
&lt;KeyPointCallout&gt; renders an Admonition with sensible MDX defaults.
</KeyPointCallout>
`,
  },
  render: () => (
    <KeyPointCallout title="Key point">
      <p>{'<KeyPointCallout> renders an Admonition with sensible MDX defaults.'}</p>
    </KeyPointCallout>
  ),
}
