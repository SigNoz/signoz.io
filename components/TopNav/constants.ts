import { Brain, Cone, Logs, ShieldPlus, WorkflowIcon } from 'lucide-react'
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
  icon: string | React.ReactNode
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

export const productDropdownItems: ProductItem[] = [
  {
    key: 'apm',
    url: '/application-performance-monitoring',
    icon: '/img/index_features/bar-chart-2_feature.svg',
    description: 'Monitor your applications',
    name: 'APM',
    order: 1,
  },
  {
    key: 'Alerts',
    url: '/alerts-management',
    icon: '/img/index_features/concierge-bell_feature.svg',
    description: 'Multiple thresholds and dynamic routing at scale',
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'external-apis',
    url: '/external-apis/',
    icon: React.createElement(WorkflowIcon, { className: 'text-signoz_robin-400', size: 20 }),
    description: 'Track third-party API performance',
    name: 'External API Monitoring',
    order: 9,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: '/img/index_features/drafting-compass_feature.svg',
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: '/img/index_features/layout-grid_feature.svg',
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'messaging-queues',
    url: '/docs/messaging-queues/overview/',
    icon: React.createElement(Logs, { className: 'text-signoz_robin-400', size: 20 }),
    description: 'Monitor Kafka, Celery lag & throughput',
    name: 'Messaging Queues',
    order: 10,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: '/img/index_features/logs_feature.svg',
    description: 'Fast queries with columnar database',
    name: 'Log Management',
    order: 3,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring',
    icon: '/img/index_features/bug_feature.svg',
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 7,
  },
  {
    key: 'llm-observability',
    url: '/llm-observability/',
    icon: React.createElement(Brain, { className: 'text-signoz_robin-400', size: 20 }),
    description: 'Monitor AI and LLM workflows',
    name: 'LLM Observability',
    order: 11,
  },
  {
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: '/img/index_features/boxes.svg',
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'trace-funnels',
    url: '/trace-funnels/',
    icon: React.createElement(Cone, { className: 'text-signoz_sakura-400', size: 20 }),
    description: 'Track drop-offs in multi-step flows',
    name: 'Trace Funnels',
    order: 8,
  },
  {
    key: 'observability-for-ai-native-companies',
    url: '/observability-for-ai-native-companies/',
    icon: React.createElement(ShieldPlus, { className: 'text-signoz_robin-400', size: 20 }),
    description: 'Full-stack monitoring for AI applications',
    name: 'AI Observability',
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
