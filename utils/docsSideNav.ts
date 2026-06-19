import { promises as fs } from 'fs'
import path from 'path'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { fetchDocsSideNavFromCMS } from './strapi'
import type { NavItem } from '@/components/DocsSidebar/types'

export type DocsSideNavLink = {
  type?: string
  title?: string
  description?: string
  slug?: string
  id?: string
}

export type DocsSideNavItem = NavItem

type DocsSideNavPayload = {
  items?: DocsSideNavItem[]
}

const LOCAL_DOCS_SIDE_NAV_PATH = path.join(process.cwd(), 'data', 'docs-side-nav', 'main.json')

function hasCMSConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL)
}

async function readLocalDocsSideNav(): Promise<DocsSideNavItem[]> {
  const raw = await fs.readFile(LOCAL_DOCS_SIDE_NAV_PATH, 'utf8')
  const parsed = JSON.parse(raw) as DocsSideNavPayload

  if (!Array.isArray(parsed.items)) {
    throw new Error('Local docs side nav payload must contain an items array')
  }

  return parsed.items
}

async function fetchRemoteDocsSideNav(): Promise<DocsSideNavItem[]> {
  const payload = await fetchDocsSideNavFromCMS()
  const items = payload?.items

  if (!Array.isArray(items)) {
    throw new Error('CMS docs side nav payload must contain an items array')
  }

  return items as DocsSideNavItem[]
}

async function getDocsSideNavInner(): Promise<DocsSideNavItem[]> {
  if (!hasCMSConfig() || process.env.NODE_ENV === 'development') {
    return readLocalDocsSideNav()
  }

  const cachedFn = unstable_cache(fetchRemoteDocsSideNav, ['docs-side-nav'], {
    tags: ['docs-side-nav'],
    revalidate: CMS_REVALIDATE_INTERVAL,
  })

  try {
    return await cachedFn()
  } catch (error) {
    console.error('[SIDEBAR_FALLBACK] CMS side nav fetch failed, falling back to local:', error)
    return readLocalDocsSideNav()
  }
}

// React.cache() deduplicates calls within a single server request,
// so layout.tsx and page.tsx share one fetch per render.
export const getDocsSideNav = cache(getDocsSideNavInner)

export async function getLocalDocsSideNav(): Promise<DocsSideNavItem[]> {
  return readLocalDocsSideNav()
}
