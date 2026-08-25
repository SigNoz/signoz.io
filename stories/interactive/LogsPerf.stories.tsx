import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import LogsPerf from '@/components/LogsPerf/LogsPerf'

const meta = {
  title: 'MDX Components/Interactive/Logs Perf',
  component: LogsPerf,
  parameters: {
    mdxUsage: `
{/* Logs performance benchmark graphic used across logging blog posts */}
<LogsPerf />
`,
  },
} satisfies Meta<typeof LogsPerf>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    mdxUsage: `
{/* Logs performance benchmark graphic used across logging blog posts */}
<LogsPerf />
`,
  },
}
