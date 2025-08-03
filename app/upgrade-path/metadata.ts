import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'SigNoz Upgrade Path Tool',
  description: 'Plan your SigNoz upgrade with confidence. Our interactive tool generates a safe, step-by-step upgrade path between any two versions, highlighting mandatory stops, breaking changes, and relevant guides to ensure a smooth transition.',
  openGraph: {
    title: 'SigNoz Upgrade Path Tool | SigNoz',
    description: 'Plan your SigNoz upgrade with confidence. Our interactive tool generates a safe, step-by-step upgrade path between any two versions, highlighting mandatory stops, breaking changes, and relevant guides to ensure a smooth transition.',
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    url: `${siteMetadata.siteUrl}/upgrade-path`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SigNoz Upgrade Path Tool | SigNoz',
    description: 'Plan your SigNoz upgrade with confidence. Our interactive tool generates a safe, step-by-step upgrade path between any two versions, highlighting mandatory stops, breaking changes, and relevant guides to ensure a smooth transition.',
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
  }
}