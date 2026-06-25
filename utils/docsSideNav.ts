import { promises as fs } from 'fs'
import path from 'path'
import type { NavItem } from '@/components/DocsSidebar/types'

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

  const { CMS_REVALIDATE_INTERVAL } = await import('@/constants/cache')
  const res = await fetch(`${CMS_API_URL}/api/docs-side-nav`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: CMS_REVALIDATE_INTERVAL },
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
  const { hasCMSContentConfig } = await import('@/utils/contentRepository')
  if (hasCMSContentConfig()) {
    return fetchCmsSideNav()
  }
  return readLocalSideNav()
}

// Try to create a Next.js-cached version; fall back to plain read for non-Next contexts (tests)
let _cachedFetcher: (() => Promise<NavItem[]>) | undefined

function getCachedFetcher(): () => Promise<NavItem[]> {
  if (_cachedFetcher) return _cachedFetcher

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nextCache = require('next/cache')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const react = require('react')
    const { CMS_REVALIDATE_INTERVAL } = require('@/constants/cache')

    if (typeof nextCache.unstable_cache !== 'function' || typeof react.cache !== 'function') {
      throw new Error('Next.js cache APIs not available')
    }

    const inner = nextCache.unstable_cache(resolveSideNav, ['docs-side-nav'], {
      revalidate: CMS_REVALIDATE_INTERVAL,
      tags: ['docs-side-nav'],
    })

    _cachedFetcher = react.cache(async (): Promise<NavItem[]> => inner())
  } catch {
    // Outside Next.js runtime (plain Node tests) — read from local JSON
    _cachedFetcher = readLocalSideNav
  }
  return _cachedFetcher!
}

export async function getDocsSideNav(): Promise<NavItem[]> {
  const fetcher = getCachedFetcher()
  try {
    return await fetcher()
  } catch (e) {
    // unstable_cache may fail at call time if incrementalCache isn't set up (tests)
    if (
      e instanceof Error &&
      e.message.includes('incrementalCache')
    ) {
      _cachedFetcher = readLocalSideNav
      return readLocalSideNav()
    }
    throw e
  }
}
