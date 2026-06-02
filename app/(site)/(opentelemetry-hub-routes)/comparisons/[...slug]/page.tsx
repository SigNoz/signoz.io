import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
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
import JsonLdScript from '@/components/JsonLdScript'
import { buildBreadcrumbSchema, getSectionArticleBreadcrumbs } from '@/utils/breadcrumbSchema'
import { getCachedAuthors } from '@/utils/cmsAuthors'

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

  const authorDirectory = await getCachedAuthors()
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const a = authorDirectory[author]
    return a || { name: author }
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

  const seoTitle = post.meta_title || post.title

  return {
    title: seoTitle,
    description: post?.description,
    openGraph: {
      title: seoTitle,
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
      title: seoTitle,
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

  const authorDirectory = await getCachedAuthors()
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const a = authorDirectory[author]
    return a || { name: author }
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  const breadcrumbs = getSectionArticleBreadcrumbs('comparisons', post.title, slug)
  const breadcrumbJsonLd = buildBreadcrumbSchema(breadcrumbs)

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
        <JsonLdScript data={jsonLd} />
        <JsonLdScript data={breadcrumbJsonLd} />
        <OpenTelemetryHubContent
          content={mainContent}
          authorDetails={authorDetails}
          authors={authorList}
          toc={post.toc}
          showSidebar={hubContext.pathKey !== 'quick-start' && hubContext.items.length > 0}
          authorDirectory={authorDirectory}
          breadcrumbs={breadcrumbs}
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
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={post.toc}
        authorDirectory={authorDirectory}
        breadcrumbs={breadcrumbs}
      >
        {compiledContent}
      </Layout>
    </>
  )
}
