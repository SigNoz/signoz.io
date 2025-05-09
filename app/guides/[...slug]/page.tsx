import 'css/prism.css'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allGuides, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog, Guide } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import OpenTelemetryLayout from '@/layouts/OpenTelemetryLayout'
import BlogLayout from '@/layouts/BlogLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SidebarIcons } from '@/components/sidebar-icons/icons'
import PageFeedback from '../../../components/PageFeedback/PageFeedback'
import React from 'react'
import GrafanaVsSigNozFloatingCard from '@/components/GrafanaVsSigNoz/GrafanaVsSigNozFloatingCard'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  OpenTelemetryLayout,
  BlogLayout,
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allGuides.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

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
  const paths = allGuides.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allGuides))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const post = allGuides.find((p) => p.slug === slug) as Guide
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData

  // Choose layout based on slug or post layout
  let layoutName = post.layout || defaultLayout
  if (slug.includes('opentelemetry')) {
    layoutName = 'OpenTelemetryLayout'
  } else {
    layoutName = 'BlogLayout'
  }

  // @ts-ignore
  const Layout = layouts[layoutName]

  // Check if the slug contains Grafana or Prometheus
  const isGrafanaOrPrometheusArticle =
    slug.toLowerCase().includes('grafana') || slug.toLowerCase().includes('prometheus')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto">
        <Link href={`/resource-center/guides/`}>
          <button className="ml-3.5 mt-10 flex items-center">
            <SidebarIcons.ArrowLeft />
            <span className="pl-1.5 text-sm">Back to Guides</span>
          </button>
        </Link>
      </div>

      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={post?.authors}
        toc={post.toc}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        <PageFeedback />
      </Layout>

      {/* Render GrafanaVsSigNozFloatingCard if the slug contains Grafana or Prometheus */}
      {isGrafanaOrPrometheusArticle && <GrafanaVsSigNozFloatingCard />}
    </>
  )
}
