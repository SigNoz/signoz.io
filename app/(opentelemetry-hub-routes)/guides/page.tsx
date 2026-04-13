import Guides from '@/components/ResourceCenter/Guides'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import { getResourceCenterGuides } from '../content'

export const metadata: Metadata = {
  title: 'Guides',
  description: `${siteMetadata.description} | Guides | SigNoz`,
  openGraph: {
    title: 'Guides | SigNoz',
    description: `${siteMetadata.description} | Guides | SigNoz`,
    url: `${siteMetadata.siteUrl}/guides`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Guides | SigNoz',
    description: `${siteMetadata.description} | Guides | SigNoz`,
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const guidePosts = getResourceCenterGuides()

export default function GuidesHome() {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Guides posts={guidePosts} />
      </div>
    </div>
  )
}
