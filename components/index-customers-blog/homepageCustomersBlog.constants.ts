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
    logoSrc: null,
    tone: 'lavender',
  },
  {
    quote: 'Every single time we have an issue, SigNoz is always the first place to check.',
    name: 'Karl Lyons',
    role: 'Shaped',
    logoSrc: null,
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
    title: 'Blog post placeholder — swap with a real post',
    href: '/blog/',
    imageSrc: null,
  },
  {
    title: 'Blog post placeholder — swap with a real post',
    href: '/blog/',
    imageSrc: null,
  },
  {
    title: 'Blog post placeholder — swap with a real post',
    href: '/blog/',
    imageSrc: null,
  },
]

export const HOMEPAGE_CUSTOMERS_STRIP = {
  lead: 'SigNoz powers over',
  count: '1,000',
  tail: 'engineering teams. From ambitious start-ups to major enterprises.',
  ctaLabel: 'Customer Stories',
  ctaHref: '/customers/',
}
