import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ArticleSeriesBottom from '@/components/ArticleSeries/ArticleSeriesBottom'
import ArticleSeriesTop from '@/components/ArticleSeries/ArticleSeriesTop'

const meta = {
  title: 'MDX Components/Shared Partials/Article Series',
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* Top of the post, right after frontmatter; omit the previous/next props on the first/last part */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Structured Logging in NextJS with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-logging"
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

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
{/* Top of the post, right after frontmatter */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Structured Logging in NextJS with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-logging"
/>

{/* First part of the series: omit the previous props */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="1"
  totalParts="4"
  nextTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-web-vitals"
/>

{/* End of the post, same props as ArticleSeriesTop */}
<ArticleSeriesBottom
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Structured Logging in NextJS with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-logging"
/>

{/* Last part of the series: omit the next props */}
<ArticleSeriesBottom
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="4"
  totalParts="4"
  previousTitle="Structured Logging in NextJS with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-logging"
/>
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <ArticleSeriesTop
        {...SERIES}
        currentPart="3"
        previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
        previousHref="/blog/opentelemetry-nextjs-web-vitals"
        nextTitle="Structured Logging in NextJS with OpenTelemetry"
        nextHref="/blog/opentelemetry-nextjs-logging"
      />
      <ArticleSeriesTop
        {...SERIES}
        currentPart="1"
        nextTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
        nextHref="/blog/opentelemetry-nextjs-web-vitals"
      />
      <ArticleSeriesBottom
        {...SERIES}
        currentPart="3"
        previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
        previousHref="/blog/opentelemetry-nextjs-web-vitals"
        nextTitle="Structured Logging in NextJS with OpenTelemetry"
        nextHref="/blog/opentelemetry-nextjs-logging"
      />
      <ArticleSeriesBottom
        {...SERIES}
        currentPart="4"
        previousTitle="Structured Logging in NextJS with OpenTelemetry"
        previousHref="/blog/opentelemetry-nextjs-logging"
      />
    </div>
  ),
}

export const TopMiddlePart: Story = {
  name: 'ArticleSeriesTop (middle part)',
  parameters: {
    mdxUsage: `
{/* Top of the post, right after frontmatter */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Structured Logging in NextJS with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-logging"
/>
`,
  },
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
  parameters: {
    mdxUsage: `
{/* First part of the series: omit the previous props */}
<ArticleSeriesTop
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="1"
  totalParts="4"
  nextTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-web-vitals"
/>
`,
  },
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
  parameters: {
    mdxUsage: `
{/* End of the post, same props as ArticleSeriesTop */}
<ArticleSeriesBottom
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="3"
  totalParts="4"
  previousTitle="Tracking Web Vitals & Widget Performance in Next.js with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-web-vitals"
  nextTitle="Structured Logging in NextJS with OpenTelemetry"
  nextHref="/blog/opentelemetry-nextjs-logging"
/>
`,
  },
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
  parameters: {
    mdxUsage: `
{/* Last part of the series: omit the next props */}
<ArticleSeriesBottom
  seriesName="OpenTelemetry NextJS Tutorial"
  seriesOverviewHref="/blog/opentelemetry-nextjs"
  currentPart="4"
  totalParts="4"
  previousTitle="Structured Logging in NextJS with OpenTelemetry"
  previousHref="/blog/opentelemetry-nextjs-logging"
/>
`,
  },
  render: () => (
    <ArticleSeriesBottom
      {...SERIES}
      currentPart="4"
      previousTitle="Structured Logging in NextJS with OpenTelemetry"
      previousHref="/blog/opentelemetry-nextjs-logging"
    />
  ),
}
