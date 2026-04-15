import type { ReactNode } from 'react'
import { Metadata } from 'next'

import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'SigNoz API Reference',
  description: 'SigNoz API Reference | SigNoz',
  openGraph: {
    title: 'SigNoz API Reference | SigNoz',
    description: 'SigNoz API Reference | SigNoz',
    url: `${siteMetadata.siteUrl}/api-reference`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz API Reference | SigNoz',
    description: 'SigNoz API Reference | SigNoz',
    images: [siteMetadata.socialBanner],
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/api-reference`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function APIReferenceLayout({ children }: { children: ReactNode }) {
  return children
}
