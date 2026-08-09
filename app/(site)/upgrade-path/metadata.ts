import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const upgradePathDescription =
  'Plan version upgrades for Self-Hosted SigNoz. SigNoz Cloud upgrades are managed by SigNoz and do not require this tool.'

export const metadata: Metadata = {
  title: 'SigNoz Upgrade Path Tool',
  description: upgradePathDescription,
  openGraph: {
    title: 'SigNoz Upgrade Path Tool | SigNoz',
    description: upgradePathDescription,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    url: `${siteMetadata.siteUrl}/upgrade-path`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SigNoz Upgrade Path Tool | SigNoz',
    description: upgradePathDescription,
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
