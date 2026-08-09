import siteMetadata from '@/data/siteMetadata'
import NewRelicSaving from './NewRelicSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Relic Savings',
  description: 'Request a New Relic cost comparison for your move to SigNoz Cloud.',
  openGraph: {
    title: 'New Relic Savings | SigNoz',
    description: 'Request a New Relic cost comparison for your move to SigNoz Cloud.',
    url: `${siteMetadata.siteUrl}/product-comparison/newrelic-savings`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'New Relic Savings | SigNoz',
    description: 'Request a New Relic cost comparison for your move to SigNoz Cloud.',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/newrelic-savings`,
  },
}

export default function MigrateFromDataDogPage() {
  return <NewRelicSaving />
}
