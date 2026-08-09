import { ArrowRight, Atom } from 'lucide-react'
import { type ComparisonCategory } from './ClickStackAlternativePage.types'
import Link from 'next/link'

export const QUERY_YOUR_DATA_CARDS = [
  {
    icon: <Atom className="h-4 w-4" />,
    title: 'PromQL, visual builder, and SQL',
    description:
      'SigNoz Cloud provides PromQL, a visual query builder, and ClickHouse SQL for telemetry analysis.',
  },
  {
    icon: <Atom className="h-4 w-4" />,
    title: 'Managed ClickStack query options',
    description:
      'Managed ClickStack provides Lucene-style search and SQL through the ClickStack UI, which is HyperDX.',
  },
  {
    icon: <Atom className="h-4 w-4" />,
    title: 'Different compute models',
    description: (
      <>
        SigNoz Cloud does not add a separate query charge. Managed ClickStack uses ClickHouse Cloud
        compute for ingest and query workloads. Review the{' '}
        <Link
          href="/blog/clickstack-managed-pricing-compute-costs/"
          className="underline decoration-signoz_robin-400 underline-offset-2"
        >
          existing pricing analysis
        </Link>{' '}
        with your current workload before you compare costs.
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
          Managed ClickStack also includes alerts in the ClickStack UI. Its official product page
          identifies HyperDX as the interface for search, dashboards, alerts, and session replays.
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
          The Managed ClickStack product overview does not specify an equivalent built-in anomaly
          detection workflow. Confirm this requirement against its current feature documentation.
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
          engineer gets paged for critical while the team Slack channel gets a summary. Confirm the
          required threshold and routing behavior in the current Managed ClickStack documentation.
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
          labels, notification channels, and maintenance windows. Confirm the current
          infrastructure-as-code support for Managed ClickStack before you choose a workflow.
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
    title: 'Managed ClickStack dashboards',
    description: (
      <ul className="mt-0 list-none space-y-2 pl-0">
        <li className="flex items-start gap-2">
          <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-400" />
          The ClickStack UI, which is HyperDX, includes interactive dashboards.
        </li>
        <li className="flex items-start gap-2">
          <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-400" />
          Managed ClickStack uses ClickHouse Cloud materialized views to keep dashboards fast.
        </li>
        <li className="flex items-start gap-2">
          <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-400" />
          Its managed product page lists built-in service maps, patterns, clustering, and
          dashboards.
        </li>
      </ul>
    ),
  },
]

export const COMPARISON_GRID_DATA: ComparisonCategory[] = [
  {
    category: 'Platform',
    rows: [
      {
        feature: 'OTel Native',
        signoz: { type: 'check' },
        clickstack: { type: 'check' },
      },
      {
        feature: 'Deployment Options',
        signoz: {
          type: 'text',
          content: 'SigNoz Cloud + Self-Hosted SigNoz',
        },
        clickstack: { type: 'text', content: 'Managed ClickStack + ClickStack OSS' },
      },
      {
        feature: 'Managed Scaling',
        signoz: { type: 'check', label: 'SigNoz Cloud is managed by SigNoz' },
        clickstack: {
          type: 'check',
          label: 'Managed ClickStack handles scaling and upgrades',
        },
      },
      {
        feature: 'MCP Server',
        signoz: { type: 'check', label: 'SigNoz Cloud' },
        clickstack: { type: 'check', label: 'ClickStack MCP server' },
      },
      {
        feature: 'Agent Workflows',
        signoz: { type: 'check', label: 'Noz and MCP Server' },
        clickstack: {
          type: 'text',
          content: 'MCP tools for external agent workflows',
        },
      },
      {
        feature: 'Self-Managed Option',
        signoz: { type: 'text', content: 'Self-Hosted SigNoz' },
        clickstack: { type: 'text', content: 'ClickStack OSS' },
      },
    ],
  },
  {
    category: 'Observability Coverage',
    rows: [
      {
        feature: 'APM & Distributed Tracing',
        signoz: { type: 'check' },
        clickstack: { type: 'check' },
      },
      {
        feature: 'Log Management',
        signoz: { type: 'check' },
        clickstack: { type: 'check' },
      },
      {
        feature: 'Infrastructure Monitoring',
        signoz: { type: 'check', label: 'Metrics and dashboards' },
        clickstack: { type: 'check', label: 'OpenTelemetry metrics and dashboards' },
      },
      {
        feature: 'Errors & Exceptions',
        signoz: { type: 'check', label: 'Dedicated page' },
        clickstack: { type: 'check', label: 'Errors in the ClickStack UI' },
      },
      {
        feature: 'Agent Integration',
        signoz: { type: 'check', label: 'Noz and MCP workflows' },
        clickstack: {
          type: 'check',
          label: 'ClickStack MCP workflows',
        },
      },
      {
        feature: 'Native Correlation',
        signoz: { type: 'check', label: 'Logs, traces, metrics in one click' },
        clickstack: {
          type: 'check',
          label: 'Automatic correlation of logs, traces, and metrics',
        },
      },
      {
        feature: 'Metrics Querying',
        signoz: { type: 'text', content: 'Comprehensive metrics data and correlation' },
        clickstack: { type: 'text', content: 'ClickHouse SQL and ClickStack UI' },
      },
    ],
  },
  {
    category: 'User Experience & Dashboards',
    rows: [
      {
        feature: 'Managed Operations',
        signoz: {
          type: 'text',
          content: 'SigNoz Cloud manages the observability backend',
        },
        clickstack: {
          type: 'text',
          content: 'Managed ClickStack handles scaling, upgrades, backups, and maintenance',
        },
      },
      {
        feature: 'Interactive Dashboards',
        signoz: {
          type: 'check',
          label: 'Click into logs, traces, metrics from any panel',
        },
        clickstack: {
          type: 'check',
          label: 'Interactive dashboards in the ClickStack UI',
        },
      },
      {
        feature: 'Dashboard Filtering',
        signoz: { type: 'check', label: 'Variables and panel filters' },
        clickstack: {
          type: 'text',
          content: 'Lucene-style search and SQL filters',
        },
      },
      {
        feature: 'Built-in Views',
        signoz: { type: 'text', content: '30+ importable templates' },
        clickstack: { type: 'text', content: 'Service maps, patterns, clustering, and dashboards' },
      },
      {
        feature: 'Custom Quick Filters',
        signoz: { type: 'check' },
        clickstack: { type: 'check', label: 'Lucene-style search and SQL' },
      },
    ],
  },
  {
    category: 'Alerting',
    rows: [
      {
        feature: 'Alert Types',
        signoz: {
          type: 'text',
          content: '6 types: Metrics, logs, traces, exceptions, anomaly, Apdex',
        },
        clickstack: { type: 'text', content: 'Alerts in the ClickStack UI' },
      },
      {
        feature: 'Alert Creation',
        signoz: { type: 'text', content: 'Alerts tab, dashboards, or queries' },
        clickstack: {
          type: 'text',
          content: 'Alert workflows in the ClickStack UI',
        },
      },
      {
        feature: 'Anomaly Detection',
        signoz: { type: 'check', label: 'Built-in. Seasonality + z-score' },
        clickstack: { type: 'text', content: 'Not specified on the managed product overview' },
      },
    ],
  },
  {
    category: 'Query & Developer Experience',
    rows: [
      {
        feature: 'Query Languages',
        signoz: { type: 'text', content: 'Query Builder, ClickHouse SQL, PromQL' },
        clickstack: { type: 'text', content: 'SQL, Lucene-style search' },
      },
      {
        feature: 'Managed Performance',
        signoz: {
          type: 'text',
          content: 'SigNoz Cloud manages ingestion and query infrastructure',
        },
        clickstack: {
          type: 'text',
          content: 'Managed ClickStack separates storage, ingest compute, and query compute',
        },
      },
    ],
  },
  {
    category: 'Pricing',
    rows: [
      {
        feature: 'Pricing Model',
        signoz: {
          type: 'text',
          content: 'Logs and traces by GB; metrics by samples',
        },
        clickstack: {
          type: 'text',
          content: 'ClickHouse Cloud storage and compute resources',
        },
      },
      {
        feature: 'Storage Pricing',
        signoz: { type: 'text', content: 'Included in telemetry pricing' },
        clickstack: { type: 'text', content: 'Object storage with compute resources' },
      },
      {
        feature: 'Compute / Query Cost',
        signoz: { type: 'text', content: 'No charge for querying. Included in per-GB price' },
        clickstack: {
          type: 'text',
          content: 'Compute matches ingest and query workload',
        },
      },
      {
        feature: 'Pro / Base Plan',
        signoz: { type: 'text', content: 'Starts at $49/month with included usage' },
        clickstack: { type: 'text', content: '30-day trial with $300 credits' },
      },
      {
        feature: 'Enterprise',
        signoz: { type: 'text', content: 'Contact sales' },
        clickstack: { type: 'text', content: 'Contact sales' },
      },
    ],
  },
  {
    category: 'Data Governance',
    rows: [
      {
        feature: 'Data Residency',
        signoz: { type: 'text', content: 'US, EU, India or your own VPC. BYOC available' },
        clickstack: { type: 'text', content: 'ClickHouse Cloud provider and Region selection' },
      },
    ],
  },
]

export const CLICKSTACK_BILLING_CARDS = [
  {
    title: '1. Storage costs',
    description:
      'Managed ClickStack separates object storage from compute. The result depends on the selected ClickHouse Cloud resources and retained data.',
  },
  {
    title: '2. Ingest compute',
    description:
      'Managed ClickStack can use dedicated resources for ingestion. Ingest and query workloads can scale independently.',
  },
  {
    title: '3. Query compute',
    description:
      'Managed ClickStack can use separate compute for common queries and on-demand compute for historical analysis. The cost depends on workload and resource size.',
  },
  {
    title: '4. Managed operations',
    description:
      'Managed ClickStack handles backups, upgrades, scaling, and maintenance. Include the selected service and cloud resources in a cost comparison.',
  },
]
