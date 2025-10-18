import 'css/prism.css'

import { coreContent } from 'pliny/utils/contentlayer'
import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import DocContent from '@/components/DocContent/DocContent'
import Chatbase from '@/components/Chatbase'

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

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
  const paths = allDocs
    .filter((p) => p.slug !== 'introduction')
    .map((p) => ({ slug: p.slug?.split('/') })) // Don't want to generate static params for introduction page

  return paths
}

export default function Page({ params }: { params: { slug: string[] } }) {
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
        <DocContent
          title={title}
          post={post}
          toc={toc}
          hideTableOfContents={hide_table_of_contents || false}
          editLink={`https://github.com/SigNoz/signoz-web/edit/main/data/docs/${slug}.mdx`}
        />
      </div>
      <Chatbase disableFloatingMessages />
    </>
  )
}
