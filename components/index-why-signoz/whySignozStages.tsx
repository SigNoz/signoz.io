'use client'

import { Activity, Bot, Cable, Database, SearchCode, type LucideIcon } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type WhySignozStep = {
  alt: string
  cta?: { href: string; label: string; clickName: string }
  description: string
  icon: LucideIcon
  image: string
  key: string
  title: string
}

export const WHY_SIGNOZ_STEPS: WhySignozStep[] = [
  {
    key: 'correlated-signals',
    title: 'Debug faster with correlated signals',
    description:
      'Move from a latency spike to the related logs, traces, metrics, and spans without stitching together separate tools.',
    icon: Activity,
    cta: { href: '/docs/introduction/', label: 'Open a trace', clickName: 'Open Trace Link' },
    image: '/img/graphics/homepage/correlation.svg',
    alt: 'SigNoz Cloud view showing correlated telemetry for root cause debugging',
  },
  {
    key: 'opentelemetry',
    title: 'Instrument once with OpenTelemetry',
    description:
      'Use open standards instead of vendor SDKs, so instrumentation stays portable as your stack changes.',
    icon: Cable,
    image: '/img/graphics/homepage/opentelemetry.svg',
    alt: 'OpenTelemetry instrumentation flowing into SigNoz Cloud',
  },
  {
    key: 'columnar-store',
    title: 'Query telemetry on a columnar store',
    description:
      'Use query builder, PromQL, and ClickHouse SQL on a fast columnar datastore built for high-cardinality observability data.',
    icon: SearchCode,
    image: '/img/graphics/homepage/columnar2.svg',
    alt: 'Flexible query controls backed by a columnar datastore in SigNoz Cloud',
  },
  {
    key: 'agent-telemetry',
    title: 'Give AI agents telemetry they understand',
    description:
      'One OpenTelemetry-native source gives agents a known schema for traces, logs, metrics, and services, so they can debug with less translation.',
    icon: Bot,
    image: '/img/graphics/homepage/agent-chat.svg',
    alt: 'Agent telemetry context for AI-assisted observability workflows',
  },
]

export type WhySignozStageVisualProps = {
  isActive: boolean
}

const ACCENT = {
  robin: 'var(--bg-robin-500)',
  cherry: 'var(--bg-cherry-500)',
  amber: 'var(--bg-amber-500)',
  forest: 'var(--bg-forest-500)',
  neutral: 'var(--bg-vanilla-400)',
} as const

function accentChipStyle(accent: string) {
  return {
    color: accent,
    borderColor: `color-mix(in srgb, ${accent} 32%, transparent)`,
    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
  }
}

function StageCardHeader({
  meta,
  tag,
  tagAccent,
  title,
}: {
  meta: string
  tag: string
  tagAccent: string
  title: string
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--l2-border)] px-3 py-2">
      <span className="text-[11.5px] text-[var(--l1-foreground)]">{title}</span>
      <span className="font-mono text-[10px] text-[var(--l3-foreground)]">{meta}</span>
      <span
        className="ml-auto whitespace-nowrap rounded-full border px-1.5 py-px font-mono text-[10px]"
        style={accentChipStyle(tagAccent)}
      >
        {tag}
      </span>
    </div>
  )
}

const pts = (points: number[][]) => points.map((point) => point.join(',')).join(' ')

function IsoCube({
  accent,
  cx,
  cy,
  dimmed = false,
  h,
  s,
  w,
}: {
  accent: string
  cx: number
  cy: number
  dimmed?: boolean
  h: number
  s: number
  w: number
}) {
  const inset = 0.5
  const top = [
    [cx, cy - h],
    [cx + w, cy],
    [cx, cy + h],
    [cx - w, cy],
  ]
  const left = [
    [cx - w, cy],
    [cx, cy + h],
    [cx, cy + h + s],
    [cx - w, cy + s],
  ]
  const right = [
    [cx, cy + h],
    [cx + w, cy],
    [cx + w, cy + s],
    [cx, cy + h + s],
  ]
  const inlay = [
    [cx, cy - h * inset],
    [cx + w * inset, cy],
    [cx, cy + h * inset],
    [cx - w * inset, cy],
  ]

  return (
    <g className="transition-opacity duration-300">
      <ellipse
        cx={cx}
        cy={cy + h + s + 3}
        fill={accent}
        opacity={dimmed ? 0.1 : 0.26}
        rx={w * 1.6}
        ry={h * 0.9}
        style={{ filter: 'blur(6px)' }}
      />
      <polygon fill="var(--l1-background)" points={pts(left)} stroke="var(--l2-border)" />
      <polygon fill="var(--l2-background)" points={pts(right)} stroke="var(--l2-border)" />
      <polygon fill={accent} opacity={0.1} points={pts(left)} />
      <polygon fill={accent} opacity={0.16} points={pts(right)} />
      <polygon fill="var(--l3-background)" points={pts(top)} stroke="var(--l3-border)" />
      <polygon fill={accent} opacity={dimmed ? 0.5 : 1} points={pts(inlay)} stroke={accent} />
    </g>
  )
}

type ServiceKey = 'checkout' | 'payments' | 'cart-service'
type SignalKey = 'traces' | 'logs' | 'spans' | 'metrics'
type SignalRow = [id: string, label: string, value: string, hot?: boolean]

const SIGNAL_TABS: { dot: string; key: SignalKey; label: string }[] = [
  { key: 'traces', label: 'Traces', dot: ACCENT.robin },
  { key: 'logs', label: 'Logs', dot: ACCENT.cherry },
  { key: 'spans', label: 'Spans', dot: ACCENT.amber },
  { key: 'metrics', label: 'Metrics', dot: ACCENT.forest },
]

const SERVICES: Record<
  ServiceKey,
  { accent: string; series: number[]; signals: Record<SignalKey, SignalRow[]>; tag: string }
> = {
  payments: {
    accent: ACCENT.cherry,
    tag: '+412 ms',
    series: [
      34, 36, 33, 38, 35, 37, 40, 38, 36, 41, 44, 39, 42, 46, 43, 48, 88, 96, 72, 58, 52, 47, 49,
      45, 43, 44, 41, 40,
    ],
    signals: {
      traces: [
        ['a7f1c2', 'POST /charge — payments.charge', '486ms', true],
        ['b30e94', 'POST /charge — pool.acquire', '402ms'],
        ['c81a45', 'GET /methods — redis.get', '38ms'],
        ['d07be1', 'POST /ledger — ledger.commit', '116ms'],
        ['e41a8c', 'POST /charge — retry.backoff', '91ms'],
      ],
      logs: [
        ['error', 'connection pool exhausted (max 20)', '14:02', true],
        ['warn', 'retry 3/3 payments-db', '14:02'],
        ['error', 'ledger request exceeded deadline', '14:03', true],
        ['warn', 'queue depth reached 184', '14:04'],
        ['info', 'pool resized to 40', '14:07'],
      ],
      spans: [
        ['db.query', 'SELECT … FROM charges WHERE …', '318ms', true],
        ['http', 'ledger-api /v2/post', '104ms'],
        ['queue', 'payments.events publish', '47ms'],
        ['cache', 'redis MGET pm:*', '11ms'],
        ['encode', 'protobuf marshal charge', '4ms'],
      ],
      metrics: [
        ['p99', 'http.server.duration', '486ms', true],
        ['pool', 'db.connections.used', '20/20', true],
        ['rate', 'payments.requests', '812/s'],
        ['errors', 'payments.errors', '4.8%', true],
        ['queue', 'payments.queue.depth', '184'],
      ],
    },
  },
  checkout: {
    accent: ACCENT.robin,
    tag: '+96 ms',
    series: [
      30, 34, 38, 42, 44, 41, 37, 33, 31, 34, 39, 44, 47, 45, 41, 36, 33, 35, 40, 46, 52, 49, 43,
      38, 35, 33, 36, 39,
    ],
    signals: {
      traces: [
        ['d2b917', 'POST /checkout — cart.reprice', '311ms', true],
        ['e4c033', 'POST /checkout — payments.charge', '486ms'],
        ['f0a781', 'GET /cart — catalog.batch', '54ms'],
        ['1f2c90', 'POST /checkout — tax.quote', '73ms'],
        ['83bc11', 'POST /checkout — inventory.hold', '68ms'],
      ],
      logs: [
        ['warn', 'downstream payments slow (p99 486ms)', '14:02', true],
        ['info', 'reprice cache miss ratio 0.34', '14:02'],
        ['warn', 'inventory hold retried once', '14:03'],
        ['info', 'checkout completed 1,204', '14:03'],
        ['info', 'tax quote cache warmed', '14:05'],
      ],
      spans: [
        ['http', 'payments-api /v2/charge', '402ms', true],
        ['http', 'tax-api /v1/quote', '73ms'],
        ['db.query', 'SELECT … FROM carts WHERE …', '44ms'],
        ['http', 'inventory /v1/hold', '38ms'],
        ['cache', 'redis GET cart:9f2', '6ms'],
      ],
      metrics: [
        ['p99', 'checkout.duration', '311ms', true],
        ['rate', 'checkout.requests', '1.2k/s'],
        ['cache', 'reprice.hit_ratio', '66%'],
        ['errors', 'checkout.errors', '1.3%'],
        ['saturation', 'worker.utilization', '78%'],
      ],
    },
  },
  'cart-service': {
    accent: ACCENT.amber,
    tag: 'stable',
    series: [
      18, 20, 19, 22, 21, 23, 20, 19, 21, 24, 22, 20, 23, 25, 22, 21, 19, 20, 22, 23, 21, 20, 22,
      24, 23, 21, 20, 19,
    ],
    signals: {
      traces: [
        ['aa10f4', 'PUT /cart/items — cart.add', '62ms'],
        ['bb7712', 'GET /cart — redis.get', '9ms'],
        ['cc93ad', 'DELETE /cart/items', '31ms'],
        ['dd104c', 'POST /cart/merge — session', '48ms'],
        ['ee62af', 'GET /cart/price — catalog', '22ms'],
      ],
      logs: [
        ['info', 'cart merged for session 41ac', '14:02'],
        ['info', 'ttl refreshed 1,882 keys', '14:02'],
        ['warn', 'stale price for sku 77120', '14:04', true],
        ['info', 'orphan carts swept 42', '14:05'],
        ['info', 'catalog snapshot advanced', '14:06'],
      ],
      spans: [
        ['cache', 'redis MGET cart:*', '9ms'],
        ['db.query', 'SELECT … FROM items WHERE …', '21ms'],
        ['http', 'catalog /v1/prices', '18ms'],
        ['merge', 'session cart reconcile', '14ms'],
        ['encode', 'cart response marshal', '3ms'],
      ],
      metrics: [
        ['p99', 'cart.duration', '62ms'],
        ['rate', 'cart.operations', '2.8k/s'],
        ['cache', 'redis.hit_ratio', '97%'],
        ['size', 'cart.items.avg', '4.2'],
        ['errors', 'cart.errors', '0.08%'],
      ],
    },
  },
}

const SERVICE_CUBES: { glyph: string; key: ServiceKey; x: number }[] = [
  { key: 'checkout', x: 95, glyph: 'M-3.6 -1.8 h7.2 M-3.6 1.2 h4.6' },
  { key: 'payments', x: 215, glyph: 'M-4.4 1.6 l2.2 -3.6 l2.2 4.2 l2.2 -2.4' },
  { key: 'cart-service', x: 335, glyph: 'M0 -3.4 l3.1 1.8 v3.2 L0 3.6 l-3.1 -1.8 v-3.2 z' },
]

const CHART_W = 400
const CHART_H = 96
const CHART_PAD_T = 12
const CHART_PAD_B = 8

function buildChart(series: number[]) {
  const max = Math.max(...series)
  const px = (index: number) => (index / (series.length - 1)) * CHART_W
  const py = (value: number) =>
    CHART_H - CHART_PAD_B - (value / max) * (CHART_H - CHART_PAD_T - CHART_PAD_B)
  let line = ''
  series.forEach((value, index) => {
    const x = px(index)
    const y = py(value)
    if (index === 0) {
      line = `M${x.toFixed(1)} ${y.toFixed(1)}`
      return
    }
    const prevX = px(index - 1)
    const prevY = py(series[index - 1])
    const controlX = (prevX + x) / 2
    line += ` C${controlX.toFixed(1)} ${prevY.toFixed(1)} ${controlX.toFixed(1)} ${y.toFixed(
      1
    )} ${x.toFixed(1)} ${y.toFixed(1)}`
  })
  const area = `${line} L${CHART_W} ${CHART_H} L0 ${CHART_H} Z`
  const spikeIndex = series.indexOf(max)
  return { area, line, px, py, spike: { x: px(spikeIndex), y: py(max) } }
}

function chartTime(index: number) {
  const totalMinutes = 45 + index
  const hour = totalMinutes >= 60 ? 14 : 13
  const minute = totalMinutes % 60
  return `${hour}:${minute < 10 ? `0${minute}` : minute}`
}

function CorrelatedSignalsStage() {
  const gradientId = useId()
  const [service, setService] = useState<ServiceKey>('payments')
  const [signal, setSignal] = useState<SignalKey>('traces')
  const chartRef = useRef<SVGSVGElement | null>(null)
  const cursorRef = useRef<SVGLineElement | null>(null)
  const dotRef = useRef<SVGCircleElement | null>(null)
  const tipRef = useRef<HTMLDivElement | null>(null)

  const svc = SERVICES[service]
  const chart = buildChart(svc.series)

  const handleChartMove = (event: MouseEvent<HTMLDivElement>) => {
    const chartEl = chartRef.current
    const cursor = cursorRef.current
    const dot = dotRef.current
    const tip = tipRef.current
    if (!chartEl || !cursor || !dot || !tip) return

    const rect = chartEl.getBoundingClientRect()
    if (rect.width === 0) return
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
    const index = Math.round(ratio * (svc.series.length - 1))
    const x = chart.px(index)
    cursor.setAttribute('x1', `${x}`)
    cursor.setAttribute('x2', `${x}`)
    cursor.setAttribute('opacity', '1')
    dot.setAttribute('cx', `${x}`)
    dot.setAttribute('cy', `${chart.py(svc.series[index])}`)
    dot.setAttribute('opacity', '1')
    tip.textContent = `${chartTime(index)} · ${Math.round(svc.series[index] * 5)}ms`
    tip.style.left = `${(ratio * 100).toFixed(1)}%`
    tip.style.opacity = '1'
  }

  const handleChartLeave = () => {
    cursorRef.current?.setAttribute('opacity', '0')
    dotRef.current?.setAttribute('opacity', '0')
    if (tipRef.current) tipRef.current.style.opacity = '0'
  }

  const activeCube = SERVICE_CUBES.find((cube) => cube.key === service) ?? SERVICE_CUBES[1]
  const connector =
    activeCube.x === 215
      ? 'M215 4 V72'
      : `M215 4 V38 H${activeCube.x > 215 ? activeCube.x - 6 : activeCube.x + 6} Q${
          activeCube.x
        } 38 ${activeCube.x} 44 V72`

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l1-background)]">
          <StageCardHeader meta="p99 · 30m" tag={svc.tag} tagAccent={svc.accent} title={service} />

          <div
            className="relative pt-1"
            onMouseLeave={handleChartLeave}
            onMouseMove={handleChartMove}
          >
            <div
              className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--l3-border)] bg-[var(--l3-background)] px-1.5 font-mono text-[9px] leading-4 text-[var(--l1-foreground)] opacity-0 transition-opacity duration-150"
              ref={tipRef}
            />
            <svg
              className="block h-16 w-full"
              preserveAspectRatio="none"
              ref={chartRef}
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={svc.accent} stopOpacity="0.05" />
                  <stop offset="0.62" stopColor={svc.accent} stopOpacity="0.16" />
                  <stop offset="1" stopColor={svc.accent} stopOpacity="0.42" />
                </linearGradient>
              </defs>
              <path d={chart.area} fill={`url(#${gradientId})`} />
              <path
                d={chart.line}
                fill="none"
                stroke={svc.accent}
                strokeLinejoin="round"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
              <line
                stroke={svc.accent}
                strokeDasharray="2 3"
                strokeOpacity="0.35"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1={chart.spike.x}
                x2={chart.spike.x}
                y1={chart.spike.y}
                y2={CHART_H}
              />
              <line
                opacity="0"
                ref={cursorRef}
                stroke="var(--l3-border)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="0"
                x2="0"
                y1="0"
                y2={CHART_H}
              />
              <circle
                fill="var(--l1-background)"
                opacity="0"
                r="2.6"
                ref={dotRef}
                stroke={svc.accent}
                strokeWidth="1.4"
              />
            </svg>
          </div>

          <div className="flex gap-0.5 px-2 pt-2">
            {SIGNAL_TABS.map((tab) => (
              <button
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded border-0 px-2 py-1 text-[11px] transition-colors duration-200 ${
                  tab.key === signal
                    ? 'bg-[var(--l3-background)] text-[var(--l1-foreground)]'
                    : 'bg-transparent text-[var(--l3-foreground)] hover:bg-[var(--l2-background)] hover:text-[var(--l2-foreground)]'
                }`}
                key={tab.key}
                onClick={() => setSignal(tab.key)}
                tabIndex={-1}
                type="button"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: tab.dot, boxShadow: `0 0 6px ${tab.dot}` }}
                />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col px-1.5 pb-1.5 pt-1">
            {svc.signals[signal].map(([id, label, value, hot]) => (
              <div
                className="flex items-center gap-2 rounded px-2 py-1 text-[var(--l3-foreground)] transition-colors duration-150 hover:bg-[var(--l2-background)] hover:text-[var(--l1-foreground)]"
                key={`${id}-${label}`}
              >
                <span className="shrink-0 font-mono text-[10px]" style={{ color: svc.accent }}>
                  {id}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px]">{label}</span>
                <span
                  className="shrink-0 font-mono text-[10px]"
                  style={hot ? { color: svc.accent } : undefined}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <svg className="block w-full" viewBox="0 0 430 196">
          <path
            className="transition-all duration-500"
            d={connector}
            fill="none"
            stroke={svc.accent}
            strokeDasharray="4 5"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          {SERVICE_CUBES.map((cube) => {
            const cubeSvc = SERVICES[cube.key]
            const isSelected = cube.key === service
            const badgeY = 88
            return (
              <g
                className={`cursor-pointer transition-opacity duration-300 ${
                  isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                key={cube.key}
                onClick={() => setService(cube.key)}
              >
                <line
                  stroke={cubeSvc.accent}
                  strokeDasharray="2 3"
                  strokeOpacity="0.3"
                  x1={cube.x}
                  x2={cube.x}
                  y1={badgeY + 10}
                  y2={122 - 15}
                />
                <circle
                  cx={cube.x}
                  cy={badgeY}
                  fill="var(--l1-background)"
                  r="8.5"
                  stroke={cubeSvc.accent}
                  strokeOpacity="0.4"
                />
                <circle
                  cx={cube.x}
                  cy={badgeY}
                  fill={cubeSvc.accent}
                  opacity={isSelected ? 1 : 0.5}
                  r="8.5"
                />
                <path
                  d={cube.glyph}
                  fill="none"
                  stroke="var(--bg-neutral-dark-1000)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  transform={`translate(${cube.x} ${badgeY})`}
                />
                <IsoCube
                  accent={cubeSvc.accent}
                  cx={cube.x}
                  cy={122}
                  dimmed={!isSelected}
                  h={17}
                  s={30}
                  w={34}
                />
                {/* generous hit target */}
                <rect fill="transparent" height={116} width={100} x={cube.x - 50} y={badgeY - 12} />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

const diamond = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx} ${cy - ry} L${cx + rx} ${cy} L${cx} ${cy + ry} L${cx - rx} ${cy} Z`

function OtelPipelineStage() {
  const sources: { accent: string; x: number }[] = [
    { x: 95, accent: ACCENT.robin },
    { x: 215, accent: ACCENT.cherry },
    { x: 335, accent: ACCENT.amber },
  ]

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <svg className="mx-auto block w-full max-w-[430px]" viewBox="0 0 430 316">
        {sources.map((source) => (
          <g key={source.x}>
            <path
              d={
                source.x === 215
                  ? 'M215 96 V174'
                  : `M${source.x} 96 V132 Q${source.x} 138 ${source.x > 215 ? source.x - 6 : source.x + 6} 138 H${
                      source.x > 215 ? 221 : 209
                    } Q215 138 215 144 V174`
              }
              fill="none"
              stroke={source.accent}
              strokeDasharray="4 5"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <IsoCube accent={source.accent} cx={source.x} cy={61} h={13} s={22} w={26} />
          </g>
        ))}

        <g className="animate-pulse motion-reduce:animate-none">
          <path
            d={diamond(215, 238, 74, 37)}
            fill="none"
            stroke="var(--l3-border)"
            strokeWidth="1"
          />
          <path
            d={diamond(215, 238, 98, 49)}
            fill="none"
            stroke="var(--l3-border)"
            strokeDasharray="4 5"
            strokeWidth="1"
          />
        </g>

        <IsoCube accent={ACCENT.neutral} cx={215} cy={200} h={22} s={38} w={44} />

        <line stroke="var(--l3-border)" x1={261} x2={292} y1={219} y2={219} />
        <rect
          fill="var(--l2-background)"
          height={22}
          rx={3}
          stroke="var(--l2-border)"
          width={110}
          x={292}
          y={208}
        />
        <circle cx={303} cy={219} fill={ACCENT.neutral} r={2.6} />
        <text
          className="font-mono"
          fill="var(--l2-foreground)"
          fontSize="10"
          letterSpacing="0.06em"
          x={311}
          y={222.5}
        >
          opentelemetry
        </text>
      </svg>
    </div>
  )
}

type StoreRow = [
  ts: string,
  service: string,
  signal: string,
  value: string,
  tone: '' | 'hot' | 'warn',
]

const STORE_ROWS: StoreRow[] = [
  ['14:02:11', 'payments', 'trace', '486ms', 'hot'],
  ['14:02:11', 'consumer-svc-1', 'log', 'error', 'hot'],
  ['14:02:10', 'checkout', 'trace', '311ms', ''],
  ['14:02:09', 'consumer-svc-1', 'metric', '0.99', ''],
  ['14:02:08', 'cart-service', 'log', 'warn', 'warn'],
  ['14:02:07', 'consumer-svc-1', 'trace', '128ms', ''],
  ['14:02:06', 'catalog', 'trace', '42ms', ''],
  ['14:02:05', 'consumer-svc-1', 'log', 'info', ''],
  ['14:02:04', 'payments', 'log', 'error', 'hot'],
]

const STORE_QUERY_SERVICE = 'consumer-svc-1'
const STORE_PILLS = ['all', 'logs', 'traces', 'metrics'] as const
type StorePill = (typeof STORE_PILLS)[number]

const STORE_TONE_CLASS: Record<'' | 'hot' | 'warn', string> = {
  '': 'text-[var(--l3-foreground)]',
  hot: 'text-[var(--bg-cherry-400)]',
  warn: 'text-[var(--bg-amber-400)]',
}

function ColumnarStoreStage() {
  const [pill, setPill] = useState<StorePill>('all')

  const isHit = (row: StoreRow) =>
    row[1] === STORE_QUERY_SERVICE && (pill === 'all' || row[2] === pill.replace(/s$/, ''))
  const hitCount = STORE_ROWS.filter(isHit).length

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="mx-auto w-full max-w-[430px] rounded-md border border-[var(--l2-border)] bg-[var(--l1-background)]">
        <StageCardHeader
          meta="distributed"
          tag="columnar"
          tagAccent={ACCENT.neutral}
          title="signoz_signals"
        />

        <div className="mx-3 mt-3 flex items-stretch overflow-hidden rounded border border-[var(--l3-border)] bg-[var(--l2-background)]">
          <button
            className="inline-flex cursor-pointer items-center gap-1.5 border-0 border-r border-solid border-r-[var(--l3-border)] bg-[var(--l3-background)] px-2.5 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--l2-foreground)] transition-colors duration-200 hover:text-[var(--l1-foreground)]"
            onClick={() =>
              setPill(STORE_PILLS[(STORE_PILLS.indexOf(pill) + 1) % STORE_PILLS.length])
            }
            tabIndex={-1}
            type="button"
          >
            <Database aria-hidden="true" size={12} />
            {pill}
          </button>
          <span className="flex items-center gap-0 self-center whitespace-pre pl-2.5 font-mono text-[12px]">
            <span className="text-[var(--l2-foreground)]">service</span>
            <span className="text-[var(--bg-robin-400)]">.name</span>
            <span className="text-[var(--l2-foreground)]"> = </span>
            <span className="text-[var(--bg-forest-400)]">&apos;consumer-svc-1&apos;</span>
          </span>
        </div>

        <div className="mt-3 border-t border-[var(--l2-border)]">
          <div className="grid grid-cols-[76px_1fr_60px_64px] border-b border-[var(--l2-border)] font-mono text-[8.5px] uppercase tracking-wider text-[var(--l3-foreground)] opacity-70">
            {['timestamp', 'service.name', 'signal', 'value'].map((head) => (
              <span
                className="truncate border-r border-[var(--l2-border)] px-2 py-1 last:border-r-0"
                key={head}
              >
                {head}
              </span>
            ))}
          </div>
          {STORE_ROWS.map((row, index) => {
            const hit = isHit(row)
            return (
              <div
                className={`grid grid-cols-[76px_1fr_60px_64px] font-mono text-[10px] text-[var(--l3-foreground)] transition-colors duration-200 hover:bg-[var(--l2-background)] ${
                  hit ? '' : 'opacity-70'
                }`}
                key={`${row[0]}-${index}`}
                style={
                  hit
                    ? { background: 'color-mix(in srgb, var(--bg-robin-500) 10%, transparent)' }
                    : undefined
                }
              >
                <span className="truncate border-r border-[var(--l2-border)] px-2 leading-6">
                  {row[0]}
                </span>
                <span
                  className={`truncate border-r border-[var(--l2-border)] px-2 leading-6 ${
                    hit ? 'text-[var(--l1-foreground)]' : 'text-[var(--l2-foreground)]'
                  }`}
                >
                  {row[1]}
                </span>
                <span className="truncate border-r border-[var(--l2-border)] px-2 leading-6 opacity-80">
                  {row[2]}
                </span>
                <span className={`truncate px-2 text-right leading-6 ${STORE_TONE_CLASS[row[4]]}`}>
                  {row[3]}
                </span>
              </div>
            )
          })}
          <div className="border-t border-[var(--l2-border)] px-2 py-2 font-mono text-[10px] text-[var(--l3-foreground)]">
            {hitCount} of 1.24B rows scanned · 142 ms
          </div>
        </div>
      </div>
    </div>
  )
}

function NozPeek({ isActive }: { isActive: boolean }) {
  const eyeRef = useRef<SVGCircleElement | null>(null)
  const pupilRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    if (!isActive) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (event: PointerEvent) => {
      const eye = eyeRef.current
      const pupil = pupilRef.current
      if (!eye || !pupil) return
      const rect = eye.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy) || 1
      const reach = Math.min(1.4, distance)
      pupil.style.transform = `translate(${((dx / distance) * reach).toFixed(2)}px, ${(
        (dy / distance) *
        reach
      ).toFixed(2)}px)`
    }

    document.addEventListener('pointermove', handleMove, { passive: true })
    return () => document.removeEventListener('pointermove', handleMove)
  }, [isActive])

  return (
    <div className="absolute -top-8 right-6 h-10 w-10 transition-transform duration-300 ease-out hover:-translate-y-1.5">
      <svg className="block h-full w-full overflow-visible" fill="none" viewBox="0 0 24 24">
        <rect
          fill="var(--bg-cherry-500)"
          height="11.978"
          rx="1.76147"
          width="15.4569"
          x="4.35938"
          y="8.49908"
        />
        <g>
          <circle cx="12.0217" cy="14.4881" fill="var(--base-white)" r="3.87523" ref={eyeRef} />
          <path
            d="M12.0237 12.8024C12.0237 13.7328 11.2673 14.4892 10.337 14.4892C10.0339 14.4892 9.74926 14.4101 9.50152 14.2678C9.47517 14.5551 9.49888 14.8502 9.57795 15.1428C9.93901 16.4921 11.3279 17.2933 12.6773 16.9323C14.0267 16.5712 14.8279 15.1823 14.4668 13.8329C14.1453 12.6285 13.0041 11.8616 11.8023 11.967C11.942 12.2121 12.0237 12.4967 12.0237 12.8024Z"
            fill="var(--bg-neutral-dark-1000)"
            ref={pupilRef}
            style={{ transition: 'transform 80ms linear' }}
          />
          <path
            d="M8.33833 7.94578L9.83358 4.31319C10.1302 3.59261 10.6676 2.99939 11.355 2.63299L13.9181 1.26684C14.1327 1.15169 14.3804 1.34885 14.3194 1.58439L13.6703 4.06892C13.6511 4.14046 13.6424 4.21374 13.6424 4.28876C13.6424 4.39868 13.6633 4.5086 13.7052 4.61154L15.0382 7.94578H8.33833ZM7.78 7.91088H15.5965C15.9053 7.91088 16.1548 8.16038 16.1548 8.4692C16.1548 8.77803 15.9053 9.02753 15.5965 9.02753H7.78C7.47118 9.02753 7.22168 8.77803 7.22168 8.4692C7.22168 8.16038 7.47118 7.91088 7.78 7.91088Z"
            fill="var(--bg-robin-500)"
          />
        </g>
      </svg>
    </div>
  )
}

function AgentCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-[var(--l3-background)] px-1 font-mono text-[10px] text-[var(--l1-foreground)]">
      {children}
    </code>
  )
}

const AGENT_SUGGESTIONS: { key: string; label: string; reply: ReactNode }[] = [
  {
    key: 'blast',
    label: 'Who else is affected?',
    reply: (
      <>
        Same pool is shared by <AgentCode>checkout</AgentCode> — it saw a 96 ms secondary spike.
      </>
    ),
  },
  {
    key: 'fix',
    label: 'Draft a fix',
    reply: (
      <>
        Suggested: raise <AgentCode>pool.max</AgentCode> to 40 and cap retries at 1 for{' '}
        <AgentCode>charge</AgentCode>.
      </>
    ),
  },
]

function AgentTelemetryStage({ isActive }: WhySignozStageVisualProps) {
  const [replies, setReplies] = useState<string[]>([])

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="relative mx-auto w-full max-w-[430px]">
        <NozPeek isActive={isActive} />
        <div className="relative overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l1-background)]">
          <StageCardHeader
            meta="reading telemetry"
            tag="schema known"
            tagAccent={ACCENT.forest}
            title="Agent"
          />

          <pre className="m-0 whitespace-pre-wrap break-words border-b border-[var(--l2-border)] bg-[var(--l2-background)] px-3 py-2 font-mono text-[10px] leading-relaxed text-[var(--l3-foreground)]">
            <span className="opacity-70">-- agent · signoz mcp</span>
            {'\n'}
            <span className="text-[var(--bg-robin-400)]">SELECT</span> service_name,{' '}
            <span className="text-[var(--bg-sakura-400)]">count</span>(){'\n'}
            <span className="text-[var(--bg-robin-400)]">FROM</span> signoz_signals{' '}
            <span className="text-[var(--bg-robin-400)]">WHERE</span>{' '}
            <span className="text-[var(--bg-forest-400)]">service.name</span> ={' '}
            <span className="text-[var(--bg-forest-400)]">&apos;consumer-svc-1&apos;</span>
          </pre>

          <div className="flex flex-col gap-2.5 px-3 py-2.5">
            <div className="max-w-[84%] self-end rounded-md rounded-br-none border border-[var(--l3-border)] bg-[var(--l3-background)] px-2 py-1.5 text-[11px] text-[var(--l1-foreground)]">
              Why did p99 spike at 14:02?
            </div>
            <div className="flex gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded border border-[var(--l3-border)] bg-[var(--l2-background)] text-[var(--l2-foreground)]">
                <Bot aria-hidden="true" size={11} />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5 text-[11px] leading-relaxed text-[var(--l2-foreground)]">
                <p className="m-0">
                  Correlated the p99 spike on <AgentCode>payments</AgentCode> with 47 error logs in
                  the same minute.
                </p>
                <div className="flex flex-wrap gap-1">
                  {[
                    ['traces', '1.2k'],
                    ['logs', '47'],
                    ['metrics', '9'],
                    ['services', '4'],
                  ].map(([name, count]) => (
                    <span
                      className="rounded border border-[var(--l2-border)] bg-[var(--l2-background)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--l3-foreground)]"
                      key={name}
                    >
                      <span className="text-[var(--bg-robin-400)]">{name}</span> {count}
                    </span>
                  ))}
                </div>
                <p className="m-0">
                  Root cause: the DB connection pool hit its ceiling of 20 while retries piled up.
                </p>
                {AGENT_SUGGESTIONS.filter((suggestion) => replies.includes(suggestion.key)).map(
                  (suggestion) => (
                    <p className="m-0" key={suggestion.key}>
                      {suggestion.reply}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {AGENT_SUGGESTIONS.map((suggestion) => {
              const used = replies.includes(suggestion.key)
              return (
                <button
                  className="cursor-pointer rounded-full border border-[var(--l3-border)] bg-[var(--l2-background)] px-2.5 py-1 text-[11px] text-[var(--l2-foreground)] transition-colors duration-200 hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)] disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={used}
                  key={suggestion.key}
                  onClick={() => setReplies((current) => [...current, suggestion.key])}
                  tabIndex={-1}
                  type="button"
                >
                  {suggestion.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export type WhySignozStageConfig = {
  key: string
  /** Set `image` to replace the built-in vignette with final art. */
  image?: string
  Visual: ComponentType<WhySignozStageVisualProps>
}

export const WHY_SIGNOZ_STAGES: WhySignozStageConfig[] = [
  { key: 'correlated-signals', Visual: CorrelatedSignalsStage },
  { key: 'opentelemetry', Visual: OtelPipelineStage },
  { key: 'columnar-store', Visual: ColumnarStoreStage },
  { key: 'agent-telemetry', Visual: AgentTelemetryStage },
]
