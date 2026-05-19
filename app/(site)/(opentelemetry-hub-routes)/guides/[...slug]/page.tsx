import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import type { Authors } from 'contentlayer/generated'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import OpenTelemetryHubContent from '@/layouts/OpenTelemetryHubLayout'
import GuidesLayout from '@/layouts/GuidesLayout'
import { getHubContextForRoute } from '@/utils/opentelemetryHub'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import React from 'react'
import { fetchGuideBySlug } from '@/utils/cachedData'
import { mdxOptions } from '@/utils/mdxUtils'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { safeJsonLdStringify } from '@/utils/structuredData'
import GrafanaVsSigNozFloatingCard from '@/components/GrafanaVsSigNoz/GrafanaVsSigNozFloatingCard'
import Button from '@/components/ui/Button'
import { SidebarIcons } from '@/components/sidebar-icons/icons'

const defaultLayout = 'GuidesLayout'
const layouts = {
  OpenTelemetryLayout,
  GuidesLayout,
}

// 1 day — see CMS_REVALIDATE_INTERVAL
export const revalidate = 86400
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const post = await fetchGuideBySlug(slug)

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

  const post = await fetchGuideBySlug(slug)

  if (!post) {
    return notFound()
  }

  const currentRoute = `/guides/${slug}`
  const isGrafanaOrPrometheusArticle =
    slug.toLowerCase().includes('grafana') || slug.toLowerCase().includes('prometheus')

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
    console.error(`Error compiling MDX for guide "${slug}":`, error)
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
          {isGrafanaOrPrometheusArticle && <GrafanaVsSigNozFloatingCard />}
        </OpenTelemetryHubContent>
      </>
    )
  }

  // Choose layout based on slug or post layout
  let layoutName = post?.layout || defaultLayout
  if (slug.includes('opentelemetry')) {
    layoutName = 'OpenTelemetryLayout'
  } else {
    layoutName = 'GuidesLayout'
  }

  // @ts-ignore
  const Layout = layouts[layoutName]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />

      <div className="container mx-auto">
        <Button variant={'ghost'} to={`/guides/`} className="ml-3.5 mt-10 hover:bg-transparent">
          <span className="flex items-center">
            <SidebarIcons.ArrowLeft />
            <span className="pl-1.5 text-sm">Back to Guides</span>
          </span>
        </Button>
      </div>

      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={post.toc}
      >
        {compiledContent}
      </Layout>

      {isGrafanaOrPrometheusArticle && <GrafanaVsSigNozFloatingCard />}
    </>
  )
}
