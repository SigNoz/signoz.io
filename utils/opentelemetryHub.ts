import hubConfig from '@/constants/opentelemetry_hub.json'
import {
  allBlogs,
  allComparisons,
  allGuides,
  allOpentelemetries,
  type Blog,
  type Comparison,
  type Guide,
  type Opentelemetry,
} from 'contentlayer/generated'

type RawHubPath = {
  key: string
  label: string
  articles?: RawHubArticle[]
  chapters?: RawHubGroup[]
  sections?: RawHubGroup[]
}

const PATH_ORDER = ['learn', 'quick-start']

export const LEARN_CHAPTER_ORDER = [
  'introduction',
  'opentelemetry-fundamentals',
  'language-and-frameworks',
  'databases-caches-and-messaging',
  'infrastructure-cloud-and-ci-cd',
  'llms-ai-and-ml',
  'best-practices',
  'misc',
  'comparisons',
]

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

let memoizedHubIndex: HubIndex | null = null

const contentIndex = [
  {
    prefix: '/blog/',
    collection: allBlogs as Array<Blog | Comparison | Guide | Opentelemetry>,
  },
  {
    prefix: '/comparisons/',
    collection: allComparisons as Array<Blog | Comparison | Guide | Opentelemetry>,
  },
  {
    prefix: '/guides/',
    collection: allGuides as Array<Blog | Comparison | Guide | Opentelemetry>,
  },
  {
    prefix: '/opentelemetry/',
    collection: allOpentelemetries as Array<Blog | Comparison | Guide | Opentelemetry>,
  },
]

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

function findContentTitle(route: string) {
  const normalized = normalizeRoute(route)
  const matchingCollection = contentIndex.find(({ prefix }) => normalized.startsWith(prefix))
  if (!matchingCollection) {
    return null
  }

  const slug = normalized.replace(matchingCollection.prefix, '')
  const entry = matchingCollection.collection.find((doc) => doc.slug === slug)
  return entry?.title || null
}

function fallbackLabelFromRoute(route: string) {
  const slug = route.split('/').filter(Boolean).pop() || ''
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function articleToDoc(article: RawHubArticle): HubNavDoc {
  const route = normalizeRoute(article.url)
  const title = findContentTitle(route) || fallbackLabelFromRoute(route)

  return {
    type: 'doc',
    route,
    label: title,
    language: article.language,
  }
}

function mapGroupToCategory(group: RawHubGroup): HubNavCategory {
  const items: HubNavItem[] = []

  if (group.sections) {
    group.sections.forEach((section) => items.push(mapGroupToCategory(section)))
  }

  if (group.articles) {
    group.articles.forEach((article) => items.push(articleToDoc(article)))
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

function buildHubIndex(): HubIndex {
  const lookup = new Map<string, HubLookupEntry>()
  const paths: HubPathNav[] = []

  const sortedPaths = [...hubConfig.paths].sort((a: RawHubPath, b: RawHubPath) => {
    const aIdx = PATH_ORDER.indexOf(a.key)
    const bIdx = PATH_ORDER.indexOf(b.key)
    return (
      (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
      (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx)
    )
  })

  sortedPaths.forEach((rawPath: RawHubPath) => {
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
      chapters.forEach((chapter) => items.push(mapGroupToCategory(chapter)))
    }

    if (rawPath.sections) {
      rawPath.sections.forEach((section) => items.push(mapGroupToCategory(section)))
    }

    if (rawPath.articles) {
      rawPath.articles.forEach((article) => items.push(articleToDoc(article)))
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
  })

  return { lookup, paths }
}

function getHubIndex(): HubIndex {
  if (memoizedHubIndex) {
    return memoizedHubIndex
  }
  memoizedHubIndex = buildHubIndex()
  return memoizedHubIndex
}

export function getHubContextForRoute(route: string) {
  const normalized = normalizeRoute(route)
  const { lookup, paths } = getHubIndex()

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

export function listHubRoutes(): string[] {
  const { lookup } = getHubIndex()
  return Array.from(lookup.keys())
}

export function getHubPaths(): HubPathNav[] {
  const { paths } = getHubIndex()
  return paths
}
