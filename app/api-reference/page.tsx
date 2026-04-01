'use client'

import React from 'react'
import OpenAPISpec from '../../components/OpenAPISpec'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

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

export default function APIReference() {
  if (typeof window === 'undefined') return null

  return (
    <div className="api-reference" data-theme="dark">
      <OpenAPISpec />
    </div>
  )
}
