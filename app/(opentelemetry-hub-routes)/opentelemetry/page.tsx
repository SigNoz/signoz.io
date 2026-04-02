import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'

import BlogArticlePage, {
  dynamic as blogDynamic,
  dynamicParams as blogDynamicParams,
  generateMetadata as generateBlogMetadata,
} from '../blog/[...slug]/page'

const LANDING_PARAMS = { slug: ['what-is-opentelemetry'] }
const LANDING_CANONICAL = `${siteMetadata.siteUrl}/opentelemetry/`
const BlogArticlePageWithOptions = BlogArticlePage as any

export const dynamic = blogDynamic
export const dynamicParams = blogDynamicParams

export async function generateMetadata(): Promise<Metadata | undefined> {
  return generateBlogMetadata({ params: LANDING_PARAMS })
}

export default function OpenTelemetryLanding() {
  const slug = LANDING_PARAMS.slug.join('/')
  const post = allBlogs.find((entry) => entry.slug === slug)

  if (!post) {
    return notFound()
  }

  const jsonLd = post.structuredData
    ? {
        ...post.structuredData,
        mainEntityOfPage: {
          ...(post.structuredData.mainEntityOfPage || { '@type': 'WebPage' }),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogArticlePageWithOptions params={LANDING_PARAMS} suppressStructuredData />
    </>
  )
}
