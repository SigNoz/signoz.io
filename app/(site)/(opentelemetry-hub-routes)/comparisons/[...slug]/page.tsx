import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import type { Authors } from 'contentlayer/generated'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import OpenTelemetryHubContent from '@/layouts/OpenTelemetryHubLayout'
import ComparisonsLayout from '@/layouts/ComparisonsLayout'
import { getHubContextForRoute } from '@/utils/opentelemetryHub'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import React from 'react'
import { fetchComparisonBySlug } from '@/utils/cachedData'
import { mdxOptions } from '@/utils/mdxUtils'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { safeJsonLdStringify } from '@/utils/structuredData'

const defaultLayout = 'ComparisonsLayout'
const layouts = {
  OpenTelemetryLayout,
  ComparisonsLayout,
}

// 1 day — see CMS_REVALIDATE_INTERVAL
export const revalidate = 86400
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const post = await fetchComparisonBySlug(slug)

  if (!post) {
    return notFound()
  }

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post?.image) {
    imageList = typeof post?.image === 'string' ? [post.image] : post.image
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

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const post = await fetchComparisonBySlug(slug)

  if (!post) {
    return notFound()
  }

  const currentRoute = `/comparisons/${slug}`

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData

  const hubContext = await getHubContextForRoute(currentRoute)

  let compiledContent
  try {
    const { content: mdxContent } = await compileMDX({
      source: post?.content,
      components,
      options: mdxOptions as MDXRemoteProps['options'],
    })
    compiledContent = mdxContent
  } catch (error) {
    console.error('Error compiling MDX:', error)
    notFound()
  }

  if (hubContext) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
        />
        <OpenTelemetryHubContent
          content={mainContent}
          authorDetails={authorDetails}
          authors={authorList}
          toc={post.toc}
          showSidebar={hubContext.pathKey !== 'quick-start' && hubContext.items.length > 0}
        >
          {compiledContent}
        </OpenTelemetryHubContent>
      </>
    )
  }

  // Choose layout based on slug or post layout
  let layoutName = post?.layout || defaultLayout
  if (slug.includes('opentelemetry')) {
    layoutName = 'OpenTelemetryLayout'
  } else {
    layoutName = 'ComparisonsLayout'
  }

  // @ts-ignore
  const Layout = layouts[layoutName]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={post.toc}
      >
        {compiledContent}
      </Layout>
    </>
  )
}
