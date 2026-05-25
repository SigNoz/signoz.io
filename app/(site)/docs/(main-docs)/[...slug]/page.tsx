import 'css/prism.css'

import { coreContent } from 'pliny/utils/contentlayer'
import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import DocContent from '@/components/DocContent/DocContent'
import Chatbase from '@/components/Chatbase'
import JsonLdScript from '@/components/JsonLdScript'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'

export const dynamicParams = false

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const fullTitle = post?.title ? `${post.title} | SigNoz Docs` : 'SigNoz Docs'

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: fullTitle,
      description: post?.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allDocs
    .filter((p) => p.slug !== 'introduction')
    .map((p) => ({ slug: p.slug?.split('/') })) // Don't want to generate static params for introduction page

  return paths
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug) as Doc

  if (!post) {
    notFound()
  }

  const mainContent = coreContent(post)
  const toc = post?.toc || []
  const { title, hide_table_of_contents } = mainContent
  const jsonLd = post.structuredData
  const breadcrumbJsonLd = generateDocsBreadcrumb(slug, title)

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <div className="mx-auto flex h-full w-full max-w-ot-hub items-start gap-4">
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
