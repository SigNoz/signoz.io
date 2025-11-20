import SigNozVSNewRelicV2 from './SigNozVsNewRelicV2'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern New Relic Alternative | SigNoz',
  description:
    'SigNoz is the modern New Relic alternative with OpenTelemetry-native ingestion, unlimited basic seats, and predictable usage-based pricing.',
  openGraph: {
    title: 'Modern New Relic Alternative | SigNoz',
    description:
      'SigNoz is the modern New Relic alternative with OpenTelemetry-native ingestion, unlimited basic seats, and predictable usage-based pricing.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 400,
        alt: 'SigNoz vs New Relic Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/newrelic-alternative`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'Modern New Relic Alternative | SigNoz',
    description:
      'SigNoz is the modern New Relic alternative with OpenTelemetry-native ingestion, unlimited basic seats, and predictable usage-based pricing.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'Modern New Relic alternative',
    'New Relic alternative',
    'open source New Relic alternative',
    'SigNoz vs New Relic',
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
