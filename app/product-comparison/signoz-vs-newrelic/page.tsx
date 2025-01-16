import SigNozVSNewRelicV2 from './SigNozVsNewRelicV2'
import siteMetadata from '../../../data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In Depth - SigNoz vs New Relic',
  description:
    'How is SigNoz a great alternative to New Relic? Learn where SigNoz is a better fit for your use cases when compared to New Relic.',
  openGraph: {
    title: 'In Depth - SigNoz vs New Relic',
    description:
      'How is SigNoz a great alternative to New Relic? Learn where SigNoz is a better fit for your use cases when compared to New Relic.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 400,
        alt: 'SigNoz vs New Relic Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-newrelic`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'In Depth - SigNoz vs New Relic | SigNoz',
    description:
      'How is SigNoz a great alternative to New Relic? Learn where SigNoz is a better fit for your use cases when compared to New Relic.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'SigNoz vs New Relic',
    'New Relic alternative',
    'open source New Relic alternative',
    'New Relic comparison',
    'observability platform',
    'application monitoring',
    'OpenTelemetry',
    'APM',
    'application performance monitoring',
    'SigNoz',
  ],
  robots: {
    index: true,
    follow: true,
  },
}

export default function SigNozVSNewRelicPage() {
  return <SigNozVSNewRelicV2 />
}
