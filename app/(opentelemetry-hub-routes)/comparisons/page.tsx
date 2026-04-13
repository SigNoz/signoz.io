import Comparisons from '@/components/ResourceCenter/Comparisons'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparisons',
  description: `${siteMetadata.description} | Comparisons | SigNoz`,
  openGraph: {
    title: 'Comparisons | SigNoz',
    description: `${siteMetadata.description} | Comparisons | SigNoz`,
    url: `${siteMetadata.siteUrl}/comparisons`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Comparisons | SigNoz',
    description: `${siteMetadata.description} | Comparisons | SigNoz`,
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export default async function ComparisonsHome() {
  const comparisons = await fetchAllComparisonsForPage()
  const posts = allCoreContent(sortPosts(comparisons))

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Comparisons posts={posts} />
      </div>
    </div>
  )
}
