export interface CustomerStoryLogo {
  name: string
  logoSrc?: string
  sprite?: string
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

const LIVE_LOGO_IMG = '/img/homepage/customer-logos'

export const CUSTOMER_STORY_LOGOS: CustomerStoryLogo[] = [
  {
    name: 'Alien Intelligence',
    logoSrc: `${LIVE_LOGO_IMG}/alien-intelligence.webp`,
    showName: true,
  },
  { name: 'Ariso', sprite: 'ariso', mono: true, width: 117 },
  { name: 'Armur AI', logoSrc: `${LIVE_LOGO_IMG}/armur-ai.webp`, showName: true },
  { name: 'Auvik', sprite: 'auvik', width: 105 },
  { name: 'Black Forest Labs', sprite: 'blackforestlabs', width: 150 },
  { name: 'Blaxel', sprite: 'blaxel' },
  { name: 'Cisco', sprite: 'cisco', showName: true },
  { name: 'Eltropy', sprite: 'eltropy', width: 120 },
  { name: 'FiscalNote', sprite: 'fiscalnote', showName: true },
  { name: 'Flutterwave', sprite: 'flutterwave', mono: true, width: 125 },
  { name: 'Formance', sprite: 'formance' },
  { name: 'Formstack', sprite: 'formstack', width: 170 },
  { name: 'Harmonic Inc.', sprite: 'harmonic-inc', showName: true },
  { name: 'Harmonic.ai', sprite: 'harmonic-ai', width: 130 },
  { name: 'Hedra', sprite: 'hedra', width: 110 },
  { name: 'Inkeep', sprite: 'inkeep', width: 120 },
  { name: 'Kernel', sprite: 'kernel', width: 110 },
  { name: 'Kiwi', sprite: 'kiwi' },
  { name: 'Kognitos', sprite: 'kognitos', width: 190 },
  { name: 'Lenskart', sprite: 'lenskart', mono: true, width: 125 },
  { name: 'LG Electronics', sprite: 'lg-electronics', width: 120 },
  { name: 'Moneyhub', sprite: 'moneyhub', width: 170 },
  { name: 'Oracle', sprite: 'oracle', width: 115 },
  { name: 'Racing & Sports', logoSrc: `${LIVE_LOGO_IMG}/racing-and-sports.webp`, showName: true },
  { name: 'Rattle', sprite: 'rattle' },
  { name: 'Sail Research', sprite: 'sail-research', mono: true, width: 115 },
  { name: 'Salient', sprite: 'salient', width: 110 },
  { name: 'Samsung', sprite: 'samsung' },
  { name: 'Sarvam AI', sprite: 'sarvam' },
  { name: 'Shaped', sprite: 'shaped' },
  { name: 'StructureFlow', sprite: 'structureflow', width: 190 },
  { name: 'Tavus', sprite: 'tavus' },
  {
    name: 'The Website Engineer',
    logoSrc: `${LIVE_LOGO_IMG}/website-engineer.webp`,
    showName: true,
  },
  { name: 'Xata', sprite: 'xata', showName: true },
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
