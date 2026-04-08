import 'css/prism.css'
import 'css/post.css'
import 'css/doc.css'
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
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { CoreContent } from 'pliny/utils/contentlayer'
import { mdxOptions, generateTOC } from '@/utils/mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

const defaultLayout = 'OpenTelemetryLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  OpenTelemetryLayout,
}

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamicParams = true
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
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

      return {
        title: content.title,
        description: content.description,
        openGraph: {
          title: content.title,
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
          title: content.title,
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

// Generate static params - returning empty array to generate all pages at runtime
export async function generateStaticParams() {
  return []
}

export default async function Page({ params }: { params: { slug: string[] } }) {
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

  // Generate structured data
  const structuredData = generateStructuredData('opentelemetry', content)

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
  const authorDetails: CoreContent<MDXContent>[] = content.authors?.map((author) => ({
    name: author?.name || 'Unknown Author',
    avatar: author?.image_url || '/static/images/signoz-logo.png',
    occupation: author?.title || 'Developer Tools',
    company: 'SigNoz',
    email: 'team@signoz.io',
    twitter: 'https://twitter.com/SigNozHQ',
    linkedin: 'https://www.linkedin.com/company/signoz',
    github: 'https://github.com/SigNoz/signoz',
    path: `/authors/${author?.key || 'default'}`,
    type: 'Authors',
    slug: author?.key || 'default',
    readingTime: { text: '', minutes: 0, time: 0, words: 0 },
    filePath: `/data/authors/${author?.key || 'default'}.mdx`,
  })) || [
    {
      // Fallback author if no authors are found
      name: 'SigNoz Team',
      avatar: '/static/images/signoz-logo.png',
      occupation: 'Developer Tools',
      company: 'SigNoz',
      email: 'team@signoz.io',
      twitter: 'https://twitter.com/SigNozHQ',
      linkedin: 'https://www.linkedin.com/company/signoz',
      github: 'https://github.com/SigNoz/signoz',
      path: '/authors/default',
      type: 'Authors',
      slug: 'default',
      readingTime: { text: '', minutes: 0, time: 0, words: 0 },
      filePath: '/data/authors/default.mdx',
    },
  ]

  const slug = decodeURI(params.slug.join('/'))
  const currentRoute = `/opentelemetry/${slug}`
  const canonicalUrl = `${siteMetadata.siteUrl}/opentelemetry/${content.slug}`
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

  const hubContext = await getHubContextForRoute(currentRoute)

  if (hubContext) {
    const showSidebar = hubContext.pathKey !== 'quick-start' && hubContext.items.length > 0
    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <OpenTelemetryHubContent
          content={mainContent}
          authorDetails={authorDetails}
          authors={content.authors?.map((author) => author?.key) || []}
          toc={toc}
          showSidebar={showSidebar}
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
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Layout
        content={mainContent}
        authorDetails={authorDetails as any}
        authors={content.authors?.map((author) => author?.key) || []}
        toc={toc}
      >
        <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-16">
          {compiledContent}
        </div>
        {shouldRenderLayoutFeedback && <PageFeedback />}
      </Layout>
    </>
  )
}
