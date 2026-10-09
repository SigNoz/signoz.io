import { Activity, Bot, Cable, SearchCode, type LucideIcon } from 'lucide-react'

export type WhySignozStep = {
  cta?: { href: string; label: string }
  description: string
  icon: LucideIcon
  key: string
  title: string
}

export const WHY_SIGNOZ_STEPS: WhySignozStep[] = [
  {
    key: 'correlated-signals',
    title: 'Debug faster with correlated signals',
    description:
      'Move from a latency spike to the related logs, traces, metrics, and spans without stitching together separate tools.',
    icon: Activity,
    cta: { href: '/docs/introduction/', label: 'Open a trace' },
  },
  {
    key: 'opentelemetry',
    title: 'Instrument once with OpenTelemetry',
    description:
      'Use open standards instead of vendor SDKs, so instrumentation stays portable as your stack changes.',
    icon: Cable,
    cta: {
      href: '/docs/instrumentation/overview/',
      label: 'Read the setup guide',
    },
  },
  {
    key: 'columnar-store',
    title: 'Query telemetry on a columnar store',
    description:
      'Use query builder, PromQL, and ClickHouse SQL on a fast columnar datastore built for high-cardinality observability data.',
    icon: SearchCode,
    cta: {
      href: '/docs/userguide/query-builder-v5/',
      label: 'Open query builder',
    },
  },
  {
    key: 'agent-telemetry',
    title: 'Give AI agents telemetry they understand',
    description:
      'One OpenTelemetry-native source gives agents a known schema for traces, logs, metrics, and services, so they can debug with less translation.',
    icon: Bot,
    cta: {
      href: '/docs/ai/signoz-mcp-server/',
      label: 'Connect an agent',
    },
  },
]
