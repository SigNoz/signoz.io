import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import OtelCollectorFlow from '@/components/OtelCollectorFlow/OtelCollectorFlow'

const meta = {
  title: 'MDX Components/Interactive/Otel Collector Flow',
  component: OtelCollectorFlow,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true, disableSnapshot: true },
    mdxUsage: `
The animation below shows the flow of data through the Collector.

<OtelCollectorFlow />
`,
  },
} satisfies Meta<typeof OtelCollectorFlow>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true, disableSnapshot: false },
    mdxUsage: `
The animation below shows the flow of data through the Collector.

<OtelCollectorFlow />
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <OtelCollectorFlow />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: `
The animation below shows the flow of data through the Collector.

<OtelCollectorFlow />
`,
  },
}
