import 'css/prism.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allCaseStudies } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { CaseStudy } from '../../../.contentlayer/generated'
import React from 'react'
import CaseStudyLayout from '../../../layouts/CaseStudyLayout'

export const dynamicParams = false
export const dynamic = 'error'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allCaseStudies.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return {
    title: post?.title,
    description: post?.title,
    openGraph: {
      title: post?.title,
      description: post?.title,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.title,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allCaseStudies.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const post = allCaseStudies.find((p) => p.slug === slug) as CaseStudy

  if (!post) {
    notFound()
  }

  const mainContent = coreContent(post)
  const Layout = CaseStudyLayout

  return (
    <>
      <Layout content={mainContent} toc={post.toc}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
