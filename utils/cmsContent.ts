import { getAllContent } from './contentRepository'
import type { MDXContent, MDXContentApiResponse } from './strapi'

export type CMSContentResult = {
  faqs: MDXContentApiResponse | undefined
  caseStudies: MDXContentApiResponse | undefined
  opentelemetries: MDXContentApiResponse | undefined
  comparisons: MDXContentApiResponse | undefined
  guides: MDXContentApiResponse | undefined
  blogs: MDXContentApiResponse | undefined
}

function toApiResponse(data: MDXContent[]): MDXContentApiResponse {
  return {
    data,
    meta: {
      pagination: {
        page: 1,
        pageSize: data.length,
        pageCount: data.length > 0 ? 1 : 0,
        total: data.length,
      },
    },
  }
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
    getAllContent('faqs', deploymentStatus, null),
    getAllContent('case-studies', deploymentStatus, null),
    getAllContent('opentelemetries', deploymentStatus, null),
    getAllContent('comparisons', deploymentStatus, null),
    getAllContent('guides', deploymentStatus, null),
    getAllContent('blogs', deploymentStatus, null),
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
    faqs: faqsResult.status === 'fulfilled' ? toApiResponse(faqsResult.value) : undefined,
    caseStudies:
      caseStudiesResult.status === 'fulfilled' ? toApiResponse(caseStudiesResult.value) : undefined,
    opentelemetries:
      opentelemetryResult.status === 'fulfilled'
        ? toApiResponse(opentelemetryResult.value)
        : undefined,
    comparisons:
      comparisonsResult.status === 'fulfilled' ? toApiResponse(comparisonsResult.value) : undefined,
    guides: guidesResult.status === 'fulfilled' ? toApiResponse(guidesResult.value) : undefined,
    blogs: blogsResult.status === 'fulfilled' ? toApiResponse(blogsResult.value) : undefined,
  }
}
