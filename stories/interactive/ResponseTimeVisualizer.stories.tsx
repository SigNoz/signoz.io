import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ResponseTimeVisualizer from '@/components/APMMetrics/ResponseTimeVisualizer'

const meta = {
  title: 'MDX Components/Interactive/Response Time Visualizer',
  component: ResponseTimeVisualizer,
} satisfies Meta<typeof ResponseTimeVisualizer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
