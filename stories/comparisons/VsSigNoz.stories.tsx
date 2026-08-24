import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DatadogVsSigNoz from '@/components/DatadogVsSigNoz/DatadogVsSigNoz'
import GrafanaVsSigNoz from '@/components/GrafanaVsSigNoz/GrafanaVsSigNoz'
import NewRelicVsSigNoz from '@/components/NewRelicVsSigNoz/NewRelicVsSigNoz'

// Migration CTA banners dropped into comparison blog posts. All three are
// prop-less marketing cards, so they render outside the docs prose wrapper.
const meta = {
  title: 'MDX Components/Comparisons/Vs SigNoz',
  parameters: {
    docsProse: false,
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Datadog: Story = {
  name: 'DatadogVsSigNoz',
  render: () => <DatadogVsSigNoz />,
}

export const Grafana: Story = {
  name: 'GrafanaVsSigNoz',
  render: () => <GrafanaVsSigNoz />,
}

export const NewRelic: Story = {
  name: 'NewRelicVsSigNoz',
  render: () => <NewRelicVsSigNoz />,
}
