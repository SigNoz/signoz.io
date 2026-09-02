import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

/**
 * AI crawlers that read pages to answer and cite, as opposed to training-only
 * crawlers such as CCBot. Every entry here is observed in our own request logs.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const currentUrl = isProduction ? siteMetadata.siteUrl : `https://staging.signoz.io`

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/resource-center',
      },
      {
        // Named explicitly so the policy is stated rather than inferred from
        // the wildcard. These crawlers must reach the docs to cite SigNoz;
        // blocking one means that assistant cannot reference us at all.
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: '/resource-center',
      },
    ],
    sitemap: `${currentUrl}/sitemap.xml`,
    host: currentUrl,
  }
}
