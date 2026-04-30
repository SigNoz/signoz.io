import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterGuides } from '../content'

export const dynamic = 'force-static'
export const metadata = buildListingMetadata('Guides')

export default async function GuidesHome() {
  const guidePosts = await getResourceCenterGuides()
  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} />
    </ListingPageLayout>
  )
}
