import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterBlogs } from '../content'
export const metadata = buildListingMetadata('Blog')
export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function BlogHome() {
  const blogPosts = await getResourceCenterBlogs()

  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} />
    </ListingPageLayout>
  )
}
