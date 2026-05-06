import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const sitemaps = [
    `${siteUrl}/blogs/sitemap.xml`,
    `${siteUrl}/docs/sitemap.xml`,
    `${siteUrl}/products/sitemap.xml`,
    `${siteUrl}/alternatives/sitemap.xml`,
    `${siteUrl}/corporate/sitemap.xml`,
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemaps.map((url) => `  <sitemap>\n    <loc>${url}</loc>\n  </sitemap>`),
    '</sitemapindex>',
  ].join('\n')

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
