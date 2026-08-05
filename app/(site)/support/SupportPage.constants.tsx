import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { ReactNode } from 'react'

export const SUPPORT_HEADER_BUTTONS = [
  {
    text: 'Get Started',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
  },
  {
    text: 'Talk to Sales',
    href: '/contact-us/?source=support',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
  },
]

export const TRUSTED_BY_LOGOS = [
  { src: '/img/users/super.svg', alt: 'Super', width: 134, height: 28 },
  { src: '/img/users/hashnode.svg', alt: 'Hashnode', width: 166, height: 28 },
  { src: '/img/users/zapier.svg', alt: 'Zapier', width: 103, height: 28 },
  { src: '/img/users/incident_io.svg', alt: 'incident.io', width: 112, height: 28 },
  { src: '/img/users/mintlify.svg', alt: 'Mintlify', width: 129, height: 28 },
]

export interface SupportTier {
  name: string
  subtitle?: string
  cta?: { text: string; href: string; variant: 'default' | 'secondary' }
}

export const SUPPORT_TIERS: SupportTier[] = [
  {
    name: 'Community',
  },
  {
    name: 'Teams',
    cta: { text: 'Get Started', href: '/teams/', variant: 'default' },
  },
  {
    name: 'Enterprise*',
    subtitle: 'Cloud / Self-Hosted',
    cta: {
      text: 'Contact us',
      href: '/contact-us/?source=support-enterprise',
      variant: 'secondary',
    },
  },
]

export type CellValue =
  | { type: 'text'; value: string }
  | { type: 'check' }
  | { type: 'dash' }
  | { type: 'link'; text: string; href: string }
  | { type: 'check-text'; value: string }

export interface TableRow {
  label: string | ReactNode
  community: CellValue
  teams: CellValue
  enterprise: CellValue
}

export interface TableCategory {
  name: string
  rows: TableRow[]
}

export const TABLE_DATA: TableCategory[] = [
  {
    name: 'Overview',
    rows: [
      {
        label: 'Who is it for',
        community: { type: 'text', value: 'Open-source, self-hosted users' },
        teams: { type: 'text', value: 'SigNoz Cloud teams' },
        enterprise: {
          type: 'text',
          value: 'Larger orgs that need data residency, compliance, & support',
        },
      },
      {
        label: 'Support Channel',
        community: { type: 'text', value: 'Slack community + GitHub discussions' },
        teams: {
          type: 'text',
          value: 'In-product chat + email + dedicated Slack channel',
        },
        enterprise: {
          type: 'text',
          value: 'In-product chat + email + dedicated Slack channel',
        },
      },
      {
        label: 'SOC II / HIPAA Compliance',
        community: { type: 'dash' },
        teams: { type: 'check' },
        enterprise: { type: 'check' },
      },
      {
        label: 'BYOC / Self-hosted in your VPC',
        community: { type: 'check' },
        teams: { type: 'dash' },
        enterprise: { type: 'check' },
      },
      {
        label: 'Migration Tools ***',
        community: { type: 'text', value: 'Self-serve Datadog migration' },
        teams: { type: 'text', value: 'Self-serve Datadog migration' },
        enterprise: { type: 'text', value: 'Self-serve Datadog migration' },
      },
    ],
  },
  {
    name: 'First Response Time',
    rows: [
      {
        label: (
          <span>
            Severity 1 &mdash; Critical{' '}
            <span role="img" aria-label="fire">
              🔥
            </span>
          </span>
        ),
        community: { type: 'text', value: 'Best effort' },
        teams: { type: 'text', value: '6 business hours' },
        enterprise: { type: 'text', value: '3 business hours**' },
      },
      {
        label: 'Severity 2 — Major',
        community: { type: 'text', value: 'Best effort' },
        teams: { type: 'text', value: '1 business day' },
        enterprise: { type: 'text', value: '6 business hours' },
      },
      {
        label: 'Severity 3 — Minor / General',
        community: { type: 'text', value: 'Best effort' },
        teams: { type: 'text', value: '2 business days' },
        enterprise: { type: 'text', value: '1 business day' },
      },
    ],
  },
  {
    name: 'Support',
    rows: [
      {
        label: 'Onboarding',
        community: { type: 'text', value: 'Docs + Community' },
        teams: { type: 'text', value: 'For spend > $999' },
        enterprise: { type: 'text', value: 'Dedicated onboarding engineer**' },
      },
      {
        label: 'Migration',
        community: { type: 'text', value: 'Self-serve' },
        teams: { type: 'text', value: 'For spend > $999' },
        enterprise: { type: 'check-text', value: 'Included**' },
      },
      {
        label: 'Instrumentation Help',
        community: { type: 'text', value: 'Community' },
        teams: { type: 'dash' },
        enterprise: { type: 'check-text', value: 'Included**' },
      },
      {
        label: 'Dashboard Setup',
        community: { type: 'text', value: 'Self-serve' },
        teams: { type: 'dash' },
        enterprise: { type: 'check-text', value: 'Included**' },
      },
      {
        label: 'Status Page',
        community: { type: 'link', text: 'signoz.io/status', href: 'https://status.signoz.io' },
        teams: { type: 'check' },
        enterprise: { type: 'check' },
      },
      {
        label: 'Technical Account Manager',
        community: { type: 'dash' },
        teams: { type: 'dash' },
        enterprise: { type: 'check-text', value: 'Available**' },
      },
    ],
  },
]

export const TABLE_FOOTNOTES = [
  '* Enterprise Annual contracts over $4000 Monthly',
  '** Based on individual contracts',
  '*** We are working on adding more self-serve migration tools',
]

export interface SeverityDefinition {
  level: string
  description: string
  example: string
}

export const SEVERITY_DEFINITIONS: SeverityDefinition[] = [
  {
    level: 'Severity 1 — Critical *',
    description:
      'The production system is down or severely impaired. Data loss risk or complete loss of observability for production services. No workaround available.',
    example: 'Example: SigNoz Cloud is unreachable; traces and logs are not being ingested',
  },
  {
    level: 'Severity 2 — Major',
    description:
      'The production system is impaired with significant impact. Partial loss of functionality with no workaround, or a workaround that is not sustainable.',
    example:
      'Example: Alert notifications are not firing; dashboard load times are severely degraded',
  },
  {
    level: 'Severity 3 — Minor / General',
    description:
      'Low-impact issue or general question. The system is operational. The issue affects non-critical functionality or has a straightforward workaround.',
    example: 'Example: Dashboard configuration question; how to set up a new integration',
  },
]

export interface SupportStat {
  value: string
  title: string
  description: string
}

export const SUPPORT_STATS: SupportStat[] = [
  {
    value: '47%',
    title: 'Reduction in MTTR & TCO',
    description:
      'Our logs, metrics, and traces work on an innovative co-related architecture so you find the needle in the haystack — faster.',
  },
  {
    value: '10 TB+/day',
    title: 'Daily ingest for a single deployment',
    description:
      'ClickHouse core handles high scalability Kubernetes and AI workloads at scale. 50% higher throughput guaranteed.',
  },
  {
    value: '1000+',
    title: 'Engineering teams in production',
    description:
      'SaaS start-ups to public companies. Self-hosted, cloud, or BYOC — your choice. With enterprise-grade observability.',
  },
]

export interface EscalationStep {
  level: string
  title: string
  description: string
}

export const ESCALATION_STEPS: EscalationStep[] = [
  {
    level: 'L1',
    title: 'First Response',
    description:
      'SigNoz support team acknowledges your case, classifies severity, and begins investigation.',
  },
  {
    level: 'L2',
    title: 'Technical Escalation',
    description:
      'Senior SigNoz engineer joins for deeper investigation – instrumentation, ClickHouse queries, ingestion pipeline, OpenTelemetry Collector config.',
  },
  {
    level: 'L3',
    title: 'Engineering Escalation',
    description:
      'Issue escalated to SigNoz core engineering team for product-level investigation or hotfix.',
  },
  {
    level: 'L4',
    title: 'Executive Escalation',
    description:
      'For Enterprise accounts: direct escalation to SigNoz leadership for business-critical situations.',
  },
]

export interface ContactChannel {
  category: string
  items: { icon?: string; text: string; description?: string; href?: string }[]
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    category: 'Community (Open Source)',
    items: [
      {
        icon: 'slack',
        text: 'Slack Community',
        description: 'fastest response from the community and SigNoz team.',
        href: 'https://signoz.io/slack/',
      },
      {
        icon: 'github',
        text: 'GitHub Discussions',
        description: 'feature ideas, architecture questions, community help.',
        href: 'https://github.com/SigNoz/signoz/discussions',
      },
      {
        icon: 'docs',
        text: 'Documentation',
        description: 'self-serve setup guides for every integration.',
        href: 'https://signoz.io/docs/',
      },
    ],
  },
  {
    category: 'Teams (SigNoz Cloud)',
    items: [
      {
        icon: 'chat',
        text: 'In-product Chat',
        description: 'reach out to us right from your SigNoz console.',
      },
      {
        icon: 'email',
        text: 'cloud-support@signoz.io',
        description: 'for billing, account, and non-urgent queries.',
        href: 'mailto:cloud-support@signoz.io',
      },
    ],
  },
  {
    category: 'Enterprise',
    items: [
      { text: 'Your dedicated Slack channel with the SigNoz team.' },
      { text: 'Dedicated onboarding and account manager.' },
      {
        text: 'Contact Sales for Enterprise Support or email to discuss SLAs, TAM, and BYOC options.',
      },
    ],
  },
]

export interface WhyDifferentItem {
  title: string
  description: string
}

export const WHY_DIFFERENT_ITEMS: WhyDifferentItem[] = [
  {
    title: 'Engineers talk to engineers',
    description:
      'Every support interaction at SigNoz is handled by someone who has shipped observability infrastructure. No tier 1 script readers. When you open a Sev 1, you can be assured that your query will be resolved.',
  },
  {
    title: 'Migration support included',
    description:
      "Moving from Datadog, Grafana, or another tool? We've done this hundreds of times. Enterprise and Cloud plans include a migration support where we help you replicate dashboards, alerts, and instrumentation so you see value in days, not weeks.",
  },
  {
    title: 'Committed to open source. Always.',
    description:
      "SigNoz is open source at its foundation with the same code, the same backend, the same roadmap whether you're on Community or Enterprise. 25,000+ GitHub stars. CLI-native. ClickHouse-backed. When you raise a bug, the person responding can merge the fix. That's what open source support actually looks like.",
  },
]

export interface ComplianceBadge {
  src: string
  alt: string
  width: number
  height: number
}

export const COMPLIANCE_BADGES: ComplianceBadge[] = [
  { src: '/svgs/icons/SOC-2.svg', alt: 'SOC 2 Type II', width: 80, height: 80 },
  { src: '/svgs/icons/hipaa.svg', alt: 'HIPAA', width: 80, height: 80 },
]

export const COMPLIANCE_LINKS = [
  {
    text: 'status.signoz.io',
    href: 'https://status.signoz.io',
    label: 'Status Page',
  },
  {
    text: 'trust.signoz.io',
    href: 'https://trust.signoz.io',
    label: 'Security Documentation',
  },
  {
    text: 'signoz.io/privacy',
    href: 'https://signoz.io/privacy',
    label: 'Privacy Policy',
  },
]

export const BOTTOM_CTA_BUTTONS = [
  {
    text: 'Get Started',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
  },
  {
    text: 'Talk to Sales',
    href: '/contact-us/?source=support',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
  },
]
