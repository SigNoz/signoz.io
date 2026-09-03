/**
 * Shared route lists and markdown builders for the sitemap surfaces.
 *
 * The XML sitemaps (app/(site)/<segment>/sitemap.ts) and their agent-facing
 * markdown counterparts (app/(site)/<segment>/sitemap.md/route.ts) read the
 * same constants so the two representations cannot drift.
 */

import siteMetadata from '@/data/siteMetadata'

export const PRODUCT_SITEMAP_ROUTES = [
  'api-reference',
  'pricing',
  'pricing/metrics-cost-estimation',
  'teams',
  'why-signoz',
  'observability-for-ai-native-companies',
  'log-management',
  'llm-observability',
  'external-apis',
  'distributed-tracing',
  'metrics-and-dashboards',
  'exceptions-monitoring',
  'alerts-management',
  'application-performance-monitoring',
  'trace-funnels',
  'datadog-migration-tool',
  'datadog-pricing-calculator',
  'upgrade-path',
  'unified-observability',
  'agent-native-observability',
  'kubernetes-monitoring',
  'azure-monitoring',
  'google-cloud-monitoring',
] as const

// The empty route is the site home page.
export const CORPORATE_SITEMAP_ROUTES = [
  '',
  'tags',
  'about-us',
  'contact-us',
  'terms-of-service',
  'terms-of-reference',
  'privacy',
  'support',
  'startups',
  'security',
] as const

export const ALTERNATIVES_SITEMAP_ROUTES = [
  'datadog-alternative',
  'grafana-alternative',
  'newrelic-alternative',
  'clickstack-alternative',
  'cloudwatch-alternative',
  'product-comparison',
  'product-comparison/datadog-savings',
  'product-comparison/migrate-from-datadog',
  'product-comparison/migrate-from-dynatrace',
  'product-comparison/migrate-from-newrelic',
  'product-comparison/newrelic-savings',
  'product-comparison/signoz-vs-dynatrace',
] as const

export const CMS_SITEMAP_SECTIONS = [
  { section: 'blog', label: 'Blog' },
  { section: 'guides', label: 'Guides' },
  { section: 'faqs', label: 'FAQs' },
  { section: 'customers', label: 'Case Studies' },
  { section: 'opentelemetry', label: 'OpenTelemetry' },
  { section: 'comparisons', label: 'Comparisons' },
] as const

const WORD_OVERRIDES: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  apis: 'APIs',
  aws: 'AWS',
  clickstack: 'ClickStack',
  cloudwatch: 'CloudWatch',
  faqs: 'FAQs',
  gcp: 'GCP',
  llm: 'LLM',
  newrelic: 'New Relic',
  opentelemetry: 'OpenTelemetry',
  signoz: 'SigNoz',
}

const LOWERCASE_WORDS = new Set(['a', 'and', 'for', 'from', 'in', 'of', 'the', 'to', 'vs', 'with'])

const formatWord = (word: string, isFirst: boolean): string => {
  const override = WORD_OVERRIDES[word]
  if (override) return override
  if (!isFirst && LOWERCASE_WORDS.has(word)) return word
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const routeLabel = (route: string): string => {
  if (!route) return 'Home'
  return route
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((word, index) => formatWord(word, index === 0))
        .join(' ')
    )
    .join(' / ')
}

export const routeUrl = (route: string): string =>
  route ? `${siteMetadata.siteUrl}/${route}/` : `${siteMetadata.siteUrl}/`

const MD_SUFFIX_HINT = 'Append `.md` to any URL below for a markdown version of the page.'

export const buildRoutesSitemapMarkdown = (title: string, routes: readonly string[]): string =>
  [
    `# ${title}`,
    '',
    MD_SUFFIX_HINT,
    '',
    routes.map((route) => `- [${routeLabel(route)}](${routeUrl(route)})`).join('\n'),
    '',
  ].join('\n')

type CmsSitemapEntry = { title?: string; path: string; excludeFromSitemap?: boolean }
type CmsSitemapCollection = { data: CmsSitemapEntry[] } | undefined

export type CmsContentForSitemap = {
  blogs: CmsSitemapCollection
  guides: CmsSitemapCollection
  faqs: CmsSitemapCollection
  caseStudies: CmsSitemapCollection
  opentelemetries: CmsSitemapCollection
  comparisons: CmsSitemapCollection
}

export const buildCmsContentSitemapMarkdown = (content: CmsContentForSitemap): string => {
  const collections: Record<
    (typeof CMS_SITEMAP_SECTIONS)[number]['section'],
    CmsSitemapCollection
  > = {
    blog: content.blogs,
    guides: content.guides,
    faqs: content.faqs,
    customers: content.caseStudies,
    opentelemetry: content.opentelemetries,
    comparisons: content.comparisons,
  }

  const sections = CMS_SITEMAP_SECTIONS.map(({ section, label }) => {
    const entryLines = (collections[section]?.data ?? [])
      .filter((entry) => !entry.excludeFromSitemap)
      .sort((a, b) => a.path.localeCompare(b.path))
      .map(
        (entry) =>
          `- [${entry.title || entry.path}](${siteMetadata.siteUrl}/${section}${entry.path}/)`
      )

    const indexLine = `- [${label}](${routeUrl(section)})`
    return [`## ${label}`, '', [indexLine, ...entryLines].join('\n')].join('\n')
  })

  return [
    '# SigNoz Blog & Content Sitemap',
    '',
    MD_SUFFIX_HINT,
    '',
    sections.join('\n\n'),
    '',
  ].join('\n')
}
