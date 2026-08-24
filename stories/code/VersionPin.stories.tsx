import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NodeVersionPin from '@/components/NodeVersionPin/NodeVersionPin'

const meta = {
  title: 'MDX Components/Code/VersionPin',
  component: NodeVersionPin,
  parameters: {
    mdxUsage: `
{/* Renders the pinned OpenTelemetry Node.js dependency versions with an npm install command */}
If spans do not appear in SigNoz, pin the OpenTelemetry dependency versions below:

<VersionPin />
`,
  },
} satisfies Meta<typeof NodeVersionPin>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InContext: Story = {
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
