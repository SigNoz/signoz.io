export const customerStoryFilters = [
  'All stories',
  'AI & agent workflows',
  'Logs & alerting',
  'Tracing & performance',
  'Kubernetes & infrastructure',
  'Tool consolidation',
] as const

export type CustomerStoryFilter = (typeof customerStoryFilters)[number]

export type CustomerStory = {
  company: string
  description: string
  featured?: boolean
  filters: Exclude<CustomerStoryFilter, 'All stories'>[]
  href: string
  logo: string
  logoAlt: string
  person: string
  publishedAt: string
  quote?: string
  role: string
  showCompanyNameWithLogo?: boolean
  takeaway?: string
  takeawayLabel?: string
  title: string
  type: 'Customer story' | 'From the SigNoz blog'
}

export const customerStories: CustomerStory[] = [
  {
    company: 'Kernel',
    description:
      'Kernel uses SigNoz MCP and OpenTelemetry-native observability to debug browser infrastructure and reduce browser acquisition latency from 140ms to 30ms.',
    featured: true,
    filters: ['AI & agent workflows', 'Tracing & performance'],
    href: '/customers/kernel/',
    logo: '/img/case_study/logos/kernel-logo.svg',
    logoAlt: 'Kernel',
    person: 'Hiro Tamada',
    publishedAt: '2026-06-02',
    quote: 'SigNoz MCP has been a very big part of our engineering life.',
    role: 'Founding Engineer',
    takeaway: '140ms → 30ms',
    takeawayLabel: 'Browser acquisition latency reduced with SigNoz.',
    title: 'How Kernel reduced browser acquisition latency from 140ms to 30ms',
    type: 'Customer story',
  },
  {
    company: 'Shaped',
    description:
      'Shaped consolidated CloudWatch and Honeycomb into one place for logs, metrics, and traces, making incidents faster to investigate.',
    featured: true,
    filters: [
      'AI & agent workflows',
      'Logs & alerting',
      'Tracing & performance',
      'Kubernetes & infrastructure',
      'Tool consolidation',
    ],
    href: '/customers/shaped/',
    logo: '/img/case_study/logos/shaped-logo.svg',
    logoAlt: 'Shaped',
    person: 'Karl Lyons',
    publishedAt: '2025-07-01',
    quote: 'Every single time we have an issue, SigNoz is always the first place to check.',
    role: 'Site Reliability Engineer',
    takeaway: '3 signals. 1 platform.',
    takeawayLabel: 'Logs, metrics, and traces consolidated in SigNoz.',
    title: 'How Shaped moved from a siloed toolset to one-stop observability',
    type: 'Customer story',
  },
  {
    company: 'Alien Intelligence',
    description:
      'Alien Intelligence built an AI SRE workflow on SigNoz to triage alerts, reduce noise, and keep humans in the loop.',
    featured: true,
    filters: ['AI & agent workflows', 'Logs & alerting'],
    href: '/customers/alien-intelligence-ai-sre-workflow-signoz/',
    logo: '/img/homepage/customer-logos/alien-intelligence.webp',
    logoAlt: 'Alien Intelligence',
    person: 'Leo Blondel',
    publishedAt: '2026-06-11',
    quote:
      'Datadog came back and said, “The trial’s over — it’s going to cost you over $2K.” I was like, “Sorry, what?”',
    role: 'CTO',
    showCompanyNameWithLogo: true,
    title: 'How Alien Intelligence built an AI SRE workflow with SigNoz',
    type: 'Customer story',
  },
  {
    company: 'Inkeep',
    description:
      'Inkeep monitors its AI agent framework with SigNoz and OpenTelemetry, tracing agent runs, tool calls, and token usage.',
    featured: true,
    filters: ['AI & agent workflows', 'Tracing & performance'],
    href: '/customers/inkeep-ai-agent-monitoring/',
    logo: '/svgs/icons/inkeep.svg',
    logoAlt: 'Inkeep',
    person: 'Shagun Singh',
    publishedAt: '2025-12-15',
    quote: 'We’ve been using SigNoz as a first-class dependency in our new agent framework.',
    role: 'Software Engineer',
    title: 'How Inkeep monitors its AI agent framework with SigNoz',
    type: 'Customer story',
  },
  {
    company: 'Brainfish',
    description:
      'Brainfish replaced Elastic with SigNoz to monitor Kubernetes workloads, track AI token usage, and correlate telemetry for faster fixes.',
    filters: [
      'AI & agent workflows',
      'Logs & alerting',
      'Kubernetes & infrastructure',
      'Tool consolidation',
    ],
    href: '/customers/brainfish/',
    logo: '/img/case_study/brainfish-icon.svg',
    logoAlt: 'Brainfish',
    person: 'Charlie Shen',
    publishedAt: '2024-10-24',
    role: 'Lead DevOps Engineer',
    title: 'How Brainfish monitors Kubernetes and manages logs with SigNoz',
    type: 'Customer story',
  },
  {
    company: 'Linkcy',
    description:
      'Linkcy tracks multi-tenant banking APIs with SigNoz dashboards, correlating workflows, client-level usage, and rate-limit alerts.',
    filters: ['Logs & alerting', 'Tracing & performance'],
    href: '/customers/linkcy/',
    logo: '/img/case_study/logos/linkcy-logo-white-1.png',
    logoAlt: 'Linkcy',
    person: 'Alexandre Moray',
    publishedAt: '2025-03-10',
    role: 'Senior Software Engineer',
    takeaway: 'One end-to-end view',
    takeawayLabel: 'API requests and Temporal workflows traced together in SigNoz.',
    title: 'How Linkcy monitors critical fintech APIs with SigNoz dashboards',
    type: 'Customer story',
  },
  {
    company: 'Cedana',
    description:
      'Cedana instruments its gRPC control plane with SigNoz and exports ClickHouse data for deeper performance analysis.',
    filters: ['Tracing & performance', 'Kubernetes & infrastructure'],
    href: '/customers/cedana/',
    logo: '/img/case_study/cedana-logo.svg',
    logoAlt: 'Cedana',
    person: 'Niranjan Ravichandra',
    publishedAt: '2024-09-24',
    role: 'Co-founder & CTO',
    title: 'How Cedana keeps real-time compute operations observable',
    type: 'Customer story',
  },
  {
    company: 'Mailmodo',
    description:
      'Mailmodo centralizes more than 200GB of daily logs from 200 microservices so support can self-serve and developers get time back.',
    filters: ['Logs & alerting'],
    href: '/customers/mailmodo/',
    logo: '/img/case_study/mailmodo-logo-white.svg',
    logoAlt: 'Mailmodo',
    person: 'Avneesh Kumar',
    publishedAt: '2024-11-03',
    role: 'VP of Engineering',
    takeaway: '200GB+ of logs/day',
    takeawayLabel: 'Centralized from 200+ microservices in SigNoz.',
    title: 'How Mailmodo streamlined 200GB+ of daily logs from 200+ services',
    type: 'Customer story',
  },
  {
    company: 'Kiwi',
    description:
      'Kiwi monitors real-time fintech flows in India-hosted SigNoz and reduced critical API latency from 20 seconds to milliseconds.',
    filters: ['Logs & alerting', 'Tracing & performance'],
    href: '/customers/kiwi/',
    logo: '/img/case_study/logos/gokiwi-logo.png',
    logoAlt: 'Kiwi',
    person: 'Khushhal Reddy',
    publishedAt: '2024-09-26',
    role: 'Senior Backend Engineer',
    takeaway: '20s → milliseconds',
    takeawayLabel: 'Critical API response time reduced with SigNoz.',
    title: 'How Kiwi reduced API response times from 20 seconds to milliseconds',
    type: 'Customer story',
  },
  {
    company: 'The Hindu',
    description:
      'The Hindu traces subscription journeys with SigNoz, trimming wasteful API calls and catching Kubernetes issues before readers notice.',
    filters: ['Logs & alerting', 'Tracing & performance', 'Kubernetes & infrastructure'],
    href: '/customers/thehindu/',
    logo: '/img/case_study/thehindu-logo.png',
    logoAlt: 'The Hindu',
    person: 'Poonkuyilan V',
    publishedAt: '2024-09-03',
    role: 'IT Infrastructure Lead',
    takeaway: '10–15 integrations. One trace.',
    takeawayLabel: 'Every subscription transaction monitored end to end in SigNoz.',
    title: 'How The Hindu optimizes application performance with SigNoz APM',
    type: 'Customer story',
  },
  {
    company: 'TableFlow',
    description:
      'TableFlow moved away from difficult CloudWatch log workflows so import errors surface quickly and onboarding pipelines stay reliable.',
    filters: ['Logs & alerting', 'Tool consolidation'],
    href: '/customers/tableflow/',
    logo: '/img/case_study/logos/tableflow-logo.png',
    logoAlt: 'TableFlow',
    person: 'Eric Ciminelli',
    publishedAt: '2024-08-23',
    role: 'Co-founder',
    title: 'How TableFlow improves service reliability and resolves issues quickly',
    type: 'Customer story',
  },
  {
    company: 'InstaSafe',
    description:
      'InstaSafe unified metrics and traces in SigNoz, replacing Grafana and Elastic to monitor critical APIs and simplify on-call.',
    filters: ['Tracing & performance', 'Tool consolidation'],
    href: '/customers/instasafe/',
    logo: '/img/case_study/logos/instasafe-logo.png',
    logoAlt: 'InstaSafe',
    person: 'Bhaswanth Gattineni',
    publishedAt: '2024-05-14',
    role: 'Software Architect',
    takeaway: '20–30 minutes',
    takeawayLabel: 'To get end-to-end metrics and tracing running with SigNoz.',
    title: 'Why InstaSafe chose SigNoz over Grafana and Elastic APM',
    type: 'Customer story',
  },
  {
    company: 'Blip',
    description:
      'Blip traces 40M spans per hour with SigNoz to surface slow database calls, replace Jaeger and Elastic overhead, and resolve incidents faster.',
    filters: ['Tracing & performance', 'Tool consolidation'],
    href: '/customers/blip/',
    logo: '/img/users/blip_logo.webp',
    logoAlt: 'Blip',
    person: 'Nate Bohman',
    publishedAt: '2024-05-14',
    role: 'Senior DevOps Engineer',
    takeaway: '14× faster',
    takeawayLabel: 'Issue resolution with SigNoz at up to 40M spans/hour.',
    title: 'How Blip improved issue resolution time by 14x',
    type: 'Customer story',
  },
  {
    company: 'Outplay',
    description:
      'Outplay uses SigNoz traces to pinpoint slow APIs, tune database queries after a Kubernetes migration, and deliver faster responses.',
    filters: ['Tracing & performance', 'Kubernetes & infrastructure'],
    href: '/customers/outplay/',
    logo: '/img/users/outplay.svg',
    logoAlt: 'Outplay',
    person: 'Vijay Perumal',
    publishedAt: '2024-05-14',
    role: 'Technical Lead',
    takeaway: '35% faster',
    takeawayLabel: 'Backend API responses after tracing bottlenecks in SigNoz.',
    title: 'How Outplay improved backend API response time by 35%',
    type: 'Customer story',
  },
  {
    company: 'Wombo',
    description:
      'Wombo ships AI features with SigNoz watching generation latency, tracing Celery queues, and flagging regressions for five million monthly users.',
    filters: ['AI & agent workflows', 'Logs & alerting', 'Tracing & performance'],
    href: '/customers/wombo/',
    logo: '/img/case_study/logos/WomboLogo.svg',
    logoAlt: 'Wombo',
    person: 'Abhinav Ramana',
    publishedAt: '2024-05-14',
    role: 'Senior Software Engineer',
    takeaway: '2 weeks → 1 day',
    takeawayLabel: 'Time to get traces and exceptions running with SigNoz.',
    title: 'How Wombo delivers a reliable experience to five million monthly users',
    type: 'Customer story',
  },
  {
    company: 'HTTPScout',
    description:
      'HTTPScout’s solo founder self-hosts SigNoz for tracing, metrics, and exceptions after Grafana proved too complex.',
    filters: ['Tracing & performance', 'Tool consolidation'],
    href: '/customers/observability-for-small-teams-and-solopreneurs/',
    logo: '/img/case_study/logos/HTTPSCOUT.svg',
    logoAlt: 'HTTPScout',
    person: 'Sheheryar Sewani',
    publishedAt: '2024-07-06',
    role: 'Founder',
    title: 'How SigNoz makes observability accessible to small teams',
    type: 'Customer story',
  },
]

export const featuredCustomerStories = customerStories.filter((story) => story.featured)
