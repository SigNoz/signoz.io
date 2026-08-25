import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ComponentProps, ReactNode } from 'react'
import Listicle from '@/components/Listicle/Listicle'

const previewProps: ComponentProps<typeof Listicle>[] = [
  { name: 'apm-instrumentation' },
  { name: 'apm-instrumentation', defaultSection: 'python' },
  { name: 'dashboard-templates' },
  { name: 'migrate-to-signoz' },
  { name: 'does-not-exist' },
]

const listicleMdx = (props: ComponentProps<typeof Listicle>) => {
  const attrs = Object.entries(props)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('')
  return `\n<Listicle${attrs} />\n`
}

const previewMdx = previewProps.map(listicleMdx).join('')

const meta = {
  title: 'MDX Components/Content/Listicle',
  component: Listicle,
  parameters: {
    mdxUsage: listicleMdx({ name: 'apm-instrumentation' }),
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof Listicle>

export default meta

type Story = StoryObj<typeof meta>

const listicleStory = (props: ComponentProps<typeof Listicle>): Story => ({
  args: props,
  parameters: { mdxUsage: listicleMdx(props) },
  loaders: [async () => ({ view: await Listicle(props) })],
  render: (_args, { loaded }) => <>{loaded.view}</>,
})

export const Preview: Story = {
  args: { name: 'apm-instrumentation' },
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({ views: await Promise.all(previewProps.map((props) => Listicle(props))) }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-6">
      {(loaded.views as ReactNode[]).map((view, index) => (
        <div key={previewProps[index].name + (previewProps[index].defaultSection ?? '')}>
          {view}
        </div>
      ))}
    </div>
  ),
}

export const Sectioned: Story = listicleStory({ name: 'apm-instrumentation' })

export const SectionedWithDefaultSection: Story = listicleStory({
  name: 'apm-instrumentation',
  defaultSection: 'python',
})

export const Searchable: Story = listicleStory({ name: 'dashboard-templates' })

export const Flat: Story = listicleStory({ name: 'migrate-to-signoz' })

export const UnknownName: Story = listicleStory({ name: 'does-not-exist' })
