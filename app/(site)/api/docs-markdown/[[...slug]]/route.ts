import { NextResponse } from 'next/server'
import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { fetchAllDocsForPage, fetchDocBySlug } from '@/utils/cachedData'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function generateStaticParams() {
  const docs = await fetchAllDocsForPage()

  return [
    { slug: [] },
    ...docs
      .filter((doc) => typeof doc.slug === 'string')
      .filter((doc) => doc.slug !== 'introduction')
      .map((doc) => ({ slug: doc.slug.split('/') })),
  ]
}

const notFoundResponse = () =>
  new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })

export async function GET(_: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const slug = resolveDocsMarkdownSlug(params.slug)
  const doc = await fetchDocBySlug(slug)

  if (!doc) {
    return notFoundResponse()
  }

  const markdown = await renderDocMarkdownForAgents(doc)

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
      Vary: 'Accept',
    },
  })
}
