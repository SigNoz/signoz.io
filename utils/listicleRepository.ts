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
  console.log(`[listicle:${key}] fetchCmsListicle called — API_URL: ${API_URL}`)
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
  const env = {
    dev: isLocalListicleOverlayEnabled(),
    cms: hasCMSConfig(),
    nodeEnv: process.env.NODE_ENV,
  }
  console.log(`[listicle:${name}] start — env:`, JSON.stringify(env))

  if (isLocalListicleOverlayEnabled() || !hasCMSConfig()) {
    console.log(`[listicle:${name}] → local (dev overlay or no CMS config)`)
    return getLocalListicleConfig(name)
  }

  try {
    console.log(`[listicle:${name}] → trying unstable_cache CMS fetch`)
    const result = await getCachedCmsListicle(name)
    console.log(
      `[listicle:${name}] → unstable_cache CMS success, got config: ${result ? 'yes' : 'null'}`
    )
    return result
  } catch (err) {
    console.log(`[listicle:${name}] → unstable_cache failed: ${(err as Error).message}`)

    try {
      console.log(`[listicle:${name}] → trying direct CMS fetch (no unstable_cache)`)
      const result = await fetchCmsListicle(name)
      console.log(
        `[listicle:${name}] → direct CMS fetch success, got config: ${result ? 'yes' : 'null'}`
      )
      return result
    } catch (directErr) {
      console.log(`[listicle:${name}] → direct CMS fetch failed: ${(directErr as Error).message}`)
      console.log(`[listicle:${name}] → falling back to local config`)
      return getLocalListicleConfig(name)
    }
  }
}
