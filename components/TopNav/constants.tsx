import {
  Activity,
  ArrowRightLeft,
  BarChart2,
  Boxes,
  Brain,
  Bug,
  Cloud,
  Cone,
  ConciergeBell,
  Container,
  DollarSign,
  DraftingCompass,
  Headphones,
  Layers,
  LayoutGrid,
  Logs,
  Puzzle,
  Scaling,
  ScrollText,
  Server,
  Shield,
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

export interface ResourceItem {
  key: string
  url: string
  description: string
  name: string
}

const PRODUCT_ICON_CLASS = 'h-4 w-4 shrink-0 pt-0.5 text-signoz_vanilla-100'

export const productDropdownItems: ProductItem[] = [
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing/',
    icon: <DraftingCompass className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 1,
  },
  {
    key: 'LogManagement',
    url: '/log-management/',
    icon: <ScrollText className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Fast queries with columnar database',
    name: 'Log Management',
    order: 2,
  },
  {
    key: 'Alerts',
    url: '/alerts-management/',
    icon: <ConciergeBell className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Multiple thresholds and dynamic routing at scale',
    name: 'Alerts',
    order: 3,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards/',
    icon: <LayoutGrid className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 4,
  },
  {
    key: 'trace-funnels',
    url: '/trace-funnels/',
    icon: <Cone className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track drop-offs in multi-step flows',
    name: 'Trace Funnels - OTel Native',
    order: 5,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring/',
    icon: <Bug className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 6,
  },
  {
    key: 'messaging-queues',
    url: '/docs/messaging-queues/overview/',
    icon: <Logs className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor Kafka, Celery lag & throughput',
    name: 'Messaging Queues - OTel Native',
    order: 7,
  },
]

export const productDropdownItemsSorted = [...productDropdownItems].sort(
  (a, b) => a.order - b.order
)

export const useCasesDropdownItems: ProductItem[] = [
  {
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: <Boxes className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor servers, containers, and cloud resources',
    name: 'Infrastructure Monitoring',
    order: 1,
  },
  {
    key: 'apm',
    url: '/application-performance-monitoring/',
    icon: <BarChart2 className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'End-to-end application performance visibility',
    name: 'APM',
    order: 2,
  },
  {
    key: 'llm-observability',
    url: '/llm-observability/',
    icon: <Brain className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor AI and LLM workflows',
    name: 'LLM Observability',
    order: 3,
  },
  {
    key: 'agent-native-observability',
    url: '/agent-native-observability/',
    icon: <ShieldPlus className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Observability for your coding agents via MCP',
    name: 'Agent Native Observability',
    order: 4,
  },
  {
    key: 'external-apis',
    url: '/external-apis/',
    icon: <WorkflowIcon className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Track third-party API performance',
    name: 'External API Monitoring',
    order: 5,
  },
  {
    key: 'site-reliability',
    url: '/sre-skill-decay-index/',
    icon: <Activity className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Measure and improve system reliability',
    name: 'Site Reliability',
    order: 6,
  },
  {
    key: 'full-stack-observability',
    url: '/unified-observability/',
    icon: <Layers className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Unified view across your entire stack',
    name: 'Full Stack Observability',
    order: 7,
  },
  {
    key: 'gcp-monitoring',
    url: '/docs/gcp-monitoring/cloud-monitoring/',
    icon: <Cloud className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor GCP services with OpenTelemetry',
    name: 'Google Cloud Monitoring',
    order: 8,
  },
  {
    key: 'aws-monitoring',
    url: '/docs/aws-monitoring/overview/',
    icon: <Server className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor AWS services with OpenTelemetry',
    name: 'AWS Monitoring',
    order: 9,
  },
  {
    key: 'kubernetes-monitoring',
    url: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-cluster/',
    icon: <Container className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Monitor Kubernetes clusters and workloads',
    name: 'Kubernetes Monitoring',
    order: 10,
  },
]

export const useCasesDropdownItemsSorted = [...useCasesDropdownItems].sort(
  (a, b) => a.order - b.order
)

export const platformDropdownItems: ProductItem[] = [
  {
    key: 'security-compliance',
    url: '/security/',
    icon: <Shield className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Enterprise-grade security controls',
    name: 'Security & Compliance',
    order: 1,
  },
  {
    key: 'scale-reliability',
    url: '/faqs/can-signoz-handle-large-scale-production-environments-effectively/',
    icon: <Scaling className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Built to handle massive scale',
    name: 'Scale & Reliability',
    order: 2,
  },
  {
    key: 'support',
    url: '/support/',
    icon: <Headphones className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Get help from the SigNoz team',
    name: 'Support',
    order: 3,
  },
  {
    key: 'integrations',
    url: '/docs/integrations/',
    icon: <Puzzle className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Connect with your existing tools',
    name: 'Integrations',
    order: 4,
  },
  {
    key: 'migrate-to-otel',
    url: '/docs/migration/migrate-from-datadog-to-signoz/',
    icon: <ArrowRightLeft className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Move from proprietary agents to OpenTelemetry',
    name: 'Migrate to OTel',
    order: 5,
  },
  {
    key: 'tco',
    url: '/why-signoz/',
    icon: <DollarSign className={PRODUCT_ICON_CLASS} aria-hidden="true" />,
    description: 'Optimize your total cost of ownership',
    name: 'TCO',
    order: 6,
  },
]

export const platformDropdownItemsSorted = [...platformDropdownItems].sort(
  (a, b) => a.order - b.order
)

export const resourcesDropdownItems = {
  learn: [
    {
      key: 'blog',
      url: '/blog/',
      description: 'News, ideas, and insights on observability',
      name: 'Blog',
    },
    {
      key: 'comparisons',
      url: '/comparisons/',
      description: 'Compare observability tools',
      name: 'Comparisons',
    },
    {
      key: 'guides',
      url: '/guides/',
      description: 'How-to guides and tutorials',
      name: 'Guides',
    },
    {
      key: 'opentelemetry',
      url: '/opentelemetry/',
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
  USE_CASES: 920,
  PLATFORM: 1000,
  DOCS: 1060,
  RESOURCES: 1120,
  PRICING: 1200,
  GITHUB_STARS: 1280,
} as const

export const POPOVER_CONTENT_CLASS =
  "z-50 min-w-fit origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] p-0 shadow-[0_12px_48px_rgba(0,0,0,0.55)] outline-none will-change-transform before:absolute before:-top-[4px] before:left-0 before:right-0 before:h-[4px] before:content-[''] data-[state=closed]:animate-nav-popover-out data-[state=open]:animate-nav-popover-in motion-reduce:animate-none"

export const SECTION_HEADING_CLASS =
  'text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100'
