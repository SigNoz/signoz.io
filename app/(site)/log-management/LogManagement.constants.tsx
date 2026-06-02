import {
  Atom,
  Bell,
  Cloud,
  Coins,
  DatabaseZap,
  EyeOff,
  FileJson,
  GitBranch,
  Gauge,
  Search,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'
import type {
  ComparisonTableRow,
  ComparisonTableProps,
} from '@/shared/components/molecules/FeaturePages/ComparisonTable'

type ComparisonVendorKey = 'signoz' | 'saas' | 'elk' | 'splunk'

export const CARDS = [
  {
    icon: <Atom className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'OpenTelemetry-native log collection and processing',
    description:
      'Collect logs with OpenTelemetry-native workflows and keep instrumentation vendor-neutral as your observability stack evolves.',
  },
  {
    icon: <DatabaseZap className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Powered by a columnar datastore for fast log analytics',
    description:
      'Search high-volume logs, run aggregations, and build dashboards on a datastore designed for analytics-heavy workloads.',
  },
  {
    icon: <GitBranch className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Correlate logs, metrics, and traces in one place',
    description:
      'Move from logs to traces, from infrastructure metrics to related logs, and from alerts to debugging context in the same product.',
  },
  {
    icon: <Cloud className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Cloud or self-hosted deployment options',
    description:
      'Start quickly with SigNoz Cloud or choose a self-hosted deployment when your team needs tighter control over data boundaries.',
  },
]

export const INGESTION_CARDS = [
  {
    icon: <Cloud className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Collect logs from cloud, containers, databases, and applications',
    description:
      'Centralize application, infrastructure, Kubernetes, Docker, cloud, and database logs in SigNoz for a single debugging workflow.',
  },
  {
    icon: <Atom className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Use OpenTelemetry Collector or existing agents',
    description:
      'Send logs through OpenTelemetry Collector, language SDKs, or existing collection agents without locking collection to one vendor.',
  },
  {
    icon: <Server className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Connect Kubernetes, Docker, AWS, GCP, Azure, Fluent Bit, Fluentd, and Logstash',
    description:
      'Use common collectors and platform integrations to get log data flowing without building a custom ingestion layer.',
  },
]

export const PROCESSING_CARDS = [
  {
    icon: <Workflow className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Extract attributes from unstructured logs',
    description:
      'Turn raw log lines into structured attributes so teams can filter, group, and investigate by service, endpoint, customer, or environment.',
  },
  {
    icon: <FileJson className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Normalize JSON and log fields before storage',
    description:
      'Flatten nested JSON, standardize fields, and make important log attributes easier to query before data is stored.',
  },
  {
    icon: <EyeOff className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Mask sensitive data in log pipelines',
    description:
      'Reduce risk by masking sensitive values during processing instead of waiting until data is already stored and indexed.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Build processing pipelines visually',
    description:
      'Use a visual pipeline builder with processors for JSON parsing, regex, Grok patterns, field transforms, and sensitive-data masking.',
  },
]

export const QUERY_BUILDER_CARDS = [
  {
    icon: <Search className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Use a visual query builder for log analysis',
    description:
      'Build complex filters with AND/OR logic using auto-complete for attributes and values from your actual log data.',
  },
  {
    icon: <Search className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Filter logs with attributes, regex, LIKE, IN, and JSON fields',
    description:
      'Query service attributes, full-text log bodies, regex patterns, LIKE and IN filters, and nested JSON fields with dot notation.',
  },
  {
    icon: <Gauge className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Run aggregations across high-volume log data',
    description:
      'Run COUNT, SUM, AVG, P50, P95, and P99 across large log volumes, then group results by multiple dimensions.',
  },
  {
    icon: <Bell className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Create dashboards from log queries',
    description:
      'Turn log queries into dashboard panels, alert conditions, or CSV exports so recurring investigations become repeatable workflows.',
  },
]

export const COST_CONTROL_CARDS = [
  {
    icon: <Gauge className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Set hot retention for frequently queried logs',
    description:
      'Tune hot retention for recent, high-value logs that teams query during active debugging and incident response.',
  },
  {
    icon: <DatabaseZap className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Keep older logs queryable in cold storage',
    description:
      'Use tiered storage to keep older log data available for compliance and longer-range investigations while controlling cost.',
  },
  {
    icon: <Cloud className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Choose SigNoz Cloud or self-hosted deployment',
    description:
      'Use SigNoz Cloud for speed, or self-host when your organization needs more control over infrastructure and data boundaries.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Use data residency options where required',
    description:
      'Match deployment and region choices to internal security, compliance, and data residency requirements.',
  },
  {
    icon: <Coins className="h-5 w-5 text-signoz_vanilla-100" />,
    title: 'Avoid surprise bills with transparent usage-based pricing',
    description:
      'Pay by telemetry usage with no user seat limits or host-based pricing surprises on the log management workflow.',
  },
]

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: 'Move from infrastructure metrics to related logs',
    description: 'Jump from a metric spike to the logs that explain what changed.',
    image: '/img/log-management/Logs-to-Metrics.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Jump from logs to traces during incident debugging',
    description: 'Use trace IDs to move from a log entry to the complete request path.',
    image: '/img/log-management/Logs-to-Trace.png',
    isActive: false,
  },
  {
    id: 2,
    title: 'Investigate alerts with contextual log data',
    description: 'Go from APM alerts and service symptoms to related logs for root-cause analysis.',
    image: '/img/log-management/APM-to-Logs.png',
    isActive: false,
  },
]

export const COMPARISON_VENDORS: ComparisonTableProps<ComparisonVendorKey>['vendors'] = [
  { key: 'signoz', label: 'SigNoz', className: 'min-w-64' },
  { key: 'saas', label: 'Datadog and New Relic', className: 'min-w-64' },
  { key: 'elk', label: 'ELK and OpenSearch', className: 'min-w-64' },
  { key: 'splunk', label: 'Splunk', className: 'min-w-64' },
]

export const COMPARISON_ROWS: ComparisonTableRow<ComparisonVendorKey>[] = [
  {
    feature: 'Open standards',
    vendors: {
      signoz: {
        supported: true,
        text: 'OpenTelemetry-native collection, docs, and correlation workflows.',
      },
      saas: {
        supported: 'partial',
        text: 'Supports OpenTelemetry, but proprietary agents often remain the primary path.',
      },
      elk: {
        supported: 'partial',
        text: 'Flexible ingest ecosystem, but OpenTelemetry correlation is not the core workflow.',
      },
      splunk: {
        supported: 'partial',
        text: 'Broad ingest options, with OpenTelemetry usually one input among many.',
      },
    },
  },
  {
    feature: 'Deployment flexibility',
    vendors: {
      signoz: {
        supported: true,
        text: 'Cloud, self-hosted, and data-boundary-friendly deployment choices.',
      },
      saas: {
        supported: 'partial',
        text: 'Managed SaaS-first experience with fewer self-hosted control options.',
      },
      elk: {
        supported: true,
        text: 'Self-hosted and managed options, with more operational ownership at scale.',
      },
      splunk: {
        supported: true,
        text: 'Cloud and enterprise deployment options, usually with heavier enterprise setup.',
      },
    },
  },
  {
    feature: 'Logs, metrics, and traces correlation',
    vendors: {
      signoz: {
        supported: true,
        text: 'Built to move between logs, traces, metrics, dashboards, and alerts.',
      },
      saas: {
        supported: true,
        text: 'Strong cross-signal products, with proprietary workflows and billing models.',
      },
      elk: {
        supported: 'partial',
        text: 'Excellent log search, but cross-signal debugging often needs more setup.',
      },
      splunk: {
        supported: 'partial',
        text: 'Powerful search and SIEM workflows, with observability correlation depending on product mix.',
      },
    },
  },
  {
    feature: 'Cost control',
    vendors: {
      signoz: {
        supported: true,
        text: 'Transparent usage-based pricing with no user seat or host-based pricing for logs.',
      },
      saas: {
        supported: 'partial',
        text: 'Powerful managed products, but costs can grow across users, hosts, data, and retention.',
      },
      elk: {
        supported: 'partial',
        text: 'Can be cost-effective when self-managed, but infrastructure and operations add up.',
      },
      splunk: {
        supported: 'partial',
        text: 'Enterprise-grade capabilities, with pricing often becoming a key evaluation factor.',
      },
    },
  },
  {
    feature: 'Query performance and analytics',
    vendors: {
      signoz: {
        supported: true,
        text: 'Columnar datastore-backed search, filters, aggregations, dashboards, and alerts.',
      },
      saas: {
        supported: true,
        text: 'Strong managed query experiences, usually tied to vendor-specific query languages.',
      },
      elk: {
        supported: true,
        text: 'Deep full-text search and analytics, with careful index and cluster management.',
      },
      splunk: {
        supported: true,
        text: 'Mature SPL-based log analytics for teams that invest in the query language.',
      },
    },
  },
]

export const COMPARISON_LINKS = [
  {
    href: '/blog/best-open-source-log-management-tools/',
    text: 'Open source log management tools',
  },
  {
    href: '/comparisons/log-analysis-tools/',
    text: 'Best log analysis tools',
  },
  {
    href: '/datadog-alternative/',
    text: 'SigNoz vs Datadog',
  },
  {
    href: '/newrelic-alternative/',
    text: 'SigNoz vs New Relic',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'What is log management software?',
    answer:
      'Log management software collects, processes, stores, searches, and analyzes logs from applications, infrastructure, cloud services, containers, and databases. SigNoz adds OpenTelemetry-native collection and correlation with metrics and traces.',
  },
  {
    question: 'What is the difference between log management and log analytics?',
    answer:
      'Log management covers the full lifecycle of collecting, processing, storing, retaining, and governing logs. Log analytics focuses on querying, aggregating, visualizing, and investigating log data after it has been collected.',
  },
  {
    question: 'Is SigNoz an OpenTelemetry-native log management platform?',
    answer:
      'Yes. SigNoz is built around OpenTelemetry-native collection and observability workflows, so teams can collect logs with open standards and correlate them with traces, metrics, dashboards, and alerts.',
  },
  {
    question: 'Can SigNoz correlate logs with metrics and traces?',
    answer:
      'Yes. SigNoz lets teams jump from logs to traces, from infrastructure metrics to related logs, and from alerts to contextual log data to speed up root-cause analysis.',
  },
  {
    question: 'How does SigNoz compare with Datadog and New Relic for log management?',
    answer:
      'SigNoz focuses on OpenTelemetry-native collection, unified logs, metrics, and traces, flexible Cloud or self-hosted deployment, and transparent usage-based pricing. Datadog and New Relic provide broad managed platforms, but often rely more heavily on proprietary agents and pricing models.',
  },
]
