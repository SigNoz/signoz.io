import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { entriesToXml } from '@/utils/sitemapXml'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const entries = ['pricing', 'teams'].map((route) => ({
    url: `${siteUrl}/${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
  }))

  return new NextResponse(entriesToXml(entries), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
