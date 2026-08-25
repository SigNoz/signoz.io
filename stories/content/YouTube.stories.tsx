import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import YouTube from '@/components/VideoPlayer/VideoPlayer'

const meta = {
  title: 'MDX Components/Content/YouTube',
  component: YouTube,
  parameters: {
    mdxUsage: `
<YouTube id="sKQrv7RM3YY" mute="false" />
`,
  },
  args: {
    // Real id from data/docs/langflow-observability.mdx
    id: 'sKQrv7RM3YY',
  },
} satisfies Meta<typeof YouTube>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    mdxUsage: `
<YouTube id="sKQrv7RM3YY" mute="false" />
`,
  },
}

export const InkeepMonitoring: Story = {
  args: {
    id: 'gBQG_qhLVg4',
  },
  parameters: {
    mdxUsage: `
<YouTube id="gBQG_qhLVg4" mute="false" />
`,
  },
}
