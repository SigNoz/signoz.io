import Guides from '@/components/ResourceCenter/Guides'
import { allGuides } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getResourceCenterGuides } from '../../../content'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Guides - Page ${params.page}`,
    description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `Guides - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/guides/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `Guides - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/guides/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

const POSTS_PER_PAGE = 12

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allGuides.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

const guidePosts = getResourceCenterGuides()

export default function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page as string)

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Guides posts={guidePosts} pageNumber={pageNumber} />
      </div>
    </div>
  )
}
