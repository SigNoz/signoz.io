import SigNozVSGrafanaV2 from './SigNozVsGrafanaV2'
import siteMetadata from '../../../data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In Depth - SigNoz vs Grafana',
  description:
    'How is SigNoz a great alternative to Grafana? Learn where SigNoz is a better fit for your use cases when compared to Grafana.',
  openGraph: {
    title: 'In Depth - SigNoz vs Grafana',
    description:
      'How is SigNoz a great alternative to Grafana? Learn where SigNoz is a better fit for your use cases when compared to Grafana.',
    images: [
      {
        url: '/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp',
        width: 800,
        height: 533,
        alt: 'SigNoz vs Grafana Comparison',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-grafana`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'In Depth - SigNoz vs Grafana | SigNoz',
    description:
      'How is SigNoz a great alternative to Grafana? Learn where SigNoz is a better fit for your use cases when compared to Grafana.',
    images: ['/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp'],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'SigNoz vs Grafana',
    'Grafana alternative',
    'open source Grafana alternative',
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
