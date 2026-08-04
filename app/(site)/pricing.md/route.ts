import { NextResponse } from 'next/server'
import { buildPricingMarkdown } from '@/utils/pricing/buildPricingMarkdown'
import siteMetadata from '@/data/siteMetadata'

const CACHE_CONTROL_HEADER = 'public, s-maxage=3600, stale-while-revalidate=86400'

/**
 * Markdown twin of /pricing. The HTML page prices usage through JS sliders,
 * which agents cannot evaluate, so they get the rate tables directly here.
 */
export async function GET() {
  const markdown = buildPricingMarkdown(siteMetadata.siteUrl)

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
      // Duplicate of /pricing; only the HTML page should rank.
      'X-Robots-Tag': 'noindex',
    },
  })
}
