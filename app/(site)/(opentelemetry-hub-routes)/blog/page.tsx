import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterBlogs } from '../content'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const metadata = buildListingMetadata('Blog')
export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function BlogHome() {
  const blogPosts = await getResourceCenterBlogs()

  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} />
    </ListingPageLayout>
  )
}
