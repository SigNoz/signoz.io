import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { entriesToXml } from '@/utils/sitemapXml'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const entries = [
    '',
    'tags',
    'about-us',
    'terms-of-service',
    'privacy',
    'security',
    'support',
  ].map((route) => ({
    url: `${siteUrl}/${route}${route ? '/' : ''}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
  }))

  return new NextResponse(entriesToXml(entries), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
