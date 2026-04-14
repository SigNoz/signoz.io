import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import {
  getOpenTelemetryHubContentLayerArticles,
  pickOpenTelemetryArticleFields,
  type ResourceCenterCard,
} from '../../../content'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { fetchMDXContentByPath, type MDXContent, type MDXContentApiResponse } from '@/utils/strapi'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('OpenTelemetry', params.page)
}

const contentLayerArticles = getOpenTelemetryHubContentLayerArticles()

export const generateStaticParams = async () =>
  buildStaticPaginationParams(contentLayerArticles.length)

export default async function Page({ params }: { params: { page: string } }) {
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

  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <ListingPageLayout>
      <ListingWithSearch
        posts={allArticles}
        pageNumber={parseInt(params.page)}
        pageRoute="opentelemetry"
        title="OpenTelemetry"
        description="Articles on OpenTelemetry concepts, implementation, and its use cases."
        searchPlaceholder="Search for an article..."
        gridTitle="All Articles"
      />
    </ListingPageLayout>
  )
}
