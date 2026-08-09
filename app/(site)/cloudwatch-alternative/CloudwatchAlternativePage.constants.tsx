import { Atom, TextSearch } from 'lucide-react'
import { type VendorKey } from './CloudwatchAlternativePage.types'
import { type ComparisonTableRow } from '@/shared/components/molecules/FeaturePages/ComparisonTable'

export const TEAM_SWITCH_CARDS = [
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Service and Region-based charges',
    description: (
      <>
        CloudWatch prices logs, metrics, traces, queries, alarms, and other services separately. AWS
        states that rates vary by <span className="font-bold text-signoz_cherry-300">Region</span>{' '}
        and service.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Separate service workflows during incidents',
    description: (
      <>
        Query logs in Logs Insights, check metrics in Metrics console, view traces in X-Ray, check
        service health in Application Signals. Each service has its own{' '}
        <span className="font-bold text-signoz_cherry-300">query and billing model</span>.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Cross-service investigation work',
    description: (
      <>
        CloudWatch distributes observability data across services such as{' '}
        <span className="font-bold text-signoz_cherry-300">CloudWatch Logs</span>, Metrics, X-Ray,
        and Application Signals. Teams must account for those service boundaries during an
        investigation.
      </>
    ),
  },
  {
    icon: <Atom size={16} className="text-signoz_vanilla-400" />,
    title: 'Query charges depend on data scanned',
    description: (
      <>
        AWS pricing examples for US East show Logs Insights charges of{' '}
        <span className="font-bold text-signoz_cherry-300">$0.005 per GB scanned</span>. Querying
        100GB five times would cost <span className="font-bold text-signoz_cherry-300">$2.50</span>{' '}
        at that example rate. Current rates depend on the selected AWS Region.
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
            <span className="text-lg">SigNoz Cloud usage-based pricing, </span>{' '}
            <span className="text-sm">with Cost Meter for usage tracking</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-lg">Service and Region-based charges, </span>{' '}
            <span className="text-sm">including query and API usage where applicable</span>
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
            AWS service APIs with OpenTelemetry support through ADOT
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
            <span className="text-lg">Configurable SigNoz Cloud retention</span>
          </div>
        ),
      },
      cloudwatch: {
        text: (
          <div className="flex w-full flex-col justify-center text-center text-signoz_vanilla-400">
            <span className="text-sm">
              Retention and charges vary by CloudWatch signal and service
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
            <span className="text-lg">SigNoz Cloud or Self-Hosted SigNoz</span>
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
    label: <span className="text-xl text-signoz_forest-50">SigNoz Cloud</span>,
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
      'CloudWatch prices log ingestion, storage, and Logs Insights queries separately. Rates vary by AWS Region and log class.',
  },
  {
    title: '2. Metric costs',
    description:
      'CloudWatch prices custom metrics by metric count and resolution. Dimensions can create separate custom metrics and affect the bill.',
  },
  {
    title: '3. Observability infrastructure',
    description:
      'Dashboards, alarms, X-Ray traces, and Application Signals have separate pricing units and free-tier allowances.',
  },
  {
    title: '4. API and monitoring overhead',
    description:
      'API calls, detailed monitoring, Container Insights, and cross-account data transfer can add separate charges.',
  },
]

export const DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_ABOVE = [
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Regional Silos',
    title: 'Regional AWS CloudWatch services',
    description: (
      <>
        CloudWatch pricing and data access are Region-aware. Cross-account and cross-Region views
        need AWS configuration, and current charges depend on the services and Regions used.
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'The Bill Snowball',
    title: 'Opaque Infrastructure Costs',
    description: (
      <>
        CloudWatch prices ingestion, storage, queries, metrics, alarms, dashboards, and APIs through
        separate service units. AWS pricing examples show that Logs Insights query charges depend on
        the amount of data scanned.
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
        <p>The service is managed by SigNoz.</p>
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
          and OTel Collectors) stays within your VPC. You get a managed deployment in your cloud.
        </p>
        <p>Ideal for security-sensitive workloads that prohibit external data egress.</p>
      </>
    ),
  },
  {
    icon: <TextSearch size={16} className="text-signoz_vanilla-400" />,
    iconText: 'Self-Hosted SigNoz',
    title: 'Self-Hosted SigNoz Enterprise',
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
    title: 'Self-Hosted SigNoz Community Edition',
    description: (
      <>
        <p>
          Built on open standards and trusted by thousands of developers globally. Use the same
          high-performance SigNoz architecture on your own infrastructure. No seat limits and no
          hidden fees, just pure observability with 25k+ GitHub stars.
        </p>
        <p>OTel-native with total visibility into the source code.</p>
      </>
    ),
  },
]
