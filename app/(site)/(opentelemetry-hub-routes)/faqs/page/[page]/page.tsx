import { notFound } from 'next/navigation'
import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterFaqs } from '../../../content'
import { POSTS_PER_PAGE } from '../../../constants'
import { getListingPageNumber } from '@/utils/paginationPages'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import { FAQS_LISTING } from '../../constants'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export const generateStaticParams = async () => {
  return []
}

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata(FAQS_LISTING.title, params.page, 'faqs')
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = await getResourceCenterFaqs()
  const pageNumber = getListingPageNumber(params.page, posts.length, POSTS_PER_PAGE)
  if (!pageNumber) notFound()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('faqs', params.page)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <ListingWithSearch
          posts={posts}
          pageNumber={pageNumber}
          pageRoute="faqs"
          {...FAQS_LISTING}
        />
      </ListingPageLayout>
    </>
  )
}
