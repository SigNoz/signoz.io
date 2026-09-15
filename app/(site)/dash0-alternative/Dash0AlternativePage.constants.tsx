import { Badge } from '@signozhq/ui/badge'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { ButtonGroupButton } from '@/shared/components/molecules/FeaturePages/ButtonGroup/ButtonGroup.types'
import { ComparisonTableRow } from '@/shared/components/molecules/FeaturePages/ComparisonTable'

export type Dash0VendorKey = 'signoz' | 'dash0'

export type Dash0Screenshot = {
  src: string
  alt: string
  label: string
  width: number
  height: number
}

export type Dash0ComparisonBlock = {
  id: string
  title: string
  description: React.ReactNode
  screenshots?: Dash0Screenshot[]
  tableLabel?: string
  rows: ComparisonTableRow<Dash0VendorKey>[]
}

const capability = (label: string, description?: string): React.ReactNode =>
  description ? (
    <span>
      {label}
      <span className="mt-1 block text-[13px] font-normal leading-snug text-[var(--l2-foreground)]">
        {description}
      </span>
    </span>
  ) : (
    label
  )

export const DASH0_VENDORS: { key: Dash0VendorKey; label: string }[] = [
  { key: 'signoz', label: 'SigNoz Cloud' },
  { key: 'dash0', label: 'Dash0' },
]

export const DASH0_HERO = {
  eyebrow: 'Product Comparison',
  title: 'SigNoz Cloud vs Dash0',
  description:
    'Both are OpenTelemetry-native. SigNoz Cloud offers deeper investigations and more control. Dash0 offers more convenience and broader workflows. SigNoz Cloud stands out for its stronger query engine, while Dash0 is limited by its PromQL-first approach.',
}

export const DASH0_HERO_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Dash0 Alternative Hero',
      clickText: 'Get Started - Free',
    },
  },
]

export const DASH0_TLDR = {
  heading: 'TL;DR',
  columns: [
    {
      label: 'Choose SigNoz Cloud if',
      highlight: true,
      body: "You're looking for deeper analysis, more control, and more flexibility. SigNoz Cloud is the preferred choice for teams with strong technical depth, large distributed systems, or strict compliance requirements.",
    },
    {
      label: 'Choose Dash0 if',
      highlight: false,
      body: "You want a simpler, more guided platform and don't need as much depth. Dash0 is well-suited for less complex systems and teams that also need Synthetic Monitoring and RUM.",
    },
  ],
}

export const DASH0_REASONS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'More powerful query engine.',
    body: (
      <>
        SigNoz Cloud runs ClickHouse SQL across unified telemetry data. It can aggregate arbitrary
        fields, like <code>p99(order.value)</code>, and answer complex questions. Dash0's
        PromQL-first approach limits the queries you can run.
      </>
    ),
  },
  {
    title: 'More advanced signal tracking on dashboards and alerts.',
    body: "SigNoz Cloud's stronger query engine lets you build dashboards and alerts around more types of questions and track complex signals that Dash0's PromQL-backed panels can't express.",
  },
  {
    title: 'Trace view built for large traces.',
    body: 'SigNoz Cloud has no cap on spans per trace, and supports million-span traces. It comes with search and filter options inside a trace. Dash0 caps its trace view at 2,000 spans and offers no search or filtering.',
  },
  {
    title: 'More deployment flexibility.',
    body: 'SigNoz also offers open source and self-hosting options. This is important for teams with tighter compliance or data-control requirements.',
  },
  {
    title: 'Dedicated views built on OTel-native fields.',
    body: 'SigNoz Cloud queries standard OTel attributes and builds dedicated views, such as Exceptions, External APIs, Messaging Queues, and Trace Funnel. Dash0 uses more product-defined attributes and lacks these views.',
  },
]

export const DASH0_QUOTES: { quote: string; company: string }[] = [
  {
    quote:
      'The platform provides us the pipelines where you can write those logics again and gives you that flexibility of making those changes here and there.',
    company: 'HyperVerge',
  },
  {
    quote:
      'Dash0 queries everything through PromQL over generated metrics, so log-attribute computation and pivoting between telemetry types are hard or impossible',
    company: 'IG Group',
  },
  {
    quote:
      'The reason we are looking into SigNoz is that we have 80-plus microservices and we have multi-tenant architecture.',
    company: 'Bluecode',
  },
]

export const DASH0_COMPARISON_HEADING = 'Feature-wise comparison'

export const DASH0_COMPARISON_BLOCKS: Dash0ComparisonBlock[] = [
  {
    id: 'apm',
    title: 'APM or Service Monitoring',
    description: (
      <>
        <strong>SigNoz Cloud and Dash0 are equally good</strong> for everyday service monitoring.
        SigNoz Cloud offers more dedicated views. Dash0 puts more information on a single surface
        and has a better Service Map.
      </>
    ),
    rows: [
      {
        feature: 'RED',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Key operations',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Service map',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: {
            supported: true,
            text: (
              <>
                Yes{' '}
                <Badge color="vanilla" className="text-xs">
                  interactive
                </Badge>
              </>
            ),
          },
        },
      },
      {
        feature: 'Dedicated view for DB call metrics',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Dedicated view for external metrics',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Apdex',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Exceptions',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Dependency map',
        vendors: {
          signoz: { supported: false, text: 'No' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
    ],
  },
  {
    id: 'logs',
    title: 'Log Explorer',
    description: (
      <>
        <strong>SigNoz Cloud and Dash0 both have highly capable log management</strong>, with
        different strengths. SigNoz Cloud gives you more flexibility with log pipelines, search, and
        filters. Dash0 comes with out-of-the-box analysis like Log Patterns and Triage.
      </>
    ),
    rows: [
      {
        feature: 'Log body parsed into columns',
        vendors: {
          signoz: {
            supported: true,
            text: 'Yes, via log pipelines with control over fields and types',
          },
          dash0: {
            supported: true,
            text: 'Yes, automatic via AI extraction, with no control over fields. Not applied to JSON logs',
          },
        },
      },
      {
        feature: 'Log pipelines',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Log patterns',
        vendors: {
          signoz: { supported: false, text: 'No' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Triage',
        vendors: {
          signoz: { supported: false, text: 'No' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Noise filtering',
        vendors: {
          signoz: {
            text: (
              <>
                Log pipelines{' '}
                <Badge color="vanilla" className="text-xs">
                  manual
                </Badge>
              </>
            ),
          },
          dash0: { text: 'Spam filter' },
        },
      },
    ],
  },
  {
    id: 'tracing',
    title: 'Distributed Tracing',
    description: (
      <>
        <strong>SigNoz Cloud has a more mature trace explorer.</strong> It supports unlimited spans
        with easy search and navigation. Dash0 caps traces at 2,000 spans and does not offer
        in-trace search or filtering. Teams with high-volume traces and AI-driven workloads prefer
        SigNoz Cloud.
      </>
    ),
    screenshots: [
      {
        src: '/img/dash0-alternative/signoz-trace-view-100k-spans.webp',
        alt: 'SigNoz trace view rendering a 100,000-span trace in flame graph and waterfall views',
        label: 'SigNoz',
        width: 1938,
        height: 1186,
      },
      {
        src: '/img/dash0-alternative/dash0-trace-view.webp',
        alt: 'Dash0 trace view with waterfall and flame graph tabs',
        label: 'Dash0',
        width: 2038,
        height: 958,
      },
    ],
    rows: [
      {
        feature: 'Flamegraph view in Trace Explorer',
        vendors: {
          signoz: {
            text: 'Supports million-span traces. Renders 100k in a single load. Samples above that',
          },
          dash0: { text: 'Capped at 2,000 spans' },
        },
      },
      {
        feature: 'Waterfall view in Trace Explorer',
        vendors: {
          signoz: { text: 'Shows unlimited spans. No sampling' },
          dash0: { text: 'Capped at 2,000 spans' },
        },
      },
      {
        feature: capability(
          'One-click error highlighting',
          'An exclusive toggle in the trace view to highlight only error spans'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: capability(
          'One-click filters',
          'Dedicated filter buttons to highlight database, function, HTTP, jobs, and LLM spans'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: capability(
          'In-trace search',
          'A search bar in the trace view that lets you search spans based on any span attribute'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: capability(
          'Trace Funnel',
          'Visibility into the step-by-step progression of spans through a distributed system'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: capability(
          'Trace Match',
          'Combine multiple span queries to find spans based on their relationships within a trace'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
    ],
  },
  {
    id: 'queries',
    title: 'Queries',
    description: (
      <>
        <strong>SigNoz Cloud's query engine is way more powerful than Dash0's</strong>. You can
        aggregate arbitrary fields, go deeper in investigations, and ask more complex questions,
        from finding root causes to spotting performance bottlenecks. Dash0 is limited by its
        PromQL-first approach.
      </>
    ),
    screenshots: [
      {
        src: '/img/dash0-alternative/signoz-query-builder-aggregation.webp',
        alt: 'SigNoz query builder aggregating p99 on any span attribute',
        label: 'SigNoz',
        width: 1780,
        height: 632,
      },
      {
        src: '/img/dash0-alternative/dash0-promql-query.webp',
        alt: 'Dash0 PromQL-based query view limited to a pre-defined metrics catalog',
        label: 'Dash0',
        width: 1766,
        height: 682,
      },
    ],
    rows: [
      {
        feature: 'SQL',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { text: 'Limited. No visual builder. No dashboards or alerts' },
        },
      },
      {
        feature: 'PromQL',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Visual builder',
        vendors: {
          signoz: {
            supported: true,
            text: (
              <>
                Yes{' '}
                <Badge color="vanilla" className="text-xs">
                  SQL-native
                </Badge>
              </>
            ),
          },
          dash0: {
            supported: true,
            text: (
              <>
                Yes{' '}
                <Badge color="vanilla" className="text-xs">
                  PromQL-native
                </Badge>
              </>
            ),
          },
        },
      },
      {
        feature: 'Aggregations',
        vendors: {
          signoz: { text: 'On any attribute' },
          dash0: { text: 'Limited to pre-defined metrics catalog' },
        },
      },
      {
        feature: 'Query configurations',
        vendors: {
          signoz: { text: 'Having, OR, Limit, Group by all in visual builder' },
          dash0: { text: 'Limited. For more knobs need to write PromQL' },
        },
      },
      {
        feature: capability(
          'Multiple query formulas',
          'A formula option in the visual builder to build a query using multiple query outputs'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: {
            supported: false,
            text: (
              <>
                No{' '}
                <Badge color="vanilla" className="text-xs">
                  requires PromQL
                </Badge>
              </>
            ),
          },
        },
      },
    ],
  },
  {
    id: 'dashboards-alerts',
    title: 'Dashboards & Alerts',
    description: (
      <>
        <strong>SigNoz Cloud gives engineers more flexibility</strong> to build advanced dashboards
        and track complex signals because of its stronger query capabilities. Dash0's limited query
        engine also limits the panels you can build and the alerts you can track.
      </>
    ),
    screenshots: [
      {
        src: '/img/dash0-alternative/signoz-alert-routing-policies.webp',
        alt: 'SigNoz alert routing policy creation with expression-based routing',
        label: 'SigNoz — Routing policies',
        width: 1554,
        height: 1454,
      },
      {
        src: '/img/dash0-alternative/signoz-planned-downtime.webp',
        alt: 'SigNoz planned downtime configuration for silencing alerts during maintenance',
        label: 'SigNoz — Planned maintenance',
        width: 1564,
        height: 1454,
      },
    ],
    rows: [
      {
        feature: 'Panel types',
        vendors: {
          signoz: { text: 'Bar, histogram, list, number, pie, table, timeseries' },
          dash0: {
            text: 'Dependency, heatmap, treemap, gauge, geo, hierarchy, issues timeline, log table, markdown, pie, stat, timeseries',
          },
        },
      },
      {
        feature: 'Perses schema',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Dashboard or alert as code',
        vendors: {
          signoz: { text: 'Kubernetes, Terraform' },
          dash0: { text: 'Kubernetes, Terraform, CLI' },
        },
      },
      {
        feature: capability(
          'Dashboard custom view in Dashboard Manager',
          'Create a view from a filtered group of dashboards, for example, by service or team'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: capability(
          'DSL query search in Dashboard Manager',
          'Find dashboards easily across a large collection of dashboards'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'SLO with target and error budget',
        vendors: {
          signoz: { supported: false, text: 'No' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Rule-level configuration',
        vendors: {
          signoz: { text: 'Routing policies, absent-data alerts, and planned maintenance' },
          dash0: { text: 'Limited' },
        },
      },
      {
        feature: 'Anomaly detection',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Exception alerts',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Capability',
    description: (
      <>
        <strong>SigNoz and Dash0 both have strong AI features.</strong> Both offer their own AI
        agents and MCP servers. Their agents can analyze telemetry and perform actions like creating
        dashboards and alerts. SigNoz is open source, so agents can read the codebase as context.
      </>
    ),
    rows: [
      {
        feature: 'AI agent',
        vendors: {
          signoz: { supported: true, text: 'Yes. NozAI' },
          dash0: { supported: true, text: 'Yes. Agent0' },
        },
      },
      {
        feature: 'MCP',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'AI automations',
        vendors: {
          signoz: { text: 'Not built-in. Can set up via MCP' },
          dash0: { text: 'Built-in' },
        },
      },
      {
        feature: 'Codebase as context',
        vendors: {
          signoz: {
            supported: true,
            text: 'Yes. SigNoz is open source, so agents can read the codebase as context',
          },
          dash0: {
            supported: false,
            text: 'No. Dash0 is not open source, so agents cannot read the codebase',
          },
        },
      },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment & Access',
    description: (
      <>
        <strong>SigNoz offers more flexibility in deployment options and access control.</strong>{' '}
        Dash0 is SaaS-only.
      </>
    ),
    rows: [
      {
        feature: 'Deployment',
        vendors: {
          signoz: { text: 'Cloud, self-hosted, open source' },
          dash0: { text: 'Cloud only' },
        },
      },
      {
        feature: 'Organization roles',
        vendors: {
          signoz: { text: 'Admin, Editor, Viewer, Anonymous' },
          dash0: { text: 'Member, Admin' },
        },
      },
      {
        feature: 'Custom roles',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
    ],
  },
  {
    id: 'cost',
    title: 'Cost Visibility & Control',
    description: (
      <>
        <strong>
          SigNoz Cloud and Dash0 both offer ingestion visibility and limits to help control costs.
        </strong>{' '}
        SigNoz offers a dedicated Cost Meter view. Dash0 has a few out-of-the-box features, like a
        Cost Forecast dashboard.
      </>
    ),
    rows: [
      {
        feature: 'Ingestion limits or caps',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: capability(
          'Cost Meter',
          'A dedicated pre-built view with real-time visibility into data ingestion'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: false, text: 'No' },
        },
      },
      {
        feature: 'Customized cost dashboards and alerts',
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: capability(
          'Cardinality visibility',
          'Shows which metrics take up the most space in your total sample volume'
        ),
        vendors: {
          signoz: { supported: true, text: 'Yes' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
      {
        feature: 'Cost Forecast view',
        vendors: {
          signoz: { supported: false, text: 'No' },
          dash0: { supported: true, text: 'Yes' },
        },
      },
    ],
  },
]

export const DASH0_VERDICT = {
  title: 'Which should you choose between SigNoz Cloud and Dash0?',
  paragraphs: [
    "SigNoz Cloud offers more depth, control, and flexibility than Dash0. Its query engine, dashboards, alerts, distributed tracing, and deployment options are more mature than Dash0's.",
    'Dash0 is easier to use and offers broader observability workflows. But it has limits on the signals you can query and the dashboards you can build.',
    "If your system is technically complex, highly distributed, and your engineers want more control, SigNoz Cloud is the preferred choice. If Synthetic Monitoring and RUM are non-negotiable, or you're running less complex systems, Dash0 can be a good fit.",
  ],
}

export const DASH0_VERDICT_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Sign up for 30-day free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Dash0 Alternative Verdict',
      clickText: 'Sign up for 30-day free trial',
    },
  },
]

export const DASH0_FINAL_CTA = {
  title: 'Evaluate SigNoz today',
  paragraphs: [
    'Sign up for a 30-day free trial and give SigNoz a run with your own use case and observability workflows. See the flexibility, control, and depth of the product for yourself.',
    "If you're moving from Datadog, Grafana, or New Relic, our team can help with the migration plan and estimate your SigNoz cost based on your current usage.",
  ],
}

export const DASH0_FINAL_CTA_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Start free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Dash0 Alternative Bottom Banner',
      clickText: 'Start free trial',
    },
  },
  {
    text: 'Request migration support',
    href: '/contact-us/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Contact Us Button',
      clickLocation: 'Dash0 Alternative Bottom Banner',
      clickText: 'Request migration support',
    },
  },
]
