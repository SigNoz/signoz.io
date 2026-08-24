import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NextCarousel from '@/components/Carousel/Carousel'

const meta = {
  title: 'MDX Components/Content/Carousel',
  component: NextCarousel,
  parameters: { docsProse: false },
  args: {
    items:
      '/img/blog/2024/05/kafka-monitoring/kafka-latency-1.png,/img/blog/2024/05/kafka-monitoring/kafka-latency-2.png,/img/blog/2024/05/kafka-monitoring/kafka-latency-3.png',
  },
} satisfies Meta<typeof NextCarousel>

export default meta

type Story = StoryObj<typeof meta>

export const CommaSeparatedString: Story = {}

export const ArrayOfImages: Story = {
  args: {
    items: [
      '/img/blog/2024/05/kafka-monitoring/consumer-lag-1.png',
      '/img/blog/2024/05/kafka-monitoring/consumer-lag-2.png',
      '/img/blog/2024/05/kafka-monitoring/consumer-lag-3.png',
      '/img/blog/2024/05/kafka-monitoring/consumer-lag-4.png',
    ],
  },
}

// Empty input renders nothing (the component returns null).
export const Empty: Story = {
  args: { items: '' },
}
