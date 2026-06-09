import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection'

export const WHY_SIGNOZ_PANEL_1: SplitSectionPanel = {
  title: 'Easy-to-Use Query Builder with Advanced Capabilities',
  description:
    'SigNoz comes packed with a powerful query builder. Create queries on your metrics data quickly with an easy-to-use metrics query builder. The click-and-select query builder is made to write queries super easily without knowing any query language. You can combine multiple queries, apply functions, and add formulae to create really complex queries quickly.',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/query-builder/',
  },
}

export const WHY_SIGNOZ_PANEL_2: SplitSectionPanel = {
  title: 'Integrations for quick-start monitoring',
  description:
    'Use integrations to start monitoring popular technologies quickly. This enables you to create pre-built dashboards with important logs and metrics that can give you insights into performance. We currently have integrations for AWS services, Redis, MongoDB, Nginx, Clickhouse, Postgresql, and many more.',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/integrations/integrations-list/',
  },
}

export const WHY_SIGNOZ_PANEL_3: SplitSectionPanel = {
  title: 'Support for both delta and cumulative metrics',
  description: (
    <>
      <p>
        SigNoz supports both delta and cumulative metrics for covering all types of use cases in
        metrics monitoring. Delta metrics help to measure the change in a value over a specific
        interval, while cumulative metrics measure the total value accumulated over time. Send
        metrics from your application in any format and monitor them in SigNoz.
      </p>
      <p>
        Popular tools like Datadog only supports delta metrics, and Prometheus only supports
        cumulative metrics.
      </p>
    </>
  ),
}

export const WHY_SIGNOZ_PANEL_EMPTY: SplitSectionPanel = {
  title: '',
  description: '',
}

export const FEATURE_PANEL_SEND_METRICS: SplitSectionPanel = {
  title: 'Send metrics from any source',
  description:
    'Infrastructure, application, or database metrics - send all types of time-series data to SigNoz. Create charts and dashboards and add alerts to monitor them.',
}

export const FEATURE_PANEL_OTEL_SDK: SplitSectionPanel = {
  title: 'OpenTelemetry Metrics SDK Support',
  description:
    'SigNoz is OpenTelemetry-native, and it supports all kinds of metrics provided by OpenTelemetry metrics SDK. OpenTelemetry is a powerful observability framework using which you can correlate your application metrics with other signals like traces for richer context while debugging.',
}

export const FEATURE_PANEL_QUERY_BUILDER: SplitSectionPanel = {
  title: 'Powerful Query Builder',
  description:
    'Create queries on your metrics data quickly with an easy-to-use metrics query builder. Add multiple queries and combine those queries with formulae to create really complex queries quickly.',
  image: '/img/features/metrics/metrics-query-builder.webp',
  imageAlt: 'Powerful Query Builder',
}

export const FEATURE_PANEL_FUNCTIONS: SplitSectionPanel = {
  title: 'Support for Functions',
  description:
    'Metrics Query Builder comes packed with a lot of mathematical functions that you can apply directly to your queries.',
  image: '/img/features/metrics/support-for-functions-metrics.webp',
  imageAlt: 'Support for Functions',
}

export const FEATURE_PANEL_VISUALIZATIONS: SplitSectionPanel = {
  title: 'Rich Visualizations',
  description:
    'Create visualization that suits your needs and add them to a dashboard to create customized monitoring dashboards.',
  image: '/img/features/metrics/metrics-visualizations.webp',
  imageAlt: 'Rich Visualizations',
}

export const FEATURE_PANEL_DASHBOARDS: SplitSectionPanel = {
  title: 'Customized Dashboards',
  description:
    'Enhance your observability with flexible dashboards. Add panels, divide them into sections, go full-screen, and lock them for security. Use variables to create interactive dashboards, filtering charts by hostnames, environments, namespaces, and more.',
  image: '/img/features/metrics/hostmetrics-dashboards.webp',
  imageAlt: 'Customized Dashboards',
}

export const FEATURE_PANEL_CLICKHOUSE: SplitSectionPanel = {
  title: 'Advanced querying with ClickHouse Queries',
  description:
    'Your metrics data is stored in ClickHouse - and we give you the ability to write ClickHouse queries directly on your data. This enables in-depth analysis when you want to dig deeper into your data.',
  image: '/img/features/metrics/clickhouse-query-metrics.webp',
  imageAlt: 'Advanced querying with ClickHouse Queries',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/writing-clickhouse-traces-query/',
  },
}

export const FEATURE_PANEL_PROMQL: SplitSectionPanel = {
  title: 'PromQL Support',
  description:
    "If you're coming from the Prometheus ecosystem, don't worry. We support PromQL for querying data and ingesting Prometheus metrics format. ",
  image: '/img/features/metrics/metrics-promql.webp',
  imageAlt: 'PromQL Support',
}

export const FEATURE_PANEL_API: SplitSectionPanel = {
  title: 'Access to Metrics data through API',
  description:
    'Accessing metrics data through our Metrics API allows you to manage and analyze it efficiently. This opens up many opportunities for integration with other tools, programmatic analysis of metrics data, and customized data handling.',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/traces-management/trace-api/overview/',
  },
}

export const FEATURE_PANEL_NO_CUSTOM_PRICING: SplitSectionPanel = {
  title: 'No separate pricing for custom metrics',
  description:
    'All metrics are treated the same in SigNoz and are not charged separately (unlike some other popular observability tools). Metrics pricing in SigNoz is very cost-effective and you can scale your metrics monitoring with peace of mind.',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/pricing/',
  },
}
