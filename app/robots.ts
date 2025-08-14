import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const currentUrl = isProduction 
    ? siteMetadata.siteUrl 
    : `https://staging.signoz.io`
  
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      }
    }
  }
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${currentUrl}/sitemap.xml`,
    host: currentUrl,
  }
}