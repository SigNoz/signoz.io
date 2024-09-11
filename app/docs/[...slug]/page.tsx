import 'css/prism.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import { tocItemProps } from '../layout'
import DocsPrevNext from '../../../components/DocsPrevNext/DocsPrevNext'
import PageFeedback from '../../../components/PageFeedback/PageFeedback'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug)

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
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

  if (!post) {
    notFound()
  }

  const mainContent = coreContent(post)
  const toc = post?.toc || []
  const { title, hide_table_of_contents } = mainContent

  return (
    <>
      <div className="doc">
        <div className="doc-content">
          <h2 className="mt-2 text-3xl">{title}</h2>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
          <PageFeedback />
          <DocsPrevNext />
        </div>

        {!hide_table_of_contents && toc && Array.isArray(toc) && toc.length > 0 && (
          <div className="doc-toc">
            <div className="mb-3 text-xs uppercase"> On this page </div>

            <div className="doc-toc-items border-l border-signoz_slate-500 pl-3 ">
              {toc.map((tocItem: tocItemProps) => {
                return (
                  <div className="doc-toc-item" key={tocItem.url}>
                    <a
                      data-level={tocItem.depth}
                      href={tocItem.url}
                      className="mb-1 line-clamp-2 text-xs"
                    >
                      {tocItem.value}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* </DocLayout> */}
    </>
  )
}
