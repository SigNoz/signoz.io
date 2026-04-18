import siteMetadata from '@/data/siteMetadata'
import DatadogSaving from './DatadogSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz vs Datadog Cost Savings',
  description: 'SigNoz vs Datadog Cost Savings | SigNoz',
  openGraph: {
    title: 'SigNoz vs Datadog Cost Savings | SigNoz',
    description: 'SigNoz vs Datadog Cost Savings | SigNoz',
    url: `${siteMetadata.siteUrl}/product-comparison/datadog-savings`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz vs Datadog Cost Savings | SigNoz',
    description: 'SigNoz vs Datadog Cost Savings | SigNoz',
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
