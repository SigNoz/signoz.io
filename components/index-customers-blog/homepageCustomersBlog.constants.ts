// Placeholder content — swap `HOMEPAGE_BLOG_CARDS` for a CMS fetch later.

export interface FeatureQuote {
  quote: string
  name: string
  role: string
  logoSrc: string | null
  tone: 'lavender' | 'citrus'
}

export const HOMEPAGE_FEATURE_QUOTES: FeatureQuote[] = [
  {
    quote:
      'We’ve transitioned from Grafana to SigNoz, offering a simplified, unified monitoring, logging, and alerting experience.',
    name: 'Mark Nelson',
    role: 'Oracle',
    logoSrc: '/svgs/customer-logos/oracle.svg',
    tone: 'lavender',
  },
  {
    quote: 'Every single time we have an issue, SigNoz is always the first place to check.',
    name: 'Karl Lyons',
    role: 'Shaped',
    logoSrc: '/img/case_study/logos/shaped-logo.svg',
    tone: 'citrus',
  },
]

export interface HomepageBlogCard {
  title: string
  href: string
  imageSrc: string | null
}

export const HOMEPAGE_BLOG_CARDS: HomepageBlogCard[] = [
  {
    title: 'How Shaped fixed a year-old latency bug with SigNoz MCP',
    href: '/blog/shaped-signoz-mcp-latency-debugging/',
    imageSrc: '/img/blog/2026/07/shaped-kathleen-blog-cover.webp',
  },
  {
    title: 'Building observability for the AI era: agent-native and AI-scale telemetry',
    href: '/blog/observability-for-the-ai-era/',
    imageSrc: '/img/blog/2026/08/AI-era.webp',
  },
  {
    title: 'Introducing the new trace detail view',
    href: '/blog/new-trace-detail-view/',
    imageSrc: '/img/blog/2026/08/new-trace-details.webp',
  },
]

export const HOMEPAGE_CUSTOMERS_STRIP = {
  lead: 'SigNoz powers',
  count: '10,000+',
  tail: 'engineering teams. From ambitious start-ups to major enterprises.',
  ctaLabel: 'Customer Stories',
  ctaHref: '/customers/',
}
