import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import InterlinkCard from '@/components/InterlinkCard/InterlinkCard'

const meta = {
  title: 'MDX Components/Content/InterlinkCard',
  component: InterlinkCard,
  args: {
    title: 'Docs for instrumenting your application to send traces',
    href: 'https://signoz.io/docs/instrumentation/',
  },
} satisfies Meta<typeof InterlinkCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const GuideLink: Story = {
  args: {
    title: 'Learn more about Database Monitoring',
    href: 'https://signoz.io/guides/database-monitoring/',
  },
}
