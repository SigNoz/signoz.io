import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import OpenTelemetryHubContent from '@/layouts/OpenTelemetryHubLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import React from 'react'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import { getHubContextForRoute } from '@/utils/opentelemetryHub'
import { getAuthorDirectory, getContentBySlug } from '@/utils/contentRepository'
import { MDXContent } from '@/utils/strapi'
import { generateStructuredData } from '@/utils/structuredData'
import JsonLdScript from '@/components/JsonLdScript'
import { buildBreadcrumbSchema, getSectionArticleBreadcrumbs } from '@/utils/breadcrumbSchema'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { CoreContent } from 'pliny/utils/contentlayer'
import { mdxOptions, generateTOC } from '@/utils/mdxUtils'
import { getAuthorKeys, getTagValues } from '@/utils/contentHelpers'

const defaultLayout = 'OpenTelemetryLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  OpenTelemetryLayout,
}

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  try {
    // Convert slug array to path
    const path = params.slug.join('/')

    try {
      const isProduction = process.env.VERCEL_ENV === 'production'
      const deployment_status = isProduction ? 'live' : 'staging'
      const content = await getContentBySlug('opentelemetries', path, deployment_status)

      if (!content) {
        throw new Error(`OpenTelemetry content not found for path: ${path}`)
      }

      const authorDirectory = await getAuthorDirectory()
      const authorNames = getAuthorKeys(content).map(
        (author) => authorDirectory[author]?.name || author
      )

      const publishedAt = new Date(
        content.date || content.publishedAt || content.updatedAt
      ).toISOString()
      const modifiedAt = new Date(
        content.lastmod || content.updatedAt || content.date || content.publishedAt
      ).toISOString()

      let imageList = [siteMetadata.socialBanner]
      if (content.image) {
        imageList = typeof content.image === 'string' ? [content.image] : content.image
      }
      const ogImages = imageList.map((img) => {
        return {
          url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        }
      })

      const seoTitle = content.meta_title || content.title

      return {
        title: seoTitle,
        description: content.description,
        openGraph: {
          title: seoTitle,
          description: content.description,
          siteName: siteMetadata.title,
          locale: 'en_US',
          type: 'article',
          publishedTime: publishedAt,
          modifiedTime: modifiedAt,
          url: './',
          images: ogImages,
          authors: authorNames.length > 0 ? authorNames : [siteMetadata.author],
        },
        twitter: {
          card: 'summary_large_image',
          title: seoTitle,
          description: content.description,
          images: imageList,
        },
      }
    } catch (error) {
      // Content not found, return 404 metadata
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
        robots: {
          index: false,
          follow: false,
        },
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.',
    }
  }
}

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export async function generateStaticParams() {
  return []
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  if (!params.slug || params.slug.length === 0) {
    return <div className="min-h-screen">Redirecting to opentelemetry index...</div>
  }

  const path = params.slug.join('/')

  // Fetch content from the repository with error handling
  let content: MDXContent
  try {
    const isProduction = process.env.VERCEL_ENV === 'production'
    const deployment_status = isProduction ? 'live' : 'staging'

    const response = await getContentBySlug('opentelemetries', path, deployment_status)
    if (!response) {
      console.error(`Invalid response for path: ${path}`)
      notFound()
    }
    content = response
  } catch (error) {
    console.error('Error fetching opentelemetry content:', error)
    notFound()
  }

  if (!content) {
    console.log(`No content returned for path: ${path}`)
    notFound()
  }

  // Generate computed fields
  const readingTimeData = readingTime(content?.content || '')
  const toc = generateTOC(content?.content || '')

  // Compile MDX content with all plugins
  let compiledContent
  try {
    const { content: mdxContent } = await compileMDX({
      source: content?.content,
      components,
      options: mdxOptions as MDXRemoteProps['options'],
    })
    compiledContent = mdxContent
  } catch (error) {
    console.error('Error compiling MDX:', error)
    notFound()
  }

  // Generate structured data — override path with route prefix for correct URL
  const contentForStructuredData = {
    ...content,
    path: `opentelemetry${content.path || `/${path}`}`,
  }
  const structuredData = generateStructuredData('opentelemetry', contentForStructuredData)
  const authorDirectory = await getAuthorDirectory()
  const authorList = getAuthorKeys(content)
  const layoutAuthorList = authorList.length > 0 ? authorList : ['default']
  const tags = getTagValues(content)

  // Prepare content for Layout
  const mainContent: CoreContent<MDXContent> = {
    title: content.title,
    date: content.date,
    lastmod: content.lastmod,
    tags,
    draft: content.deployment_status === 'draft',
    summary: content.summary,
    description: content.description,
    images: content.images || [],
    authors: layoutAuthorList,
    slug: path,
    path: content.path || `/opentelemetry/${path}`,
    type: 'Opentelemetry',
    readingTime: readingTimeData,
    filePath: `/opentelemetry/${path}`,
    structuredData: structuredData,
    toc: toc,
    layout: content.layout,
    relatedArticles: [],
  }

  // Prepare author details
  const authorDetails = layoutAuthorList.map((author) => {
    const a = authorDirectory[author]
    return a || { name: author }
  })

  const slug = decodeURI(params.slug.join('/'))
  const currentRoute = `/opentelemetry/${slug}`
  const canonicalUrl = `${siteMetadata.siteUrl}/opentelemetry${content.path || `/${path}`}`
  const jsonLd = structuredData
    ? {
        ...structuredData,
        mainEntityOfPage: {
          ...((structuredData as any).mainEntityOfPage || { '@type': 'WebPage' }),
          '@id': canonicalUrl,
        },
        url: canonicalUrl,
      }
    : null

  const breadcrumbs = getSectionArticleBreadcrumbs('opentelemetry', content.title, path)
  const breadcrumbJsonLd = buildBreadcrumbSchema(breadcrumbs)

  const hubContext = await getHubContextForRoute(currentRoute)

  if (hubContext) {
    const showSidebar = hubContext.pathKey !== 'quick-start' && hubContext.items.length > 0
    return (
      <>
        {jsonLd && <JsonLdScript data={jsonLd} />}
        <JsonLdScript data={breadcrumbJsonLd} />
        <OpenTelemetryHubContent
          content={mainContent}
          authorDetails={authorDetails}
          authors={layoutAuthorList}
          toc={toc}
          showSidebar={showSidebar}
          authorDirectory={authorDirectory}
          breadcrumbs={breadcrumbs}
        >
          <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-16">
            {compiledContent}
          </div>
        </OpenTelemetryHubContent>
      </>
    )
  }

  const layoutName = content.layout || defaultLayout
  const shouldRenderLayoutFeedback = layoutName !== 'OpenTelemetryLayout'
  // @ts-ignore
  const Layout = layouts[layoutName]

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      <JsonLdScript data={breadcrumbJsonLd} />
      <Layout
        content={mainContent}
        authorDetails={authorDetails as any}
        authors={layoutAuthorList}
        toc={toc}
        authorDirectory={authorDirectory}
        breadcrumbs={breadcrumbs}
      >
        <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-16">
          {compiledContent}
        </div>
        {shouldRenderLayoutFeedback && <PageFeedback />}
      </Layout>
    </>
  )
}
