import { NextResponse } from 'next/server'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'
import { getDocMarkdownBySlug } from '@/utils/docs/getDocMarkdownBySlug'
import { agentResponse } from '@/utils/agentResponseHeaders'

export async function generateStaticParams() {
  return []
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

  const markdown = await getDocMarkdownBySlug(slug)

  if (markdown === null) {
    return notFoundResponse()
  }

  return agentResponse(markdown, { varyAccept: true })
}
