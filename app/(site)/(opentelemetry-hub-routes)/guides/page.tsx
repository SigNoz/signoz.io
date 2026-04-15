import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterGuides } from '../content'

export const metadata = buildListingMetadata('Guides')

const guidePosts = getResourceCenterGuides()

export default function GuidesHome() {
  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} />
    </ListingPageLayout>
  )
}
