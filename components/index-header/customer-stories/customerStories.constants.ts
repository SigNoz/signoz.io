export interface CustomerStoryLogo {
  name: string
  logoSrc: string
  mono?: boolean
  width?: number
  showName?: boolean
}

export interface CustomerStoryQuote {
  text: string
  name: string
  org: string
  caseStudyHref: string | null
}

const LOGO_PATH = '/img/customers/home'
const LIVE_LOGO_IMG = '/img/homepage/customer-logos'
const LIVE_LOGO_SVG = '/svgs/customer-logos'

export const CUSTOMER_STORY_LOGOS: CustomerStoryLogo[] = [
  {
    name: 'Alien Intelligence',
    logoSrc: `${LIVE_LOGO_IMG}/alien-intelligence.webp`,
    showName: true,
  },
  { name: 'Ariso', logoSrc: `${LIVE_LOGO_IMG}/ariso.webp`, showName: true },
  { name: 'Armur AI', logoSrc: `${LIVE_LOGO_IMG}/armur-ai.webp`, showName: true },
  { name: 'Auvik', logoSrc: `${LIVE_LOGO_SVG}/auvik.svg`, width: 105 },
  { name: 'Black Forest Labs', logoSrc: '/svgs/icons/blackforestlabs.svg', width: 150 },
  { name: 'Blaxel', logoSrc: `${LOGO_PATH}/blaxel.svg` },
  { name: 'Cisco', logoSrc: `${LIVE_LOGO_SVG}/cisco.svg`, showName: true },
  { name: 'Eltropy', logoSrc: `${LOGO_PATH}/eltropy.svg`, width: 120 },
  { name: 'FiscalNote', logoSrc: `${LIVE_LOGO_IMG}/fiscalnote.webp`, showName: true },
  { name: 'Flutterwave', logoSrc: `${LIVE_LOGO_SVG}/flutterwave.svg`, mono: true, width: 125 },
  { name: 'Formance', logoSrc: `${LOGO_PATH}/formance.svg` },
  { name: 'Formstack', logoSrc: `${LIVE_LOGO_SVG}/formstack.svg`, width: 170 },
  { name: 'Harmonic Inc.', logoSrc: `${LIVE_LOGO_IMG}/harmonic.webp`, showName: true },
  { name: 'Harmonic.ai', logoSrc: `${LIVE_LOGO_SVG}/harmonic-ai.svg`, width: 130 },
  { name: 'Hedra', logoSrc: '/svgs/icons/hedra.svg', width: 110 },
  { name: 'Inkeep', logoSrc: '/svgs/icons/inkeep.svg', width: 120 },
  { name: 'Kernel', logoSrc: '/svgs/icons/kernel.svg', width: 110 },
  { name: 'Kiwi', logoSrc: `${LOGO_PATH}/kiwi.svg` },
  { name: 'Kognitos', logoSrc: '/svgs/icons/kognitos.svg', width: 190 },
  { name: 'Lenskart', logoSrc: `${LIVE_LOGO_SVG}/lenskart.svg`, mono: true, width: 125 },
  { name: 'LG Electronics', logoSrc: `${LIVE_LOGO_SVG}/lg-electronics.svg`, width: 120 },
  { name: 'Moneyhub', logoSrc: `${LIVE_LOGO_IMG}/moneyhub.webp`, showName: true },
  { name: 'Oracle', logoSrc: `${LIVE_LOGO_SVG}/oracle.svg`, width: 115 },
  { name: 'Racing & Sports', logoSrc: `${LIVE_LOGO_IMG}/racing-and-sports.webp`, showName: true },
  { name: 'Rattle', logoSrc: `${LOGO_PATH}/rattle.svg` },
  { name: 'Sail Research', logoSrc: `${LIVE_LOGO_SVG}/sail-research.svg`, mono: true, width: 115 },
  { name: 'Salient', logoSrc: '/svgs/icons/salient.svg', width: 110 },
  { name: 'Samsung', logoSrc: `${LOGO_PATH}/samsung.svg` },
  { name: 'Sarvam AI', logoSrc: `${LOGO_PATH}/sarvam.svg` },
  { name: 'Shaped', logoSrc: `${LOGO_PATH}/shaped.svg` },
  { name: 'StructureFlow', logoSrc: `${LIVE_LOGO_SVG}/structureflow.svg`, width: 190 },
  { name: 'Tavus', logoSrc: `${LOGO_PATH}/tavus.svg` },
  {
    name: 'The Website Engineer',
    logoSrc: `${LIVE_LOGO_IMG}/website-engineer.webp`,
    showName: true,
  },
  { name: 'Xata', logoSrc: `${LIVE_LOGO_SVG}/xata.svg`, showName: true },
]

export const CUSTOMER_STORY_QUOTES: CustomerStoryQuote[] = [
  {
    text: 'At Armur AI, we removed all observability tools and have been using only one — SigNoz.',
    name: 'Akhil Sharma',
    org: 'ARMUR AI',
    caseStudyHref:
      'https://www.linkedin.com/posts/akhilsails_at-armur-ai-we-removed-all-observability-activity-7363461664848957440-LbW2',
  },
  {
    text: 'We replaced our Grafana–Prometheus–Alertmanager–Loki stack with it and we are happy.',
    name: 'Andrew',
    org: '@BUZAHUZA',
    caseStudyHref: 'https://x.com/buzahuza/status/1943072730825232893',
  },
  {
    text: 'Datadog came back and said, ‘The trial’s over — it’s going to cost you over $2K.’ I was like, ‘Sorry, what?’',
    name: 'Leo Blondel',
    org: 'ALIEN INTELLIGENCE',
    caseStudyHref:
      '/customers/alien-intelligence-ai-sre-workflow-signoz/#what-leo-built-at-alien-intelligence',
  },
  {
    text: 'We chose SigNoz to tie it all together.',
    name: 'Doug Drechsel',
    org: 'ORACLE DEVELOPERS',
    caseStudyHref:
      'https://medium.com/oracledevs/observability-the-smart-way-automating-metrics-in-java-microservices-2f82340114cb',
  },
  {
    text: 'SigNoz MCP has been a very big part of our engineering life.',
    name: 'Hiro Tamada',
    org: 'KERNEL',
    caseStudyHref: '/customers/kernel/',
  },
  {
    text: 'We’ve been using SigNoz as a first-class dependency in our new agent framework.',
    name: 'Inkeep',
    org: 'INKEEP',
    caseStudyHref: 'https://docs.inkeep.com/get-started/traces',
  },
  {
    text: 'We made the switch to self-hosted SigNoz — and haven’t looked back since.',
    name: 'Eugene Evenwel',
    org: 'THE WEBSITE ENGINEER',
    caseStudyHref:
      'https://thewebsiteengineer.com/blog/how-we-saved-90-on-our-monitoring-bill-by-dropping-new-relic-for-signoz/',
  },
  {
    text: 'One environment variable. Full Kafka observability. Zero code changes.',
    name: 'Doug Drechsel',
    org: 'ORACLE',
    caseStudyHref:
      'https://www.linkedin.com/posts/dougdrechsel_streamlining-kafka-microservices-and-observability-activity-7457462317891588097-H8nC',
  },
  {
    text: 'Without centralized tracing and logging, this would have taken much longer to isolate.',
    name: 'Stelios Pavlidis',
    org: 'WHATOBLOCK.COM',
    caseStudyHref:
      'https://www.linkedin.com/posts/steliospavlidis_observability-devops-sre-activity-7417883949152174080-vGcf',
  },
  {
    text: 'Now I have a context-aware ops assistant.',
    name: 'Shawn Zhu',
    org: 'ARISO',
    caseStudyHref: 'https://ariso.ai/blog/signoz-mcp-the-morning-after',
  },
]

export const CUSTOMER_STORIES_CTA = {
  title: 'See how teams use SigNoz to resolve issues faster and build with confidence.',
  buttonLabel: 'See all customers',
  href: '/customers/',
}
