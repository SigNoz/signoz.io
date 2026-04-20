import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs } = await fetchAllCMSContent(deploymentStatus)

  let faqRoutes: MetadataRoute.Sitemap = []
  if (faqs) {
    faqRoutes = faqs.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  }

  const staticRoutes = [
    '',
    'tags/',
    'about-us/',
    'terms-of-service/',
    'privacy/',
    'security/',
    'support/',
    'faqs/',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes, ...faqRoutes]
}
