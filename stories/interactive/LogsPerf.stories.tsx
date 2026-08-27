import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import LogsPerf from '@/components/LogsPerf/LogsPerf'

const meta = {
  title: 'MDX Components/Interactive/Logs Perf',
  component: LogsPerf,
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* Logs performance benchmark graphic used across logging blog posts */}
<LogsPerf />
`,
  },
} satisfies Meta<typeof LogsPerf>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
{/* Logs performance benchmark graphic used across logging blog posts. Prop-less */}
<LogsPerf />
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <LogsPerf />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: `
{/* Logs performance benchmark graphic used across logging blog posts */}
<LogsPerf />
`,
  },
}
