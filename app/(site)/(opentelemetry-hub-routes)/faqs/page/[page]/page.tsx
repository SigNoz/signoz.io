import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterFaqs } from '../../../content'
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
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('faqs', params.page)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <ListingWithSearch
          posts={posts}
          pageNumber={parseInt(params.page)}
          pageRoute="faqs"
          {...FAQS_LISTING}
        />
      </ListingPageLayout>
    </>
  )
}
