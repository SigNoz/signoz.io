import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DatadogVsSigNoz from '@/components/DatadogVsSigNoz/DatadogVsSigNoz'
import GrafanaVsSigNoz from '@/components/GrafanaVsSigNoz/GrafanaVsSigNoz'
import NewRelicVsSigNoz from '@/components/NewRelicVsSigNoz/NewRelicVsSigNoz'

const meta = {
  title: 'MDX Components/Comparisons/Vs SigNoz',
  parameters: {
    docsProse: false,
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* Migration CTA banner for comparison posts. Prop-less, pick the one matching the competitor */}
<DatadogVsSigNoz />
`,
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
{/* Migration CTA banners for comparison posts. Prop-less, pick the one matching the competitor */}
<DatadogVsSigNoz />

<GrafanaVsSigNoz />

<NewRelicVsSigNoz />
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <DatadogVsSigNoz />
      <GrafanaVsSigNoz />
      <NewRelicVsSigNoz />
    </div>
  ),
}

export const Datadog: Story = {
  name: 'DatadogVsSigNoz',
  parameters: {
    mdxUsage: `
<DatadogVsSigNoz />
`,
  },
  render: () => <DatadogVsSigNoz />,
}

export const Grafana: Story = {
  name: 'GrafanaVsSigNoz',
  parameters: {
    mdxUsage: `
<GrafanaVsSigNoz />
`,
  },
  render: () => <GrafanaVsSigNoz />,
}

export const NewRelic: Story = {
  name: 'NewRelicVsSigNoz',
  parameters: {
    mdxUsage: `
<NewRelicVsSigNoz />
`,
  },
  render: () => <NewRelicVsSigNoz />,
}
