import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterGuides } from '../content'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const metadata = buildListingMetadata('Guides')

export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function GuidesHome() {
  const guidePosts = await getResourceCenterGuides()

  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} />
    </ListingPageLayout>
  )
}
