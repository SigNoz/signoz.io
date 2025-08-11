import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  console.log('VERCEL_ENV', process.env.VERCEL_ENV)
  const isProduction = process.env.VERCEL_ENV === 'production'
  
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
      host: siteMetadata.siteUrl,
    }
  }
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}