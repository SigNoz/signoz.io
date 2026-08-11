import { ArrowRight, Atom, X } from 'lucide-react'
import { type ComparisonCategory } from './ClickStackAlternativePage.types'
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
        clickstack: { type: 'text', content: 'Open source + Cloud (Beta)' },
      },
      {
        feature: 'Serverless Scaling',
        signoz: { type: 'check', label: 'SigNoz Cloud handles scaling automatically' },
        clickstack: {
          type: 'text',
          content: 'Manual upgrade required before sending data. No GA version available',
        },
      },
      {
        feature: 'MCP Server',
        signoz: { type: 'check', label: 'All deployments' },
        clickstack: { type: 'cross', label: 'No hosted MCP' },
      },
      {
        feature: 'AI Assistant',
        signoz: { type: 'check' },
        clickstack: {
          type: 'text',
          content: 'Managed deployments only. AI Notebooks not available in self-hosted',
        },
      },
      {
        feature: 'State Store',
        signoz: { type: 'text', content: 'PostgreSQL / SQLite (bundled)' },
        clickstack: { type: 'text', content: 'MongoDB (managed separately)' },
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
        signoz: { type: 'check' },
        clickstack: { type: 'cross', label: 'No infrastructure metrics product' },
      },
      {
        feature: 'Errors & Exceptions',
        signoz: { type: 'check', label: 'Dedicated page' },
        clickstack: { type: 'cross' },
      },
      {
        feature: 'LLM & AI Observability',
        signoz: { type: 'check', label: 'Token tracing, cost attribution, model performance' },
        clickstack: {
          type: 'text',
          content: 'Managed only. Via AI Notebooks',
        },
      },
      {
        feature: 'Native Correlation',
        signoz: { type: 'check', label: 'Logs, traces, metrics in one click' },
        clickstack: {
          type: 'cross',
          label: 'Logs and traces from the same service end up in different sources',
        },
      },
      {
        feature: 'Metrics Explorer',
        signoz: { type: 'text', content: 'Comprehensive metrics data and correlation' },
        clickstack: { type: 'cross', label: "Can't choose spatial and temporal aggregation" },
      },
    ],
  },
  {
    category: 'User Experience & Dashboards',
    rows: [
      {
        feature: 'UX maturity & feature completeness',
        signoz: {
          type: 'text',
          content: 'Users share ease of use and maturity of product to move to SigNoz',
        },
        clickstack: {
          type: 'text',
          content: 'Confusing UX, unpolished. Takes more time to debug issues.',
        },
      },
      {
        feature: 'Dashboard Drill-down',
        signoz: {
          type: 'check',
          label: 'Click into logs, traces, metrics from any panel',
        },
        clickstack: {
          type: 'text',
          content: 'View-only. Dashboards cannot be used for deeper troubleshooting',
        },
      },
      {
        feature: 'Dashboard Variables',
        signoz: { type: 'check' },
        clickstack: {
          type: 'cross',
          label: 'No dynamic updates to panels without changing each query individually',
        },
      },
      {
        feature: 'Pre-built Templates',
        signoz: { type: 'text', content: '30+ importable templates' },
        clickstack: { type: 'text', content: '3 presets' },
      },
      {
        feature: 'Custom Quick Filters',
        signoz: { type: 'check' },
        clickstack: { type: 'cross' },
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
        clickstack: { type: 'text', content: '2 types. Search + chart only' },
      },
      {
        feature: 'Alert Creation',
        signoz: { type: 'text', content: 'Alerts tab, dashboards, or queries' },
        clickstack: {
          type: 'text',
          content: 'No dedicated alerts workflow. Must create from search or dashboard.',
        },
      },
      {
        feature: 'Anomaly Detection',
        signoz: { type: 'check', label: 'Built-in. Seasonality + z-score' },
        clickstack: { type: 'cross', label: 'DIY via SQL' },
      },
      {
        feature: 'Alert History',
        signoz: { type: 'check', label: 'With detailed attribute breakdowns' },
        clickstack: { type: 'cross' },
      },
      {
        feature: 'Notification Channels',
        signoz: {
          type: 'text',
          content:
            '9 channels: Slack, PagerDuty, Opsgenie, Teams, Email, Webhook, Incident.io, Rootly, Zenduty',
        },
        clickstack: { type: 'text', content: '3 channels: Slack, PagerDuty, Webhooks only' },
      },
      {
        feature: 'Routing Policies',
        signoz: { type: 'check', label: 'Label-based expressions' },
        clickstack: { type: 'cross' },
      },
      {
        feature: 'Maintenance Windows',
        signoz: { type: 'check' },
        clickstack: { type: 'cross' },
      },
      {
        feature: 'Multi-severity per Rule',
        signoz: { type: 'text', content: 'Warning / critical / info' },
        clickstack: { type: 'cross' },
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
        feature: 'UI Performance',
        signoz: {
          type: 'text',
          content:
            'Significantly faster search and aggregation. Auto-materialization of attributes and JSON column architecture',
        },
        clickstack: {
          type: 'text',
          content: 'Slow search and aggregation. Schema management is up to users',
        },
      },
      {
        feature: 'Terraform / IaC',
        signoz: { type: 'check' },
        clickstack: { type: 'cross' },
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
          content: 'All-inclusive per-GB. Predictable \u2014 one number covers everything',
        },
        clickstack: {
          type: 'text',
          content: 'Storage + compute (variable). Two separate bills',
        },
      },
      {
        feature: 'Storage Pricing',
        signoz: { type: 'text', content: 'Included in $0.30/GB' },
        clickstack: { type: 'text', content: '$0.03/GB separate' },
      },
      {
        feature: 'Compute / Query Cost',
        signoz: { type: 'text', content: 'No charge for querying. Included in per-GB price' },
        clickstack: {
          type: 'text',
          content: '$0.22\u2013$0.39/compute-unit/hour. Billed as variable compute',
        },
      },
      {
        feature: 'Pro / Base Plan',
        signoz: { type: 'text', content: '$0.30/GB, 30-day free trial' },
        clickstack: { type: 'text', content: 'Usage-based' },
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
        clickstack: { type: 'text', content: 'Similar global coverage' },
      },
    ],
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
