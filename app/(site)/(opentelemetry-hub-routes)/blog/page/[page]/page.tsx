import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { allBlogs } from 'contentlayer/generated'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Blog', params.page)
}

export const generateStaticParams = async () => buildStaticPaginationParams(allBlogs.length)

const blogPosts = getResourceCenterBlogs()

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
