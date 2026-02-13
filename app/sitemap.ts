import { MetadataRoute } from 'next'
import { allBlogs, allDocs, allGuides } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'

const mapChangeFrequency = (
  frequency: string
): 'weekly' | 'always' | 'hourly' | 'daily' | 'monthly' | 'yearly' | 'never' => {
  switch (frequency) {
    case 'weekly':
    case 'always':
    case 'hourly':
    case 'daily':
    case 'monthly':
    case 'yearly':
    case 'never':
      return frequency
    default:
      return 'weekly'
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const docRoutes = allDocs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  // New section for guides
  const guideRoutes = allGuides
    .filter((guide) => !guide.draft)
    .map((guide) => ({
      url: `${siteUrl}/${guide.path}/`,
      lastModified: guide.lastmod || guide.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.7,
    }))

  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { faqs, caseStudies, opentelemetries, comparisons } =
    await fetchAllCMSContent(deploymentStatus)

  let faqRoutes: MetadataRoute.Sitemap = []
  if (faqs) {
    const data = faqs
    faqRoutes = data.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  }

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  if (caseStudies) {
    const data = caseStudies
    caseStudyRoutes = data.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  if (opentelemetries) {
    const data = opentelemetries
    opentelemetryRoutes = data.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: opentelemetry.date || opentelemetry.updatedAt || opentelemetry.publishedAt,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))
  }

  let comparisonRoutes: MetadataRoute.Sitemap = []
  if (comparisons) {
    const data = comparisons
    comparisonRoutes = data.data.map((comparison) => ({
      url: `${siteUrl}/comparisons${comparison.path}/`,
      lastModified: comparison.date || comparison.updatedAt || comparison.publishedAt,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))
  }

  const routes = [
    '',
    'blog',
    'tags',
    'pricing',
    'case-study',
    'about-us',
    'terms-of-service',
    'privacy',
    'security',
    'support',
    'teams',
    'guides', // Add the main guides page
    'faqs', // Add the main FAQs page
    'opentelemetry',
    'comparisons',
  ].map((route) => ({
    url: `${siteUrl}/${route}${route ? '/' : ''}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: mapChangeFrequency('weekly'),
  }))

  return [
    ...routes,
    ...blogRoutes,
    ...opentelemetryRoutes,
    ...docRoutes,
    ...guideRoutes,
    ...faqRoutes,
    ...caseStudyRoutes,
    ...comparisonRoutes,
  ]
}
