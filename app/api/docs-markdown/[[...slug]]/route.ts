import { NextResponse } from 'next/server'
import { getAllDocs, getDocBySlug } from '@/utils/contentlayer/docsCollection'
import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function generateStaticParams() {
  const docs = await getAllDocs()

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

export async function GET(_: Request, { params }: { params: { slug?: string[] } }) {
  const slug = resolveDocsMarkdownSlug(params.slug)
  const doc = await getDocBySlug(slug)

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
