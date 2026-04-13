import Blogs from '@/components/ResourceCenter/Blogs'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `OpenTelemetry - Page ${params.page}`,
    description: `${siteMetadata.description} | OpenTelemetry - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `OpenTelemetry - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | OpenTelemetry - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/opentelemetry/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `OpenTelemetry - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | OpenTelemetry - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/opentelemetry/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

const POSTS_PER_PAGE = 12

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page as string)

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Blogs pageNumber={pageNumber} pageRoute="opentelemetry" />
      </div>
    </div>
  )
}
