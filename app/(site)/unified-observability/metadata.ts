import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Unified Observability Platform',
  description:
    'Transform fragmented monitoring into unified insights with SigNoz Cloud. Correlate metrics, traces, and logs in one OpenTelemetry-native platform for complete system visibility.',
  openGraph: {
    title: 'Unified Observability Platform | SigNoz',
    description:
      'Transform fragmented monitoring into unified insights with SigNoz Cloud. Correlate metrics, traces, and logs in one OpenTelemetry-native platform for complete system visibility.',
    images: [
      {
        url: '/img/unified-observability/unified-observability-unified-observabilty-with-signoz.webp',
        width: 800,
        height: 533,
        alt: 'SigNoz Unified Observability Platform',
      },
    ],
    type: 'website',
    url: `${siteMetadata.siteUrl}/unified-observability`,
    siteName: siteMetadata.title,
  } as const,
  twitter: {
    card: 'summary_large_image',
    title: 'Unified Observability Platform | SigNoz',
    description:
      'Transform fragmented monitoring into unified insights with SigNoz Cloud. Correlate metrics, traces, and logs in one OpenTelemetry-native platform for complete system visibility.',
    images: [
      '/img/unified-observability/unified-observability-unified-observabilty-with-signoz.webp',
    ],
    site: siteMetadata.twitter,
  } as const,
  keywords: [
    'unified observability',
    'observability platform',
    'application monitoring',
    'distributed tracing',
    'metrics monitoring',
    'log management',
    'OpenTelemetry',
    'APM',
    'application performance monitoring',
    'SigNoz',
    'DataDog Unified Observability Alternative',
  ],
  alternates: {
    canonical: `${siteMetadata.siteUrl}/unified-observability/`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default metadata
