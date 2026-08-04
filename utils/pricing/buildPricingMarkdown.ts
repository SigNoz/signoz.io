import {
  TRACES_AND_LOGS_PRICES,
  METRICS_PRICES,
  TEAMS_BASE_PRICE_USD,
  TEAMS_LIST_PRICE_USD,
  STARTUP_PRICE_USD,
  ENTERPRISE_FLOOR_USD,
  DEDICATED_SUPPORT_THRESHOLD_USD,
} from '@/constants/pricing'

/**
 * Agent-facing markdown rendering of /pricing.
 *
 * Rates and plan prices are imported from @/constants/pricing rather than
 * restated here, so this page cannot drift from what the calculator charges.
 * Prose describing inclusions and eligibility is declared below and must be
 * updated alongside the pricing components.
 */

const formatUsd = (value: number): string =>
  Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`

const sortedEntries = (record: Record<number, number>): [number, number][] =>
  Object.keys(record)
    .map(Number)
    .sort((a, b) => a - b)
    .map((key) => [key, record[key]])

const retentionLabel = (days: number): string => (days === 365 ? '1 year' : `${days} days`)

const buildTracesAndLogsTable = (): string => {
  const rows = sortedEntries(TRACES_AND_LOGS_PRICES).map(
    ([days, price]) => `| ${retentionLabel(days)} | ${formatUsd(price)} |`
  )

  return ['| Retention | Price per GB ingested |', '| --- | --- |', ...rows].join('\n')
}

const buildMetricsTable = (): string => {
  const rows = sortedEntries(METRICS_PRICES).map(
    ([months, price]) => `| ${months} month${months > 1 ? 's' : ''} | ${formatUsd(price)} |`
  )

  return ['| Retention | Price per million samples |', '| --- | --- |', ...rows].join('\n')
}

const cheapestTracesAndLogsPrice = (): number => sortedEntries(TRACES_AND_LOGS_PRICES)[0][1]
const cheapestMetricsPrice = (): number => sortedEntries(METRICS_PRICES)[0][1]

/** Usage the $49 base covers at the lowest retention tier. */
const includedUsageSummary = (): string => {
  const gb = Math.floor(TEAMS_BASE_PRICE_USD / cheapestTracesAndLogsPrice())
  const samples = Math.round(TEAMS_BASE_PRICE_USD / cheapestMetricsPrice())
  return `${gb} GB of logs/traces at 15 days retention, or ${samples} million metric samples at 1 month retention`
}

export const buildPricingMarkdown = (siteUrl: string): string => {
  const lines: string[] = [
    '# SigNoz Pricing',
    '',
    'SigNoz is an open-source, OpenTelemetry-native observability platform for logs, traces, and metrics.',
    '',
    'Pricing is usage-based only. There is no per-user pricing, no per-host/container/node pricing, and no surcharge for custom metrics. You add unlimited teammates and monitor any number of hosts on every paid plan.',
    '',
    '## Plans',
    '',
    '| Plan | Price | Best for |',
    '| --- | --- | --- |',
    '| Community Edition | Free, self-hosted | Teams with DevOps expertise who want full control |',
    `| Teams (Cloud) | from ${formatUsd(TEAMS_BASE_PRICE_USD)}/month | Teams who want zero operational overhead |`,
    `| Enterprise | Custom, from ${formatUsd(ENTERPRISE_FLOOR_USD)}/month | Orgs needing data residency, compliance, and support |`,
    '',
    `The Teams list price is ${formatUsd(TEAMS_LIST_PRICE_USD)}/month, currently offered at ${formatUsd(TEAMS_BASE_PRICE_USD)}/month.`,
    '',
    '## Ingestion rates',
    '',
    'Rates depend on how long you retain the data. You pick retention per signal.',
    '',
    '### Logs and traces',
    '',
    buildTracesAndLogsTable(),
    '',
    '### Metrics',
    '',
    buildMetricsTable(),
    '',
    'Metrics are billed per million samples, not per time series or per custom metric.',
    '',
    '## Teams plan',
    '',
    `The ${formatUsd(TEAMS_BASE_PRICE_USD)}/month base includes usage worth ${formatUsd(TEAMS_BASE_PRICE_USD)} — roughly ${includedUsageSummary()}. Beyond that you pay only for what exceeds the base, at the rates above.`,
    '',
    'Included in the Teams plan:',
    '',
    '- Access to all product features',
    '- Any mix of logs, traces, and metrics',
    '- Unlimited teammates; any number of hosts',
    '- Access to the MCP Server and Noz, the SigNoz AI teammate',
    '- Support via in-product chat and email',
    `- Dedicated Slack channel on spends above ${formatUsd(DEDICATED_SUPPORT_THRESHOLD_USD)}/month`,
    `- Datadog dashboard migration support on spends above ${formatUsd(DEDICATED_SUPPORT_THRESHOLD_USD)}/month`,
    '- SOC 2 Type II and HIPAA compliant (BAA agreement available as an add-on)',
    '- Data centers in the US, EU, and India',
    '',
    '## Enterprise plan',
    '',
    `Custom pricing, starting at ${formatUsd(ENTERPRISE_FLOOR_USD)}/month. Choose one of:`,
    '',
    `- A dedicated environment on SigNoz Cloud (includes monthly ingestion usage up to ${formatUsd(ENTERPRISE_FLOOR_USD)})`,
    '- Bring your own cloud, managed by SigNoz in your cloud account',
    '- Self-hosted with a support contract',
    '',
    'Enterprise adds volume discounts and annual contracts, HIPAA/BAA and other certifications, dedicated Slack plus email and in-product support, guided migration, ongoing professional services, team training, and an SLA with downtime developer pairing. Enterprise-only features include SSO, SAML, audit logs, multi-tenancy, finer RBAC with custom roles, and per-source custom log retention.',
    '',
    '## Startup program',
    '',
    `50% off standard pricing — ${formatUsd(STARTUP_PRICE_USD)}/month instead of ${formatUsd(TEAMS_BASE_PRICE_USD)}/month. Eligibility:`,
    '',
    '- Less than 3 years old',
    '- Fewer than 30 employees',
    '- Raised less than $6 million',
    '',
    `Apply at ${siteUrl}/startups/`,
    '',
    '## How metrics samples are counted',
    '',
    'A sample is one data point from one time series. A time series reporting every 30 seconds produces 2 samples per minute.',
    '',
    `Worked example: 10,000 time series at a 30-second interval is 20,000 samples/minute, about 864 million samples/month. At ${formatUsd(cheapestMetricsPrice())} per million samples (1 month retention) that is about ${formatUsd(Math.round(864 * cheapestMetricsPrice() * 100) / 100)}/month.`,
    '',
    `Detailed walkthrough: ${siteUrl}/pricing/metrics-cost-estimation/`,
    '',
    '## Community Edition vs Teams',
    '',
    'The Community Edition is free and self-managed. SigNoz Cloud (Teams) removes cluster management and adds features not in the community build, including SSO and SAML support, plus help with initial dashboard and alert configuration.',
    '',
    '## Product areas covered on all plans',
    '',
    'APM and distributed tracing, log management, infrastructure monitoring, cloud monitoring, CI/CD observability, data exploration, exceptions monitoring, frontend and mobile monitoring, LLM monitoring, alerts management, pre-built integrations and dashboards, OpenTelemetry-native messaging queue monitoring, correlation of signals, and service dependency visualization.',
    '',
    '## Links',
    '',
    `- Pricing page: ${siteUrl}/pricing/`,
    `- Start a free trial: ${siteUrl}/teams/`,
    `- Contact sales: ${siteUrl}/contact-us/`,
    `- Metrics cost estimation: ${siteUrl}/pricing/metrics-cost-estimation/`,
    `- Cost comparison vs Datadog, New Relic, Grafana: ${siteUrl}/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/`,
    `- Datadog migration tool: ${siteUrl}/datadog-migration-tool/`,
    `- Docs: ${siteUrl}/docs/introduction/`,
    '',
    'Agent guide: /llms.txt',
    '',
  ]

  return lines.join('\n')
}
