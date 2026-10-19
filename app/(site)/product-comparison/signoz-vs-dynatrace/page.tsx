import siteMetadata from '@/data/siteMetadata'
import SigNozVSDynatrace from './SigNozVsDynaTrace'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS DynaTrace',
  description:
    'Compare the Dynatrace platform with SigNoz Cloud for OpenTelemetry-native observability and usage-based pricing.',
  openGraph: {
    title: 'SigNoz VS DynaTrace | SigNoz',
    description:
      'Compare the Dynatrace platform with SigNoz Cloud for OpenTelemetry-native observability and usage-based pricing.',
    url: `${siteMetadata.siteUrl}/product-comparison/signoz-vs-dynatrace`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz VS DynaTrace | SigNoz',
    description:
      'Compare the Dynatrace platform with SigNoz Cloud for OpenTelemetry-native observability and usage-based pricing.',
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
