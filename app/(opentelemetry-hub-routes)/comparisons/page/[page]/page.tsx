import Comparisons from '@/components/ResourceCenter/Comparisons'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Comparisons - Page ${params.page}`,
    description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `Comparisons - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/comparisons/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `Comparisons - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/comparisons/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function Page({ params }: { params: { page: string } }) {
  const comparisons = await fetchAllComparisonsForPage()
  const posts = allCoreContent(sortPosts(comparisons))
  const pageNumber = parseInt(params.page as string)

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Comparisons posts={posts} pageNumber={pageNumber} />
      </div>
    </div>
  )
}
