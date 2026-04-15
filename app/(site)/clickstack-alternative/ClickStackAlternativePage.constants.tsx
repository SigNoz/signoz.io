import { ArrowRight, Atom, X } from 'lucide-react'
import { type VendorKey } from './ClickStackAlternativePage.types'
import { type ComparisonTableRow } from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import Link from 'next/link'

export const QUERY_YOUR_DATA_CARDS = [
  {
    icon: <Atom className="h-4 w-4" />,
    title: 'PromQL, visual builder, and SQL',
    description:
      'Your existing PromQL queries work without modification. The visual builder supports AND/OR logic, CONTAINS, REGEX, IN, and LIKE operators with autocomplete.',
  },
  {
    icon: <Atom className="h-4 w-4" />,
    title: 'Consistent Querying Across All Signals',
    description:
      'SigNoz gives you the same query interfaces across logs, traces, and metrics. In ClickStack, Lucene search is scoped to logs only.',
  },
  {
    icon: <Atom className="h-4 w-4" />,
    title: "No 'Query Tax'",
    description: (
      <>
        Querying is included in your ingestion pricing. In ClickStack, query compute is{' '}
        <Link
          href="/blog/clickstack-managed-pricing-compute-costs/"
          className="underline decoration-signoz_robin-400 underline-offset-2"
        >
          billed separately
        </Link>{' '}
        and scales with how much you query.
      </>
    ),
  },
]

export const ALERTING_ABOVE_HISTORY_CARDS = [
  {
    title: 'Creating alerts',
    description: (
      <div>
        <p>
          SigNoz gives you <span className="font-semibold">three ways</span> to create an alert:
          from the dedicated Alerts tab, directly from a dashboard panel, or from the query builder.
          Whichever path you take, the alert is configured in context of the data you are already
          looking at.
        </p>
        <p>
          ClickStack has <span className="text-signoz_cherry-300">no dedicated</span> alerts
          workflow. Alerts can only be created from a search or a dashboard, which means alert
          management is always a detour from your current investigation.
        </p>
      </div>
    ),
  },
  {
    title: 'Anomaly detection',
    description: (
      <div>
        <p>
          SigNoz supports Z-score based anomaly detection for metric alerts. The system accounts for
          seasonality at three levels: hourly, daily, and weekly. This means your alerts adapt to
          expected traffic patterns rather than firing on normal fluctuations.
        </p>
        <p>
          ClickStack <span className="text-signoz_cherry-300">does not support</span> anomaly
          detection.
        </p>
      </div>
    ),
  },
]

export const ALERTING_BELOW_HISTORY_CARDS = [
  {
    title: 'Multi-threshold rules',
    description: (
      <div>
        <p>
          A single alert rule in SigNoz can have multiple severity thresholds: warning, critical,
          and info. Each threshold can route to a different notification channel, so your on-call
          engineer gets paged for critical while the team Slack channel gets a summary. ClickStack
          <span className="text-signoz_cherry-300">supports one threshold per alert</span>.
        </p>
      </div>
    ),
  },
  {
    title: 'Infrastructure as code',
    description: (
      <div>
        <p>
          SigNoz provides a Terraform provider for alert management. Alerts can be defined, version
          controlled, and deployed alongside application code. The provider supports thresholds,
          labels, notification channels, and maintenance windows. ClickStack{' '}
          <span className="text-signoz_cherry-300">does not offer</span> this.
        </p>
      </div>
    ),
  },
]

export const DASHBOARD_HELP_YOU_INVESTIGATE_CARDS = [
  {
    title: 'Interactive Dashboards',
    description: (
      <>
        Right-click any data point to navigate to related logs or traces with all filters preserved.
        ClickStack dashboards are static, you can observe but not drill down from where you stand.
      </>
    ),
    className: 'md:min-h-64',
  },
  {
    title: 'Cross-filtering and dashboard variables',
    description: (
      <>
        Filter every panel from a single dropdown by service, environment, or custom attribute.
        Click a value in any panel and it becomes a dashboard variable across the board.
      </>
    ),
    className: 'md:min-h-64',
  },
  {
    title: 'Pre-built dashboard templates',
    description: (
      <>
        SigNoz ships with 30+ importable JSON templates covering:
        <ul className="mt-4 list-none space-y-2 pl-0">
          <li className="flex items-center gap-2">
            <ArrowRight size={16} className="shrink-0 text-blue-400" />
            Application Performance Monitoring (APM)
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight size={16} className="shrink-0 text-blue-400" />
            Kubernetes
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight size={16} className="shrink-0 text-blue-400" />
            MySQL, MongoDB, AWS RDS
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight size={16} className="shrink-0 text-blue-400" />
            Host metrics
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'ClickStack dashboards',
    description: (
      <ul className="mt-0 list-none space-y-2 pl-0">
        <li className="flex items-start gap-2">
          <X size={16} className="mt-0.5 shrink-0 text-red-400" />
          ClickStack dashboards are static. You can observe but you cannot investigate from where
          you stand.
        </li>
        <li className="flex items-start gap-2">
          <X size={16} className="mt-0.5 shrink-0 text-red-400" />
          ClickStack does not support dashboard variables. Updating the service you are looking at
          means editing every panel query individually.
        </li>
        <li className="flex items-start gap-2">
          <X size={16} className="mt-0.5 shrink-0 text-red-400" />
          ClickStack ships with 3 presets: Services, Kubernetes, and ClickHouse monitoring. Every
          additional dashboard is built from scratch.
        </li>
      </ul>
    ),
  },
]

export const CLICKSTACK_COMPARISON_TABLE_ROWS: ComparisonTableRow<VendorKey>[] = [
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Dashboard Drill-downs</span>,
    vendors: {
      signoz: { text: 'Logs, traces & metrics' },
      clickstack: { text: 'View-only' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Dashboard Variables</span>,
    vendors: {
      signoz: { supported: true, text: '' },
      clickstack: { supported: false, text: '' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Pre-built Dashboards</span>,
    vendors: {
      signoz: { text: '30+ importable templates' },
      clickstack: { text: '3 presets' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Alert Creation</span>,
    vendors: {
      signoz: { text: 'Alerts tab, dashboards, or queries' },
      clickstack: { text: 'No dedicated alerts workflow' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Anomaly Detection</span>,
    vendors: {
      signoz: { supported: true, text: '' },
      clickstack: { supported: false, text: '' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Alert History</span>,
    vendors: {
      signoz: { supported: true, text: 'Yes, with attribute breakdowns' },
      clickstack: { supported: false, text: '' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Query Language</span>,
    vendors: {
      signoz: { text: 'PromQL, visual builder & SQL' },
      clickstack: { text: 'Lucene-style search & SQL' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Query Cost</span>,
    vendors: {
      signoz: { text: 'No charge for querying' },
      clickstack: { text: 'Billed as variable compute' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">State Store</span>,
    vendors: {
      signoz: { text: 'PostgreSQL/SQLite (bundled)' },
      clickstack: { text: 'MongoDB (managed separately)' },
    },
  },
  {
    feature: (
      <span className="text-lg font-bold text-signoz_amber-400">Supported Ingestion Formats</span>
    ),
    vendors: {
      signoz: { text: 'OTLP, Jaeger, Kafka, Zipkin, OpenCensus' },
      clickstack: { text: 'OTLP, ClickHouse HTTP, Vector' },
    },
  },
  {
    feature: <span className="text-lg font-bold text-signoz_amber-400">Deployment Options</span>,
    vendors: {
      signoz: { text: 'Open source + Cloud (GA)' },
      clickstack: { text: 'Open source + Cloud (Beta)' },
    },
  },
]

export const VENDORS = [
  {
    key: 'signoz',
    label: <span className="text-xl text-signoz_forest-50">SigNoz</span>,
  },
  {
    key: 'clickstack',
    label: <span className="text-xl text-signoz_forest-50">ClickStack</span>,
  },
]

export const CLICKSTACK_BILLING_CARDS = [
  {
    title: '1. Storage costs',
    description:
      "ClickStack's headline rate is less than $0.03/GB per month. This covers data at rest in object storage only. It does not include the compute required to ingest or query that data.",
  },
  {
    title: '2. Ingest compute',
    description:
      'Processing incoming data runs continuously and is billed separately. ClickStack publishes one benchmark here: each core sustains up to 20MB/s of writes, translating to roughly $0.01/GB for ingest compute. This is estimable.',
  },
  {
    title: '3. Query compute',
    description:
      'Every dashboard load, search, and incident investigation consumes compute billed separately at variable rates. No published benchmark or worked example exists for query compute costs. This is the dimension that spikes most during incidents.',
  },
  {
    title: '4. Data transfer and egress',
    description:
      "Data transfer and egress fees apply as a fourth cost dimension. No published rate exists in ClickStack's documentation.",
  },
]
