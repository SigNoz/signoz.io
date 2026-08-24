import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ComponentProps } from 'react'
import Listicle from '@/components/Listicle/Listicle'

const meta = {
  title: 'MDX Components/Content/Listicle',
  component: Listicle,
} satisfies Meta<typeof Listicle>

export default meta

type Story = StoryObj<typeof meta>

const listicleStory = (props: ComponentProps<typeof Listicle>): Story => ({
  args: props,
  loaders: [async () => ({ view: await Listicle(props) })],
  render: (_args, { loaded }) => <>{loaded.view}</>,
})

export const Sectioned: Story = listicleStory({ name: 'apm-instrumentation' })

export const SectionedWithDefaultSection: Story = listicleStory({
  name: 'apm-instrumentation',
  defaultSection: 'python',
})

export const Searchable: Story = listicleStory({ name: 'dashboard-templates' })

export const Flat: Story = listicleStory({ name: 'migrate-to-signoz' })

export const UnknownName: Story = listicleStory({ name: 'does-not-exist' })
