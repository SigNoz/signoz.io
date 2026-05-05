import { MetadataRoute } from 'next'
import { allDocs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { toSitemapDateOnly } from 'utils/sitemapXml'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const introductionRoute: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/docs/introduction/`,
    lastModified: toSitemapDateOnly(new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }

  const docRoutes = allDocs
    .filter((post) => !post.draft && post.slug !== 'introduction')
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  return [introductionRoute, ...docRoutes]
}
