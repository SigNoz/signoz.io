import Blogs from '@/components/ResourceCenter/Blogs'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterBlogs } from '../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import { safeJsonLdStringify } from '@/utils/structuredData'

export const metadata = buildListingMetadata('Blog')
export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function BlogHome() {
  const blogPosts = await getResourceCenterBlogs()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('blog')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(breadcrumbJsonLd) }}
      />
      <ListingPageLayout>
        <Blogs posts={blogPosts} />
      </ListingPageLayout>
    </>
  )
}
