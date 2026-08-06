import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { toSitemapDateOnly } from 'utils/sitemapXml'
import { resolveLatestDate } from '@/utils/dateUtils'
import { fetchAllDocsForPage } from '@/utils/cachedData'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  return [introductionRoute, ...docRoutes]
}
