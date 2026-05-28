import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import siteMetadata from '@/data/siteMetadata'
import JsonLdScript from '@/components/JsonLdScript'
import { fetchBlogBySlug } from '@/utils/cachedData'

import BlogArticlePage, { generateMetadata as generateBlogMetadata } from '../blog/[...slug]/page'

const LANDING_PARAMS = { slug: ['what-is-opentelemetry'] }
const LANDING_CANONICAL = `${siteMetadata.siteUrl}/opentelemetry/`
const BlogArticlePageWithOptions = BlogArticlePage as any

export const dynamicParams = true
export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export async function generateMetadata(): Promise<Metadata | undefined> {
  return generateBlogMetadata({ params: Promise.resolve(LANDING_PARAMS) })
}

export default async function OpenTelemetryLanding() {
  const slug = LANDING_PARAMS.slug.join('/')
  const post = await fetchBlogBySlug(slug)

  if (!post) {
    return notFound()
  }

  const sd = post.structuredData as any
  const jsonLd = sd
    ? {
        ...sd,
        mainEntityOfPage: {
          ...(sd.mainEntityOfPage || { '@type': 'WebPage' }),
          '@id': LANDING_CANONICAL,
        },
        url: LANDING_CANONICAL,
      }
    : null

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <BlogArticlePageWithOptions params={Promise.resolve(LANDING_PARAMS)} suppressStructuredData />
    </>
  )
}
