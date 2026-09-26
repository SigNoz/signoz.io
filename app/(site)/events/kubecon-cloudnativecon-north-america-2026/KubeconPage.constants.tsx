import type { ButtonGroupButton } from '@/shared/components/molecules/FeaturePages/ButtonGroup/ButtonGroup.types'

/**
 * The page uses the same tactile buttons as the homepage. `lg` is the 44px
 * hero/CTA size; the default 32px size covers the inline section buttons.
 */
export const BUTTON_LG = { size: 'lg', rounded: 'default' } as const
export const BUTTON_SM = { size: 'default', rounded: 'default' } as const

const TRACKING_LOCATION = 'KubeCon NA 2026'

export const EVENT = {
  booth: '198',
  marqueeLabels: ['Booth 198', 'Meet us @KubeCon 26'],
  dateLabel: 'November 9 ⎯ 12, 2026',
  venue: 'Salt Palace Convention Center, Salt Lake City, Utah, United States',
  scheduleUrl: 'https://calendly.com/pranay-signoz/signoz-kubecon',
  signupUrl: '/teams/',
  demoUrl: '/contact-us/?source=kubecon-2026',
}

export const HERO = {
  titleLead: 'Observability for your team and AI agents.',
  titleTrail: 'Powered by open standards.',
  description:
    'SigNoz brings traces, metrics, logs, infrastructure, and LLM observability into one OpenTelemetry-native platform with simple usage-based pricing and the flexibility to run in the cloud, BYOC, or on your own infrastructure.',
  details: [
    { label: 'Date', value: EVENT.dateLabel },
    { label: 'Booth', value: EVENT.booth },
    { label: 'Location', value: EVENT.venue },
  ],
  buttons: [
    {
      text: 'Schedule a slot',
      href: EVENT.scheduleUrl,
      variant: 'tactilePrimary',
      ...BUTTON_LG,
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Schedule a Slot Link',
        clickLocation: `${TRACKING_LOCATION} Hero`,
      },
    },
    {
      text: 'Get started ⎯ free',
      href: EVENT.signupUrl,
      variant: 'tactileSecondary',
      ...BUTTON_LG,
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Sign Up Link',
        clickLocation: `${TRACKING_LOCATION} Hero`,
      },
    },
  ] satisfies ButtonGroupButton[],
}

export const WHY_SIGNOZ = {
  title: 'Why SigNoz?',
  items: [
    {
      title: 'OpenTelemetry-native',
      description:
        'Built on open standards, so your instrumentation stays portable and you avoid proprietary SDK lock-in.',
    },
    {
      title: 'Built for engineering first teams',
      description:
        'Advanced query builder with aggregation and grouping by any attribute, OpenAPI spec support, and native JSON log handling with no pre-processing required.',
    },
    {
      title: 'Unified observability',
      description:
        'Move from symptoms to evidence across APM, logs, traces, infrastructure, LLM telemetry, alerts, and dashboards in one platform.',
    },
    {
      title: 'Agent-native',
      description:
        'Connect coding agents such as Claude Code and Cursor directly to production telemetry with SigNoz MCP, or investigate using Noz inside SigNoz.',
    },
  ],
  buttons: [
    {
      text: 'Schedule a demo',
      href: EVENT.demoUrl,
      variant: 'tactileSecondary',
      ...BUTTON_LG,
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Schedule a Demo Link',
        clickLocation: `${TRACKING_LOCATION} Why SigNoz`,
      },
    },
  ] satisfies ButtonGroupButton[],
}

/** The badges noz collects are the Why SigNoz values, in order. */
export const NOZ_BADGES = WHY_SIGNOZ.items.map((item) => item.title)

export const SCALE = {
  eyebrow: 'enterprise ready',
  title: 'Built to operate at scale',
  buttons: [
    {
      text: 'Get Started',
      href: EVENT.signupUrl,
      variant: 'tactilePrimary',
      ...BUTTON_SM,
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Sign Up Link',
        clickLocation: `${TRACKING_LOCATION} Scale Stats`,
      },
    },
  ] satisfies ButtonGroupButton[],
  stats: [
    {
      value: '47%',
      label: 'reduction in mttr & tco',
      description:
        'Unified, correlated logs, metrics, and traces help teams find root causes faster.',
    },
    {
      value: '10 TB+ / day',
      label: 'ingested in a single deployment',
      description:
        'Built on ClickHouse for high-cardinality Kubernetes, microservices, and AI workloads.',
    },
    {
      value: '10,000+',
      label: 'engineering teams',
      description:
        'From seed-stage startups to public companies across cloud, self-hosted, and BYOC deployments.',
    },
  ],
}

export const SPOTLIGHT = {
  eyebrow: 'Customer Spotlight :',
  customer: 'Kernel',
  tagline: 'Fast browser infrastructure for AI agents',
  quote:
    'Without SigNoz, we cannot achieve what we promise to our users, which is crazy reliable infrastructure.',
  author: 'Hiro Tamada',
  role: 'Founding Engineer, Kernel',
  logo: '/img/case_study/logos/kernel-logo.svg',
  blocks: [
    {
      title: 'The Challenge',
      description:
        'Kernel needed to quickly isolate issues across its control plane, microVMs, bare-metal infrastructure, proxies, customer workloads, and external websites.',
    },
    {
      title: 'The Solution',
      description:
        'Kernel uses SigNoz + OpenTelemetry + SigNoz MCP to unify production telemetry and let agents investigate incidents alongside engineers.',
    },
  ],
  impact: {
    title: 'The Impact',
    latency: { from: '140ms', to: '30ms', label: ': Browser acquisition Latency' },
    items: [
      {
        title: 'Faster incident triage',
        description: 'Agents query telemetry while engineers investigate in parallel.',
      },
      {
        title: 'Fewer engineering escalations',
        description:
          'Non-engineering teams can investigate customer issues through MCP-powered workflows.',
      },
    ],
  },
  buttons: [
    {
      text: 'Read the Kernel story',
      href: '/customers/kernel/',
      variant: 'tactileSecondary',
      ...BUTTON_SM,
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Kernel Case Study Link',
        clickLocation: `${TRACKING_LOCATION} Customer Spotlight`,
      },
    },
  ] satisfies ButtonGroupButton[],
}

export const WORTH_A_READ = {
  title: 'Worth a read',
  ctaLabel: 'Read more',
  articles: [
    {
      title: 'Why Engineering-First Teams Choose SigNoz for Observability',
      description:
        'SigNoz lets teams aggregate arbitrary attributes, query nested JSON, work with OpenTelemetry data as-is, automate workflows through APIs, and create alerts around customer impact.',
      href: '/blog/why-engineering-first-teams-choose-signoz/',
      image: null,
    },
    {
      title: 'Bringing Agent-Native Observability to SigNoz',
      description:
        'What changes when AI agents become users of your observability stack? Why unified telemetry, open standards, and consistent schemas matter when agents investigate production systems.',
      href: '/blog/introducing-agent-native-observability/',
      image: '/img/blog/2026/05/agent-native-observability-cover.webp',
    },
    {
      title: 'SigNoz Cloud dashboards are now agent-native',
      description:
        'Observability interfaces built for humans and agents See how SigNoz is making dashboards easier for agents to reliably create, edit, and operate.',
      href: '/blog/agent-native-observability-dashboard/',
      image: '/img/blog/2026/08/agent-native-dashboards.webp',
    },
  ],
}

export const CLOSING_CTA = {
  titleLead: 'Meet us at KubeCon',
  titleTrail: '@ Booth 198',
  description:
    'Talk to the SigNoz team about your current observability architecture, OpenTelemetry rollout, telemetry costs, or AI-native engineering workflows.',
  image: '/img/events/kubecon-cloudnativecon-north-america-2026/kubecon-booth-illustration.webp',
  imageAlt: 'Isometric illustration of the SigNoz booth',
  buttons: [
    {
      text: 'Get Started ⎯ Free',
      href: EVENT.signupUrl,
      variant: 'tactilePrimary',
      ...BUTTON_LG,
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Sign Up Link',
        clickLocation: `${TRACKING_LOCATION} Closing CTA`,
      },
    },
    {
      text: 'Schedule a demo',
      href: EVENT.demoUrl,
      variant: 'tactileSecondary',
      ...BUTTON_LG,
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Schedule a Demo Link',
        clickLocation: `${TRACKING_LOCATION} Closing CTA`,
      },
    },
  ] satisfies ButtonGroupButton[],
}

export const SKYLINE = {
  src: '/img/events/kubecon-cloudnativecon-north-america-2026/salt-lake-city-skyline.png',
  alt: 'Dotted silhouette of the Salt Lake City skyline against the Wasatch mountains',
}
