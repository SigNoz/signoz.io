import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Self-Hosted SigNoz Upgrade Path Tool',
  description:
    'Plan version upgrades for Self-Hosted SigNoz. SigNoz Cloud upgrades are managed by SigNoz and require no action in this tool.',
  openGraph: {
    title: 'Self-Hosted SigNoz Upgrade Path Tool | SigNoz',
    description:
      'Plan version upgrades for Self-Hosted SigNoz. SigNoz Cloud upgrades are managed by SigNoz and require no action in this tool.',
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    url: `${siteMetadata.siteUrl}/upgrade-path`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Hosted SigNoz Upgrade Path Tool | SigNoz',
    description:
      'Plan version upgrades for Self-Hosted SigNoz. SigNoz Cloud upgrades are managed by SigNoz and require no action in this tool.',
    site: siteMetadata.x,
  },
  keywords: [
    'SigNoz upgrade',
    'version upgrade',
    'upgrade path',
    'upgrade tool',
    'SigNoz migration',
    'version migration',
    'upgrade guide',
    'SigNoz update',
    'observability platform upgrade',
  ],
  alternates: {
    canonical: `${siteMetadata.siteUrl}/upgrade-path/`,
  },
  robots: {
    index: true,
    follow: true,
  },
}
