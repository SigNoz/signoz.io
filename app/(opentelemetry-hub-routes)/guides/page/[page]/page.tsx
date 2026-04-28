import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { getResourceCenterGuides } from '../../../content'
import { getAllGuidesMeta } from '@/utils/contentlayer/guideCollection'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Guides', params.page)
}

export const generateStaticParams = async () => {
  const guides = await getAllGuidesMeta()
  return buildStaticPaginationParams(guides.length)
}

export default async function Page({ params }: { params: { page: string } }) {
  const guidePosts = await getResourceCenterGuides()
  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
