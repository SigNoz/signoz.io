import { promises as fs } from 'fs'
import path from 'path'
import { cacheLife, cacheTag } from 'next/cache'
import type { NavItem, Doc } from '@/components/DocsSidebar/types'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { hasCMSContentConfig, isLocalContentOverlayEnabled } from '@/utils/contentRepository'
import { fetchAllDocsIndex } from '@/utils/cachedData'

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

async function cachedResolveSideNav(): Promise<NavItem[]> {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('docs-side-nav')
  const result = await resolveSideNav()
  if (!result || result.length === 0) {
    throw new Error('Empty sidenav received, skipping cache')
  }
  return result
}

async function getCachedSideNav(): Promise<NavItem[]> {
  if (isLocalContentOverlayEnabled()) {
    return resolveSideNav()
  }
  return cachedResolveSideNav()
}

function enrichNavWithDates(items: NavItem[], dateMap: Map<string, string>): NavItem[] {
  return items.map((item) => {
    if (item.type === 'doc') {
      const normalizedRoute = item.route.endsWith('/') ? item.route.slice(0, -1) : item.route
      const date = dateMap.get(normalizedRoute)
      if (date) {
        return { ...item, published_date: date } as Doc
      }
      return item
    }
    if (item.type === 'category' && 'items' in item && item.items) {
      return { ...item, items: enrichNavWithDates(item.items, dateMap) }
    }
    return item
  })
}

export async function getDocsSideNav(): Promise<NavItem[]> {
  let nav: NavItem[]
  try {
    nav = await getCachedSideNav()
  } catch (cacheError) {
    console.warn('Cached sidenav fetch failed, retrying without cache:', cacheError)
    try {
      nav = await resolveSideNav()
    } catch (directError) {
      console.error('Direct sidenav fetch also failed:', directError)
      return []
    }
  }

  try {
    const allDocs = await fetchAllDocsIndex()
    const dateMap = new Map<string, string>()
    for (const doc of allDocs) {
      if (doc.published_date && doc.path) {
        const route = doc.path.startsWith('/') ? doc.path : `/${doc.path}`
        const normalized = route.endsWith('/') ? route.slice(0, -1) : route
        dateMap.set(normalized, doc.published_date)
      }
    }
    if (dateMap.size > 0) {
      nav = enrichNavWithDates(nav, dateMap)
    }
  } catch (enrichError) {
    console.warn('Sidenav date enrichment failed, returning unenriched nav:', enrichError)
  }

  return nav
}
