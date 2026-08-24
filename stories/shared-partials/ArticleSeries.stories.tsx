import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ArticleSeriesBottom from '@/components/ArticleSeries/ArticleSeriesBottom'
import ArticleSeriesTop from '@/components/ArticleSeries/ArticleSeriesTop'

const meta = {
  title: 'MDX Components/Shared Partials/Article Series',
  parameters: {
    mdxUsage: `
{/* Top of the post, right after frontmatter; omit the previous/next props on the first/last part */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Deploying and Scaling OpenTelemetry in Production NextJS Apps"
  nextHref="/blog/opentelemetry-nextjs-production"
/>

{/* Same props, placed at the end of the post */}
<ArticleSeriesBottom
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Deploying and Scaling OpenTelemetry in Production NextJS Apps"
  nextHref="/blog/opentelemetry-nextjs-production"
/>
`,
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const SERIES = {
  seriesName: 'OpenTelemetry NextJS Tutorial',
  seriesOverviewHref: '/blog/opentelemetry-nextjs',
  totalParts: '4',
} as const

export const TopMiddlePart: Story = {
  name: 'ArticleSeriesTop (middle part)',
  render: () => (
    <ArticleSeriesTop
      {...SERIES}
      currentPart="3"
      previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
      previousHref="/blog/opentelemetry-nextjs-web-vitals"
      nextTitle="Structured Logging in NextJS with OpenTelemetry"
      nextHref="/blog/opentelemetry-nextjs-logging"
    />
  ),
}

export const TopFirstPart: Story = {
  name: 'ArticleSeriesTop (first part)',
  render: () => (
    <ArticleSeriesTop
      {...SERIES}
      currentPart="1"
      nextTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
      nextHref="/blog/opentelemetry-nextjs-web-vitals"
    />
  ),
}

export const BottomMiddlePart: Story = {
  name: 'ArticleSeriesBottom (middle part)',
  render: () => (
    <ArticleSeriesBottom
      {...SERIES}
      currentPart="3"
      previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
      previousHref="/blog/opentelemetry-nextjs-web-vitals"
      nextTitle="Structured Logging in NextJS with OpenTelemetry"
      nextHref="/blog/opentelemetry-nextjs-logging"
    />
  ),
}

export const BottomLastPart: Story = {
  name: 'ArticleSeriesBottom (last part)',
  render: () => (
    <ArticleSeriesBottom
      {...SERIES}
      currentPart="4"
      previousTitle="Structured Logging in NextJS with OpenTelemetry"
      previousHref="/blog/opentelemetry-nextjs-logging"
    />
  ),
}
