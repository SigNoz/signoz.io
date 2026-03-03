import { unstable_cache } from 'next/cache'
import { fetchMDXContentByPath } from './strapi'
import { transformComparison } from './mdxUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

async function getCachedMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T[]>
): Promise<T[]> {
  const cachedFn = unstable_cache(
    async () => {
      const result = await fetchFn()
      if (!result || result.length === 0) {
        throw new Error(`Empty content received for ${cacheKey}, skipping cache`)
      }
      return result
    },
    [cacheKey, deploymentStatus],
    {
      tags: ['mdx-content-list', ...tags],
      revalidate: CMS_REVALIDATE_INTERVAL,
    }
  )

  return cachedFn()
}

async function getCachedSingleMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T>
): Promise<T> {
  const cachedFn = unstable_cache(
    async () => {
      const result = await fetchFn()
      if (!result) {
        throw new Error(`Empty content received for ${cacheKey}, skipping cache`)
      }
      return result
    },
    [cacheKey, deploymentStatus],
    {
      tags: ['mdx-content-list', ...tags],
      revalidate: CMS_REVALIDATE_INTERVAL,
    }
  )

  return cachedFn()
}

async function fetchComparisons(deploymentStatus: string) {
  const comparisons = await fetchMDXContentByPath(
    'comparisons',
    undefined,
    deploymentStatus,
    true,
    ['title', 'path', 'date', 'description', 'updatedAt', 'publishedAt', 'content']
  )

  if ('data' in comparisons && Array.isArray(comparisons.data)) {
    return comparisons.data.map((comparison) => transformComparison(comparison))
  }

  throw new Error('Unexpected response structure from comparisons API')
}

export function getCachedComparisons(deploymentStatus: string) {
  return getCachedMDXContent(
    'cached-comparisons-list',
    deploymentStatus,
    ['comparisons-list'],
    () => fetchComparisons(deploymentStatus)
  )
}

export async function fetchAllComparisonsForPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedComparisons(deploymentStatus)
  } catch (cacheError) {
    console.warn('Cached comparisons fetch failed, retrying without cache:', cacheError)

    try {
      return await fetchComparisons(deploymentStatus)
    } catch (directError) {
      console.error('Direct comparisons fetch also failed:', directError)
      return []
    }
  }
}

async function fetchSingleComparison(slug: string, deploymentStatus: string) {
  const response = await fetchMDXContentByPath('comparisons', slug, deploymentStatus)

  if ('data' in response && !Array.isArray(response.data)) {
    const comparison = transformComparison(response.data)
    if (!comparison || !comparison.title || !comparison.content) {
      throw new Error(`Empty or invalid comparison content for slug: ${slug}`)
    }
    return comparison
  }

  throw new Error(`Unexpected response structure from single comparison API for slug: ${slug}`)
}

export function getCachedSingleComparison(slug: string, deploymentStatus: string) {
  return getCachedSingleMDXContent(
    `cached-comparison-${slug}`,
    deploymentStatus,
    [`comparisons-${slug}`, `mdx-content-${slug}`],
    () => fetchSingleComparison(slug, deploymentStatus)
  )
}

export async function fetchComparisonBySlug(slug: string) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedSingleComparison(slug, deploymentStatus)
  } catch (cacheError) {
    console.warn(
      `Cached single comparison fetch failed for "${slug}", retrying without cache:`,
      cacheError
    )

    try {
      return await fetchSingleComparison(slug, deploymentStatus)
    } catch (directError) {
      console.error(`Direct single comparison fetch also failed for "${slug}":`, directError)
      return undefined
    }
  }
}
