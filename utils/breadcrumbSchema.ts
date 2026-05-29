import docsSideNav from '@/constants/docsSideNav'

type NavItem =
  | {
      type?: 'doc' | 'category'
      label?: string
      route?: string
      items?: Array<NavItem | string>
    }
  | string

export type BreadcrumbCrumb = {
  name: string
  url: string
}

type BreadcrumbItem = {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

type BreadcrumbListSchema = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

export const BASE_URL = 'https://signoz.io'

const SECTION_CONFIG: Record<string, BreadcrumbCrumb> = {
  docs: { name: 'Docs', url: `${BASE_URL}/docs/introduction/` },
  blog: { name: 'Blog', url: `${BASE_URL}/blog/` },
  guides: { name: 'Guides', url: `${BASE_URL}/guides/` },
  comparisons: { name: 'Comparisons', url: `${BASE_URL}/comparisons/` },
  opentelemetry: { name: 'OpenTelemetry', url: `${BASE_URL}/opentelemetry/` },
}

const HOME_CRUMB: BreadcrumbCrumb = { name: 'SigNoz', url: `${BASE_URL}/` }

// --- Route normalization (mirrors agentDiscovery.ts) ---

const normalizeDocsRoute = (route?: string): string | null => {
  if (!route) return null
  const trimmed = route.trim()
  if (!trimmed.startsWith('/docs')) return null
  if (trimmed === '/docs' || trimmed === '/docs/') return '/docs/introduction'
  if (trimmed.length > 1 && trimmed.endsWith('/')) return trimmed.slice(0, -1)
  return trimmed
}

const fallbackLabelFromRoute = (route: string): string => {
  const clean = route
    .replace(/^\/docs\/?/, '')
    .split('/')
    .filter(Boolean)
    .pop()
  if (!clean) return 'Documentation'
  return clean
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

// --- Sidebar ancestry map (lazy singleton) ---

const getFirstChildRoute = (items: Array<NavItem | string>): string | null => {
  for (const item of items) {
    if (typeof item === 'string') continue
    if (item.route) {
      const normalized = normalizeDocsRoute(item.route)
      if (normalized) return normalized
    }
    if (Array.isArray(item.items) && item.items.length > 0) {
      const childRoute = getFirstChildRoute(item.items)
      if (childRoute) return childRoute
    }
  }
  return null
}

const buildRouteAncestryMap = (
  items: NavItem[],
  trail: BreadcrumbCrumb[],
  map: Map<string, BreadcrumbCrumb[]>
) => {
  for (const item of items) {
    if (typeof item === 'string') continue

    const normalized = normalizeDocsRoute(item.route)
    const label = item.label || (item.route ? fallbackLabelFromRoute(item.route) : 'Documentation')

    let url: string
    if (normalized) {
      url = `${BASE_URL}${normalized}/`
    } else if (Array.isArray(item.items) && item.items.length > 0) {
      const childRoute = getFirstChildRoute(item.items)
      url = childRoute ? `${BASE_URL}${childRoute}/` : SECTION_CONFIG.docs.url
    } else {
      url = SECTION_CONFIG.docs.url
    }

    const entry: BreadcrumbCrumb = { name: label, url }
    trail.push(entry)

    if (normalized && !map.has(normalized)) {
      map.set(normalized, [...trail])
    }

    if (Array.isArray(item.items) && item.items.length > 0) {
      buildRouteAncestryMap(item.items as NavItem[], trail, map)
    }

    trail.pop()
  }
}

let ancestryMap: Map<string, BreadcrumbCrumb[]> | null = null

const getAncestryMap = (): Map<string, BreadcrumbCrumb[]> => {
  if (!ancestryMap) {
    ancestryMap = new Map()
    buildRouteAncestryMap(docsSideNav as NavItem[], [], ancestryMap)
  }
  return ancestryMap
}

// --- Exported functions ---

// https://developers.google.com/search/docs/appearance/structured-data/breadcrumb#breadcrumb-list
// The example in google docs shows that the last breadcrumb's item URL omitted but,
// We always include `item` on every ListItem, including the last one.
// 1. Google's docs show omission as acceptable, but including it ensures
// spec-complete schema.org markup, compatibility with Bing/Yandex,
// and consistency with other search engines.
// 2. Also, the last breadcrumb's item URL acts as a canonical reinforcement. Example: If /docs/instrumentation/python/ has variants like ?tab=auto or ?ref=sidebar, the breadcrumb item anchors the
// canonical version unambiguously in structured data.
// 3. Programmatic consumers beyond Google -  Google's rich results renderer may not need the last item, but other consumers do:
//   - AI assistants / RAG pipelines parsing the structured data to build navigation or cite sources
//   - Accessibility tools that read structured data to build skip-navigation
//   - Aggregators indexing schema
export function buildBreadcrumbSchema(crumbs: BreadcrumbCrumb[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function getDocsBreadcrumbs(slug: string, pageTitle: string): BreadcrumbCrumb[] {
  const targetRoute = normalizeDocsRoute(`/docs/${slug}`)
  const map = getAncestryMap()

  const crumbs: BreadcrumbCrumb[] = [HOME_CRUMB, SECTION_CONFIG.docs]

  if (targetRoute) {
    const ancestry = map.get(targetRoute)
    if (ancestry && ancestry.length > 0) {
      const ancestors = ancestry.slice(0, -1)
      crumbs.push(...ancestors)
      crumbs.push({ name: pageTitle, url: `${BASE_URL}/docs/${slug}/` })
    } else {
      const segments = slug.split('/').filter(Boolean)
      if (segments.length > 0) {
        crumbs.push({ name: pageTitle, url: `${BASE_URL}/docs/${slug}/` })
      }
    }
  } else {
    crumbs.push({ name: pageTitle, url: `${BASE_URL}/docs/${slug}/` })
  }

  return crumbs
}

export function generateDocsBreadcrumb(slug: string, pageTitle: string): BreadcrumbListSchema {
  return buildBreadcrumbSchema(getDocsBreadcrumbs(slug, pageTitle))
}

export function getSectionArticleBreadcrumbs(
  section: 'blog' | 'guides' | 'comparisons' | 'opentelemetry',
  title: string,
  slug: string
): BreadcrumbCrumb[] {
  const config = SECTION_CONFIG[section]
  return [
    HOME_CRUMB,
    { name: config.name, url: config.url },
    { name: title, url: `${BASE_URL}/${section}/${slug}/` },
  ]
}

export function generateSectionArticleBreadcrumb(
  section: 'blog' | 'guides' | 'comparisons' | 'opentelemetry',
  title: string,
  slug: string
): BreadcrumbListSchema {
  return buildBreadcrumbSchema(getSectionArticleBreadcrumbs(section, title, slug))
}

export function generateSectionHubBreadcrumb(
  section: 'blog' | 'guides' | 'comparisons' | 'opentelemetry',
  page?: string
): BreadcrumbListSchema {
  const config = SECTION_CONFIG[section]
  const crumbs: BreadcrumbCrumb[] = [HOME_CRUMB, { name: config.name, url: config.url }]

  if (page) {
    const pageNum = parseInt(page, 10)
    if (!Number.isNaN(pageNum) && pageNum > 0) {
      crumbs.push({ name: `Page ${pageNum}`, url: `${BASE_URL}/${section}/page/${pageNum}/` })
    }
  }

  return buildBreadcrumbSchema(crumbs)
}
