import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterGuides } from '../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'

export const metadata = buildListingMetadata('Guides')

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function GuidesHome() {
  const guidePosts = await getResourceCenterGuides()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('guides')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <Guides posts={guidePosts} />
      </ListingPageLayout>
    </>
  )
}
