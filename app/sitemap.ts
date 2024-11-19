import { MetadataRoute } from 'next'
import { allBlogs, allAuthors, allComparisons, allGuides, allOpentelemetries, allDocs, allFAQs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

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

export default function sitemap(): MetadataRoute.Sitemap {
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

  const opentelemetryRoutes = allOpentelemetries
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

  const faqRoutes = allFAQs.map((faq) => ({
    url: `${siteUrl}/${faq.path}/`,
    lastModified: faq.lastmod || faq.date,
  }))

  const routes = [
    '',
    'blog',
    'tags',
    'newsroom',
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
  ].map((route) => ({
    url: `${siteUrl}/${route}${route ? '/' : ''}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: mapChangeFrequency('weekly'),
  }))

  return [...routes, ...blogRoutes, ...comparisonRoutes, ...opentelemetryRoutes, ...docRoutes, ...guideRoutes, ...faqRoutes]
}