import Blogs from '@/components/ResourceCenter/Blogs'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import { getResourceCenterBlogs } from '../content'

export const metadata: Metadata = {
  title: 'Blog',
  description: `${siteMetadata.description} | Blog | SigNoz`,
  openGraph: {
    title: 'Blog | SigNoz',
    description: `${siteMetadata.description} | Blog | SigNoz`,
    url: `${siteMetadata.siteUrl}/blog`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Blog | SigNoz',
    description: `${siteMetadata.description} | Blog | SigNoz`,
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = getResourceCenterBlogs()

export default async function BlogHome() {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Blogs posts={blogPosts} />
      </div>
    </div>
  )
}
