import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import InterlinkCard from '@/components/InterlinkCard/InterlinkCard'

const defaultMdx = `
<InterlinkCard title="Docs for instrumenting your application to send traces" href="https://signoz.io/docs/instrumentation/" />
`

const guideLinkMdx = `
<InterlinkCard title="Learn more about Database Monitoring" href="https://signoz.io/guides/database-monitoring/" />
`

const previewMdx = [defaultMdx, guideLinkMdx].join('\n')

const meta = {
  title: 'MDX Components/Content/InterlinkCard',
  component: InterlinkCard,
  parameters: {
    mdxUsage: defaultMdx,
    chromatic: { disableSnapshot: true },
  },
  args: {
    title: 'Docs for instrumenting your application to send traces',
    href: 'https://signoz.io/docs/instrumentation/',
  },
} satisfies Meta<typeof InterlinkCard>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <InterlinkCard
        title="Docs for instrumenting your application to send traces"
        href="https://signoz.io/docs/instrumentation/"
      />
      <InterlinkCard
        title="Learn more about Database Monitoring"
        href="https://signoz.io/guides/database-monitoring/"
      />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: defaultMdx,
  },
}

export const GuideLink: Story = {
  args: {
    title: 'Learn more about Database Monitoring',
    href: 'https://signoz.io/guides/database-monitoring/',
  },
  parameters: {
    mdxUsage: guideLinkMdx,
  },
}
