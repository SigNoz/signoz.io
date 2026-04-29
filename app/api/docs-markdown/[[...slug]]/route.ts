import { NextResponse } from 'next/server'
import * as fs from 'fs/promises'
import { getContentPath } from '@/utils/contentlayer/contentLoader'
import { resolveDocsMarkdownSlug } from '@/utils/docs/markdownRouting'

export const runtime = 'nodejs'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

async function readAgentMarkdown(slug: string): Promise<string | null> {
  try {
    const agentPath = getContentPath(`Doc/${slug}.agent.txt`)
    return await fs.readFile(agentPath, 'utf-8')
  } catch {
    return null
  }
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
  const markdown = await readAgentMarkdown(slug)

  if (!markdown) {
    return notFoundResponse()
  }

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
      Vary: 'Accept',
    },
  })
}
