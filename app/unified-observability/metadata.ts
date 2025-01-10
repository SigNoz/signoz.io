import { Metadata } from 'next'
import siteMetadata from '../../data/siteMetadata.js' 

export const metadata: Metadata = {
  title: 'Unified Observability Platform',
  description: "Transform your monitoring from fragmented silos to seamless insights with SigNoz's single-pane unified observability platform. Combine metrics, traces, and logs for complete system visibility.",
  openGraph: {
    title: 'Unified Observability Platform | SigNoz',
    description: "Transform your monitoring from fragmented silos to seamless insights with SigNoz's single-pane unified observability platform. Combine metrics, traces, and logs for complete system visibility.",
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
    description: "Transform your monitoring from fragmented silos to seamless insights with SigNoz's single-pane unified observability platform. Combine metrics, traces, and logs for complete system visibility.",
    images: ['/img/unified-observability/unified-observability-unified-observabilty-with-signoz.webp'],
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
  }
}

export default metadata