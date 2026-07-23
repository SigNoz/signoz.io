import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterComparisons } from '../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'

export const metadata = buildListingMetadata('Comparisons')

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function ComparisonsHome() {
  const posts = await getResourceCenterComparisons()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('comparisons')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
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
    </>
  )
}
