import { unstable_cache } from 'next/cache'
import hubConfig from '@/constants/opentelemetry_hub.json'
import { LEARN_CHAPTER_ORDER } from '@/constants/opentelemetryHub'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { allBlogs, allGuides } from 'contentlayer/generated'
import type { Comparison } from '../types/transformedContent'
import { fetchAllComparisonsForPage } from './cachedData'

type RawHubPath = {
  key: string
  label: string
  articles?: RawHubArticle[]
  chapters?: RawHubGroup[]
  sections?: RawHubGroup[]
}

const PATH_ORDER = ['learn', 'quick-start']

type RawHubGroup = {
  key: string
  label: string
  articles?: RawHubArticle[]
  sections?: RawHubGroup[]
}

type RawHubArticle = {
  url: string
  language?: string
}

export type HubNavDoc = {
  type: 'doc'
  route: string
  label: string
  language?: string
}

export type HubNavCategory = {
  type: 'category'
  label: string
  route?: string
  items: HubNavItem[]
  key?: string
}

export type HubNavItem = HubNavDoc | HubNavCategory

export type HubPathNav = {
  key: string
  label: string
  items: HubNavItem[]
  firstRoute?: string
  languages: string[]
}

type HubLookupEntry = {
  pathKey: string
  language?: string
}

type HubIndex = {
  lookup: Map<string, HubLookupEntry>
  paths: HubPathNav[]
}

type SerializedHubIndex = {
  lookup: Record<string, HubLookupEntry>
  paths: HubPathNav[]
}

type ContentIndexItem = {
  prefix: string
  collection: readonly { slug?: string; title?: string }[]
}

function normalizeRoute(route: string) {
  // Strip domain if present
  const withoutDomain = route.replace(/^https?:\/\/[^/]+/i, '')
  let normalized = withoutDomain.startsWith('/') ? withoutDomain : `/${withoutDomain}`
  // Remove trailing slash (not for root)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

function findContentTitle(route: string, contentIndex: ContentIndexItem[]) {
  const normalized = normalizeRoute(route)
  const matchingCollection = contentIndex.find(({ prefix }) => normalized.startsWith(prefix))
  if (!matchingCollection) {
    return null
  }

  const slug = normalized.replace(matchingCollection.prefix, '')
  const entry = matchingCollection.collection.find((doc) => doc.slug === slug)
  return entry?.title || null
}

function fallbackLabelFromRoute(route: string, contentIndex: ContentIndexItem[]) {
  const slug = route.split('/').filter(Boolean).pop() || ''
  return (
    findContentTitle(route, contentIndex) ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

function articleToDoc(article: RawHubArticle, contentIndex: ContentIndexItem[]): HubNavDoc {
  const route = normalizeRoute(article.url)
  const title = findContentTitle(route, contentIndex) || fallbackLabelFromRoute(route, contentIndex)

  return {
    type: 'doc',
    route,
    label: title,
    language: article.language,
  }
}

function mapGroupToCategory(group: RawHubGroup, contentIndex: ContentIndexItem[]): HubNavCategory {
  const items: HubNavItem[] = []

  if (group.sections) {
    for (const section of group.sections) {
      items.push(mapGroupToCategory(section, contentIndex))
    }
  }

  if (group.articles) {
    for (const article of group.articles) {
      items.push(articleToDoc(article, contentIndex))
    }
  }

  const firstDocRoute = findFirstDocRoute(items)

  return {
    type: 'category',
    label: group.label,
    route: firstDocRoute,
    items,
    key: group.key,
  }
}

function findFirstDocRoute(items: HubNavItem[]): string | undefined {
  for (const item of items) {
    if (item.type === 'doc') {
      return item.route
    }
    if (item.type === 'category') {
      const route = findFirstDocRoute(item.items)
      if (route) return route
    }
  }
  return undefined
}

function collectLanguages(items: HubNavItem[], accumulator: Set<string>) {
  for (const item of items) {
    if (item.type === 'doc' && item.language) {
      accumulator.add(item.language)
    }
    if (item.type === 'category') {
      collectLanguages(item.items, accumulator)
    }
  }
}

async function buildHubIndex(comparisons: Comparison[]): Promise<HubIndex> {
  const lookup = new Map<string, HubLookupEntry>()
  const paths: HubPathNav[] = []

  const contentIndex: ContentIndexItem[] = [
    {
      prefix: '/blog/',
      collection: allBlogs,
    },
    {
      prefix: '/comparisons/',
      collection: comparisons,
    },
    {
      prefix: '/guides/',
      collection: allGuides,
    },
  ]

  const sortedPaths = ([...hubConfig.paths] as RawHubPath[]).sort(
    (a: RawHubPath, b: RawHubPath) => {
      const aIdx = PATH_ORDER.indexOf(a.key)
      const bIdx = PATH_ORDER.indexOf(b.key)
      return (
        (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
        (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx)
      )
    }
  )

  for (const rawPath of sortedPaths) {
    const items: HubNavItem[] = []
    const chapters =
      rawPath.key === 'learn' && rawPath.chapters
        ? [...rawPath.chapters].sort((a, b) => {
            const aIdx = LEARN_CHAPTER_ORDER.indexOf(a.key)
            const bIdx = LEARN_CHAPTER_ORDER.indexOf(b.key)
            return (
              (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
              (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx)
            )
          })
        : rawPath.chapters

    if (chapters) {
      for (const chapter of chapters) {
        items.push(mapGroupToCategory(chapter, contentIndex))
      }
    }

    if (rawPath.sections) {
      for (const section of rawPath.sections) {
        items.push(mapGroupToCategory(section, contentIndex))
      }
    }

    if (rawPath.articles) {
      for (const article of rawPath.articles) {
        items.push(articleToDoc(article, contentIndex))
      }
    }

    const firstRoute = findFirstDocRoute(items)
    const languageSet = new Set<string>()
    collectLanguages(items, languageSet)
    const languages = Array.from(languageSet)

    // Populate lookup map
    const addToLookup = (entries: HubNavItem[]) => {
      for (const entry of entries) {
        if (entry.type === 'doc') {
          lookup.set(entry.route, { pathKey: rawPath.key, language: entry.language })
        } else {
          addToLookup(entry.items)
        }
      }
    }
    addToLookup(items)

    paths.push({
      key: rawPath.key,
      label: rawPath.label,
      items,
      firstRoute,
      languages,
    })
  }

  return { lookup, paths }
}

async function fetchAndBuildHubIndex(): Promise<SerializedHubIndex> {
  let comparisons: Comparison[] = []

  try {
    comparisons = await fetchAllComparisonsForPage()
  } catch (e) {
    console.error('Failed to fetch content for hub index:', e)
  }

  const { lookup, paths } = await buildHubIndex(comparisons)
  return { lookup: Object.fromEntries(lookup), paths }
}

async function getCachedHubIndex(): Promise<HubIndex> {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const cachedFn = unstable_cache(fetchAndBuildHubIndex, ['hub-index', deploymentStatus], {
    tags: ['mdx-content-list', 'comparisons-list'],
    revalidate: CMS_REVALIDATE_INTERVAL,
  })

  const serialized = await cachedFn()
  return { lookup: new Map(Object.entries(serialized.lookup)), paths: serialized.paths }
}

export async function getHubContextForRoute(route: string) {
  const normalized = normalizeRoute(route)
  const { lookup, paths } = await getCachedHubIndex()

  const match = lookup.get(normalized)
  if (!match) {
    return null
  }

  const pathNav = paths.find((p) => p.key === match.pathKey)
  if (!pathNav) {
    return null
  }

  return {
    pathKey: match.pathKey,
    pathLabel: pathNav.label,
    items: pathNav.items,
    languages: pathNav.languages,
    defaultLanguage: match.language || null,
    firstRouteByPath: paths.map((p) => ({ key: p.key, label: p.label, firstRoute: p.firstRoute })),
  }
}
