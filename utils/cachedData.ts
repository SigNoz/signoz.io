import { unstable_cache } from 'next/cache'
import { fetchMDXContentByPath } from './strapi'
import { transformComparison } from './mdxUtils'

async function fetchComparisons(deploymentStatus: string) {
  try {
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
    return []
  } catch (error) {
    console.error('Error fetching cached comparisons:', error)
    return []
  }
}

async function getCachedMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T[]>
): Promise<T[]> {
  const cachedFn = unstable_cache(
    async () => {
      return fetchFn()
    },
    [cacheKey, deploymentStatus],
    {
      tags: ['mdx-content-list', ...tags],
      revalidate: 3600,
    }
  )

  return cachedFn()
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
  } catch (error) {
    console.error('Error fetching comparisons:', error)
    return []
  }
}
