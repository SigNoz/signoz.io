import siteMetadata from '@/data/siteMetadata'
import MigrateFromDataDog from './MigrateFromDataDog'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from Datadog',
  description:
    'Request help with a managed Datadog migration to SigNoz Cloud. Share your requirements, and the SigNoz team will follow up.',
  openGraph: {
    title: 'Migrate from Datadog | SigNoz',
    description:
      'Request help with a managed Datadog migration to SigNoz Cloud. Share your requirements, and the SigNoz team will follow up.',
    url: `${siteMetadata.siteUrl}/product-comparison/migrate-from-datadog`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Migrate from Datadog | SigNoz',
    description:
      'Request help with a managed Datadog migration to SigNoz Cloud. Share your requirements, and the SigNoz team will follow up.',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/migrate-from-datadog`,
  },
}

export default function MigrateFromDataDogPage() {
  return <MigrateFromDataDog />
}
