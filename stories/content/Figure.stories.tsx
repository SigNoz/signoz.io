import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NextImage from 'next/image'
import Figure from '@/components/Figure/Figure'

const defaultMdx = `
<Figure
  src="/img/docs/alert-rules.webp"
  alt="Alert rules list in SigNoz showing rule name, severity, and firing state"
  caption="Alert rules in SigNoz. Click the image to zoom"
/>
`

const sourceAttributionMdx = `
<Figure
  src="/img/docs/alerts-query-builder.webp"
  alt="Query builder while creating a metrics-based alert in SigNoz"
  caption="Building an alert query on p99 latency."
  link="https://signoz.io/docs/alerts/"
  sourceText="SigNoz Alerts docs"
/>
`

const captionAsLinkMdx = `
<Figure
  src="/img/docs/apdex-score.webp"
  alt="Apdex score panel on the SigNoz service overview page"
  caption="Read more about Apdex scores in SigNoz"
  link="https://signoz.io/docs/userguide/metrics/"
/>
`

const customDimensionsMdx = `
<Figure
  src="/img/docs/cursor-icon.webp"
  alt="Cursor editor icon"
  caption="Small fixed-size image (72x72)"
  width="72"
  height="72"
/>
`

const nextImageMdx = `
<NextImage
  src="/img/docs/alerts-query-builder.webp"
  alt="Query builder while creating a metrics-based alert in SigNoz"
  width={1200}
  height={675}
  className="rounded-md"
/>
`

const themeInvertOptOutMdx = `
<Figure
  src="/img/docs/cursor-icon.webp"
  alt="Cursor editor icon"
  caption="Logo kept as-is in light mode via themeInvert={false}"
  themeInvert={false}
  width="72"
  height="72"
/>
`

const lightDarkPairMdx = `
<Figure
  src="/img/docs/alert-rules.webp"
  lightSrc="/img/docs/apdex-score.webp"
  alt="Alert rules list in SigNoz"
  caption="Dedicated light-mode screenshot via lightSrc (no invert applied)"
/>
`

const previewMdx = [
  defaultMdx,
  sourceAttributionMdx,
  captionAsLinkMdx,
  customDimensionsMdx,
  themeInvertOptOutMdx,
  lightDarkPairMdx,
  nextImageMdx,
].join('\n')

const meta = {
  title: 'MDX Components/Content/Figure',
  component: Figure,
  parameters: {
    mdxUsage: defaultMdx,
    chromatic: { disableSnapshot: true },
  },
  args: {
    src: '/img/docs/alert-rules.webp',
    alt: 'Alert rules list in SigNoz showing rule name, severity, and firing state',
    caption: 'Alert rules in SigNoz. Click the image to zoom',
  },
} satisfies Meta<typeof Figure>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Figure
        src="/img/docs/alert-rules.webp"
        alt="Alert rules list in SigNoz showing rule name, severity, and firing state"
        caption="Alert rules in SigNoz. Click the image to zoom"
      />
      <Figure
        src="/img/docs/alerts-query-builder.webp"
        alt="Query builder while creating a metrics-based alert in SigNoz"
        caption="Building an alert query on p99 latency."
        link="https://signoz.io/docs/alerts/"
        sourceText="SigNoz Alerts docs"
      />
      <Figure
        src="/img/docs/apdex-score.webp"
        alt="Apdex score panel on the SigNoz service overview page"
        caption="Read more about Apdex scores in SigNoz"
        link="https://signoz.io/docs/userguide/metrics/"
      />
      <Figure
        src="/img/docs/cursor-icon.webp"
        alt="Cursor editor icon"
        caption="Small fixed-size image (72x72)"
        width={72}
        height={72}
      />
      <Figure
        src="/img/docs/cursor-icon.webp"
        alt="Cursor editor icon"
        caption="Logo kept as-is in light mode via themeInvert={false}"
        themeInvert={false}
        width={72}
        height={72}
      />
      <Figure
        src="/img/docs/alert-rules.webp"
        lightSrc="/img/docs/apdex-score.webp"
        alt="Alert rules list in SigNoz"
        caption="Dedicated light-mode screenshot via lightSrc (no invert applied)"
      />
      <NextImage
        src="/img/docs/alerts-query-builder.webp"
        alt="Query builder while creating a metrics-based alert in SigNoz"
        width={1200}
        height={675}
        className="rounded-md"
      />
    </div>
  ),
}

export const Default: Story = {
  parameters: {
    mdxUsage: defaultMdx,
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
    mdxUsage: sourceAttributionMdx,
  },
}

export const CaptionAsLink: Story = {
  args: {
    src: '/img/docs/apdex-score.webp',
    alt: 'Apdex score panel on the SigNoz service overview page',
    caption: 'Read more about Apdex scores in SigNoz',
    link: 'https://signoz.io/docs/userguide/metrics/',
  },
  parameters: {
    mdxUsage: captionAsLinkMdx,
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
    mdxUsage: customDimensionsMdx,
  },
}

export const ThemeInvertOptOut: Story = {
  args: {
    src: '/img/docs/cursor-icon.webp',
    alt: 'Cursor editor icon',
    caption: 'Logo kept as-is in light mode via themeInvert={false}',
    themeInvert: false,
    width: 72,
    height: 72,
  },
  parameters: {
    mdxUsage: themeInvertOptOutMdx,
  },
}

export const LightDarkPair: Story = {
  args: {
    src: '/img/docs/alert-rules.webp',
    lightSrc: '/img/docs/apdex-score.webp',
    alt: 'Alert rules list in SigNoz',
    caption: 'Dedicated light-mode screenshot via lightSrc (no invert applied)',
  },
  parameters: {
    mdxUsage: lightDarkPairMdx,
  },
}

export const NextImageDirect: Story = {
  name: 'NextImage',
  parameters: {
    mdxUsage: nextImageMdx,
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
