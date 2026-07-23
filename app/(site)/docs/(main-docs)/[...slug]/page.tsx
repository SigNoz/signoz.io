import 'css/prism.css'

import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import DocContent from '@/components/DocContent/DocContent'
import DecimalClient from '@/components/Decimal'
import JsonLdScript from '@/components/JsonLdScript'
import { buildBreadcrumbSchema, getDocsBreadcrumbs } from '@/utils/breadcrumbSchema'
import { fetchDocBySlug } from '@/utils/cachedData'
import { compileMdxSource } from '@/utils/compileMdx'

export const revalidate = 86400
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await fetchDocBySlug(slug)

  if (!post) {
    notFound()
  }

  const seoTitle = post?.meta_title || post?.title
  const fullTitle = seoTitle ? `${seoTitle} | SigNoz Docs` : 'SigNoz Docs'

  return {
    title: seoTitle,
    description: post.description,
    openGraph: {
      title: fullTitle,
      description: post.description,
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
  return []
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await fetchDocBySlug(slug)

  if (!post) {
    notFound()
  }

  let compiledContent
  try {
    const { content } = await compileMdxSource(post.content || '')
    compiledContent = content
  } catch (error) {
    console.error(`Error compiling MDX for doc "${slug}":`, error)
    notFound()
  }

  const toc = post?.toc || []
  const { title, hide_table_of_contents } = post
  const jsonLd = post.structuredData
  const breadcrumbs = await getDocsBreadcrumbs(slug, title)
  const breadcrumbJsonLd = buildBreadcrumbSchema(breadcrumbs)

  const postForClient = {
    slug: post.slug,
    lastmod: post.lastmod,
    updated_date: post.updated_date,
    published_date: post.published_date,
    date: post.date,
    docTags: post.docTags,
    body: post.body,
  }

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <div className="mx-auto flex h-full w-full max-w-ot-hub items-start gap-4">
        <DocContent
          title={title}
          post={postForClient}
          toc={toc}
          hideTableOfContents={hide_table_of_contents || false}
          editLink={`https://github.com/SigNoz/signoz.io/edit/main/data/docs/${slug}.mdx`}
          breadcrumbs={breadcrumbs}
        >
          {compiledContent}
        </DocContent>
      </div>
      <DecimalClient />
    </>
  )
}
