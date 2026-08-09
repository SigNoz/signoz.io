import siteMetadata from '@/data/siteMetadata'
import MigrateFromDynatrace from './MigrateFromDynatrace'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from Dynatrace',
  description: 'Request expert help to migrate from Dynatrace to SigNoz Cloud.',
  openGraph: {
    title: 'Migrate from Dynatrace | SigNoz',
    description: 'Request expert help to migrate from Dynatrace to SigNoz Cloud.',
    url: `${siteMetadata.siteUrl}/product-comparison/migrate-from-dynatrace`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Migrate from Dynatrace | SigNoz',
    description: 'Request expert help to migrate from Dynatrace to SigNoz Cloud.',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/migrate-from-dynatrace`,
  },
}

export default function MigrateFromDynatracePage() {
  return <MigrateFromDynatrace />
}
