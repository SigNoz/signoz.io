import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import IncidentCostGraphic from '@/components/Blog/IncidentCostGraphic'

const meta = {
  title: 'MDX Components/Interactive/Incident Cost Graphic',
  component: IncidentCostGraphic,
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* MDX registers a lazy-loading wrapper under the same tag */}
<IncidentCostGraphic />
`,
  },
} satisfies Meta<typeof IncidentCostGraphic>

export default meta

type Story = StoryObj<typeof meta>

// Self-driven rAF animation never settles, so it is never snapshotted.
export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* MDX registers a lazy-loading wrapper under the same tag. Prop-less */}
<IncidentCostGraphic />
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <IncidentCostGraphic />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: `
{/* MDX registers a lazy-loading wrapper under the same tag */}
<IncidentCostGraphic />
`,
  },
}
