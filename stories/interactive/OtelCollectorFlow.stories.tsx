import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import OtelCollectorFlow from '@/components/OtelCollectorFlow/OtelCollectorFlow'

const meta = {
  title: 'MDX Components/Interactive/Otel Collector Flow',
  component: OtelCollectorFlow,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
} satisfies Meta<typeof OtelCollectorFlow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
