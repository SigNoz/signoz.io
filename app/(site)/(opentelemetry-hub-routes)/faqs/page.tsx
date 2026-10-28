import ListingWithSearch from '@/components/ResourceCenter/ListingWithSearch'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../metadata'
import { getResourceCenterFaqs } from '../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import { FAQS_LISTING } from './constants'

export const metadata = buildListingMetadata(FAQS_LISTING.title, undefined, 'faqs')

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function FAQsHome() {
  const posts = await getResourceCenterFaqs()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('faqs')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <ListingWithSearch posts={posts} pageRoute="faqs" {...FAQS_LISTING} />
      </ListingPageLayout>
    </>
  )
}
