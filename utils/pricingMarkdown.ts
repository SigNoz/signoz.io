import siteMetadata from '@/data/siteMetadata'
import {
  BASE_METRICS_PRICE_PER_MILLION_SAMPLES,
  BASE_TRACES_AND_LOGS_PRICE_PER_GB,
  METRICS_PRICES,
  MIN_METRICS_RETENTION_MONTHS,
  MIN_TRACES_AND_LOGS_RETENTION_DAYS,
  PLAN_PRICING,
  RETENTION_PERIOD,
  TRACES_AND_LOGS_PRICES,
} from '@/constants/pricing'

/**
 * Markdown twin of /pricing.
 *
 * The pricing page is a highly visual, interactive page (sliders, tabs, a
 * calculator), so its HTML-to-markdown conversion reads as UI fragments rather
 * than a price list. This builds a structured plain-markdown version instead:
 * plan tiers, per-signal rates at every retention tier, what the base fee
 * includes, worked bill examples, and the plan feature matrix — so an agent can
 * compare costs and recommend a plan without scraping the page.
 *
 * Rates come from `constants/pricing.ts`, the same source the calculator uses.
 */

const url = (path: string) => `${siteMetadata.siteUrl}${path}`

const money = (amount: number) =>
  Number.isInteger(amount) ? `$${amount.toLocaleString('en-US')}` : `$${amount.toFixed(2)}`

const formatRetentionDays = (days: number) => (days === 365 ? '1 year' : `${days} days`)

const formatRetentionMonths = (months: number) => `${months} month${months > 1 ? 's' : ''}`

const tracesAndLogsRetentionTable = () =>
  [
    '| Retention | Price per GB ingested |',
    '| --- | --- |',
    ...RETENTION_PERIOD.TRACES_AND_LOGS.map(
      ({ days }) => `| ${formatRetentionDays(days)} | ${money(TRACES_AND_LOGS_PRICES[days])} / GB |`
    ),
  ].join('\n')

const metricsRetentionTable = () =>
  [
    '| Retention | Price per million samples |',
    '| --- | --- |',
    ...RETENTION_PERIOD.METRICS.map(
      ({ months }) =>
        `| ${formatRetentionMonths(months)} | ${money(METRICS_PRICES[months])} / million samples |`
    ),
  ].join('\n')

/** Usage the Teams base fee covers, if spent entirely on one signal. */
const includedLogsAndTracesGb = Math.floor(
  PLAN_PRICING.TEAMS_MONTHLY_MINIMUM / BASE_TRACES_AND_LOGS_PRICE_PER_GB
)
const includedMetricSamplesMillions = Math.floor(
  PLAN_PRICING.TEAMS_MONTHLY_MINIMUM / BASE_METRICS_PRICE_PER_MILLION_SAMPLES
)

const ALL_PLAN_FEATURES: Array<{ category: string; features: string[] }> = [
  {
    category: 'APM & distributed tracing',
    features: [
      'Out-of-the-box APM metrics (latency, error rate, throughput, apdex)',
      'Filter traces and build dashboards on trace data',
      'Alerts on trace data, with unlimited dashboards and alerts',
      'Advanced visualization for very large traces (>10K spans)',
      'Third-party API monitoring with error rates and latency tracking',
    ],
  },
  {
    category: 'Log management',
    features: [
      'Log parsing via pipelines',
      'Direct filters from JSON logs',
      'Saved views and live tail',
      'Unlimited dashboards and alerts on log data',
    ],
  },
  {
    category: 'Infrastructure monitoring',
    features: [
      'Out-of-the-box host metrics dashboards',
      'Kubernetes and container monitoring',
      'Unlimited dashboards and alerts on metrics',
    ],
  },
  {
    category: 'Cloud monitoring',
    features: [
      'AWS (EC2, ECS, EKS, Lambda, RDS, ELB, VPC)',
      'Azure (VM, App Service, Functions, AKS, Container Apps, SQL DB)',
      'GCP (Compute Engine, GKE, Cloud Run, Cloud Functions, App Engine)',
      'Correlation across cloud service metrics, logs, and traces',
    ],
  },
  {
    category: 'CI/CD observability',
    features: [
      'Pipeline health and performance monitoring',
      'DORA metrics tracking',
      'Repository health and PR metrics',
      'Pipeline flakiness detection',
    ],
  },
  {
    category: 'Data exploration',
    features: [
      'Metrics Explorer with search, query, and quick filters',
      'Traces Explorer with List, Trace, Time Series, and Table views',
      'Query Builder with filtering, aggregation, and math functions',
    ],
  },
  {
    category: 'Frontend, mobile & LLM monitoring',
    features: [
      'Web Vitals monitoring for frontend applications',
      'Mobile app monitoring (iOS, Android, Flutter)',
      'LLM observability with OpenTelemetry, Langtrace, and OpenLLMetry',
      'Vector database monitoring with OpenLIT',
    ],
  },
  {
    category: 'Alerts & correlation',
    features: [
      'Alerts created directly from dashboards',
      'Slack, PagerDuty, Opsgenie, MS Teams, and webhook alert channels',
      'Alerts as code',
      'Correlation: APM metrics to traces, traces to logs, logs to traces, logs to infra metrics',
      'Service dependency map with health indication',
      'Exceptions view built on trace data',
      'Messaging queue monitoring (producer latency, consumer lag, partition latency)',
    ],
  },
  {
    category: 'Access & configuration',
    features: [
      'SSO support',
      'Dashboard locking and access control',
      'API keys for querying SigNoz from anywhere',
    ],
  },
]

const PLAN_DIFFERENCES: Array<{
  feature: string
  community: string
  teams: string
  enterprise: string
}> = [
  { feature: 'Anomaly detection alerts', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'Single-click AWS integrations', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  {
    feature:
      'Pre-built integrations & dashboards (ElastiCache Redis, RDS MySQL/PostgreSQL, ClickHouse, MongoDB, NGINX, PostgreSQL, Redis)',
    community: 'No',
    teams: 'Yes',
    enterprise: 'Yes',
  },
  { feature: 'SAML support', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'Multiple ingestion keys', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'Rate limits per ingestion key', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'SOC 2 Type II compliance', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'HIPAA compliance', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  { feature: 'BAA agreement', community: 'No', teams: 'Add-on', enterprise: 'Yes' },
  {
    feature: 'Data residency (US, EU, India data centers)',
    community: 'Self-managed',
    teams: 'Yes',
    enterprise: 'Yes',
  },
  { feature: 'Email support', community: 'No', teams: 'Yes', enterprise: 'Yes' },
  {
    feature: 'In-product chat support',
    community: 'No',
    teams: 'Yes',
    enterprise: 'Yes (Enterprise Cloud)',
  },
  {
    feature: 'Dedicated Slack channel',
    community: 'No',
    teams: `For spend above ${money(PLAN_PRICING.TEAMS_DEDICATED_SUPPORT_SPEND_THRESHOLD)}/mo`,
    enterprise: 'Yes',
  },
  {
    feature: 'Datadog dashboard migration support',
    community: 'No',
    teams: `For spend above ${money(PLAN_PRICING.TEAMS_DEDICATED_SUPPORT_SPEND_THRESHOLD)}/mo`,
    enterprise: 'Yes',
  },
  { feature: 'Team training', community: 'No', teams: 'No', enterprise: 'Yes' },
  {
    feature: 'Dashboard configuration & instrumentation support',
    community: 'No',
    teams: 'No',
    enterprise: 'Yes',
  },
  {
    feature: 'SLA with downtime developer pairing',
    community: 'No',
    teams: 'No',
    enterprise: 'Yes',
  },
  {
    feature: 'Security tightening for on-premise installs',
    community: 'No',
    teams: 'No',
    enterprise: 'Yes (Enterprise self-managed)',
  },
  {
    feature: 'Monitor health of SigNoz',
    community: 'No',
    teams: 'No',
    enterprise: 'Yes (Enterprise self-managed)',
  },
  { feature: 'Fine-grained RBAC', community: 'No', teams: 'No', enterprise: 'Beta' },
  { feature: 'Audit logs', community: 'No', teams: 'No', enterprise: 'Coming soon' },
  { feature: 'Multi-tenancy', community: 'No', teams: 'No', enterprise: 'Coming soon' },
  {
    feature: 'Custom retention per log source',
    community: 'No',
    teams: 'Coming soon',
    enterprise: 'Coming soon',
  },
]

const planDifferencesTable = () =>
  [
    '| Feature | Community (self-hosted) | Teams (Cloud) | Enterprise |',
    '| --- | --- | --- | --- |',
    ...PLAN_DIFFERENCES.map(
      ({ feature, community, teams, enterprise }) =>
        `| ${feature} | ${community} | ${teams} | ${enterprise} |`
    ),
  ].join('\n')

export function buildPricingMarkdown(): string {
  const teamsMinimum = money(PLAN_PRICING.TEAMS_MONTHLY_MINIMUM)
  const perGb = money(BASE_TRACES_AND_LOGS_PRICE_PER_GB)
  const perMillion = money(BASE_METRICS_PRICE_PER_MILLION_SAMPLES)

  return `# SigNoz Pricing

> SigNoz Cloud is usage-based: you pay for the telemetry you ingest, not for users, hosts, or custom metrics. Teams starts at ${teamsMinimum}/month including ${teamsMinimum} of usage, with logs and traces from ${perGb}/GB ingested and metrics from ${perMillion}/million samples. Self-Hosted SigNoz (Community Edition) is free and open source.

The [pricing page](${url('/pricing/')}) is the source of truth for current rates. This is its markdown twin, built from the same rate data the pricing calculator uses.

## Plans at a Glance

| | Community Edition | Teams (SigNoz Cloud) | Enterprise |
| --- | --- | --- | --- |
| **Price** | Free, open source | From ${teamsMinimum}/month, usage-based | Custom, from ${money(PLAN_PRICING.ENTERPRISE_MONTHLY_MINIMUM)}/month |
| **Hosting** | You self-host and operate it | Fully managed by SigNoz | Dedicated SigNoz Cloud, BYOC, or self-hosted with enterprise support |
| **Best for** | Teams with DevOps capacity that want full control | Fast-scaling teams that want zero operational overhead | Orgs needing data residency, compliance, volume discounts, or dedicated environments |
| **Included usage** | N/A (you pay your own infra costs) | ${teamsMinimum} of telemetry usage per month | Ingestion usage up to ${money(PLAN_PRICING.ENTERPRISE_MONTHLY_MINIMUM)} per month |
| **Users / hosts** | Unlimited | Unlimited, no per-seat or per-host charge | Unlimited |
| **Support** | Community Slack | In-product chat, email, community Slack | Dedicated Slack, email, in-product chat, SLA |

There is no per-user, per-host, or custom-metric pricing on any plan.

## Usage-Based Rates (SigNoz Cloud)

Two things drive your bill: how much telemetry you ingest, and how long you retain it. Each signal is priced separately, and longer retention costs more per unit.

| Signal | Billed by | Starting rate | Minimum retention |
| --- | --- | --- | --- |
| Logs | Volume ingested (GB) | ${perGb} / GB | ${formatRetentionDays(MIN_TRACES_AND_LOGS_RETENTION_DAYS)} |
| Traces | Volume ingested (GB) | ${perGb} / GB | ${formatRetentionDays(MIN_TRACES_AND_LOGS_RETENTION_DAYS)} |
| Metrics | Samples ingested (millions) | ${perMillion} / million samples | ${formatRetentionMonths(MIN_METRICS_RETENTION_MONTHS)} |

Retention is set per signal, so logs, traces, and metrics can each use a different tier.

### Logs and Traces by Retention

${tracesAndLogsRetentionTable()}

### Metrics by Retention

${metricsRetentionTable()}

Retention cannot be set below ${formatRetentionDays(MIN_TRACES_AND_LOGS_RETENTION_DAYS)} for logs and traces or ${formatRetentionMonths(MIN_METRICS_RETENTION_MONTHS)} for metrics. To change retention, contact the SigNoz team through in-product chat or email; changes apply to newly ingested data only.

## What Counts as Usage

- **Logs and traces** are billed on ingested volume in GB, including attributes, so records with more or larger attributes cost more. Dropping unneeded logs and spans, trimming attributes, and sampling traces all reduce volume.
- **Metrics** are billed on sample count. A sample is one data point for one time series at one point in time, so sample count grows with cardinality (number of unique series) and scrape frequency.

Example: 10,000 time series reporting every 30s produce 2 samples per series per minute, so 20,000 samples/minute, about 864 million samples/month. At ${perMillion}/million that is ${money(864 * BASE_METRICS_PRICE_PER_MILLION_SAMPLES)}/month. See [how metrics pricing is calculated](${url('/pricing/metrics-cost-estimation/')}).

## What the ${teamsMinimum}/Month Teams Minimum Includes

The Teams plan has a ${teamsMinimum}/month minimum (listed on the pricing page as a discount from ${money(PLAN_PRICING.TEAMS_LIST_PRICE)}/month) that also acts as your included usage allowance:

- ${teamsMinimum} of telemetry usage per month — any mix of logs, traces, and metrics. At base rates that is roughly ${includedLogsAndTracesGb} GB of logs or traces, or ${includedMetricSamplesMillions} million metric samples.
- Access to every platform feature.
- Unlimited teammates and any number of monitored hosts.
- Access to the SigNoz MCP Server and Noz, the SigNoz AI teammate.
- Support via in-product chat, email, and Slack.
- SOC 2 Type II and HIPAA compliance.
- Choice of data center region: US, EU, or India.

Beyond the included ${teamsMinimum}, you pay standard per-signal rates for the overage.

## Estimating Your Monthly Bill

\`\`\`
usage       = (logs GB x logs rate) + (traces GB x traces rate) + (metric samples in millions x metrics rate)
monthly bill = max(${PLAN_PRICING.TEAMS_MONTHLY_MINIMUM}, usage)
\`\`\`

Worked examples, all at minimum retention (${formatRetentionDays(MIN_TRACES_AND_LOGS_RETENTION_DAYS)} logs/traces, ${formatRetentionMonths(MIN_METRICS_RETENTION_MONTHS)} metrics):

| Monthly ingestion | Usage cost | Bill |
| --- | --- | --- |
| 50 GB logs, 20 GB traces, 100 mn metric samples | $31 | ${teamsMinimum} (within included usage) |
| 300 GB logs, 200 GB traces, 500 mn metric samples | $200 | $200 |
| 2,000 GB logs, 1,000 GB traces, 5,000 mn metric samples | $1,400 | $1,400 |

Longer retention raises the per-unit rate, so it also uses up the included ${teamsMinimum} faster. Use the [pricing calculator](${url('/pricing/#estimate-your-monthly-bill')}) for an exact estimate, and set [ingestion key limits](${url('/docs/ingestion/signoz-cloud/keys/#add-limits-to-a-key')}) if you want a hard ceiling on spend.

## Enterprise

Enterprise starts at ${money(PLAN_PRICING.ENTERPRISE_MONTHLY_MINIMUM)}/month, which includes monthly ingestion usage up to that amount. Choose one of three deployment options:

- **SigNoz Cloud: Dedicated** — a dedicated environment run by SigNoz.
- **SigNoz Cloud: BYOC** — managed by SigNoz in your own cloud account.
- **Self-Hosted SigNoz with enterprise support** — your team operates infrastructure, storage, scaling, upgrades, and backups.

Enterprise adds volume discounts and annual contracts, HIPAA and BAA options for eligible contracts, dedicated Slack/email/in-product support, guided migration support, ongoing professional services, team training, and an SLA with downtime developer pairing. [Contact the SigNoz team](${url('/contact-us/')}) to discuss.

## Startup Program

Eligible startups get SigNoz Cloud for ${money(PLAN_PRICING.STARTUP_MONTHLY_MINIMUM)}/month for the first 12 months instead of ${teamsMinimum}/month, including ${money(PLAN_PRICING.STARTUP_MONTHLY_MINIMUM)} of telemetry usage. Eligibility requires all of:

- Less than 3 years old
- Fewer than 30 employees
- Raised less than $6 million

Apply on the [SigNoz for Startups](${url('/startups/')}) page.

## Community Edition (Self-Hosted)

Self-Hosted SigNoz is free and open source. There is no ingestion bill; you provision the infrastructure and manage deployment, scaling, storage, and upgrades yourself. Start from the [self-hosting docs](${url('/docs/install/self-host/')}).

SigNoz is dual-licensed: everything outside \`ee/\` and \`cmd/enterprise/\` is MIT, and those two directories are governed by the SigNoz Enterprise License.

## Feature Availability

### Included on Every Plan

${ALL_PLAN_FEATURES.map(
  ({ category, features }) =>
    `**${category}**\n\n${features.map((feature) => `- ${feature}`).join('\n')}`
).join('\n\n')}

### Where Plans Differ

${planDifferencesTable()}

## Billing and Payment

- **Payment method:** add a credit card in the Billing section of your SigNoz Cloud account, where you can also see current usage.
- **AWS Marketplace:** subscribe to SigNoz on AWS Marketplace to bill SigNoz Cloud through your AWS account. After subscribing, activate on the [AWS Marketplace activation page](${url('/aws/signup/')}) with the license key from **Settings → Account Settings → License**.
- **Trials:** if no payment method is added before a trial ends, the deployment is deleted after a 7-day grace period, with email reminders beforehand.
- **Cancellation:** go to **Settings → Billing → Cancel subscription**, or reach out through in-product chat.

## Controlling Costs

- [Cost Meter](${url('/docs/cost-meter/overview/')}): real-time ingestion and cost by signal, with hourly granularity.
- [Meter Explorer](${url('/docs/cost-meter/meter-explorer/')}): break usage down by service, team, or attribute to find cost drivers.
- [Cost alerts](${url('/docs/cost-meter/alerts/')}): get notified before you exceed a budget.
- [Reduce metrics costs](${url('/docs/metrics-management/reducing-costs/')}): control cardinality, the main lever for metrics spend.
- [Drop logs](${url('/docs/logs-management/guides/drop-logs/')}) and [drop spans](${url('/docs/traces-management/guides/drop-spans/')}): stop paying for telemetry you never query.

## Related Pages

- [Pricing page](${url('/pricing/')}): current rates, interactive calculator, and full feature matrix.
- [Pricing calculator](${url('/pricing/#estimate-your-monthly-bill')}): estimate your monthly bill.
- [Metrics cost estimation](${url('/pricing/metrics-cost-estimation/')}): how metric samples are counted and priced.
- [SigNoz vs Datadog vs New Relic vs Grafana pricing comparison](${url('/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/')}).
- [Sign up for SigNoz Cloud](${url('/teams/')}).
- [llms.txt](${url('/llms.txt')}): index of SigNoz docs and markdown endpoints.

Source: ${url('/pricing/')}
`
}
