import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allAuthors, allOpentelemetries } from 'contentlayer/generated'
import type { Authors, Opentelemetry } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import OpenTelemetryHubLayout from '@/layouts/OpenTelemetryHubLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import React from 'react'
import PageFeedback from '../../../components/PageFeedback/PageFeedback'
import { getHubContextForRoute } from '@/utils/opentelemetryHub'

const defaultLayout = 'OpenTelemetryLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  OpenTelemetryLayout,
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allOpentelemetries.find((p) => p.slug === slug)

  if (!post) {
    return notFound()
  }

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.image) {
    imageList = typeof post.image === 'string' ? [post.image] : post.image
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post?.description,
    openGraph: {
      title: post.title,
      description: post?.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post?.description,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allOpentelemetries.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const currentRoute = `/opentelemetry/${slug}`
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allOpentelemetries))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const post = allOpentelemetries.find((p) => p.slug === slug) as Opentelemetry
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const canonicalUrl = `${siteMetadata.siteUrl}/opentelemetry/${post.slug}`
  const jsonLd = post.structuredData
    ? {
        ...post.structuredData,
        mainEntityOfPage: {
          ...(post.structuredData.mainEntityOfPage || { '@type': 'WebPage' }),
          '@id': canonicalUrl,
        },
        url: canonicalUrl,
      }
    : null

  const hubContext = getHubContextForRoute(currentRoute)

  if (hubContext) {
    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <OpenTelemetryHubLayout
          content={mainContent}
          authorDetails={authorDetails}
          authors={authorList}
          toc={post.toc}
          navItems={hubContext.items}
          currentHubPath={hubContext.pathKey}
          pathMeta={hubContext.firstRouteByPath}
          defaultLanguage={hubContext.defaultLanguage}
          availableLanguages={hubContext.languages}
          currentRoute={currentRoute}
        >
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
          <PageFeedback />
        </OpenTelemetryHubLayout>
      </>
    )
  }

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={post.toc}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        <PageFeedback />
      </Layout>
    </>
  )
}
