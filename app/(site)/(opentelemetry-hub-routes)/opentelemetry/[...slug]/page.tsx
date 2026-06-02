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
import { fetchMDXContentByPath, MDXContent } from '@/utils/strapi'
import { generateStructuredData } from '@/utils/structuredData'
import JsonLdScript from '@/components/JsonLdScript'
import { buildBreadcrumbSchema, getSectionArticleBreadcrumbs } from '@/utils/breadcrumbSchema'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { CoreContent } from 'pliny/utils/contentlayer'
import { mdxOptions, generateTOC } from '@/utils/mdxUtils'
import { getCachedAuthors } from '@/utils/cmsAuthors'

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
      const response = await fetchMDXContentByPath('opentelemetries', path, deployment_status)
      const content = response.data as MDXContent

      // Extract author names from the content
      const authorNames = content.authors?.map((author) => author?.name) || ['SigNoz Team']

      const publishedAt = new Date(content.date).toISOString()
      const modifiedAt = new Date(content.lastmod || content.date).toISOString()

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

  // Fetch content from Strapi with error handling
  let content: MDXContent
  try {
    if (!process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL) {
      throw new Error('Strapi API URL is not configured')
    }

    const isProduction = process.env.VERCEL_ENV === 'production'
    const deployment_status = isProduction ? 'live' : 'staging'

    const response = await fetchMDXContentByPath('opentelemetries', path, deployment_status)
    if (!response || !response.data) {
      console.error(`Invalid response for path: ${path}`)
      notFound()
    }
    content = response.data as MDXContent
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

  // Prepare content for Layout
  const mainContent: CoreContent<MDXContent> = {
    title: content.title,
    date: content.date,
    lastmod: content.lastmod,
    tags: content.tags?.map((tag) => tag.value) || [],
    draft: content.deployment_status === 'draft',
    summary: content.summary,
    description: content.description,
    images: content.images || [],
    authors: content.authors?.map((author) => author?.key) || [],
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
  const authorDirectory = await getCachedAuthors()
  const authorList = content.authors?.map((author) => author?.key) || ['default']
  const authorDetails = authorList.map((author) => {
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
          authors={authorList}
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
        authors={authorList}
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
