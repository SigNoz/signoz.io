import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { entriesToXml, toSitemapDateOnly } from 'utils/sitemapXml'
import { resolveLatestDate } from '@/utils/dateUtils'
import { fetchAllDocsForPage } from '@/utils/cachedData'

// Explicit route handler instead of a sitemap.ts metadata route: metadata routes
// are not purged by revalidatePath/revalidateTag, so on-demand revalidation via
// /api/revalidate only works with a route handler.
export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

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
