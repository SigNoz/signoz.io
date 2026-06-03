import Guides from '@/components/ResourceCenter/Guides'
import ListingPageLayout from '@/components/ResourceCenter/ListingPageLayout'
import { buildListingMetadata } from '../../../metadata'
import { getResourceCenterGuides } from '../../../content'
import { generateSectionHubBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return buildListingMetadata('Guides', params.page)
}

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const guidePosts = await getResourceCenterGuides()
  const breadcrumbJsonLd = generateSectionHubBreadcrumb('guides', params.page)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <ListingPageLayout>
        <Guides posts={guidePosts} pageNumber={parseInt(params.page)} />
      </ListingPageLayout>
    </>
  )
}
