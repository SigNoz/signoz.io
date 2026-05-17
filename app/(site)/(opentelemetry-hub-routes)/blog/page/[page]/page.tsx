import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { allBlogs } from 'contentlayer/generated'
import { buildListingMetadata, buildStaticPaginationParams } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return buildListingMetadata('Blog', params.page)
}

export const generateStaticParams = async () => buildStaticPaginationParams(allBlogs.length)

const blogPosts = getResourceCenterBlogs()

export default function Page({ params }: { params: { page: string } }) {
  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
