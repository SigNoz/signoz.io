import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterGuides } from '../../../content'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Guides', params.page)
}

export const revalidate = CMS_REVALIDATE_INTERVAL

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function Page({ params }: { params: { page: string } }) {
  const guidePosts = await getResourceCenterGuides()

  return (
    <ListingPageLayout>
      <Guides posts={guidePosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
