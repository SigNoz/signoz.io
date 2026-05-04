import { Brain, Cone, Logs, ShieldPlus, WorkflowIcon } from 'lucide-react'
import React from 'react'
import BarChartFeatureIcon from '@/public/img/index_features/bar-chart-2_feature.svg'
import ConciergeBellFeatureIcon from '@/public/img/index_features/concierge-bell_feature.svg'
import DraftingCompassFeatureIcon from '@/public/img/index_features/drafting-compass_feature.svg'
import LayoutGridFeatureIcon from '@/public/img/index_features/layout-grid_feature.svg'
import LogsFeatureIcon from '@/public/img/index_features/logs_feature.svg'
import BugFeatureIcon from '@/public/img/index_features/bug_feature.svg'
import BoxesIcon from '@/public/img/index_features/boxes.svg'

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
}

export interface ResourceItem {
  key: string
  url: string
  description: string
  name: string
}

const PRODUCT_ICON_CLASS = 'h-5 w-5 shrink-0'

export const productDropdownItems: ProductItem[] = [
  {
    key: 'apm',
    url: '/application-performance-monitoring',
    icon: <BarChartFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor your applications',
    name: 'APM',
    order: 1,
  },
  {
    key: 'Alerts',
    url: '/alerts-management',
    icon: <ConciergeBellFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Multiple thresholds and dynamic routing at scale',
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'external-apis',
    url: '/external-apis/',
    icon: (
      <WorkflowIcon className={`${PRODUCT_ICON_CLASS} text-signoz_robin-400`} aria-hidden="true" />
    ),
    description: 'Track third-party API performance',
    name: 'External API Monitoring',
    order: 9,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: <DraftingCompassFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: <LayoutGridFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'messaging-queues',
    url: '/docs/messaging-queues/overview/',
    icon: <Logs className={`${PRODUCT_ICON_CLASS} text-signoz_robin-400`} aria-hidden="true" />,
    description: 'Monitor Kafka, Celery lag & throughput',
    name: 'Messaging Queues',
    order: 10,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: <LogsFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Fast queries with columnar database',
    name: 'Log Management',
    order: 3,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring',
    icon: <BugFeatureIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 7,
  },
  {
    key: 'llm-observability',
    url: '/llm-observability/',
    icon: <Brain className={`${PRODUCT_ICON_CLASS} text-signoz_robin-400`} aria-hidden="true" />,
    description: 'Monitor AI and LLM workflows',
    name: 'LLM Observability',
    order: 11,
  },
  {
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: <BoxesIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'trace-funnels',
    url: '/trace-funnels/',
    icon: <Cone className={`${PRODUCT_ICON_CLASS} text-signoz_sakura-400`} aria-hidden="true" />,
    description: 'Track drop-offs in multi-step flows',
    name: 'Trace Funnels',
    order: 8,
  },
  {
    key: 'agent-native-observability',
    url: '/agent-native-observability/',
    icon: (
      <ShieldPlus className={`${PRODUCT_ICON_CLASS} text-signoz_robin-400`} aria-hidden="true" />
    ),
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
  },
  {
    key: 'signozvsgrafana',
    url: '/product-comparison/signoz-vs-grafana/',
    name: 'SigNoz vs Grafana',
  },
  {
    key: 'signozvsnewrelic',
    url: '/product-comparison/signoz-vs-newrelic/',
    name: 'SigNoz vs New Relic',
  },
  {
    key: 'cloudwatch-alternative',
    url: '/cloudwatch-alternative/',
    name: 'SigNoz vs CloudWatch',
  },
  {
    key: 'clickstack-alternative',
    url: '/clickstack-alternative/',
    name: 'SigNoz vs ClickStack',
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
  WHY_SIGNOZ: 900,
  DOCS: 960,
  RESOURCES: 1020,
  PRICING: 1100,
  GITHUB_STARS: 1180,
  FULL_NAV: 1280,
} as const

export const POPOVER_CONTENT_CLASS =
  "z-50 min-w-fit origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] p-0 shadow-[0_12px_48px_rgba(0,0,0,0.55)] outline-none will-change-transform before:absolute before:-top-[4px] before:left-0 before:right-0 before:h-[4px] before:content-[''] data-[state=closed]:animate-nav-popover-out data-[state=open]:animate-nav-popover-in motion-reduce:animate-none"

export const SECTION_HEADING_CLASS =
  'text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100'
