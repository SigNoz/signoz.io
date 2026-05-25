import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterBlogs } from '../../../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Blog', params.page)
}

export const generateStaticParams = async () => {
  return []
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const blogPosts = await getResourceCenterBlogs()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('blog', params.page)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <Blogs posts={blogPosts} pageNumber={parseInt(params.page)} />
      </ListingPageLayout>
    </>
  )
}
