import { Atom, TextSearch } from 'lucide-react'
import { type VendorKey } from './CloudwatchAlternativePage.types'
import { type ComparisonTableRow } from '@/shared/components/molecules/FeaturePages/ComparisonTable'

export const TEAM_SWITCH_CARDS = [
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Unpredictable costs after free tier',
    description: (
      <>
        Debug logging at INFO level generates approximately{' '}
        <span className="font-bold text-signoz_cherry-300">1GB per EC2</span> instance daily. At{' '}
        <span className="font-bold text-signoz_cherry-300">$0.50/GB</span> ingestion, verbose
        logging across 20 instances costs $300/day. Custom metrics bill at{' '}
        <span className="font-bold text-signoz_cherry-300">$0.30/month</span> per unique dimension
        combination.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Four separate consoles during incidents',
    description: (
      <>
        Query logs in Logs Insights, check metrics in Metrics console, view traces in X-Ray, check
        service health in Application Signals. Each uses{' '}
        <span className="font-bold text-signoz_cherry-300">different query syntax</span>. Clicking
        from metrics to logs{' '}
        <span className="font-bold text-signoz_cherry-300">resets time filters</span>.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'High context-switching tax',
    description: (
      <>
        Finding logs for a trace requires copying{' '}
        <span className="font-bold text-signoz_cherry-300">trace IDs</span> from{' '}
        <span className="font-bold text-signoz_cherry-300">X-Ray</span> and running a separate
        search in <span className="font-bold text-signoz_cherry-300">CloudWatch Logs</span>. X-Ray
        setup requires installing the daemon, modifying application code, and configuring IAM roles.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Per-query billing on every search',
    description: (
      <>
        Logs Insights charges{' '}
        <span className="font-bold text-signoz_cherry-300">$0.005 per GB scanned</span>. Querying
        100GB five times costs <span className="font-bold text-signoz_cherry-300">$2.50</span>.
        Grafana polling CloudWatch APIs generates additional{' '}
        <span className="font-bold text-signoz_cherry-300">GetMetricData</span> charges at{' '}
        <span className="font-bold text-signoz_cherry-300">$0.01 per 1,000 metrics</span>.
        Incident-driven query volume makes costs impossible to predict.
      </>
    ),
  },
]

export const CLOUDWATCH_COMPARISON_TABLE_ROWS: ComparisonTableRow<VendorKey>[] = [
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Query Interface</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Single UI for all correlated signals </span>{' '}
            <span className="text-sm">(Logs, Metrics and Traces)</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Separate consoles </span>
            <span className="text-sm">(CloudWatch, Logs Insights, X-Ray, Application Signals)</span>
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Billing model</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Usage-based (GB ingested), </span>{' '}
            <span className="text-sm">predictable scaling using cost meter</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Per-service, per-query, per-API call charges, </span>{' '}
            <span className="text-sm">unpredictable</span>
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Telemetry standard</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">OpenTelemetry-native</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col text-center text-lg text-signoz_vanilla-400">
            Proprietary (migrating to OpenTelemetry via ADOT)
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Query language</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-lg text-signoz_vanilla-400">
            Supports Query builder, PromQL and ClickHouse QL
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Different query language per signal </span>{' '}
            <span className="text-sm">
              Logs Insights QL, Metrics statistics, X-Ray filter expressions, OpenSearch PPL/SQL
            </span>
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Data storage</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">ClickHouse columnar database</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Separate stores per service </span>{' '}
            <span className="text-sm">(Metrics, Logs, X-Ray, Application Signals)</span>
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Retention</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Hot storage (15-180 days), </span>{' '}
            <span className="text-lg">Cold storage (upto 2 years)</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-sm">
              Metrics: 3 hours to 15 months with auto-aggregation. Logs: $0.03/GB/month. X-Ray: 30
              days max
            </span>
          </div>
        ),
      },
    },
  },
  {
    feature: <span className="text-xl font-bold text-signoz_amber-400">Deployment Options</span>,
    vendors: {
      signoz: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">SigNoz Cloud or Self-hosted</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-lg text-signoz_vanilla-400">
            AWS managed per region
          </div>
        ),
      },
    },
  },
]

export const VENDORS = [
  {
    key: 'signoz',
    label: <span className="text-xl text-signoz_forest-50">SigNoz</span>,
    className: 'text-center',
  },
  {
    key: 'cloudwatch',
    label: <span className="text-xl text-signoz_forest-50 ">AWS CloudWatch</span>,
    className: 'text-center',
  },
]

export const CLOUDWATCH_BILLING_CARDS = [
  {
    title: '1. Data costs',
    description:
      'Log ingestion at $0.50/GB (67% more than SigNoz), storage at $0.03/GB/month, and $0.005/GB scanned per query. Searching 1TB of logs costs $5 per search.',
  },
  {
    title: '2. Metric costs',
    description:
      'Custom metrics at $0.30/metric/month where each dimension combination creates a separate billable metric. A metric tracking 1,000 user IDs becomes 1,000 metrics at $300/month.',
  },
  {
    title: '3. Observability infrastructure',
    description:
      'Dashboards at $3/month after first 3, alarms at $0.10-$0.30/month, X-Ray traces at $0.000005 per trace recorded and retrieved, Application Signals at $0.20/GB ingested.',
  },
  {
    title: '4. API and monitoring overhead',
    description:
      'GetMetricData charges when third-party tools poll metrics. Detailed monitoring converts free metrics into billable custom metrics. Container Insights adds per-cluster/node/pod charges. Cross-account observability adds data transfer fees.',
  },
]

export const DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_ABOVE = [
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Regional Silos',
    title: 'Fragmented AWS CloudWatch',
    description: (
      <>
        CloudWatch is regional by design. Data stays in the region where it was generated, forcing
        you to set up complex "<span className="font-bold">Sinks and Links</span>" to see a unified
        view. Even then, you are hit with 20KB policy limits per account per source, making global
        observability a manual chore.
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'The Bill Snowball',
    title: 'Opaque Infrastructure Costs',
    description: (
      <>
        CloudWatch billing is fragmented across 12+ separate components. You pay for ingestion,
        storage, and even the act of looking at your data with{' '}
        <span className="font-bold">$0.005 per GB scanned</span> in Log Insights. High-cardinality
        metrics lead to exponential cost scaling due to per-dimension pricing models.
      </>
    ),
  },
]

export const DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_BELOW = [
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Managed SaaS',
    title: 'SigNoz Cloud',
    description: (
      <>
        <p>
          A fully managed observability backend. We handle the ClickHouse infrastructure, scaling,
          and security patches. Includes built-in SOC2 Type II and HIPAA compliance with data
          centers in US, EU, and India regions to minimize latency and meet residency requirements.
        </p>
        <p>Zero-ops deployment. Up and running in &lt;5 minutes.</p>
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Hybrid Managed / BYOC',
    title: 'Managed Data Residency',
    description: (
      <>
        <p>
          Bring Your Own Cloud. SigNoz manages the <span className="font-bold">Control Plane</span>{' '}
          (UI and alerting logic), but the <span className="font-bold">Data Plane</span> (ClickHouse
          and OTel Collectors) stays entirely within your VPC. You get SaaS convenience while
          ensuring 100% of your telemetry data never leaves your network.
        </p>
        <p>Ideal for security-sensitive workloads that prohibit external data egress.</p>
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Self-Managed Enterprise',
    title: 'Enterprise Self-Hosted',
    description: (
      <>
        <p>
          Designed for high-volume Kubernetes environments. Features include OIDC/SAML SSO, granular
          RBAC, and Audit Logs. Includes dedicated engineering support for architectural reviews and
          performance tuning of large-scale ClickHouse clusters.
        </p>
        <p>Supports air-gapped environments and custom long-term retention policies.</p>
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Open Source Core',
    title: 'Community Edition',
    description: (
      <>
        <p>
          Built on open standards and trusted by thousands of developers globally. Use the same
          high-performance architecture as our Cloud and Enterprise versions on your own
          infrastructure. No seat limits and no hidden fees, just pure observability with 25k+
          GitHub stars.
        </p>
        <p>OTel-native with total visibility into the source code.</p>
      </>
    ),
  },
]
