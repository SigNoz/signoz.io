import siteMetadata from '@/data/siteMetadata'
import SigNozVSDynatrace from './SigNozVsDynaTrace'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS DynaTrace',
  description: 'SigNoz VS DynaTrace | SigNoz',
  openGraph: {
    title: 'SigNoz VS DynaTrace | SigNoz',
    description: 'SigNoz VS DynaTrace | SigNoz',
    url: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-dynatrace`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz VS DynaTrace | SigNoz',
    description: 'SigNoz VS DynaTrace | SigNoz',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-dynatrace`,
  },
}

export default function SigNozVSDynatracePage() {
  return <SigNozVSDynatrace />
}
