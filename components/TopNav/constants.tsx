import {
  BarChart2,
  Boxes,
  Brain,
  Bug,
  Cone,
  ConciergeBell,
  DraftingCompass,
  LayoutGrid,
  Logs,
  ScrollText,
  ShieldPlus,
  WorkflowIcon,
} from 'lucide-react'
import React from 'react'

export enum TABS {
  BLOG = 'blog-tab',
  COMPARISONS = 'comparisons-tab',
  GUIDES = 'guides-tab',
  OPENTELEMETRY = 'openTelemetry-tab',
}

export enum TAB_PATHNAMES {
  BLOG = '/blog',
  COMPARISONS = '/comparisons',
  GUIDES = '/guides',
  OPENTELEMETRY = '/opentelemetry',
}

export interface ProductItem {
  key: string
  url: string
  icon: React.ReactNode
  description: string
  name: string
  order: number
}

export interface ComparisonItem {
  key: string
  url: string
  name: string
  description: string
}

export interface ResourceItem {
  key: string
  url: string
  description: string
  name: string
}

const PRODUCT_ICON_CLASS = 'h-4 w-4 shrink-0 pt-0.5 text-signoz_vanilla-100'

export const productDropdownItems: ProductItem[] = [
  {
    key: 'apm',
    url: '/application-performance-monitoring',
    icon: <BarChart2 className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor your applications',
    name: 'APM',
    order: 1,
  },
  {
    key: 'Alerts',
    url: '/alerts-management',
    icon: <ConciergeBell className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Multiple thresholds and dynamic routing at scale',
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'external-apis',
    url: '/external-apis/',
    icon: <WorkflowIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track third-party API performance',
    name: 'External API Monitoring',
    order: 9,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: <DraftingCompass className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: <LayoutGrid className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'messaging-queues',
    url: '/docs/messaging-queues/overview/',
    icon: <Logs className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor Kafka, Celery lag & throughput',
    name: 'Messaging Queues',
    order: 10,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: <ScrollText className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Fast queries with columnar database',
    name: 'Log Management',
    order: 3,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring',
    icon: <Bug className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 7,
  },
  {
    key: 'llm-observability',
    url: '/llm-observability/',
    icon: <Brain className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor AI and LLM workflows',
    name: 'LLM Observability',
    order: 11,
  },
  {
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: <Boxes className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'trace-funnels',
    url: '/trace-funnels/',
    icon: <Cone className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track drop-offs in multi-step flows',
    name: 'Trace Funnels',
    order: 8,
  },
  {
    key: 'agent-native-observability',
    url: '/agent-native-observability/',
    icon: <ShieldPlus className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Observability in your Coding Agents via MCP',
    name: 'Agent Native Observability',
    order: 12,
  },
]

export const comparisonItems: ComparisonItem[] = [
  {
    key: 'signozvsdatadog',
    url: '/product-comparison/signoz-vs-datadog/',
    name: 'SigNoz vs DataDog',
    description: 'Save up to 80% on monitoring costs',
  },
  {
    key: 'signozvsgrafana',
    url: '/product-comparison/signoz-vs-grafana/',
    name: 'SigNoz vs Grafana',
    description: 'One platform replaces the LGTM stack',
  },
  {
    key: 'signozvsnewrelic',
    url: '/product-comparison/signoz-vs-newrelic/',
    name: 'SigNoz vs New Relic',
    description: 'No user-based pricing surprises',
  },
  {
    key: 'cloudwatch-alternative',
    url: '/cloudwatch-alternative/',
    name: 'SigNoz vs CloudWatch',
    description: 'Unified view, transparent billing',
  },
  {
    key: 'clickstack-alternative',
    url: '/clickstack-alternative/',
    name: 'SigNoz vs ClickStack',
    description: 'Ingest-based pricing, no per-query costs',
  },
]

export interface MigrationItem {
  key: string
  url: string
  name: string
  description: string
}

export const migrationItems: MigrationItem[] = [
  {
    key: 'migrate-datadog',
    url: '/docs/migration/migrate-from-datadog-to-signoz/',
    name: 'Migrate from Datadog',
    description: 'Metrics, traces, logs, dashboards & alerts',
  },
  {
    key: 'migrate-grafana',
    url: '/docs/migration/migrate-from-grafana-to-signoz/',
    name: 'Migrate from Grafana',
    description: 'Replace the LGTM stack end-to-end',
  },
  {
    key: 'migrate-newrelic',
    url: '/docs/migration/migrate-from-newrelic-to-signoz/',
    name: 'Migrate from New Relic',
    description: 'Move to open-source, keep full visibility',
  },
  {
    key: 'migrate-elk',
    url: '/docs/migration/migrate-from-elk-to-signoz/',
    name: 'Migrate from ELK',
    description: 'Simplify log management with ClickHouse',
  },
  {
    key: 'migrate-honeycomb',
    url: '/docs/migration/migrate-from-honeycomb-to-signoz/',
    name: 'Migrate from Honeycomb',
    description: 'Full observability with cost control',
  },
]

export const productDropdownItemsSorted = [...productDropdownItems].sort(
  (a, b) => a.order - b.order
)

export const resourcesDropdownItems = {
  learn: [
    {
      key: 'blog',
      url: '/blog',
      description: 'News, ideas, and insights on observability',
      name: 'Blog',
    },
    {
      key: 'comparisons',
      url: '/comparisons',
      description: 'Compare observability tools',
      name: 'Comparisons',
    },
    {
      key: 'guides',
      url: '/guides',
      description: 'How-to guides and tutorials',
      name: 'Guides',
    },
    {
      key: 'opentelemetry',
      url: '/opentelemetry',
      description: 'OpenTelemetry concepts and its use cases',
      name: 'OpenTelemetry',
    },
  ] as ResourceItem[],
  explore: [
    {
      key: 'faqs',
      url: '/faqs/',
      description: 'Frequently asked questions about SigNoz',
      name: 'Product FAQs',
    },
    {
      key: 'migrations',
      url: '/docs/migration/migrate-from-datadog-to-signoz/',
      description: 'Guides for migrating to SigNoz',
      name: 'Migrations',
    },
    {
      key: 'dashboards',
      url: '/docs/dashboards/dashboard-templates/overview/',
      description: 'Explore dashboard templates for your use cases',
      name: 'Dashboard Templates',
    },
  ] as ResourceItem[],
}

export const NAV_BREAKPOINTS = {
  SIGN_IN: 640,
  PRODUCT: 840,
  DOCS: 900,
  RESOURCES: 960,
  COMPARE_SIGNOZ: 1040,
  PRICING: 1140,
  GITHUB_STARS: 1220,
  FULL_NAV: 1320,
} as const

export const POPOVER_CONTENT_CLASS =
  "z-50 min-w-fit origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] p-0 shadow-[0_12px_48px_rgba(0,0,0,0.55)] outline-none will-change-transform before:absolute before:-top-[4px] before:left-0 before:right-0 before:h-[4px] before:content-[''] data-[state=closed]:animate-nav-popover-out data-[state=open]:animate-nav-popover-in motion-reduce:animate-none"

export const SECTION_HEADING_CLASS =
  'text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100'
