import { Atom, Coins, DatabaseZap } from 'lucide-react'
import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const LOG_MANAGEMENT_HEADER_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Log Management Hero Start Trial',
      clickLocation: 'Log Management Hero',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Management Hero Docs',
      clickLocation: 'Log Management Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const CARDS = [
  {
    icon: <Atom />,
    title: 'Advanced Query Builder',
    description: 'Build ClickHouse queries visually with auto-complete for log attributes.',
  },
  {
    icon: <Coins />,
    title: 'Transparent Pricing',
    description: 'Starts at $0.30 per GB with no user seat limitations or hidden retention fees.',
  },
  {
    icon: <DatabaseZap />,
    title: 'Smart Tiered Storage',
    description:
      'Configure hot retention periods to balance query performance with storage costs for compliance.',
  },
]

export const INGEST_LOGS_PANEL = {
  title: 'Ingest logs from anywhere',
  description:
    'OTel-native architecture supports extensive data source integration through multiple collection patterns, eliminating vendor lock-in while providing superior correlation capabilities.',
  button: {
    text: 'Read Documentation',
    href: '/docs/logs-management/send-logs-to-signoz/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Ingest Logs Read Docs Button',
      clickLocation: 'Log Management Ingestion Section',
      clickText: 'Read Documentation',
    },
  },
  className: 'py-6',
}

export const PROCESS_LOGS_PANEL = {
  title: 'Parse and transform logs before storage',
  description:
    "Create processing pipelines through a visual UI to parse unstructured logs, extract attributes, flatten nested JSON, and mask sensitive data. Apply processors like Grok patterns, regex, and JSON parsers to transform logs before they're stored and indexed.",
  button: {
    text: 'Read Documentation',
    href: '/docs/logs-pipelines/concepts/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Processing Read Docs Button',
      clickLocation: 'Log Management Processing Section',
      clickText: 'Read Documentation',
    },
  },
  image: '/img/log-management/process-logs.png',
  imageAlt: 'Log Processing',
  className: 'py-6',
}

export const LOG_CORRELATION_SHOWCASE = {
  title: 'Automatic correlation between logs, metrics, and traces',
  description:
    'Use OpenTelemetry semantic conventions to automatically link logs with traces and metrics. Jump from APM traces to their related logs, from infrastructure metrics to log context, and from alerts to root cause with consistent trace ID correlation.',
}

export const QUERY_BUILDER_CARDS = [
  {
    icon: <Atom />,
    title: 'Visual Query Builder',
    description:
      'Build complex filters with AND/OR logic using auto-complete for attributes and values. Supports operators like CONTAINS, REGEX, IN, and LIKE with real-time suggestions from your actual log data.',
  },
  {
    icon: <Atom />,
    title: 'Aggregations & Grouping',
    description:
      'Run COUNT, SUM, AVG, P50/P95/P99 across billions of logs. Group by multiple dimensions simultaneously and filter results with HAVING clauses for advanced analysis.',
  },
  {
    icon: <Atom />,
    title: 'JSON & Dashboard Creation',
    description:
      'Query nested JSON fields using dot notation like `attributes.user.id`. Create dashboard panels directly from query results or export to CSV for external analysis.',
  },
]

export const LOG_QUERY_BUILDER_SHOWCASE = {
  title: 'Build ClickHouse queries visually with auto-complete for log attributes',
  description:
    'Run aggregations grouped by multiple dimensions, filter with regex and LIKE patterns, query nested JSON with dot notation, and work directly with the generated SQL. Create dashboards directly from query results or export to CSV for analysis.',
  button: {
    text: 'Read Documentation',
    href: '/docs/userguide/query-builder-v5/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Visual Query Builder Read Docs Button',
      clickLocation: 'Log Management Query Builder Section',
      clickText: 'Read Documentation',
    },
  },
}

export const LOG_QUERY_BUILDER_IMAGE = {
  src: '/img/log-management/logs-explorer-qb.png',
  alt: 'Query Builder',
}

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: 'Logs → Metrics',
    description: 'Jump from logs to relevant service metrics.',
    image: '/img/log-management/Logs-to-Metrics.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Logs → Traces',
    description: 'Find traces using trace IDs in logs.',
    image: '/img/log-management/Logs-to-Trace.png',
    isActive: false,
  },
  {
    id: 2,
    title: 'APM → Logs',
    description: 'Go from APM metrics to related logs.',
    image: '/img/log-management/APM-to-Logs.png',
    isActive: false,
  },
]
