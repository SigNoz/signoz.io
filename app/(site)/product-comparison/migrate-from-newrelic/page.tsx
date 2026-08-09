import siteMetadata from '@/data/siteMetadata'
import MigrateFromNewRelic from './MigrateFromNewRelic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from NewRelic',
  description: 'Request expert help to migrate from New Relic to SigNoz Cloud.',
  openGraph: {
    title: 'Migrate from NewRelic | SigNoz',
    description: 'Request expert help to migrate from New Relic to SigNoz Cloud.',
    url: `${siteMetadata.siteUrl}/product-comparison/migrate-from-newrelic`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Migrate from NewRelic | SigNoz',
    description: 'Request expert help to migrate from New Relic to SigNoz Cloud.',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/migrate-from-newrelic`,
  },
}

export default function MigrateFromNewRelicPage() {
  return <MigrateFromNewRelic />
}
