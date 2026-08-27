import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NodeVersionPin from '@/components/NodeVersionPin/NodeVersionPin'

const defaultMdx = `
{/* Renders the pinned OpenTelemetry Node.js dependency versions with an npm install command */}
<VersionPin />
`

const inContextMdx = `
Run your Node.js application with the OpenTelemetry loader enabled. If spans do not appear in SigNoz, check the pinned dependency versions below.

<VersionPin />
`

const previewMdx = [defaultMdx, inContextMdx].join('\n')

const meta = {
  title: 'MDX Components/Code/VersionPin',
  component: NodeVersionPin,
  parameters: {
    mdxUsage: defaultMdx,
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof NodeVersionPin>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <NodeVersionPin />
      <div>
        <p>
          Run your Node.js application with the OpenTelemetry loader enabled. If spans do not appear
          in SigNoz, check the pinned dependency versions below.
        </p>
        <NodeVersionPin />
      </div>
    </div>
  ),
}

export const Default: Story = {
  parameters: { mdxUsage: defaultMdx },
}

export const InContext: Story = {
  parameters: { mdxUsage: inContextMdx },
  render: () => (
    <>
      <p>
        Run your Node.js application with the OpenTelemetry loader enabled. If spans do not appear
        in SigNoz, check the pinned dependency versions below.
      </p>
      <NodeVersionPin />
    </>
  ),
}
