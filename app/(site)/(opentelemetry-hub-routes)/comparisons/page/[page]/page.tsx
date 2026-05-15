import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterComparisons } from '../../../content'

export const revalidate = CMS_REVALIDATE_INTERVAL

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Comparisons', params.page)
}

export default async function Page({ params }: { params: { page: string } }) {
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
