import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import {
  getOpenTelemetryHubContentLayerArticles,
  pickOpenTelemetryArticleFields,
  type ResourceCenterCard,
} from '../../../content'
import { buildListingMetadata } from '../../../metadata'
import { fetchMDXContentByPath, type MDXContent, type MDXContentApiResponse } from '@/utils/strapi'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('OpenTelemetry', params.page)
}

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
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

  // Fetch contentlayer + CMS hub articles
  const contentLayerArticles = await getOpenTelemetryHubContentLayerArticles()

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
