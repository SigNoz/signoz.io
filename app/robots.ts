import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  console.log("\nVERCEL_ENV", process.env.VERCEL_ENV)
  console.log("\nVERCEL_URL", process.env.VERCEL_URL)
  
  const isProduction = process.env.VERCEL_ENV === 'production'
  const currentUrl = isProduction 
    ? siteMetadata.siteUrl 
    : `https://${process.env.VERCEL_URL}`
  
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${currentUrl}/sitemap.xml`,
      host: currentUrl,
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