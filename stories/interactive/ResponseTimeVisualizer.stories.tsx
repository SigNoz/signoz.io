import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ResponseTimeVisualizer from '@/components/APMMetrics/ResponseTimeVisualizer'

const meta = {
  title: 'MDX Components/Interactive/Response Time Visualizer',
  component: ResponseTimeVisualizer,
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
Rapidly click the client below to send requests and watch how P50, P95, P99, and
average metrics respond differently:

<ResponseTimeVisualizer />
`,
  },
} satisfies Meta<typeof ResponseTimeVisualizer>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
Rapidly click the client below to send requests and watch how P50, P95, P99, and
average metrics respond differently:

<ResponseTimeVisualizer />
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <ResponseTimeVisualizer />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: `
Rapidly click the client below to send requests and watch how P50, P95, P99, and
average metrics respond differently:

<ResponseTimeVisualizer />
`,
  },
}
