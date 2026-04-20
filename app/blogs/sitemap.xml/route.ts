import { NextResponse } from 'next/server'
import { allBlogs, allGuides } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { entriesToXml, SitemapEntry } from '@/utils/sitemapXml'

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export async function GET() {
  const siteUrl = siteMetadata.siteUrl
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries } = await fetchAllCMSContent(deploymentStatus)

  const staticRoutes: SitemapEntry[] = [
    'blog',
    'guides',
    'opentelemetry',
    'faqs',
    'case-study',
  ].map((route) => ({
    url: `${siteUrl}/${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
  }))

  const blogRoutes: SitemapEntry[] = allBlogs
    .filter((post) => !post.draft && !post?.excludeFromSitemap)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly',
      priority: 0.5,
    }))

  const guideRoutes: SitemapEntry[] = allGuides
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  let opentelemetryRoutes: SitemapEntry[] = []
  if (opentelemetries) {
    opentelemetryRoutes = opentelemetries.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: opentelemetry.date || opentelemetry.updatedAt || opentelemetry.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.5,
    }))
  }

  let faqRoutes: SitemapEntry[] = []
  if (faqs) {
    faqRoutes = faqs.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  }

  let caseStudyRoutes: SitemapEntry[] = []
  if (caseStudies) {
    caseStudyRoutes = caseStudies.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      changeFrequency: 'weekly',
      priority: 0.5,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  }

  const entries = [
    ...staticRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...opentelemetryRoutes,
    ...faqRoutes,
    ...caseStudyRoutes,
  ]

  return new NextResponse(entriesToXml(entries), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
