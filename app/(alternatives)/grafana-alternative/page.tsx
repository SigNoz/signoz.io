import SigNozVSGrafanaV2 from './SigNozVsGrafanaV2'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Grafana Alternative | SigNoz',
  description:
    'SigNoz is the modern Grafana alternative: one OpenTelemetry-native backend for logs, metrics, and traces without stitching Loki, Tempo, and Mimir together.',
  openGraph: {
    title: 'Modern Grafana Alternative | SigNoz',
    description:
      'SigNoz is the modern Grafana alternative: one OpenTelemetry-native backend for logs, metrics, and traces without stitching Loki, Tempo, and Mimir together.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 533,
        alt: 'SigNoz vs Grafana Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/grafana-alternative`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Grafana Alternative | SigNoz',
    description:
      'SigNoz is the modern Grafana alternative: one OpenTelemetry-native backend for logs, metrics, and traces without stitching Loki, Tempo, and Mimir together.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'Modern Grafana alternative',
    'Grafana alternative',
    'open source Grafana alternative',
    'SigNoz vs Grafana',
    'Grafana comparison',
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

export default function SigNozVSGrafanaPage() {
  return <SigNozVSGrafanaV2 />
}
