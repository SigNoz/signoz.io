import 'css/prism.css'

import { components } from '@/components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import OpenTelemetryHubContent from '@/layouts/OpenTelemetryHubLayout'
import BlogLayout from '@/layouts/BlogLayout'
import NewsroomLayout from '@/layouts/NewsroomLayout'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import { getHubContextForRoute } from '@/utils/opentelemetryHub'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import React from 'react'
import JsonLdScript from '@/components/JsonLdScript'
import { generateSectionArticleBreadcrumb } from '@/utils/breadcrumbSchema'
import { fetchBlogBySlug } from '@/utils/cachedData'
import { getCachedAuthors } from '@/utils/cmsAuthors'
import { mdxOptions } from '@/utils/mdxUtils'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
const defaultLayout = 'BlogLayout'
const layouts = {
  OpenTelemetryLayout,
  BlogLayout,
  NewsroomLayout,
}

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await fetchBlogBySlug(slug)

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
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
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
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return []
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const suppressStructuredData = (props as { suppressStructuredData?: boolean })
    .suppressStructuredData
  const slug = decodeURI(params.slug.join('/'))
  const currentRoute = `/blog/${slug}`

  const post = await fetchBlogBySlug(slug)

  if (!post) {
    return notFound()
  }

  const authorDirectory = await getCachedAuthors()
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const a = authorDirectory[author]
    return a || { name: author }
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  const breadcrumbJsonLd = generateSectionArticleBreadcrumb('blog', post.title, slug)

  let compiledContent
  try {
    const { content: mdxContent } = await compileMDX({
      source: post?.content,
      components,
      options: mdxOptions as MDXRemoteProps['options'],
    })
    compiledContent = mdxContent
  } catch (error) {
    console.error(`Error compiling MDX for blog "${slug}":`, error)
    notFound()
  }

  const hubContext = await getHubContextForRoute(currentRoute)

  if (hubContext) {
    return (
      <>
        {!suppressStructuredData && (
          <>
            <JsonLdScript data={jsonLd} />
            <JsonLdScript data={breadcrumbJsonLd} />
          </>
        )}
        <OpenTelemetryHubContent
          content={mainContent}
          authorDetails={authorDetails}
          authors={authorList}
          toc={post.toc}
          showSidebar={hubContext.pathKey !== 'quick-start' && hubContext.items.length > 0}
          authorDirectory={authorDirectory}
        >
          {compiledContent}
        </OpenTelemetryHubContent>
      </>
    )
  }

  let layoutName = post.layout || defaultLayout
  if (post.is_newsroom) {
    layoutName = 'NewsroomLayout'
  } else if (slug.includes('opentelemetry')) {
    layoutName = 'OpenTelemetryLayout'
  } else {
    layoutName = 'BlogLayout'
  }

  // @ts-ignore
  const Layout = layouts[layoutName]

  return (
    <>
      {!suppressStructuredData && (
        <>
          <JsonLdScript data={jsonLd} />
          <JsonLdScript data={breadcrumbJsonLd} />
        </>
      )}
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={post.toc}
        authorDirectory={authorDirectory}
      >
        {compiledContent}
        {layoutName === 'NewsroomLayout' && <PageFeedback />}
      </Layout>
    </>
  )
}
