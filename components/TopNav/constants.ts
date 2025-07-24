export enum TABS {
  BLOG = 'blog-tab',
  COMPARISONS = 'comparisons-tab',
  GUIDES = 'guides-tab',
  OPENTELEMETRY = 'openTelemetry-tab',
}

export enum TAB_PATHNAMES {
  BLOG = '/resource-center/blog',
  COMPARISONS = '/resource-center/comparisons',
  GUIDES = '/resource-center/guides',
  OPENTELEMETRY = '/resource-center/opentelemetry',
}

export interface ProductDropdownItem {
  key: string;
  url: string;
  icon?: string;
  description?: string;
  name: string;
  order?: number;
}
export const productDropdownItems: ProductDropdownItem[] = [
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
    description: "Always know what's going on",
    name: 'Alerts',
    order: 5,
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
    key: 'LogManagement',
    url: '/log-management',
    icon: '/img/index_features/logs_feature.svg',
    description: 'Unlock key insights from logs',
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
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: '/img/index_features/boxes.svg',
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'ingest',
    url: '/blog/introducing-ingest-guard-feature/',
    icon: '/img/index_features/shield-plus.svg',
    description: 'Control your observability costs',
    name: 'Ingest Guard',
    order: 8,
  },
]

export const comparisionItems: ProductDropdownItem[] = [
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
]

// Sort the productDropdownItems based on the 'order' property
export const productDropdownItemsForMobile = [...productDropdownItems].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))

export const resourcesDropdownItems: { [key: string]: ProductDropdownItem[] } = {
  learn: [
    {
      key: 'blog',
      url: '/resource-center/blog',
      description: 'News, ideas, and insights on observability',
      name: 'Blog',
    },
    {
      key: 'comparisons',
      url: '/resource-center/comparisons',
      description: 'Compare observability tools',
      name: 'Comparisons',
    },
    {
      key: 'guides',
      url: '/resource-center/guides',
      description: 'How-to guides and tutorials',
      name: 'Guides',
    },
    {
      key: 'opentelemetry',
      url: '/resource-center/opentelemetry',
      description: 'OpenTelemetry concepts and its use cases',
      name: 'OpenTelemetry',
    },
  ],
  explore: [
    {
      key: 'faqs',
      url: '/faqs/',
      description: 'Frequently asked questions about SigNoz',
      name: 'Product FAQs',
    },
    {
      key: 'migrations',
      url: '/docs/migration/migrate-from-datadog/',
      description: 'Guides for migrating to SigNoz',
      name: 'Migrations',
    },
    {
      key: 'dashboards',
      url: '/docs/dashboards/dashboard-templates/overview/',
      description: 'Explore dashboard templates for your use cases',
      name: 'Dashboard Templates',
    },
  ],
}