import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterComparisons } from '../../../content'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Comparisons', params.page)
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = await getResourceCenterComparisons()

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
