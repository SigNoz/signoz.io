import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allAuthors, allDocs } from 'contentlayer/generated'
import type { Authors, Blog, Doc } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import DocLayout from '@/layouts/DocLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'DocLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  DocLayout,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug)

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
  const paths = allDocs.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))

  const post = allDocs.find((p) => p.slug === slug) as Doc
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        authors={post?.authors}
        toc={post?.toc || []}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
      </Layout>
    </>
  )
}
