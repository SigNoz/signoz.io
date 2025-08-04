import 'css/prism.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allNewsrooms } from 'contentlayer/generated'
import type { Doc, Newsroom } from 'contentlayer/generated'
import NewsroomLayout from '@/layouts/NewsroomLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import { notFound } from 'next/navigation'

export const dynamicParams = false
export const dynamic = 'error'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allNewsrooms.find((p) => p.slug === slug)

  if (!post) {
    return notFound()
  }

  return {
    title: post?.title,
    description: post?.summary,
    openGraph: {
      title: post?.title,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allNewsrooms.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const post = allNewsrooms.find((p) => p.slug === slug) as Newsroom
  const mainContent = coreContent(post)
  const Layout = NewsroomLayout

  return (
    <>
      <Layout content={mainContent}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
      </Layout>
    </>
  )
}
