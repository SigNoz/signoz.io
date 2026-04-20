import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const staticRoutes = [
    '',
    'tags/',
    'about-us/',
    'terms-of-service/',
    'privacy/',
    'security/',
    'support/',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes]
}
