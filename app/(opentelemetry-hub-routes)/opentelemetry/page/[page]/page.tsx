import OpenTelemetryListing from '@/components/ResourceCenter/OpenTelemetryListing'
import siteMetadata from '@/data/siteMetadata'
import {
  getOpenTelemetryHubContentLayerArticles,
  pickOpenTelemetryArticleFields,
  type ResourceCenterCard,
} from '../../../content'
import { fetchMDXContentByPath, type MDXContent, type MDXContentApiResponse } from '@/utils/strapi'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

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

const contentLayerArticles = getOpenTelemetryHubContentLayerArticles()

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(contentLayerArticles.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page as string)

  // Fetch CMS opentelemetries articles
  let cmsArticles: ResourceCenterCard[] = []
  try {
    const isProduction = process.env.VERCEL_ENV === 'production'
    const deployment_status = isProduction ? 'live' : 'staging'
    const response = await fetchMDXContentByPath(
      'opentelemetries',
      undefined,
      deployment_status,
      true
    )
    cmsArticles = (((response as MDXContentApiResponse).data || []) as MDXContent[]).map(
      pickOpenTelemetryArticleFields
    )
  } catch (error) {
    console.error('Error fetching OpenTelemetry CMS articles:', error)
  }

  // Merge contentlayer articles with CMS articles, deduplicating by path
  const allArticles: ResourceCenterCard[] = [...contentLayerArticles]
  const existingPaths = new Set(
    allArticles.map((a) => a.path.replace(/^\/+/, '').replace(/\/+$/, ''))
  )
  for (const article of cmsArticles) {
    const normalized = article.path.replace(/^\/+/, '').replace(/\/+$/, '')
    if (!existingPaths.has(normalized)) {
      allArticles.push(article)
      existingPaths.add(normalized)
    }
  }

  // Sort by date descending
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <OpenTelemetryListing posts={allArticles} pageNumber={pageNumber} />
      </div>
    </div>
  )
}
