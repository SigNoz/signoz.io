import siteMetadata from '@/data/siteMetadata'
import DatadogSaving from './DatadogSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz vs Datadog Cost Savings',
  description:
    'Request a Datadog-to-SigNoz Cloud cost review based on your products, plans, billing terms, usage, and current spend. Savings are not guaranteed.',
  openGraph: {
    title: 'SigNoz vs Datadog Cost Savings | SigNoz',
    description:
      'Request a Datadog-to-SigNoz Cloud cost review based on your products, plans, billing terms, usage, and current spend. Savings are not guaranteed.',
    url: `${siteMetadata.siteUrl}/product-comparison/datadog-savings`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz vs Datadog Cost Savings | SigNoz',
    description:
      'Request a Datadog-to-SigNoz Cloud cost review based on your products, plans, billing terms, usage, and current spend. Savings are not guaranteed.',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/datadog-savings`,
  },
}

export default function DatadogSavingsPage() {
  return <DatadogSaving />
}
