import { NextResponse } from 'next/server'
import { allDocs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { entriesToXml } from '@/utils/sitemapXml'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const entries = allDocs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly',
      priority: 0.5,
    }))

  return new NextResponse(entriesToXml(entries), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
