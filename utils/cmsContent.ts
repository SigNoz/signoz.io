import { fetchMDXContentByPath } from './strapi'
import type { MDXContentApiResponse } from './strapi'

export type CMSContentResult = {
  faqs: MDXContentApiResponse | undefined
  caseStudies: MDXContentApiResponse | undefined
  opentelemetries: MDXContentApiResponse | undefined
  comparisons: MDXContentApiResponse | undefined
  guides: MDXContentApiResponse | undefined
  blogs: MDXContentApiResponse | undefined
}

export async function fetchAllCMSContent(deploymentStatus: string): Promise<CMSContentResult> {
  const [
    faqsResult,
    caseStudiesResult,
    opentelemetryResult,
    comparisonsResult,
    guidesResult,
    blogsResult,
  ] = await Promise.allSettled([
    fetchMDXContentByPath('faqs', undefined, deploymentStatus, true),
    fetchMDXContentByPath('case-studies', undefined, deploymentStatus, true),
    fetchMDXContentByPath('opentelemetries', undefined, deploymentStatus, true),
    fetchMDXContentByPath('comparisons', undefined, deploymentStatus, true),
    fetchMDXContentByPath('guides', undefined, deploymentStatus, true),
    fetchMDXContentByPath('blogs', undefined, deploymentStatus, true),
  ])

  if (faqsResult.status === 'rejected') {
    console.error('Failed to fetch FAQs for CMS content:', faqsResult.reason)
  }
  if (caseStudiesResult.status === 'rejected') {
    console.error('Failed to fetch case studies for CMS content:', caseStudiesResult.reason)
  }
  if (opentelemetryResult.status === 'rejected') {
    console.error('Failed to fetch opentelemetries for CMS content:', opentelemetryResult.reason)
  }
  if (comparisonsResult.status === 'rejected') {
    console.error('Failed to fetch comparisons for CMS content:', comparisonsResult.reason)
  }
  if (guidesResult.status === 'rejected') {
    console.error('Failed to fetch guides for CMS content:', guidesResult.reason)
  }
  if (blogsResult.status === 'rejected') {
    console.error('Failed to fetch blogs for CMS content:', blogsResult.reason)
  }

  return {
    faqs:
      faqsResult.status === 'fulfilled' ? (faqsResult.value as MDXContentApiResponse) : undefined,
    caseStudies:
      caseStudiesResult.status === 'fulfilled'
        ? (caseStudiesResult.value as MDXContentApiResponse)
        : undefined,
    opentelemetries:
      opentelemetryResult.status === 'fulfilled'
        ? (opentelemetryResult.value as MDXContentApiResponse)
        : undefined,
    comparisons:
      comparisonsResult.status === 'fulfilled'
        ? (comparisonsResult.value as MDXContentApiResponse)
        : undefined,
    guides:
      guidesResult.status === 'fulfilled'
        ? (guidesResult.value as MDXContentApiResponse)
        : undefined,
    blogs:
      blogsResult.status === 'fulfilled' ? (blogsResult.value as MDXContentApiResponse) : undefined,
  }
}
