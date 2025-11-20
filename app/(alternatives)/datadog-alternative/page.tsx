import SigNozVsDatadogV2 from './SigNozVsDatadogV2'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Modern Datadog Alternative | SigNoz',
  description:
    'SigNoz is the modern Datadog alternative. Built on OpenTelemetry, it delivers affordable, full-stack observability across logs, metrics, and traces.',
  openGraph: {
    title: 'Modern Datadog Alternative | SigNoz',
    description:
      'SigNoz is the modern Datadog alternative. Built on OpenTelemetry, it delivers affordable, full-stack observability across logs, metrics, and traces.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 533,
        alt: 'SigNoz vs Datadog Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/datadog-alternative`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Datadog Alternative | SigNoz',
    description:
      'SigNoz is the modern Datadog alternative. Built on OpenTelemetry, it delivers affordable, full-stack observability across logs, metrics, and traces.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'Modern Datadog alternative',
    'Datadog alternative',
    'open source Datadog alternative',
    'SigNoz vs Datadog',
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
