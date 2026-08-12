import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { ArrowRight } from 'lucide-react'
import type {
  SupportTier,
  TableCategory,
  SeverityDefinition,
  SupportStat,
  EscalationStep,
  ContactChannel,
  ReachUsButton,
  WhyDifferentItem,
  ComplianceBadge,
} from './SupportPage.types'

export const SUPPORT_HEADER_BUTTONS = [
  {
    text: 'Get Started',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Support Hero',
    },
  },
  {
    text: 'Talk to Sales',
    href: '/contact-us/?source=support',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Contact Us Button',
      clickLocation: 'Support Hero',
    },
  },
]

export const SUPPORT_TIERS: SupportTier[] = [
  {
    name: 'Self-Hosted SigNoz: Community',
    subtitle: 'Install & manage yourself',
    cta: {
      text: 'Read Documentation',
      href: '/docs/introduction/',
      variant: 'secondary',
      tracking: { clickType: 'Secondary CTA', clickName: 'Docs Link' },
    },
  },
  {
    name: 'SigNoz Cloud: Teams',
    subtitle: 'Starts at $49/mo',
    cta: {
      text: 'Get Started - Free',
      href: '/teams/',
      variant: 'default',
      tracking: { clickType: 'Primary CTA', clickName: 'Sign Up Button' },
    },
  },
  {
    name: 'SigNoz Enterprise*',
    subtitle: 'Cloud / Self-Hosted',
    cta: {
      text: 'Contact Us',
      href: '/contact-us/?source=support',
      variant: 'secondary',
      tracking: { clickType: 'Secondary CTA', clickName: 'Enterprise Contact Button' },
    },
  },
]

export const TABLE_DATA: TableCategory[] = [
  {
    name: 'Overview',
    rows: [
      {
        label: 'Who is it for',
        community: { type: 'text', value: 'Self-Hosted SigNoz users' },
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
          value: 'In-product chat + email + dedicated Slack channel > $999',
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
        label: 'BYOC / Self-Hosted SigNoz in your VPC',
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
            Severity 1 - Critical{' '}
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
        label: 'Severity 2 - Major',
        community: { type: 'text', value: 'Best effort' },
        teams: { type: 'text', value: '1 business day' },
        enterprise: { type: 'text', value: '6 business hours' },
      },
      {
        label: 'Severity 3 - Minor / General',
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
        community: { type: 'dash' },
        teams: { type: 'link', text: 'signoz.io/status', href: 'https://status.signoz.io' },
        enterprise: { type: 'link', text: 'signoz.io/status', href: 'https://status.signoz.io' },
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

export const SEVERITY_DEFINITIONS: SeverityDefinition[] = [
  {
    level: 'Severity 1 - Critical *',
    description:
      'The production system is down or severely impaired. Data loss risk or complete loss of observability for production services. No workaround available.',
    example: 'Example: SigNoz Cloud is unreachable; traces and logs are not being ingested',
  },
  {
    level: 'Severity 2 - Major',
    description:
      'The production system is impaired with significant impact. Partial loss of functionality with no workaround, or a workaround that is not sustainable.',
    example:
      'Example: Alert notifications are not firing; dashboard load times are severely degraded',
  },
  {
    level: 'Severity 3 - Minor / General',
    description:
      'Low-impact issue or general question. The system is operational. The issue affects non-critical functionality or has a straightforward workaround.',
    example: 'Example: Dashboard configuration question; how to set up a new integration',
  },
]

export const SUPPORT_STATS: SupportStat[] = [
  {
    value: '47%',
    title: 'Reduction in MTTR & TCO',
    description:
      'Our logs, metrics, and traces work on an innovative co-related architecture so you find the needle in the haystack, faster.',
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
      'SaaS start-ups to public companies. Self-Hosted SigNoz, SigNoz Cloud, or BYOC: your choice. With enterprise-grade observability.',
  },
]

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
      'Senior SigNoz engineer joins for deeper investigation: instrumentation, ClickHouse queries, ingestion pipeline, OpenTelemetry Collector config.',
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

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    category: 'Self-Hosted SigNoz community',
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
      {
        icon: 'slack',
        text: 'Dedicated Slack channel',
        description: 'with the SigNoz team.',
      },
      {
        icon: 'user',
        text: 'Dedicated onboarding and account manager.',
      },
      {
        icon: 'sales',
        text: 'Contact Sales',
        description: 'for Enterprise Support or email to discuss SLAs, TAM, and BYOC options.',
        href: '/contact-us/?source=support-enterprise',
      },
    ],
  },
]

export const REACH_US_BUTTONS: ReachUsButton[] = [
  {
    text: 'Enterprise Support',
    href: '/contact-us/?source=support-enterprise',
    variant: 'default',
    icon: <ArrowRight size={14} />,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Enterprise Contact Button',
      clickLocation: 'Support How to Reach Us',
    },
  },
  {
    text: 'Email the team',
    href: 'mailto:cloud-support@signoz.io',
    variant: 'secondary',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Email Support Button',
      clickLocation: 'Support How to Reach Us',
    },
  },
]

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
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Support Bottom CTA',
    },
  },
  {
    text: 'Talk to Sales',
    href: '/contact-us/?source=support',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Contact Us Button',
      clickLocation: 'Support Bottom CTA',
    },
  },
]
