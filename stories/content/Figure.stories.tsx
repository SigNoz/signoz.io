import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NextImage from 'next/image'
import Figure from '@/components/Figure/Figure'

const meta = {
  title: 'MDX Components/Content/Figure',
  component: Figure,
  parameters: {
    mdxUsage: `
<Figure
  src="/img/docs/alert-rules.webp"
  alt="Alert rules list in SigNoz showing rule name, severity, and firing state"
  caption="Alert rules in SigNoz. Click the image to zoom"
/>
`,
  },
  args: {
    src: '/img/docs/alert-rules.webp',
    alt: 'Alert rules list in SigNoz showing rule name, severity, and firing state',
    caption: 'Alert rules in SigNoz. Click the image to zoom',
  },
} satisfies Meta<typeof Figure>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    mdxUsage: `
<Figure
  src="/img/docs/alert-rules.webp"
  alt="Alert rules list in SigNoz showing rule name, severity, and firing state"
  caption="Alert rules in SigNoz. Click the image to zoom"
/>
`,
  },
}

export const WithSourceAttribution: Story = {
  args: {
    src: '/img/docs/alerts-query-builder.webp',
    alt: 'Query builder while creating a metrics-based alert in SigNoz',
    caption: 'Building an alert query on p99 latency.',
    link: 'https://signoz.io/docs/alerts/',
    sourceText: 'SigNoz Alerts docs',
  },
  parameters: {
    mdxUsage: `
<Figure
  src="/img/docs/alerts-query-builder.webp"
  alt="Query builder while creating a metrics-based alert in SigNoz"
  caption="Building an alert query on p99 latency."
  link="https://signoz.io/docs/alerts/"
  sourceText="SigNoz Alerts docs"
/>
`,
  },
}

// With `link` but no `sourceText`, the whole caption becomes the link.
export const CaptionAsLink: Story = {
  args: {
    src: '/img/docs/apdex-score.webp',
    alt: 'Apdex score panel on the SigNoz service overview page',
    caption: 'Read more about Apdex scores in SigNoz',
    link: 'https://signoz.io/docs/userguide/metrics/',
  },
  parameters: {
    mdxUsage: `
<Figure
  src="/img/docs/apdex-score.webp"
  alt="Apdex score panel on the SigNoz service overview page"
  caption="Read more about Apdex scores in SigNoz"
  link="https://signoz.io/docs/userguide/metrics/"
/>
`,
  },
}

export const CustomDimensions: Story = {
  args: {
    src: '/img/docs/cursor-icon.webp',
    alt: 'Cursor editor icon',
    caption: 'Small fixed-size image (72x72)',
    width: 72,
    height: 72,
  },
  parameters: {
    mdxUsage: `
<Figure
  src="/img/docs/cursor-icon.webp"
  alt="Cursor editor icon"
  caption="Small fixed-size image (72x72)"
  width="72"
  height="72"
/>
`,
  },
}

export const NextImageDirect: Story = {
  name: 'NextImage',
  parameters: {
    mdxUsage: `
<NextImage
  src="/img/docs/alerts-query-builder.webp"
  alt="Query builder while creating a metrics-based alert in SigNoz"
  width={1200}
  height={675}
  className="rounded-md"
/>
`,
  },
  render: () => (
    <NextImage
      src="/img/docs/alerts-query-builder.webp"
      alt="Query builder while creating a metrics-based alert in SigNoz"
      width={1200}
      height={675}
      className="rounded-md"
    />
  ),
}
