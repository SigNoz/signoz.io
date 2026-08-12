import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from 'utils/cmsContent'
import { compareSitemapEntries, entriesToXml } from 'utils/sitemapXml'
import { resolveLatestDate } from '@/utils/dateUtils'

export const dynamic = 'force-dynamic'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl

  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries, comparisons, guides, blogs } =
    await fetchAllCMSContent(deploymentStatus)

  // Never cache an incomplete sitemap. With SWR revalidation ('max' profile), a CMS
  // outage falls back to stale cached data before this guard is ever reached; the
  // guard only fires if the CMS successfully returns an empty collection, in which
  // case the failed render is never cached and the next request retries.
  if (!faqs || !caseStudies || !opentelemetries || !comparisons || !guides || !blogs) {
    throw new Error('Missing CMS collection(s) while building blogs sitemap')
  }
  const collections = { faqs, caseStudies, opentelemetries, comparisons, guides, blogs }
  for (const [name, collection] of Object.entries(collections)) {
    if (collection.data.length === 0) {
      throw new Error(`Empty ${name} collection received from CMS while building blogs sitemap`)
    }
  }

  const faqRoutes: MetadataRoute.Sitemap = faqs.data.map((faq) => ({
    url: `${siteUrl}/faqs${faq.path}/`,
    lastModified: resolveLatestDate(faq),
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.data.map((caseStudy) => ({
    url: `${siteUrl}/case-study${caseStudy.path}/`,
    lastModified: resolveLatestDate(caseStudy),
  }))

  const opentelemetryRoutes: MetadataRoute.Sitemap = opentelemetries.data.map((opentelemetry) => ({
    url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
    lastModified: resolveLatestDate(opentelemetry),
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.data.map((comparison) => ({
    url: `${siteUrl}/comparisons${comparison.path}/`,
    lastModified: resolveLatestDate(comparison),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const guideRoutes: MetadataRoute.Sitemap = guides.data.map((guide) => ({
    url: `${siteUrl}/guides${guide.path}/`,
    lastModified: resolveLatestDate(guide),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.data
    .filter((post) => !post.excludeFromSitemap)
    .map((post) => ({
      url: `${siteUrl}/blog${post.path}/`,
      lastModified: resolveLatestDate(post),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  const staticRoutes = ['blog', 'guides', 'faqs', 'case-study', 'opentelemetry', 'comparisons'].map(
    (route) => ({
      url: `${siteUrl}/${route}/`,
      changeFrequency: 'weekly' as const,
    })
  )

  const allRoutes: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...faqRoutes,
    ...caseStudyRoutes,
    ...opentelemetryRoutes,
    ...comparisonRoutes,
  ]

  allRoutes.sort(compareSitemapEntries)

  return new NextResponse(entriesToXml(allRoutes), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
