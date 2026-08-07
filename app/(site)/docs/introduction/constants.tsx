import React from 'react'
import {
  LucideDraftingCompass,
  LucideScrollText,
  LucideChartNoAxesColumn,
  Puzzle,
  Bot,
  LucideBoxes,
  LayoutDashboard,
  TriangleAlert,
  Waypoints,
  Bug,
  ListFilter,
  BookText,
  Lock,
  Settings,
  ShieldCheck,
  HelpCircle,
  HeartPulse,
  BookOpen,
  Mail,
} from 'lucide-react'
import { SiSlack, SiGithub, SiDocker, SiLinux, SiKubernetes } from 'react-icons/si'
import type { DocsIntroCardData } from '@/components/DocsIntroCard/DocsIntroCard'
import GlobeCheck from '@/components/icons/GlobeCheck'

export type CardData = DocsIntroCardData

// Hero
export const SEARCH_PLACEHOLDERS = [
  "Hey, I'm SigNoz AI! Ask me anything about SigNoz...",
  'How do I send Python traces to SigNoz?',
  'Instrument Node.js app for APM',
  'Set up log collection from Docker containers',
  'Migrate from Datadog to SigNoz',
  'Visualize Prometheus metrics in SigNoz',
  'How to send Kubernetes logs?',
  'Migrate from Grafana to SigNoz',
  'Set up SigNoz Cloud for my team',
]

// Send Data Section
export const SEND_DATA_CARDS: CardData[] = [
  {
    title: 'APM / Send Traces',
    description: 'Send Traces and APM Data',
    href: '/docs/instrumentation/',
    icon: <LucideDraftingCompass size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Send Logs',
    description: 'Configure log collection and analysis',
    href: '/docs/logs-management/send-logs-to-signoz/',
    icon: <LucideScrollText size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Send Metrics',
    description: 'Configure metrics collection & visualization.',
    href: '/docs/metrics-management/send-metrics/',
    icon: <LucideChartNoAxesColumn size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Integrations',
    description: 'Connect SigNoz with your favorite tools',
    href: '/docs/integrations/integrations-list/',
    icon: <Puzzle size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Agent-Native',
    description: 'Use AI agents for instrumentation',
    href: '/docs/ai/overview/',
    icon: <Bot size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'API',
    description: 'Programmatic access to your telemetry data',
    href: '/api-reference/',
    icon: <GlobeCheck size={24} className="text-[var(--l1-foreground)]" />,
  },
]

// Explore SigNoz Section
export const EXPLORE_SIGNOZ_CARDS: CardData[] = [
  {
    title: 'Infrastructure Monitoring',
    description: 'Monitor your infrastructure & resources',
    href: '/docs/infrastructure-monitoring/overview/',
    icon: <LucideBoxes size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Dashboards',
    description: 'Build, share, use templates',
    href: '/docs/dashboards/overview/',
    icon: <LayoutDashboard size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Alerts',
    description: 'Monitor signals and receive timely notifications',
    href: '/docs/userguide/alerts-management/',
    icon: <TriangleAlert size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Explore Traces',
    description: 'Analyze your traces with trace explorer',
    href: '/docs/userguide/traces/',
    icon: <Waypoints size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Catch Exceptions',
    description: 'Configure exception tracking and error analysis',
    href: '/docs/userguide/exceptions/',
    icon: <Bug size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Query Builder',
    description: 'The visual query interface for signals',
    href: '/docs/userguide/query-builder-v5/',
    icon: <ListFilter size={24} className="text-[var(--l1-foreground)]" />,
  },
]

// Migrate Section
export const MIGRATE_CARDS: CardData[] = [
  {
    title: 'Migrate from DataDog',
    description: 'Step-by-step guide to migrate from Datadog',
    href: '/docs/migration/migrate-from-datadog-to-signoz/',
    icon: <BookText size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Migrate from Grafana',
    description: 'Step-by-step guide to migrate from Grafana',
    href: '/docs/migration/migrate-from-grafana-to-signoz/',
    icon: <BookText size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Migrate from New Relic',
    description: 'Step-by-step guide to migrate from New Relic',
    href: '/docs/migration/migrate-from-newrelic-to-signoz/',
    icon: <BookText size={24} className="text-[var(--l1-foreground)]" />,
  },
]

// Security & Compliance Section
export const SECURITY_CARDS: CardData[] = [
  {
    title: 'Authentication and RBAC',
    description: 'Configure user authentication',
    href: '/docs/userguide/authentication/',
    icon: <Lock size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'SSO SAML',
    description: 'Set up Single Sign-On with SAML',
    href: '/docs/manage/administrator-guide/sso/overview/',
    icon: <Settings size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Retention Period',
    description: 'Learn about data retention period',
    href: '/docs/userguide/retention-period/',
    icon: <ShieldCheck size={24} className="text-[var(--l1-foreground)]" />,
  },
]

// Troubleshooting & Community Section
export const TROUBLESHOOTING_CARDS: CardData[] = [
  {
    title: 'FAQ',
    description: 'Find solutions to common issues',
    href: '/docs/faqs/general/',
    icon: <HelpCircle size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Slack Community',
    description: 'Connect with SigNoz users and developers',
    href: 'https://signoz.io/slack',
    icon: <SiSlack className="h-6 w-6 text-[var(--l3-foreground)]" />,
    external: true,
  },
  {
    title: 'GitHub',
    description: 'Explore and contribute to SigNoz',
    href: 'https://github.com/SigNoz/signoz',
    icon: <SiGithub className="h-6 w-6 text-[var(--l3-foreground)]" />,
    external: true,
  },
  {
    title: 'Changelog',
    description: "See what's new in SigNoz",
    href: '/changelog/',
    icon: <HeartPulse size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Blog',
    description: 'Read articles and tutorials',
    href: '/blog/',
    icon: <BookOpen size={24} className="text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Newsletter',
    description: 'Curated technical content in your inbox',
    href: 'https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=docs_additional_resources&utm_campaign=newsletter',
    icon: <Mail size={24} className="text-[var(--l1-foreground)]" />,
    external: true,
  },
]

// Self-Host Section
export const SELF_HOST_CARDS: CardData[] = [
  {
    title: 'Docker',
    description: 'Run SigNoz using Docker Compose',
    href: '/docs/install/docker/',
    icon: <SiDocker className="h-6 w-6 text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Linux',
    description: 'Install on Debian/Ubuntu systems',
    href: '/docs/install/linux/',
    icon: <SiLinux className="h-6 w-6 text-[var(--l1-foreground)]" />,
  },
  {
    title: 'Kubernetes',
    description: 'Deploy using Helm charts',
    href: '/docs/install/kubernetes/',
    icon: <SiKubernetes className="h-6 w-6 text-[var(--l1-foreground)]" />,
  },
]

// CTA Section
export const CTA_STEPS = [
  {
    title: 'Sign-up to SigNoz Cloud',
    subtitle: 'Or self-host SigNoz',
  },
  {
    title: 'Instrument your application',
    subtitle: 'Or instruct your agent to do it for you',
  },
  {
    title: 'Explore your data',
    subtitle: 'Or set up extensive o11y at SigNoz.',
  },
]
