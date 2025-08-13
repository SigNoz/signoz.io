import 'css/prism.css'

import { coreContent } from 'pliny/utils/contentlayer'
import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import DocContent from '@/components/DocContent/DocContent'

export const dynamicParams = false
export const revalidate = 0.5 * 60 * 60 // 30 minutes
export const dynamic = 'force-static'

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
    <div className="doc">
      <DocContent
        title={title}
        post={post}
        toc={toc}
        hideTableOfContents={hide_table_of_contents || false}
      />
      {/* TODO: remove this, debug info */}
      {
        <div className="cache-debug" style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px',
          fontSize: '12px',
          borderRadius: '4px'
        }}>
          <div>export revalidate: {revalidate}</div>
          <div>Slug: {slug}</div>
          <div>Generated: {new Date().toISOString()}</div>
        </div>
      }
    </div>
  )
}
