import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { buildListingMetadata } from '../../../metadata'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Comparisons', params.page)
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const comparisons = await fetchAllComparisonsForPage()
  const posts = allCoreContent(sortPosts(comparisons))

  return (
    <ListingPageLayout>
      <ListingWithSearch
        posts={posts}
        pageNumber={parseInt(params.page)}
        pageRoute="comparisons"
        title="Comparisons"
        description="Stay informed about the latest tools in the observability domain with in-depth comparisons of popular options to determine the best fit for your needs."
        searchPlaceholder="Search for a comparison..."
        gridTitle="All Comparisons"
      />
    </ListingPageLayout>
  )
}
