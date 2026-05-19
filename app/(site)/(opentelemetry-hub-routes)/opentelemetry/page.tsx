import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import siteMetadata from '@/data/siteMetadata'
import { safeJsonLdStringify } from '@/utils/structuredData'
import { allBlogs } from 'contentlayer/generated'

import BlogArticlePage, {
  generateMetadata as generateBlogMetadata,
} from '../blog/[...slug]/page'

const LANDING_PARAMS = { slug: ['what-is-opentelemetry'] }
const LANDING_CANONICAL = `${siteMetadata.siteUrl}/opentelemetry/`
const BlogArticlePageWithOptions = BlogArticlePage as any

export const dynamicParams = false // inlined from blog/[...slug]

export async function generateMetadata(): Promise<Metadata | undefined> {
  return generateBlogMetadata({ params: Promise.resolve(LANDING_PARAMS) })
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
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
        />
      )}
      <BlogArticlePageWithOptions params={Promise.resolve(LANDING_PARAMS)} suppressStructuredData />
    </>
  )
}
