export const CANONICAL_SITEMAP_STATIC_ROUTES = [
  '',
  'tags',
  'pricing',
  'case-study',
  'about-us',
  'terms-of-service',
  'privacy',
  'security',
  'support',
  'teams',
  'faqs',
  'opentelemetry',
  'guides',
  'datadog-alternative',
  'newrelic-alternative',
  'grafana-alternative',
  'product-comparison/signoz-vs-dynatrace',
  'resource-center/blog',
  'resource-center/comparisons',
] as const

export const SITEMAP_EXCLUDED_PATHS = new Set(
  [
    'blog',
    'comparisons',
    'blog/what-is-opentelemetry',
    'blog/signoz-benchmarks',
    'comparisons/open-source-datadog-alternatives',
    'docs/tutorial/writing-clickhouse-queries-in-dashboard',
    'docs/userguide/collecting-ecs-logs-and-metrics',
    'docs/userguide/collecting-ecs-sidecar-infra',
  ].map((path) => path.replace(/^\/+|\/+$/g, ''))
)

export const normalizeSeoPath = (rawPath: string) => rawPath.replace(/^\/+|\/+$/g, '')

export const shouldExcludeFromSitemap = (rawPath: string) =>
  SITEMAP_EXCLUDED_PATHS.has(normalizeSeoPath(rawPath))

export const shouldUseTrailingSlash = (path: string) => {
  const lastSegment = path.split('/').filter(Boolean).at(-1) ?? ''

  return path.length > 0 && !lastSegment.includes('.')
}
