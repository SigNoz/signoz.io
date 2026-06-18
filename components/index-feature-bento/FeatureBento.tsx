'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

import CustomLink from '@/components/Link'
import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

type BentoFeature = {
  description: string
  href: string
  layout: string
  outcome: string
  product: string
  textureOpacity?: string
  texturePosition: string
  visual?: 'alert-card' | 'apm-browser' | 'llm-logo-grid' | 'logs-stream' | 'trace-spans'
}

const features: BentoFeature[] = [
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
  },
  {
    product: 'Dashboards.',
    outcome: 'Reusable templates for services, infra, cloud, databases, and LLM usage.',
    description:
      'Start from templates or build custom views for services, infra, cloud, databases, and LLM usage.',
    href: '/metrics-and-dashboards/',
    layout: 'md:col-span-6 md:col-start-1 md:row-span-1 md:row-start-4',
    texturePosition: 'object-left-bottom',
  },
]

type LogSeverity = 'error' | 'info' | 'warn' | 'default'

type LogEntry = {
  body: string
  severity: LogSeverity
  timestamp: string
}

const logEntries: LogEntry[] = [
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

const severityClassNames: Record<LogSeverity, string> = {
  default: 'border-signoz_slate-100/30 text-signoz_vanilla-400/58',
  error: 'border-signoz_cherry-500 bg-signoz_cherry-500/13 text-signoz_cherry-400',
  info: 'border-signoz_robin-500 bg-signoz_robin-500/12 text-signoz_robin-400',
  warn: 'border-signoz_amber-500 bg-signoz_amber-500/10 text-signoz_amber-400',
}

type TraceSpan = {
  color: string
  depth: number
  duration: string
  label: string
  offset: number
  width: number
}

const traceSpans: TraceSpan[] = [
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

function TraceSpansVisual() {
  const visualRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const spanRows = [...traceSpans, ...traceSpans]

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      const visual = visualRef.current
      if (!visual) return

      const rect = visual.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const travel = rect.height * 1.35
      const progress = (viewportHeight * 0.7 - rect.top) / travel

      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      ref={visualRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[148px] overflow-hidden px-4 pb-0 md:top-[166px] lg:px-5"
    >
      <div className="absolute inset-x-4 top-0 z-[2] border-b border-signoz_slate-100/30 pb-3 font-mono lg:inset-x-5">
        <div className="text-signoz_vanilla-300/78 flex items-center justify-between text-[12px] font-medium tracking-[-0.01em]">
          <span>Flame Graph</span>
          <span className="text-signoz_vanilla-400/54">Spans: 53</span>
        </div>
        <div className="text-signoz_vanilla-400/42 mt-3 grid grid-cols-[124px_1fr] gap-2 text-[10px]">
          <span aria-hidden="true" />
          <div className="grid grid-cols-4">
            <span>0ms</span>
            <span>800ms</span>
            <span>1600ms</span>
            <span className="text-right">2400ms</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-[138px] right-0 top-[78px] opacity-45">
        <div className="bg-signoz_slate-100/34 absolute inset-y-0 left-0 w-px" />
        <div className="bg-signoz_slate-100/24 absolute inset-y-0 left-1/3 w-px" />
        <div className="bg-signoz_slate-100/24 absolute inset-y-0 left-2/3 w-px" />
        <div className="absolute inset-y-0 right-0 w-px bg-signoz_slate-100/20" />
      </div>

      <div className="absolute inset-x-4 bottom-0 top-[78px] overflow-hidden [mask-image:linear-gradient(180deg,transparent_0%,black_8%,black_88%,transparent_100%)] lg:inset-x-5">
        <div
          className="homepage-trace-span-stream relative space-y-1.5 font-mono"
          style={{ transform: `translateY(${-50 * scrollProgress}%)` }}
        >
          {spanRows.map((span, index) => (
            <div
              key={`${span.label}-${index}`}
              className="text-signoz_vanilla-400/72 grid h-[30px] min-w-[500px] grid-cols-[124px_1fr] items-center gap-2 text-[12px] leading-none"
            >
              <div
                className="relative flex items-center gap-2 overflow-hidden whitespace-nowrap"
                style={{ paddingLeft: `${span.depth * 9}px` }}
              >
                {span.depth > 0 ? (
                  <span
                    className="bg-signoz_slate-100/28 absolute bottom-[-18px] top-[-18px] w-px"
                    style={{ left: `${Math.max(0, span.depth * 9 - 5)}px` }}
                  />
                ) : null}
                <span className="size-1.5 shrink-0 rounded-full bg-signoz_slate-50/80" />
                <span className="truncate">{span.label}</span>
              </div>
              <div className="relative h-full">
                <div
                  className={`absolute top-1/2 flex h-[20px] -translate-y-1/2 items-center justify-between rounded-[2px] px-2 text-[10px] font-semibold text-signoz_ink-500 shadow-[0_10px_24px_rgba(0,0,0,0.24)] ${span.color}`}
                  style={{ left: `${span.offset}%`, width: `${span.width}%` }}
                >
                  <span className="truncate opacity-85">{span.label}</span>
                  <span className="ml-2 shrink-0">{span.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlertCardVisual() {
  return (
    <div
      aria-hidden="true"
      className="bg-signoz_ink-400/88 pointer-events-none absolute inset-x-4 bottom-[-132px] z-[1] rounded-[6px] border border-signoz_slate-100/50 p-4 font-mono shadow-[0_24px_70px_rgba(0,0,0,0.46)] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-[112px] group-focus-visible:-translate-y-[112px] sm:inset-x-5 md:bottom-[-142px] lg:inset-x-6"
    >
      <div className="absolute inset-0 rounded-[6px] bg-[radial-gradient(circle_at_28%_8%,rgba(229,72,77,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent)]" />
      <div className="absolute bottom-4 left-4 top-4 w-1 rounded-full bg-signoz_cherry-500 shadow-[0_0_24px_rgba(229,72,77,0.42)]" />

      <div className="relative pl-7">
        <p className="text-signoz_vanilla-400/62 m-0 text-[11px] uppercase tracking-[0.12em]">
          May 4, 2024 - 04:24:24
        </p>

        <div className="mt-3 flex items-start gap-3">
          <span className="rounded-full bg-signoz_cherry-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-signoz_ink-500">
            Firing
          </span>
          <p className="m-0 text-[15px] font-semibold leading-[1.35] tracking-[-0.1px] text-signoz_cherry-300">
            Deployment error for ingress-nginx
          </p>
        </div>

        <div className="text-signoz_vanilla-300/82 mt-4 space-y-2 text-[12px] leading-5 tracking-[-0.1px]">
          <p className="m-0">
            <span className="text-signoz_vanilla-400/64">Alert:</span> Deployment Error
          </p>
          <p className="m-0">
            <span className="text-signoz_vanilla-400/64">Summary:</span> threshold 10, observed
            value 11
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-signoz_slate-300 px-3 py-2 text-[12px] font-medium tracking-[-0.1px] text-signoz_vanilla-100">
          Related logs
          <span aria-hidden="true">-&gt;</span>
        </div>
      </div>
    </div>
  )
}

const llmIntegrations = [
  { label: 'Claude', domain: 'claude.ai' },
  { label: 'OpenAI', domain: 'openai.com' },
  { label: 'Vercel', domain: 'vercel.com' },
  { label: 'Groq', domain: 'groq.com' },
  { label: 'Anthropic', domain: 'anthropic.com' },
  { label: 'Amazon Bedrock', domain: 'aws.amazon.com' },
  { label: 'Gemini', domain: 'gemini.google.com' },
  { label: 'OpenRouter', domain: 'openrouter.ai' },
]

const getFaviconUrl = (domain: string, size = 64) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`

function LlmLogoGridVisual() {
  const logoRows = [llmIntegrations.slice(0, 4), llmIntegrations.slice(4)]

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-[-10px] z-[1] px-7 sm:px-8 lg:bottom-[-8px]"
    >
      <div className="flex w-full flex-col gap-6">
        {logoRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full items-center justify-between">
            {row.map((integration, index) => (
              <span
                key={integration.label}
                className="group/logo relative flex size-10 items-center justify-center transition-transform duration-200 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-110 sm:size-11"
                style={{ transitionDelay: `${(rowIndex * 4 + index) * 28}ms` }}
                title={integration.label}
              >
                <span className="absolute bottom-full left-1/2 mb-2 max-w-[120px] -translate-x-1/2 rounded-[3px] bg-signoz_slate-300 px-2 py-1 text-[10px] font-medium leading-none tracking-[-0.1px] text-signoz_vanilla-100 opacity-0 shadow-[0_10px_24px_rgba(0,0,0,0.34)] transition-opacity duration-150 group-hover/logo:opacity-100">
                  {integration.label}
                </span>
                <span
                  className="size-8 rounded-[3px] bg-contain bg-center bg-no-repeat drop-shadow-[0_12px_24px_rgba(0,0,0,0.48)] transition-[filter] duration-200 group-hover/logo:drop-shadow-[0_16px_30px_rgba(0,0,0,0.6)] sm:size-9"
                  style={{ backgroundImage: `url("${getFaviconUrl(integration.domain, 64)}")` }}
                />
                <span className="sr-only">{integration.label}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function LogsStreamVisual() {
  const [cursor, setCursor] = useState(0)
  const visibleLogs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const logIndex = (cursor + index) % logEntries.length
        return {
          ...logEntries[logIndex],
          key: `${cursor}-${index}-${logEntries[logIndex].timestamp}`,
        }
      }),
    [cursor]
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursor((current) => (current + 1) % logEntries.length)
    }, 1350)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[180px] overflow-hidden px-5 md:top-[194px] lg:px-6"
    >
      <div className="border-signoz_slate-100/24 text-signoz_vanilla-400/48 absolute inset-x-5 top-0 grid min-w-[620px] grid-cols-[250px_1fr] gap-4 border-b pb-3 pl-[14px] pr-4 font-mono text-[12px] uppercase tracking-[0.08em] lg:inset-x-6">
        <span>Timestamp</span>
        <span>Body</span>
      </div>

      <div className="relative mt-12 space-y-2 font-mono text-[14px] leading-none tracking-[-0.2px] text-signoz_vanilla-400/60 lg:text-[15px]">
        {visibleLogs.map((log, index) => (
          <div
            key={log.key}
            className={`pointer-events-auto grid min-w-[620px] grid-cols-[250px_1fr] items-center gap-4 rounded-r-[3px] border-l-2 py-2 pl-3 pr-4 transition-[opacity,transform,background-color,box-shadow,color] duration-200 ease-out hover:translate-x-1 hover:bg-signoz_slate-100/[0.07] hover:text-signoz_vanilla-100 hover:shadow-[0_0_28px_rgba(78,116,248,0.18)] ${
              severityClassNames[log.severity]
            } ${index === 0 ? 'animate-[homepage-log-enter_520ms_ease-out]' : ''}`}
            style={{ opacity: Math.max(0.18, 1 - index * 0.095) }}
          >
            <span>{log.timestamp}</span>
            <span className="whitespace-nowrap">{log.body}</span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-signoz_ink-500 to-transparent" />
    </div>
  )
}

function ApmBrowserShell() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-24px] left-[20%] hidden h-[500px] w-[720px] overflow-hidden rounded-t-[4px] border border-signoz_slate-100 bg-signoz_slate-300 shadow-[0_26px_80px_rgba(0,0,0,0.24)] md:block lg:bottom-[-28px] lg:left-[20%] lg:h-[520px] lg:w-[760px]"
    >
      <div className="flex h-14 items-center gap-5 bg-signoz_slate-300 px-7">
        <div className="flex gap-[7px]">
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
        </div>
        <div className="ml-auto flex h-[34px] w-[420px] items-center justify-center rounded-[18px] border border-signoz_slate-100 bg-signoz_slate-200 text-[13px] font-medium leading-none text-signoz_vanilla-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          olly.us.signoz.cloud/services/cartservice/
        </div>
      </div>

      <div className="relative ml-1.5 h-[calc(100%-56px)] w-[calc(100%-6px)] overflow-hidden rounded-[8px] bg-[#070b12]">
        <Image
          alt=""
          className="h-full w-full rounded-[8px] object-cover object-left-top"
          height={462}
          src="/img/graphics/homepage/apm-browser-overview.png"
          width={758}
        />
      </div>
    </div>
  )
}

function FeatureCard({ feature }: { feature: BentoFeature }) {
  return (
    <CustomLink
      aria-label={`${feature.product} ${feature.outcome}`}
      className={`group relative flex min-h-[430px] flex-col overflow-hidden rounded-[6px] border border-signoz_slate-400/25 bg-signoz_ink-500 no-underline transition-[transform,border-color] duration-300 ease-out hover:scale-[1.012] hover:border-signoz_slate-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500/70 md:min-h-0 ${feature.layout}`}
      href={feature.href}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(11,12,14,0.12),rgba(11,12,14,0.82)_78%)]" />
      <div className="relative z-[2] p-5 sm:p-6 lg:p-7">
        <h3 className="m-0 max-w-[720px] text-[22px] font-light leading-[1.12] tracking-[-0.22px] text-signoz_vanilla-100 sm:text-[24px] md:text-[26px] md:tracking-[-0.26px]">
          <span className="text-signoz_vanilla-100">{feature.product}</span>{' '}
          <span className="text-signoz_vanilla-400/70">{feature.outcome}</span>
        </h3>
      </div>
      {feature.visual === 'apm-browser' ? <ApmBrowserShell /> : null}
      {feature.visual === 'logs-stream' ? <LogsStreamVisual /> : null}
      {feature.visual === 'trace-spans' ? <TraceSpansVisual /> : null}
      {feature.visual === 'alert-card' ? <AlertCardVisual /> : null}
      {feature.visual === 'llm-logo-grid' ? <LlmLogoGridVisual /> : null}
    </CustomLink>
  )
}

function EnterpriseReadyStrip() {
  const compliances = [
    {
      Logo: Soc2Logo,
      label: 'SOC 2 Type II',
      description: 'Controls and operational safeguards for security-conscious teams.',
    },
    {
      Logo: HipaaLogo,
      label: 'HIPAA',
      description: 'Protected health information can be handled with the right safeguards.',
    },
  ]

  return (
    <div className="mt-14 border-y border-signoz_slate-400/35 md:mt-20">
      <div className="grid gap-0 md:grid-cols-[0.82fr_1fr_1fr]">
        <div className="flex items-center border-b border-signoz_slate-400/35 py-8 md:border-b-0 md:pr-8">
          <div>
            <p className="m-0 text-sm font-medium uppercase tracking-[0.14em] text-signoz_robin-400">
              Enterprise ready
            </p>
            <h3 className="m-0 mt-3 max-w-[300px] text-[24px] font-medium leading-tight tracking-[-0.35px] text-signoz_vanilla-100 md:max-w-[280px] md:text-[28px] md:tracking-[-0.5px]">
              Compliance posture for serious production teams.
            </h3>
          </div>
        </div>

        {compliances.map(({ Logo, description, label }, index) => (
          <div
            key={label}
            className={`flex min-h-[180px] flex-col justify-between border-t border-signoz_slate-400/35 py-7 md:min-h-[220px] md:border-t-0 md:px-12 ${
              index === 0 ? 'md:border-x' : ''
            } border-signoz_slate-400/35`}
          >
            <Logo className="h-12 w-auto opacity-70" />
            <div>
              <p className="m-0 text-sm leading-5 text-signoz_vanilla-400">{label} compliance</p>
              <p className="m-0 mt-3 max-w-[320px] text-[18px] font-medium leading-7 tracking-[-0.15px] text-signoz_vanilla-100 md:text-xl md:leading-8 md:tracking-[-0.2px]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeatureBento() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32"
      data-homepage-feature-bento
    >
      <div className="mx-auto max-w-[1245px]">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[1740px] sm:left-6 sm:right-6 lg:left-[78px] lg:right-[78px] lg:top-32"
          data-homepage-floating-cta="Explore docs"
          data-homepage-floating-href="/docs/introduction/"
          aria-hidden="true"
        />

        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <h2 className="m-0 max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
              Everything your team needs to investigate production.
            </h2>
          </div>
          <div className="max-w-[430px]">
            <p className="m-0 text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400 sm:text-[17px] sm:leading-8 sm:tracking-[-0.2px]">
              Move from symptoms to evidence across APM, logs, traces, infra, LLM telemetry, alerts,
              and dashboards.
            </p>
            <CustomLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/docs/introduction/"
            >
              Explore docs
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </CustomLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1245px]">
          <div className="relative">
            <div className="grid gap-2 md:grid-cols-6 md:grid-rows-[686px_342px_342px_456px] lg:gap-[6px]">
              {features.map((feature) => (
                <FeatureCard key={feature.product} feature={feature} />
              ))}
            </div>
          </div>
        </div>

        <EnterpriseReadyStrip />
      </div>
    </section>
  )
}
