import { promises as fs } from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'
import type { NavItem } from '@/components/DocsSidebar/types'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { hasCMSContentConfig, isLocalContentOverlayEnabled } from '@/utils/contentRepository'

const LOCAL_JSON_PATH = path.join(process.cwd(), 'data/docs-side-nav/main.json')

async function readLocalSideNav(): Promise<NavItem[]> {
  const raw = await fs.readFile(LOCAL_JSON_PATH, 'utf8')
  return JSON.parse(raw) as NavItem[]
}

async function fetchCmsSideNav(): Promise<NavItem[]> {
  const CMS_API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
  if (!CMS_API_URL) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const res = await fetch(`${CMS_API_URL}/api/docs-side-nav`, {
    cache: 'force-cache',
    next: {
      tags: ['docs-side-nav'],
    },
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const items = json?.data?.items
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('CMS returned empty or invalid sidenav items')
  }

  return items as NavItem[]
}

async function resolveSideNav(): Promise<NavItem[]> {
  if (hasCMSContentConfig()) {
    return fetchCmsSideNav()
  }
  return readLocalSideNav()
}

async function getCachedSideNav(): Promise<NavItem[]> {
  if (isLocalContentOverlayEnabled()) {
    return resolveSideNav()
  }

  const cachedFn = unstable_cache(
    async () => {
      const result = await resolveSideNav()
      if (!result || result.length === 0) {
        throw new Error('Empty sidenav received, skipping cache')
      }
      return result
    },
    ['docs-side-nav'],
    {
      tags: ['docs-side-nav'],
      revalidate: CMS_REVALIDATE_INTERVAL,
    }
  )

  return cachedFn()
}

export async function getDocsSideNav(): Promise<NavItem[]> {
  try {
    return await getCachedSideNav()
  } catch (cacheError) {
    console.warn('Cached sidenav fetch failed, retrying without cache:', cacheError)
    try {
      return await resolveSideNav()
    } catch (directError) {
      console.error('Direct sidenav fetch also failed:', directError)
      return []
    }
  }
}
