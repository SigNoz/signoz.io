import type { Metadata } from 'next'

import siteMetadata from '@/data/siteMetadata'

import KubeconPage from './KubeconPage'

const title = 'Meet SigNoz at KubeCon NA 2026 Salt Lake City — Booth 198'
const description =
  'Visit SigNoz at KubeCon + CloudNativeCon North America 2026, November 9–12 at the Salt Palace Convention Center in Salt Lake City. Find us at booth 198 to talk OpenTelemetry, unified observability and agent-native workflows.'

// TODO: swap in a dedicated KubeCon NA 2026 OG image once design provides one.
const socialImage = siteMetadata.socialBanner

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: './',
    images: [{ url: socialImage, alt: 'SigNoz at KubeCon NA 2026, booth 198' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: socialImage, alt: 'SigNoz at KubeCon NA 2026, booth 198' }],
  },
}

export default function Page() {
  return <KubeconPage />
}
