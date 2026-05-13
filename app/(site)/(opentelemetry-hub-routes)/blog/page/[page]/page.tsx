import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Blog', params.page)
}

export const revalidate = CMS_REVALIDATE_INTERVAL

// ISR: pagination pages generated on-demand at runtime.
// Required by Next.js for ISR to work with dynamicParams=true.
// See: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function Page({ params }: { params: { page: string } }) {
  const blogPosts = await getResourceCenterBlogs()

  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
