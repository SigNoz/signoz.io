import docsSideNav from '@/constants/docsSideNav'

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

const DOCS_ROOT = '/docs/introduction'

const LLM_STARTER_ROUTE_MATCHERS: Array<(route: string) => boolean> = [
  (route) => route === DOCS_ROOT,
  (route) => /^\/docs\/install(?:\/|$)/.test(route),
  (route) => /^\/docs\/cloud(?:\/|$)/.test(route),
  (route) => /^\/docs\/opentelemetry-collection-agents\/get-started(?:\/|$)/.test(route),
  (route) => route === '/docs/llm-observability',
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

const routeLabelLookup = (() => {
  const lookup = new Map<string, string>()
  buildRouteLabelLookup(docsSideNav as NavItem[], lookup)
  lookup.set(DOCS_ROOT, 'Get Started')
  return lookup
})()

const toTree = (items: NavItem[]): DocsRouteTreeItem[] => {
  return items
    .map((item): DocsRouteTreeItem | null => {
      if (typeof item === 'string') {
        const route = normalizeDocsRoute(item)
        if (!route) return null

        return {
          label: routeLabelLookup.get(route) || fallbackLabelFromRoute(route),
          route,
          children: [],
        }
      }

      const label =
        item.label || (item.route ? fallbackLabelFromRoute(item.route) : 'Documentation')
      const route = normalizeDocsRoute(item.route)
      const children = Array.isArray(item.items) ? toTree(item.items as NavItem[]) : []

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

export function getDocsRouteTree(): DocsRouteTreeItem[] {
  return toTree(docsSideNav as NavItem[])
}

export function getDocsRouteList(): DocsRouteListItem[] {
  const all: DocsRouteListItem[] = []
  flattenTree(getDocsRouteTree(), 0, all)

  const seen = new Set<string>()
  return all.filter((item) => {
    if (seen.has(item.route)) return false
    seen.add(item.route)
    return true
  })
}

export function getLlmStarterLinks(limit = 24): Array<Pick<DocsRouteListItem, 'label' | 'route'>> {
  const routes = getDocsRouteList()
  const starters: Array<Pick<DocsRouteListItem, 'label' | 'route'>> = []
  const seen = new Set<string>()
  const sortedRoutes = [...routes].sort(
    (a, b) => a.depth - b.depth || a.route.length - b.route.length
  )

  const addStarter = (item: Pick<DocsRouteListItem, 'label' | 'route'> | undefined) => {
    if (!item || starters.length >= limit || seen.has(item.route)) return
    seen.add(item.route)
    starters.push({ label: item.label, route: item.route })
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
