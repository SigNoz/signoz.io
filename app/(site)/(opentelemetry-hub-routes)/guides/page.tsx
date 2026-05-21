import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterGuides } from '../content'

export const metadata = buildListingMetadata('Guides')

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function GuidesHome() {
  const guidePosts = await getResourceCenterGuides()

  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} />
    </ListingPageLayout>
  )
}
