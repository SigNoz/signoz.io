import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { getLlmStarterLinks } from '@/utils/docs/agentDiscovery'

export const dynamic = 'force-static'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

export async function GET() {
  const starters = getLlmStarterLinks()
  const starterLines =
    starters.length > 0
      ? starters.map((item) => `- ${item.label}: ${siteMetadata.siteUrl}${item.route}/`).join('\n')
      : `- Docs index: ${siteMetadata.siteUrl}/docs/introduction/`

  const body = [
    '# SigNoz Documentation for AI Agents',
    '',
    'SigNoz is an open-source observability platform for metrics, traces, and logs.',
    '',
    `Docs root: ${siteMetadata.siteUrl}/docs/introduction/`,
    '',
    '## Fetching docs pages',
    `- Request ${siteMetadata.siteUrl}/docs/... with "Accept: text/markdown" to receive markdown page content.`,
    '',
    '## Starter docs',
    starterLines,
    '',
    '## Discovery',
    `- Markdown sitemap: ${siteMetadata.siteUrl}/docs/sitemap.md`,
    '',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
