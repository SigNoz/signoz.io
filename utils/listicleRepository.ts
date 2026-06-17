import { unstable_cache } from 'next/cache'
import qs from 'qs'

import { getListicleConfig as getLocalListicleConfig } from '@/constants/listicles/utils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { transformCmsListicle, type CmsListicle } from './listicleCms'

const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL

type ListicleApiResponse = {
  data: CmsListicle[]
}

function hasCMSConfig() {
  return Boolean(API_URL)
}

function isLocalListicleOverlayEnabled() {
  return process.env.NODE_ENV === 'development'
}

async function fetchCmsListicle(key: string) {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const query = qs.stringify(
    {
      filters: {
        key: {
          $eq: key,
        },
      },
      populate: {
        items: '*',
        sections: {
          populate: {
            items: '*',
            subsections: {
              populate: {
                items: '*',
              },
            },
          },
        },
        static_sections: {
          populate: {
            items: '*',
          },
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    }
  )

  const response = await fetch(`${API_URL}/api/listicles${query}`, {
    cache: 'force-cache',
    next: {
      tags: ['listicles-list', `listicle-${key}`],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(`Failed to fetch listicle "${key}": ${response.status} ${errorMessage}`)
  }

  const data = (await response.json()) as ListicleApiResponse
  const listicle = data.data?.[0]
  return listicle ? transformCmsListicle(listicle) : null
}

function getCachedCmsListicle(key: string) {
  const cachedFn = unstable_cache(() => fetchCmsListicle(key), [`cached-listicle-${key}`], {
    tags: ['listicles-list', `listicle-${key}`],
    revalidate: CMS_REVALIDATE_INTERVAL,
  })

  return cachedFn()
}

export async function getRuntimeListicleConfig(name: string) {
  if (isLocalListicleOverlayEnabled() || !hasCMSConfig()) {
    return getLocalListicleConfig(name)
  }

  try {
    return await getCachedCmsListicle(name)
  } catch (cacheError) {
    console.warn(`Cached listicle fetch failed for "${name}", retrying without cache:`, cacheError)

    try {
      return await fetchCmsListicle(name)
    } catch (directError) {
      console.warn(
        `Direct CMS fetch also failed for "${name}", falling back to local config:`,
        directError
      )

      return getLocalListicleConfig(name)
    }
  }
}
