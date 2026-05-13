import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import siteMetadata from '@/data/siteMetadata'
import { safeJsonLdStringify } from '@/utils/structuredData'
import { fetchBlogBySlug } from '@/utils/cachedData'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

import BlogArticlePage, {
  dynamicParams as blogDynamicParams,
  generateMetadata as generateBlogMetadata,
} from '../blog/[...slug]/page'

const LANDING_PARAMS = { slug: ['what-is-opentelemetry'] }
const LANDING_CANONICAL = `${siteMetadata.siteUrl}/opentelemetry/`
const BlogArticlePageWithOptions = BlogArticlePage as any

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamicParams = blogDynamicParams

export async function generateMetadata(): Promise<Metadata | undefined> {
  return generateBlogMetadata({ params: LANDING_PARAMS })
}

export default async function OpenTelemetryLanding() {
  const slug = LANDING_PARAMS.slug.join('/')
  const post = await fetchBlogBySlug(slug)

  if (!post) {
    return notFound()
  }

  const structuredData = post.structuredData as any
  const jsonLd = structuredData
    ? {
        ...structuredData,
        mainEntityOfPage: {
          ...(structuredData.mainEntityOfPage || { '@type': 'WebPage' }),
          '@id': LANDING_CANONICAL,
        },
        url: LANDING_CANONICAL,
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
        />
      )}
      <BlogArticlePageWithOptions params={LANDING_PARAMS} suppressStructuredData />
    </>
  )
}
