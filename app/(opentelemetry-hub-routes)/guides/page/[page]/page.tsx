import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { allGuides } from 'contentlayer/generated'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { getResourceCenterGuides } from '../../../content'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Guides', params.page)
}

export const generateStaticParams = async () => buildStaticPaginationParams(allGuides.length)

const guidePosts = getResourceCenterGuides()

export default function Page({ params }: { params: { page: string } }) {
  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
