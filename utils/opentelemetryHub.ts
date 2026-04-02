import hubConfig from '@/constants/opentelemetry_hub.json'
import { LEARN_CHAPTER_ORDER } from '@/constants/opentelemetryHub'

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
  /** Sidebar label; if omitted, derived from the last path segment of the URL. */
  title?: string
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

function normalizeRoute(route: string) {
  const withoutDomain = route.replace(/^https?:\/\/[^/]+/i, '')
  let normalized = withoutDomain.startsWith('/') ? withoutDomain : `/${withoutDomain}`
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

function fallbackTitleFromRoute(route: string): string {
  const slug = route.split('/').filter(Boolean).pop() || ''
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function articleToDoc(article: RawHubArticle): HubNavDoc {
  const route = normalizeRoute(article.url)
  const explicit = article.title?.trim()
  const label = explicit || fallbackTitleFromRoute(route)
  return {
    type: 'doc',
    route,
    label,
    language: article.language,
  }
}

function mapGroupToCategory(group: RawHubGroup): HubNavCategory {
  const items: HubNavItem[] = []

  if (group.sections) {
    for (const section of group.sections) {
      items.push(mapGroupToCategory(section))
    }
  }

  if (group.articles) {
    for (const article of group.articles) {
      items.push(articleToDoc(article))
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

function buildHubIndex(): HubIndex {
  const lookup = new Map<string, HubLookupEntry>()
  const paths: HubPathNav[] = []

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
        items.push(mapGroupToCategory(chapter))
      }
    }

    if (rawPath.sections) {
      for (const section of rawPath.sections) {
        items.push(mapGroupToCategory(section))
      }
    }

    if (rawPath.articles) {
      for (const article of rawPath.articles) {
        items.push(articleToDoc(article))
      }
    }

    const firstRoute = findFirstDocRoute(items)
    const languageSet = new Set<string>()
    collectLanguages(items, languageSet)
    const languages = Array.from(languageSet)

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

function getHubIndex(): HubIndex {
  return buildHubIndex()
}

const ROUTE_ALIASES: Record<string, string> = {
  '/opentelemetry': '/blog/what-is-opentelemetry',
}

export function resolveHubRoute(route: string): string {
  const norm = normalizeRoute(route)
  return ROUTE_ALIASES[norm] ?? norm
}

export function getHubContextForRoute(route: string) {
  const normalized = resolveHubRoute(route)
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
