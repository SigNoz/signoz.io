import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NextCarousel from '@/components/Carousel/Carousel'

const commaSeparatedItems =
  '/img/blog/2024/05/kafka-monitoring/kafka-latency-1.png,/img/blog/2024/05/kafka-monitoring/kafka-latency-2.png,/img/blog/2024/05/kafka-monitoring/kafka-latency-3.png'

const arrayItems = [
  '/img/blog/2024/05/kafka-monitoring/consumer-lag-1.png',
  '/img/blog/2024/05/kafka-monitoring/consumer-lag-2.png',
  '/img/blog/2024/05/kafka-monitoring/consumer-lag-3.png',
  '/img/blog/2024/05/kafka-monitoring/consumer-lag-4.png',
]

const commaSeparatedMdx = `
{/* The MDX-registered name is NextCarousel; items is a comma-separated list of image paths */}
<NextCarousel items="${commaSeparatedItems}" />
`

const arrayMdx = `
{/* items also accepts an array of image paths */}
<NextCarousel
  items={[
${arrayItems.map((item) => `    '${item}',`).join('\n')}
  ]}
/>
`

const emptyMdx = `
{/* An empty items list renders nothing at all */}
<NextCarousel items="" />
`

const previewMdx = [commaSeparatedMdx, arrayMdx, emptyMdx].join('\n')

const meta = {
  title: 'MDX Components/Content/Carousel',
  component: NextCarousel,
  parameters: {
    docsProse: false,
    mdxUsage: commaSeparatedMdx,
    chromatic: { disableSnapshot: true },
  },
  args: {
    items: commaSeparatedItems,
  },
} satisfies Meta<typeof NextCarousel>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <NextCarousel items={commaSeparatedItems} />
      <NextCarousel items={arrayItems} />
      <NextCarousel items="" />
    </div>
  ),
}

export const CommaSeparatedString: Story = {
  parameters: {
    mdxUsage: commaSeparatedMdx,
  },
}

export const ArrayOfImages: Story = {
  parameters: {
    mdxUsage: arrayMdx,
  },
  args: {
    items: arrayItems,
  },
}

export const Empty: Story = {
  args: { items: '' },
  parameters: {
    mdxUsage: emptyMdx,
  },
}
