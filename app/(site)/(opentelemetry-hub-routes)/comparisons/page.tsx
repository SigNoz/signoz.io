import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { buildListingMetadata } from '../metadata'

export const metadata = buildListingMetadata('Comparisons')

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function ComparisonsHome() {
  const comparisons = await fetchAllComparisonsForPage()
  const posts = allCoreContent(sortPosts(comparisons))

  return (
    <ListingPageLayout>
      <ListingWithSearch
        posts={posts}
        pageRoute="comparisons"
        title="Comparisons"
        description="Stay informed about the latest tools in the observability domain with in-depth comparisons of popular options to determine the best fit for your needs."
        searchPlaceholder="Search for a comparison..."
        gridTitle="All Comparisons"
      />
    </ListingPageLayout>
  )
}
