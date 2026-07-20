import { HOMEPAGE_INTEGRATION_ICONS } from '@/constants/homepageIntegrationIcons'

export type BentoFeature = {
  description: string
  href: string
  layout: string
  outcome: string
  product: string
  textureOpacity?: string
  texturePosition: string
  visual?:
    | 'alert-card'
    | 'apm-browser'
    | 'dashboard-panels'
    | 'infra-album'
    | 'llm-logo-grid'
    | 'logs-stream'
    | 'trace-spans'
}

export const features: BentoFeature[] = [
  {
    product: 'APM.',
    outcome: 'P99, Apdex, database calls, and external calls per service.',
    description:
      'Monitor RED metrics, Apdex, database calls, and external calls from trace-derived service views.',
    href: '/application-performance-monitoring/',
    layout: 'md:col-span-4 md:col-start-1 md:row-span-1 md:row-start-1',
    texturePosition: 'object-left-top',
    visual: 'apm-browser',
  },
  {
    product: 'Logs.',
    outcome: 'Columnar database search with trace correlation built in.',
    description:
      'Search logs in a columnar database, parse attributes, and use trace IDs to move between logs and traces.',
    href: '/log-management/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1',
    texturePosition: 'object-right-top',
    visual: 'logs-stream',
  },
  {
    product: 'Tracing.',
    outcome: 'Load and analyze traces with up to a million spans.',
    description:
      'Use flamegraphs, waterfalls, filters, and span aggregates to isolate slow work across high-volume traces.',
    href: '/distributed-tracing/',
    layout: 'md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-2',
    textureOpacity: 'opacity-[0.16]',
    texturePosition: 'object-left-bottom',
    visual: 'trace-spans',
  },
  {
    product: 'Alerts.',
    outcome: 'Threshold, anomaly, and Apdex alerts on any telemetry signal.',
    description:
      'Create threshold, anomaly, Apdex, metric, log, or trace alerts and tune them with alert history.',
    href: '/alerts-management/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-2',
    texturePosition: 'object-center',
    visual: 'alert-card',
  },
  {
    product: 'LLM Observability.',
    outcome: 'OpenAI, Azure OpenAI, Gemini, OpenRouter, LiteLLM, and agent telemetry.',
    description:
      'Monitor LiteLLM, OpenRouter, Azure OpenAI, Gemini, Hermes, and other AI workflows through OpenTelemetry.',
    href: '/llm-observability/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-3',
    texturePosition: 'object-right-bottom',
    visual: 'llm-logo-grid',
  },
  {
    product: 'Infra Monitoring.',
    outcome: 'Kubernetes, hosts, and cloud metrics next to every service.',
    description:
      'Bring host, Kubernetes, and cloud resource metrics into the same view as application signals.',
    href: '/docs/infrastructure-monitoring/overview/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-2',
    texturePosition: 'object-center',
    visual: 'infra-album',
  },
  {
    product: 'Dashboards.',
    outcome: 'Reusable templates for services, infra, cloud, databases, and LLM usage.',
    description:
      'Start from templates or build custom views for services, infra, cloud, databases, and LLM usage.',
    href: '/metrics-and-dashboards/',
    layout: 'md:col-span-6 md:col-start-1 md:row-span-1 md:row-start-4',
    texturePosition: 'object-left-bottom',
    visual: 'dashboard-panels',
  },
]

export type LogSeverity = 'error' | 'info' | 'warn' | 'default'

export type LogEntry = {
  body: string
  severity: LogSeverity
  timestamp: string
}

export const logEntries: LogEntry[] = [
  {
    timestamp: '2026-06-18 16:32:41.012',
    severity: 'error',
    body: 'GET /generate-error 500 latency=2.48s trace_id=8f32',
  },
  {
    timestamp: '2026-06-18 16:32:40.901',
    severity: 'info',
    body: 'INFO frontend/cartservice.go:90 item added cart_id=olly',
  },
  {
    timestamp: '2026-06-18 16:32:40.772',
    severity: 'default',
    body: 'POST /checkout 200 duration=184ms user=zelda',
  },
  {
    timestamp: '2026-06-18 16:32:40.418',
    severity: 'warn',
    body: 'WARN payment retry scheduled attempt=2 provider=stripe',
  },
  {
    timestamp: '2026-06-18 16:32:39.995',
    severity: 'default',
    body: 'GET /list 200 duration=42ms cache=hit',
  },
  {
    timestamp: '2026-06-18 16:32:39.540',
    severity: 'info',
    body: 'INFO route/server.go:71 request completed span=cart',
  },
  {
    timestamp: '2026-06-18 16:32:39.104',
    severity: 'default',
    body: 'Aggregated 5488250 rows in 92ms source=clickhouse',
  },
  {
    timestamp: '2026-06-18 16:32:38.812',
    severity: 'error',
    body: 'GET /api/cart 503 upstream timeout service=cartservice',
  },
]

export const severityClassNames: Record<LogSeverity, string> = {
  default: 'border-signoz_slate-100/30 text-signoz_vanilla-400/58',
  error: 'border-signoz_cherry-500 bg-signoz_cherry-500/13 text-signoz_cherry-400',
  info: 'border-signoz_robin-500 bg-signoz_robin-500/12 text-signoz_robin-400',
  warn: 'border-signoz_amber-500 bg-signoz_amber-500/10 text-signoz_amber-400',
}

export type TraceSpan = {
  color: string
  depth: number
  duration: string
  label: string
  offset: number
  width: number
}

export const traceSpans: TraceSpan[] = [
  {
    label: 'POST',
    duration: '3.02s',
    depth: 0,
    offset: 0,
    width: 96,
    color: 'bg-signoz_sienna-400',
  },
  {
    label: 'ingress',
    duration: '3.01s',
    depth: 1,
    offset: 2,
    width: 94,
    color: 'bg-signoz_sakura-400',
  },
  {
    label: 'router frontend egress',
    duration: '3.01s',
    depth: 2,
    offset: 3,
    width: 92,
    color: 'bg-signoz_sakura-500',
  },
  {
    label: 'POST /api/checkout',
    duration: '2.59s',
    depth: 3,
    offset: 13,
    width: 78,
    color: 'bg-signoz_sienna-300',
  },
  {
    label: 'executing api route',
    duration: '2.59s',
    depth: 4,
    offset: 14,
    width: 76,
    color: 'bg-signoz_sienna-300',
  },
  {
    label: 'CheckoutService/PlaceOrder',
    duration: '2.20s',
    depth: 5,
    offset: 21,
    width: 68,
    color: 'bg-signoz_sienna-400',
  },
  {
    label: 'prepareOrderItemsAndShipping',
    duration: '1.83s',
    depth: 6,
    offset: 28,
    width: 58,
    color: 'bg-signoz_robin-400',
  },
  {
    label: 'CartService/GetCart',
    duration: '420ms',
    depth: 7,
    offset: 31,
    width: 22,
    color: 'bg-signoz_robin-500',
  },
  {
    label: 'CurrencyService/Convert',
    duration: '318ms',
    depth: 8,
    offset: 34,
    width: 18,
    color: 'bg-signoz_aqua-500',
  },
  {
    label: 'POST /send_order_confirmation',
    duration: '1.77s',
    depth: 6,
    offset: 33,
    width: 54,
    color: 'bg-signoz_robin-400',
  },
  {
    label: 'send_email',
    duration: '1.76s',
    depth: 7,
    offset: 35,
    width: 51,
    color: 'bg-signoz_robin-500',
  },
  {
    label: 'HGET inventory',
    duration: '84ms',
    depth: 8,
    offset: 38,
    width: 10,
    color: 'bg-signoz_amber-500',
  },
]

export const llmIntegrations = [
  { label: 'Claude', iconSrc: HOMEPAGE_INTEGRATION_ICONS.claude },
  { label: 'OpenAI', iconSrc: HOMEPAGE_INTEGRATION_ICONS.openai },
  { label: 'Vercel', iconSrc: HOMEPAGE_INTEGRATION_ICONS.vercel },
  { label: 'Groq', iconSrc: HOMEPAGE_INTEGRATION_ICONS.groq },
  { label: 'Anthropic', iconSrc: HOMEPAGE_INTEGRATION_ICONS.anthropic },
  { label: 'Amazon Bedrock', iconSrc: HOMEPAGE_INTEGRATION_ICONS.aws },
  { label: 'Gemini', iconSrc: HOMEPAGE_INTEGRATION_ICONS.gemini },
  { label: 'OpenRouter', iconSrc: HOMEPAGE_INTEGRATION_ICONS.openrouter },
]
