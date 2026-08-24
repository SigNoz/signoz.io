import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import IncidentCostGraphic from '@/components/Blog/IncidentCostGraphic'

const meta = {
  title: 'MDX Components/Interactive/Incident Cost Graphic',
  component: IncidentCostGraphic,
} satisfies Meta<typeof IncidentCostGraphic>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
