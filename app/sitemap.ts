import { MetadataRoute } from 'next'
import { allBlogs, allDocs, allGuides, allComparisons } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fetchMDXContentByPath, MDXContentApiResponse } from '@/utils/strapi'

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

  const comparisonRoutes = allComparisons
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

  // Fetch FAQs from Strapi CMS at runtime
  let faqRoutes: MetadataRoute.Sitemap = []
  try {
    const faqsResponse = (await fetchMDXContentByPath(
      'faqs',
      undefined,
      deploymentStatus,
      true
    )) as MDXContentApiResponse

    faqRoutes = faqsResponse.data.map((faq) => ({
      url: `${siteUrl}/faqs${faq.path}/`,
      lastModified: faq.date || faq.updatedAt || faq.publishedAt,
    }))
  } catch (error) {
    console.error('Error fetching FAQs for sitemap:', error)
    // Return empty array if fetching fails
  }

  let caseStudyRoutes: MetadataRoute.Sitemap = []
  try {
    const caseStudiesResponse = (await fetchMDXContentByPath(
      'case-studies',
      undefined,
      deploymentStatus,
      true
    )) as MDXContentApiResponse

    caseStudyRoutes = caseStudiesResponse.data.map((caseStudy) => ({
      url: `${siteUrl}/case-study${caseStudy.path}/`,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt,
    }))
  } catch (error) {
    console.error('Error fetching case studies for sitemap:', error)
    // Return empty array if fetching fails
  }

  let opentelemetryRoutes: MetadataRoute.Sitemap = []
  try {
    const opentelemetryRoutesResponse = (await fetchMDXContentByPath(
      'opentelemetry',
      undefined,
      deploymentStatus,
      true
    )) as MDXContentApiResponse

    opentelemetryRoutes = opentelemetryRoutesResponse.data.map((opentelemetry) => ({
      url: `${siteUrl}/opentelemetry${opentelemetry.path}/`,
      lastModified: opentelemetry.updatedAt || opentelemetry.publishedAt,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))
  } catch (error) {
    console.error('Error fetching opentelemetry routes for sitemap:', error)
    // Return empty array if fetching fails
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
  ]
}
