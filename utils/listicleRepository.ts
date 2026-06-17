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

function buildListicleQuery(key: string) {
  return qs.stringify(
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
}

function parseListicleResponse(data: ListicleApiResponse) {
  const listicle = data.data?.[0]
  return listicle ? transformCmsListicle(listicle) : null
}

async function fetchCmsListicle(key: string) {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const response = await fetch(`${API_URL}/api/listicles${buildListicleQuery(key)}`, {
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

  return parseListicleResponse((await response.json()) as ListicleApiResponse)
}

async function fetchCmsListiclePlain(key: string) {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const response = await fetch(`${API_URL}/api/listicles${buildListicleQuery(key)}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(`Failed to fetch listicle "${key}": ${response.status} ${errorMessage}`)
  }

  return parseListicleResponse((await response.json()) as ListicleApiResponse)
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
    console.log(`[listicle:${name}] → local (dev overlay or no CMS config)`)
    return getLocalListicleConfig(name)
  }

  try {
    console.log(`[listicle:${name}] → trying unstable_cache`)
    const result = await getCachedCmsListicle(name)
    console.log(`[listicle:${name}] → unstable_cache success: ${result ? 'yes' : 'null'}`)
    return result
  } catch (err) {
    console.log(`[listicle:${name}] → unstable_cache failed: ${(err as Error).message}`)
    try {
      console.log(`[listicle:${name}] → trying plain fetch`)
      const result = await fetchCmsListiclePlain(name)
      console.log(`[listicle:${name}] → plain fetch success: ${result ? 'yes' : 'null'}`)
      return result
    } catch (directErr) {
      console.log(`[listicle:${name}] → plain fetch failed: ${(directErr as Error).message}`)
      console.log(`[listicle:${name}] → falling back to local config`)
      return getLocalListicleConfig(name)
    }
  }
}
