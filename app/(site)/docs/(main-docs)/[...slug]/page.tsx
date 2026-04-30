import 'css/prism.css'

import { coreContent } from '@/utils/contentlayer/contentUtils'
import { getAllDocsMeta, getDocBySlug } from '@/utils/contentlayer/docsCollection'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import DocContent from '@/components/DocContent/DocContent'
import Chatbase from '@/components/Chatbase/ChatbaseClient'
import { safeJsonLdStringify } from '@/utils/structuredData'

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await getDocBySlug(slug)

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
  const allDocs = await getAllDocsMeta()
  const paths = allDocs
    .filter((p) => p.slug && p.slug !== '' && p.slug !== '/') // Filter out introduction page (empty/root slug)
    .map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await getDocBySlug(slug)

  if (!post) {
    notFound()
  }

  const mainContent = coreContent(post)
  const toc = post?.toc || []
  const { title, hide_table_of_contents } = mainContent
  const jsonLd = post.structuredData

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
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
