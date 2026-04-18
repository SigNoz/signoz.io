import siteMetadata from '@/data/siteMetadata'
import NewRelicSaving from './NewRelicSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Relic Savings',
  description: 'New Relic Savings | SigNoz',
  openGraph: {
    title: 'New Relic Savings | SigNoz',
    description: 'New Relic Savings | SigNoz',
    url: `${siteMetadata.siteUrl}/product-comparison/newrelic-savings`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'New Relic Savings | SigNoz',
    description: 'New Relic Savings | SigNoz',
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
