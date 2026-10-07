import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ComponentProps, ReactNode } from 'react'
import ListicleDirectory from '@/components/ListicleDirectory/ListicleDirectory'

const previewProps: ComponentProps<typeof ListicleDirectory>[] = [
  { name: 'integrations', defaultSection: 'all' },
  { name: 'integrations', defaultSection: 'databases' },
  { name: 'does-not-exist' },
]

const directoryMdx = (props: ComponentProps<typeof ListicleDirectory>) => {
  const attrs = Object.entries(props)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('')
  return `\n<ListicleDirectory${attrs} />\n`
}

const previewMdx = previewProps.map(directoryMdx).join('')

const meta = {
  title: 'MDX Components/Content/ListicleDirectory',
  component: ListicleDirectory,
  parameters: {
    mdxUsage: directoryMdx({ name: 'integrations', defaultSection: 'all' }),
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof ListicleDirectory>

export default meta

type Story = StoryObj<typeof meta>

const directoryStory = (props: ComponentProps<typeof ListicleDirectory>): Story => ({
  args: props,
  parameters: { mdxUsage: directoryMdx(props) },
  loaders: [async () => ({ view: await ListicleDirectory(props) })],
  render: (_args, { loaded }) => <>{loaded.view}</>,
})

export const Preview: Story = {
  args: { name: 'integrations' },
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({
      views: await Promise.all(previewProps.map((props) => ListicleDirectory(props))),
    }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-10">
      {(loaded.views as ReactNode[]).map((view, index) => (
        <div key={previewProps[index].name + (previewProps[index].defaultSection ?? '')}>
          {view}
        </div>
      ))}
    </div>
  ),
}

export const AllSections: Story = directoryStory({ name: 'integrations', defaultSection: 'all' })

export const WithDefaultSection: Story = directoryStory({
  name: 'integrations',
  defaultSection: 'databases',
})

export const UnknownName: Story = directoryStory({ name: 'does-not-exist' })
