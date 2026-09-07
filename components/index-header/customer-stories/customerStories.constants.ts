// Placeholder data — marketing finalizes logos, quotes and case-study links here.

export interface CustomerStoryLogo {
  name: string
  logoSrc: string
  caseStudyHref: string | null
}

export interface CustomerStoryQuote {
  text: string
  name: string
  org: string
  caseStudyHref: string | null
}

const LOGO_PATH = '/img/customers/home'

export const CUSTOMER_STORY_LOGOS: CustomerStoryLogo[] = [
  { name: 'Black Forest Labs', logoSrc: `${LOGO_PATH}/blackforestlabs.svg`, caseStudyHref: null },
  { name: 'Blaxel', logoSrc: `${LOGO_PATH}/blaxel.svg`, caseStudyHref: null },
  { name: 'Comcast', logoSrc: `${LOGO_PATH}/comcast.svg`, caseStudyHref: null },
  { name: 'Fero', logoSrc: `${LOGO_PATH}/fero.svg`, caseStudyHref: null },
  { name: 'Formance', logoSrc: `${LOGO_PATH}/formance.svg`, caseStudyHref: null },
  { name: 'Kiwi', logoSrc: `${LOGO_PATH}/kiwi.svg`, caseStudyHref: null },
  { name: 'Lovart', logoSrc: `${LOGO_PATH}/lovart.svg`, caseStudyHref: null },
  { name: 'NetApp', logoSrc: `${LOGO_PATH}/netApp.svg`, caseStudyHref: null },
  { name: 'Rattle', logoSrc: `${LOGO_PATH}/rattle.svg`, caseStudyHref: null },
  { name: 'Salesforce', logoSrc: `${LOGO_PATH}/salesforce.svg`, caseStudyHref: null },
  { name: 'Samsung', logoSrc: `${LOGO_PATH}/samsung.svg`, caseStudyHref: null },
  { name: 'Sarvam', logoSrc: `${LOGO_PATH}/sarvam.svg`, caseStudyHref: null },
  { name: 'Shaped', logoSrc: `${LOGO_PATH}/shaped.svg`, caseStudyHref: null },
  { name: 'Tavus', logoSrc: `${LOGO_PATH}/tavus.svg`, caseStudyHref: null },
]

// Real quotes; keep disjoint from the customers-section feature cards.
export const CUSTOMER_STORY_QUOTES: CustomerStoryQuote[] = [
  {
    text: 'At Armur AI, we removed all observability tools and have been using only one — SigNoz.',
    name: 'Akhil Sharma',
    org: 'ARMUR AI',
    caseStudyHref: null,
  },
  {
    text: 'We replaced our Grafana–Prometheus–Alertmanager–Loki stack with it and we are happy.',
    name: 'Andrew',
    org: '@BUZAHUZA',
    caseStudyHref: null,
  },
  {
    text: 'We’ve been using SigNoz as a first-class dependency in our new agent framework.',
    name: 'Inkeep',
    org: 'INKEEP',
    caseStudyHref: null,
  },
  {
    text: 'We made the switch to self-hosted SigNoz — and haven’t looked back since.',
    name: 'Eugene Evenwel',
    org: 'THE WEBSITE ENGINEER',
    caseStudyHref: null,
  },
]

export const CUSTOMER_STORIES_CTA = {
  title: 'See how teams use SigNoz to resolve issues faster and build with confidence.',
  buttonLabel: 'See all customers',
  href: '/customers/',
}
