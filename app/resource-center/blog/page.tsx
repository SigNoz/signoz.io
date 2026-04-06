import React from 'react'
import Blogs from './Blogs'
import siteMetadata, { description } from '@/data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | SigNoz',
  description: description,
  openGraph: {
    title: 'Blog | SigNoz',
    description: description,
    url: `${siteMetadata.siteUrl}/blog`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Blog | SigNoz',
    description: description,
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default async function BlogHome() {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Blogs />
      </div>
    </div>
  )
}
