import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'
import {
  Braces,
  Database,
  GitCompareArrows,
  Cloud,
  Search,
  SlidersHorizontal,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react'

export const WHY_SIGNOZ_CARDS = [
  {
    icon: <Braces size={20} />,
    title: 'OpenTelemetry-native collection and processing',
    description:
      'SigNoz collects and processes logs through OpenTelemetry, the open standard for telemetry. You instrument once and avoid proprietary agents and vendor lock-in.',
  },
  {
    icon: <Database size={20} />,
    title: 'Powered by ClickHouse for fast log analytics',
    description:
      'Logs are stored in ClickHouse, a columnar database built for large-scale analytics. Searches and aggregations stay fast even across high-volume data.',
  },
  {
    icon: <GitCompareArrows size={20} />,
    title: 'Correlate logs, metrics, and traces in one place',
    description:
      'All three signals share the same platform and the same trace IDs. You move from a log line to its trace or service metrics without switching tools.',
  },
  {
    icon: <Cloud size={20} />,
    title: 'Cloud or self-hosted deployment options',
    description:
      'Run the managed SigNoz Cloud or self-host the Apache 2.0 open source build. You can also mix both to fit your security and data residency needs.',
  },
]

export const QUERY_BUILDER_FEATURES = [
  {
    icon: <Search size={20} />,
    title: 'Visual query builder',
    description:
      'Build filters with AND and OR logic using auto-complete drawn from your real log attributes.',
  },
  {
    icon: <SlidersHorizontal size={20} />,
    title: 'Flexible filtering',
    description:
      'Filter with attributes, regex, LIKE, IN, and nested JSON fields using dot notation.',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Aggregations at scale',
    description:
      'Run COUNT, SUM, AVG, and P50, P95, P99 across billions of log lines and group by several dimensions at once.',
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: 'Dashboards from queries',
    description:
      'Turn any query into a dashboard panel or export the result to CSV for further analysis.',
  },
]

export const CORRELATION_STEPS = [
  {
    number: '01',
    label: 'Alert / metric spike',
    title: 'Investigate alerts with context',
    description:
      'An error-rate alert fires. Every alert links to the logs around the event, so you start with context instead of a blank search.',
    color: 'amber' as const,
  },
  {
    number: '02',
    label: 'Related logs',
    title: 'Metrics to related logs',
    description:
      'Spot a spike on an infrastructure or APM metric and pivot to the logs from that same service and time window.',
    color: 'cherry' as const,
  },
  {
    number: '03',
    label: 'Trace',
    title: 'Logs to traces',
    description:
      'Open a log line that carries a trace ID and jump straight to the full distributed trace for that request.',
    color: 'robin' as const,
  },
  {
    number: '04',
    label: 'Root cause',
    title: 'Trace IDs speed up RCA',
    description:
      'Shared trace IDs tie logs, traces, and metrics together, which shortens the path from symptom to cause.',
    color: 'forest' as const,
  },
]

export type VendorKey = 'signoz' | 'datadog' | 'newrelic' | 'elk' | 'splunk'

export const COMPARISON_VENDORS: { key: VendorKey; label: string; className?: string }[] = [
  { key: 'signoz', label: 'SigNoz', className: 'text-signoz_cherry-500' },
  { key: 'datadog', label: 'Datadog' },
  { key: 'newrelic', label: 'New Relic' },
  { key: 'elk', label: 'ELK / OpenSearch' },
  { key: 'splunk', label: 'Splunk' },
]

export const COMPARISON_ROWS: {
  feature: string
  vendors: Record<VendorKey, { supported?: boolean | 'partial'; text: string }>
}[] = [
  {
    feature: 'Open standards',
    vendors: {
      signoz: { supported: true, text: 'OpenTelemetry-native' },
      datadog: { supported: 'partial', text: 'Proprietary, partial OTel' },
      newrelic: { supported: 'partial', text: 'Proprietary, OTel ingest' },
      elk: { supported: 'partial', text: 'Open source, not OTel-native' },
      splunk: { supported: false, text: 'Proprietary' },
    },
  },
  {
    feature: 'Deployment flexibility',
    vendors: {
      signoz: { supported: true, text: 'Cloud and self-host' },
      datadog: { supported: false, text: 'SaaS only' },
      newrelic: { supported: false, text: 'SaaS only' },
      elk: { supported: true, text: 'Self-host or managed' },
      splunk: { supported: true, text: 'Self-host or cloud' },
    },
  },
  {
    feature: 'Correlation',
    vendors: {
      signoz: { supported: true, text: 'Logs, metrics, traces in one platform' },
      datadog: { supported: true, text: 'Across its own suite' },
      newrelic: { supported: true, text: 'Across its own suite' },
      elk: { supported: 'partial', text: 'Logs focused, separate tools for traces' },
      splunk: { supported: 'partial', text: 'Add-on products' },
    },
  },
  {
    feature: 'Cost control',
    vendors: {
      signoz: { supported: true, text: 'Usage-based, no seat fees, from $0.30/GB' },
      datadog: { supported: 'partial', text: 'Host and usage-based' },
      newrelic: { supported: 'partial', text: 'User and ingest-based' },
      elk: { supported: 'partial', text: 'Infrastructure and ops cost' },
      splunk: { supported: false, text: 'Volume-based, typically high' },
    },
  },
  {
    feature: 'Query performance',
    vendors: {
      signoz: { supported: true, text: 'ClickHouse columnar engine' },
      datadog: { text: 'Proprietary backend' },
      newrelic: { text: 'NRQL on a proprietary store' },
      elk: { text: 'Elasticsearch DSL and Lucene' },
      splunk: { text: 'SPL on a proprietary store' },
    },
  },
]

export const FAQ_ITEMS = [
  {
    question: 'What is log management software?',
    answer:
      'Log management software collects log data from your systems, stores it in one place, and lets you search, analyze, and alert on it. It turns scattered log files into a single queryable source you can use for debugging and monitoring.',
  },
  {
    question: 'What is the difference between log management and log analytics?',
    answer:
      'Log management covers the full lifecycle of collecting, parsing, storing, and retaining logs. Log analytics is the step where you query and aggregate that stored data to find patterns and answer questions. SigNoz handles both in one platform.',
  },
  {
    question: 'Is SigNoz an open source log management platform?',
    answer:
      'Yes. SigNoz is open source under the Apache 2.0 license. You can self-host it for free or use SigNoz Cloud as a fully managed service.',
  },
  {
    question: 'Can SigNoz correlate logs with metrics and traces?',
    answer:
      'Yes. SigNoz stores logs, metrics, and traces together and links them through OpenTelemetry trace IDs, so you can move between signals while debugging an incident.',
  },
  {
    question: 'How does SigNoz compare with Datadog and New Relic for log management?',
    answer:
      'SigNoz is OpenTelemetry-native and can be self-hosted, while Datadog and New Relic are proprietary SaaS platforms. SigNoz uses usage-based pricing with no per-user fees, which makes log costs easier to predict as your team grows.',
  },
]
