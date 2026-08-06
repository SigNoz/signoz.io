import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { entriesToXml, toSitemapDateOnly } from 'utils/sitemapXml'
import { resolveLatestDate } from '@/utils/dateUtils'
import { fetchAllDocsForPage } from '@/utils/cachedData'

export const dynamic = 'force-dynamic'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const introductionRoute: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/docs/introduction/`,
    lastModified: toSitemapDateOnly(new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }

  const docs = await fetchAllDocsForPage()
  const docRoutes = docs
    .filter((post) => !post.draft && post.slug !== 'introduction')
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || resolveLatestDate(post),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  return new NextResponse(entriesToXml([introductionRoute, ...docRoutes]), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
