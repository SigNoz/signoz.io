import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'
import { getAllBlogsMeta } from '@/utils/contentlayer/blogCollection'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Blog', params.page)
}

export const generateStaticParams = async () => {
  const blogs = await getAllBlogsMeta()
  return buildStaticPaginationParams(blogs.length)
}

export default async function Page({ params }: { params: { page: string } }) {
  const blogPosts = await getResourceCenterBlogs()
  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
