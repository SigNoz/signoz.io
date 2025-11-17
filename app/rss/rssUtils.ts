import { sortPosts } from 'pliny/utils/contentlayer.js'
import {
  allBlogs,
  allDocs,
  allOpentelemetries,
  allComparisons,
  allGuides,
} from 'contentlayer/generated'
import { fetchMDXContentByPath, MDXContentApiResponse } from '../../utils/strapi'
import { normaliseSlug } from '../../scripts/rssFeed.mjs'

const buildFaqSlug = (path = '') => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`
  return normaliseSlug(`faqs${cleanedPath}`)
}

const getDeploymentStatus = () => (process.env.VERCEL_ENV === 'production' ? 'live' : 'staging')

const mapFaqEntries = (faqs: MDXContentApiResponse | undefined) => {
  if (!faqs?.data?.length) {
    return []
  }

  return faqs.data.map((faq) => ({
    ...faq,
    slug: buildFaqSlug(faq.path),
    date: faq.date ?? faq.publishedAt ?? faq.updatedAt ?? faq.createdAt,
    tags: faq.tags?.map((tag) => tag?.value),
    authors: faq?.authors?.map((author) => author?.key),
  }))
}

export const loadPublishedPosts = async () => {
  const deploymentStatus = getDeploymentStatus()
  const allFaqs = (await fetchMDXContentByPath('faqs', undefined, deploymentStatus, true)) as
    | MDXContentApiResponse
    | undefined

  const faqPosts = mapFaqEntries(allFaqs)

  const combinedPosts = [
    ...faqPosts,
    ...allBlogs,
    ...allOpentelemetries,
    ...allDocs,
    ...allComparisons,
    ...allGuides,
  ]

  return sortPosts(combinedPosts.filter((post: any) => post?.draft !== true) as any[])
}
