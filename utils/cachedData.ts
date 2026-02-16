import { unstable_cache } from 'next/cache'
import { fetchMDXContentByPath, MDXContent } from './strapi'
import { transformComparison, transformGuide } from './mdxUtils'
import type { Comparison, Guide } from '../types/transformedContent'
import { LIST_FIELDS, CACHE_REVALIDATE_SECONDS } from './mdxCacheConstants'

async function fetchComparisons(deploymentStatus: string): Promise<Comparison[]> {
  try {
    const comparisons = await fetchMDXContentByPath(
      'comparisons',
      undefined,
      deploymentStatus,
      true,
      [...LIST_FIELDS]
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

async function fetchGuides(deploymentStatus: string): Promise<Guide[]> {
  try {
    const guides = await fetchMDXContentByPath('guides', undefined, deploymentStatus, true, [
      ...LIST_FIELDS,
    ])

    if ('data' in guides && Array.isArray(guides.data)) {
      return guides.data
        .map((guide: MDXContent) => {
          try {
            return transformGuide(guide)
          } catch (transformError) {
            console.error('[cachedData] Error transforming guide:', {
              guideId: guide.id,
              guideTitle: guide.title,
              error: transformError,
            })
            return null
          }
        })
        .filter((g): g is Guide => g !== null)
    }
    return []
  } catch (error) {
    console.error('Error fetching cached guides:', error)
    return []
  }
}

async function getCachedMDXContent<T>(
  cacheKey: string,
  deploymentStatus: string,
  tags: string[],
  fetchFn: () => Promise<T[]>
): Promise<T[]> {
  const cachedFn = unstable_cache(async () => fetchFn(), [cacheKey, deploymentStatus], {
    tags: ['mdx-content-list', ...tags],
    revalidate: CACHE_REVALIDATE_SECONDS,
  })

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

export function getCachedGuides(deploymentStatus: string) {
  return getCachedMDXContent('cached-guides-list', deploymentStatus, ['guides-list'], () =>
    fetchGuides(deploymentStatus)
  )
}

export async function fetchAllComparisonsForPage(): Promise<Comparison[]> {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedComparisons(deploymentStatus)
  } catch (error) {
    console.error('Error fetching comparisons:', error)
    return []
  }
}

export async function fetchAllGuidesForPage(): Promise<Guide[]> {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    return await getCachedGuides(deploymentStatus)
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
}
