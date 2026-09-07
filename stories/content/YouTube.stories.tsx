import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import YouTube from '@/components/VideoPlayer/VideoPlayer'

const defaultMdx = `
<YouTube id="sKQrv7RM3YY" mute="false" />
`

const inkeepMonitoringMdx = `
<YouTube id="gBQG_qhLVg4" mute="false" />
`

const previewMdx = [defaultMdx, inkeepMonitoringMdx].join('\n')

const meta = {
  title: 'MDX Components/Content/YouTube',
  component: YouTube,
  parameters: {
    mdxUsage: defaultMdx,
    chromatic: { disableSnapshot: true },
  },
  args: {
    id: 'sKQrv7RM3YY',
  },
} satisfies Meta<typeof YouTube>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <YouTube id="sKQrv7RM3YY" />
      <YouTube id="gBQG_qhLVg4" />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: defaultMdx,
  },
}

export const InkeepMonitoring: Story = {
  args: {
    id: 'gBQG_qhLVg4',
  },
  parameters: {
    mdxUsage: inkeepMonitoringMdx,
  },
}
