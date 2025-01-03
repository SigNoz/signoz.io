import SigNozVsDatadogV2 from './SigNozVsDatadogV2'
import { Metadata } from 'next'
import siteMetadata from '../../../data/siteMetadata'

export const metadata: Metadata = {
  title: 'In Depth - SigNoz vs Datadog',
  description:
    'How is SigNoz a great alternative to Datadog? Learn where SigNoz is a better fit for your use cases when compared to Datadog.',
  openGraph: {
    title: 'In Depth - SigNoz vs Datadog',
    description:
      'How is SigNoz a great alternative to Datadog? Learn where SigNoz is a better fit for your use cases when compared to Datadog.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 533,
        alt: 'SigNoz vs Datadog Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-datadog`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'In Depth - SigNoz vs Datadog | SigNoz',
    description:
      'How is SigNoz a great alternative to Datadog? Learn where SigNoz is a better fit for your use cases when compared to Datadog.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'SigNoz vs Datadog',
    'Datadog alternative',
    'open source Datadog alternative',
    'Datadog comparison',
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

export default function SigNozVSDatadogPage() {
  return <SigNozVsDatadogV2 />
}
