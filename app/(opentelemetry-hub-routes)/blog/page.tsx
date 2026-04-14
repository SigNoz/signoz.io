import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterBlogs } from '../content'

export const metadata = buildListingMetadata('Blog')

const blogPosts = getResourceCenterBlogs()

export default async function BlogHome() {
  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} />
    </ListingPageLayout>
  )
}
