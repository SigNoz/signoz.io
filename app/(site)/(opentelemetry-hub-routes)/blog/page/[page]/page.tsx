import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Blog', params.page)
}

export const generateStaticParams = async () => {
  return []
}

export default async function Page({ params }: { params: { page: string } }) {
  const blogPosts = await getResourceCenterBlogs()

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return (
    <ListingPageLayout>
      <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
    </ListingPageLayout>
  )
}
