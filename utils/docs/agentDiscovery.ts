import { getDocsSideNav } from '@/utils/docsSideNav'
import { fetchAllDocsIndex } from '@/utils/cachedData'

type NavItem =
  | {
      type?: 'doc' | 'category'
      label?: string
      route?: string
      items?: Array<NavItem | string>
    }
  | string

export type DocsRouteListItem = {
  label: string
  route: string
  depth: number
}

export type DocsRouteTreeItem = {
  label: string
  route?: string
  children: DocsRouteTreeItem[]
}

export type LlmStarterLink = {
  label: string
  route: string
  description?: string
}

const DOCS_ROOT = '/docs/introduction'

// Single source for the docs introduction meta description; the introduction
// page metadata and /llms.txt both read it (issue #1173 requires this string).
export const INTRO_DESCRIPTION =
  'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.'

const LLM_STARTER_ROUTE_MATCHERS: Array<(route: string) => boolean> = [
  (route) => route === DOCS_ROOT,
  (route) => /^\/docs\/install(?:\/|$)/.test(route),
  (route) => /^\/docs\/cloud(?:\/|$)/.test(route),
  (route) => /^\/docs\/opentelemetry-collection-agents\/get-started(?:\/|$)/.test(route),
  (route) => route === '/docs/llm-observability',
  (route) => route === '/docs/ai/agent-skills',
  (route) => route === '/docs/ai/signoz-mcp-server',
  (route) => route === '/docs/ai/use-cases',
  (route) => route === '/docs/aws-monitoring/overview',
  (route) => route === '/docs/gcp-monitoring',
  (route) => route === '/docs/migration/migrate-to-signoz',
  (route) => route === '/docs/migration/migrate-from-datadog-to-signoz',
  (route) => route === '/docs/migration/migrate-from-grafana-to-signoz',
  (route) => route === '/docs/migration/migrate-from-elk-to-signoz',
  (route) => route === '/docs/migration/migrate-from-newrelic-to-signoz',
  (route) => route === '/docs/migration/migrate-from-honeycomb-to-signoz',
  (route) => route === '/docs/migration/migrate-from-opentelemetry-to-signoz',
  (route) => route === '/docs/migration/migrate-from-signoz-self-host-to-signoz-cloud',
  (route) => /^\/docs\/instrumentation(?:\/|$)/.test(route),
  (route) => /^\/docs\/traces-management(?:\/|$)/.test(route),
  (route) => /^\/docs\/metrics-management(?:\/|$)/.test(route),
  (route) => /^\/docs\/logs-management(?:\/|$)/.test(route),
  (route) => /^\/docs\/alerts-management(?:\/|$)/.test(route),
  (route) => /^\/docs\/dashboards(?:\/|$)/.test(route),
  (route) => /^\/docs\/manage\/administrator-guide(?:\/|$)/.test(route),
  (route) => /^\/docs\/migration(?:\/|$)/.test(route),
]

const normalizeDocsRoute = (route?: string): string | null => {
  if (!route) return null

  const trimmed = route.trim()
  if (!trimmed.startsWith('/docs')) return null

  if (trimmed === '/docs' || trimmed === '/docs/') {
    return DOCS_ROOT
  }

  if (trimmed.length > 1 && trimmed.endsWith('/')) {
    return trimmed.slice(0, -1)
  }

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

const buildRouteLabelLookup = (items: NavItem[], lookup: Map<string, string>) => {
  items.forEach((item) => {
    if (typeof item === 'string') return

    const route = normalizeDocsRoute(item.route)
    if (route && item.label && !lookup.has(route)) {
      lookup.set(route, item.label)
    }

    if (Array.isArray(item.items) && item.items.length > 0) {
      buildRouteLabelLookup(item.items, lookup)
    }
  })
}

function getRouteLabelLookup(docsSideNav: NavItem[]): Map<string, string> {
  const lookup = new Map<string, string>()
  buildRouteLabelLookup(docsSideNav, lookup)
  lookup.set(DOCS_ROOT, 'Get Started')
  return lookup
}

const toTree = (items: NavItem[], lookup: Map<string, string>): DocsRouteTreeItem[] => {
  return items
    .map((item): DocsRouteTreeItem | null => {
      if (typeof item === 'string') {
        const route = normalizeDocsRoute(item)
        if (!route) return null

        return {
          label: lookup.get(route) || fallbackLabelFromRoute(route),
          route,
          children: [],
        }
      }

      const label =
        item.label || (item.route ? fallbackLabelFromRoute(item.route) : 'Documentation')
      const route = normalizeDocsRoute(item.route)
      const children = Array.isArray(item.items) ? toTree(item.items as NavItem[], lookup) : []

      if (!route && children.length === 0) {
        return null
      }

      return {
        label,
        route: route || undefined,
        children,
      }
    })
    .filter(Boolean) as DocsRouteTreeItem[]
}

const flattenTree = (nodes: DocsRouteTreeItem[], depth: number, output: DocsRouteListItem[]) => {
  nodes.forEach((node) => {
    if (node.route) {
      output.push({
        label: node.label,
        route: node.route,
        depth,
      })
    }

    if (node.children.length > 0) {
      flattenTree(node.children, depth + 1, output)
    }
  })
}

export async function getDocsRouteTree(): Promise<DocsRouteTreeItem[]> {
  const docsSideNav = (await getDocsSideNav()) as NavItem[]
  return toTree(docsSideNav, getRouteLabelLookup(docsSideNav))
}

export async function getDocsRouteList(): Promise<DocsRouteListItem[]> {
  const all: DocsRouteListItem[] = []
  flattenTree(await getDocsRouteTree(), 0, all)

  const seen = new Set<string>()
  return all.filter((item) => {
    if (seen.has(item.route)) return false
    seen.add(item.route)
    return true
  })
}

const normalizeDescription = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined
  const collapsed = value.replace(/\s+/g, ' ').trim()
  return collapsed.length > 0 ? collapsed : undefined
}

async function getDocsDescriptionLookup(): Promise<Map<string, string>> {
  const lookup = new Map<string, string>()

  try {
    const docs = await fetchAllDocsIndex()
    docs.forEach((doc) => {
      if (typeof doc.slug !== 'string' || doc.slug.length === 0) return
      const description = normalizeDescription(doc.description) ?? normalizeDescription(doc.summary)
      if (description) {
        lookup.set(`/docs/${doc.slug}`, description)
      }
    })
  } catch (error) {
    console.warn('Docs description lookup failed, emitting links without descriptions:', error)
  }

  lookup.set(DOCS_ROOT, INTRO_DESCRIPTION)
  return lookup
}

export async function getLlmStarterLinks(limit = 24): Promise<LlmStarterLink[]> {
  const routes = await getDocsRouteList()
  const descriptions = await getDocsDescriptionLookup()
  const starters: LlmStarterLink[] = []
  const seen = new Set<string>()
  const sortedRoutes = [...routes].sort(
    (a, b) => a.depth - b.depth || a.route.length - b.route.length
  )

  const addStarter = (item: Pick<DocsRouteListItem, 'label' | 'route'> | undefined) => {
    if (!item || starters.length >= limit || seen.has(item.route)) return
    seen.add(item.route)
    starters.push({
      label: item.label,
      route: item.route,
      description: descriptions.get(item.route),
    })
  }

  LLM_STARTER_ROUTE_MATCHERS.forEach((matcher) => {
    const match = sortedRoutes.find((item) => matcher(item.route))
    addStarter(match)
  })

  sortedRoutes
    .filter((item) => item.depth <= 1)
    .forEach((item) => {
      addStarter(item)
    })

  return starters
}
