'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import CustomLink from '@/components/Link'
import nozPanel from '@/public/img/graphics/homepage/noz-agent-native-panel.png'

const agentPromptTabs = [
  {
    label: 'Deploy check',
    promptLead:
      'Show me the top operations for the frontend service. For each endpoint, compare p99 latency and error rate from the 30 minutes before 10:00 AM PST vs the 30 minutes after. ',
    promptTail: 'Flag anything that degraded.',
    toolLine: 'Let me check SigNoz for frontend service operations before and after 10:00 AM PST.',
    signalLine: 'Pulled p99 latency, call volume, and error-rate signals for the top operations.',
    responseTitle:
      'Frontend service - Top operations comparison (30 min before vs after 10:00 AM PST)',
    columns: ['Operation', 'Calls', 'p99 before', 'p99 after', 'Change', 'Errors', 'Assessment'],
    rows: [
      [
        'GET /api/recommendations',
        '510 -> 540',
        '112 ms',
        '170 ms',
        '+52%',
        '0.8% -> 1.1%',
        'p99 degraded',
      ],
      [
        'GET /api/products/[productId]',
        '405 -> 430',
        '78 ms',
        '105 ms',
        '+35%',
        '0% -> 14.4%',
        'p99 + errors',
      ],
      [
        'GET /api/cart',
        '1156 -> 1250',
        '3.78 ms',
        '4.23 ms',
        '+12%',
        '0.09% -> 2.0%',
        'errors spiked',
      ],
      [
        'GET /api/products/index',
        '192 -> 205',
        '77 ms',
        '103 ms',
        '+33%',
        '0.5% -> 0.5%',
        'p99 degraded',
      ],
      ['GET /api/currency', '215 -> 228', '210 ms', '250 ms', '+19%', '0% -> 0%', 'minor'],
      ['GET /api/data', '142 -> 136', '104 ms', '98 ms', '-6%', '0% -> 0%', 'ok'],
    ],
    findingsTitle: 'Things that degraded after deployment:',
    findings: [
      'GET /api/products/[productId] - p99 rose 35% and error rate jumped from 0% to 14.4%.',
      'GET /api/cart - error rate spiked from 0.09% to 2.0%, a 22x increase.',
      'GET /api/recommendations - p99 jumped 52%, the largest latency regression.',
    ],
  },
  {
    label: 'Latency spike',
    promptLead:
      'Why did p99 latency for frontend jump after the deploy? Break it down by service, span, and dependency ',
    promptTail: 'so I can see where time moved.',
    toolLine: 'Let me inspect slow checkout traces and compare them with a healthy baseline.',
    signalLine:
      'Compared span trees, p50/p99 buckets, downstream service latency, and warning logs.',
    responseTitle: 'Latency spike - checkout-service p99 breakdown',
    columns: ['Span or signal', 'Healthy', 'Spike', 'Change', 'Readout'],
    rows: [
      ['POST /api/checkout', '387 ms', '4,712 ms', '+1117%', 'systemic'],
      ['ProcessPayment', '291 ms', '4,480 ms', '+1439%', 'bottleneck'],
      ['ChargeCard', '248 ms', '4,430 ms', '+1686%', 'downstream'],
      ['checkout p50', '~400 ms', '3.8 s', '+850%', 'all requests'],
      ['checkout p99', '~400 ms', '4.7 s', '+1075%', 'page-worthy'],
      ['error rate', '0%', '12%', '+12 pts', 'timeouts'],
    ],
    findingsTitle: 'Where the time moved:',
    findings: [
      '95% of the slow trace is inside ProcessPayment, specifically ChargeCard.',
      'Both p50 and p99 jumped together, so this is not a tail-only issue.',
      'Payment-service logs show a Stripe endpoint region change at the spike time.',
    ],
  },
  {
    label: 'Trace lookup',
    promptLead:
      'Reconstruct trace bfb5cbf1e2fc0eadf86352a3bd659d34 end to end and point me to the slow span ',
    promptTail: 'with related logs.',
    toolLine: 'Let me pull the trace path, span timings, and related logs from SigNoz.',
    signalLine:
      'Parsed the flamegraph, waterfall timing, span attributes, and logs linked by trace_id.',
    responseTitle: 'Trace bfb5cbf1... - support-ticket reconstruction',
    columns: ['Step', 'Service', 'Status', 'Readout'],
    rows: [
      ['api-gateway /api/checkout', 'api-gateway', 'OK', '823 ms'],
      ['auth-service /verify-token', 'auth-service', 'OK', '12 ms'],
      ['checkout-service /process', 'checkout-service', 'FAILED', '798 ms'],
      ['inventory-service /reserve', 'inventory-service', 'OK', '45 ms'],
      ['payment-service /charge', 'payment-service', 'FAILED', '680 ms'],
      ['stripe.com/v1/charges', 'stripe', '402', 'card_declined'],
    ],
    findingsTitle: 'Trace readout:',
    findings: [
      'The card was declined by Stripe, but payment-service re-raised it as InternalServerError.',
      'order-service was never called because payment failed first.',
      'This should be shown to the customer as Payment declined, not a generic 500.',
    ],
  },
  {
    label: 'Alert audit',
    promptLead:
      'Which alerts fired in the last 24 hours without matching service degradation? Suggest thresholds ',
    promptTail: 'we should tune.',
    toolLine: 'Let me compare alert history with service metrics and incident signals in SigNoz.',
    signalLine:
      'Checked alert transitions against service error rate, p99 latency, and recovery windows.',
    responseTitle: 'Alert audit - last 24 hours',
    columns: ['Alert', 'Severity', 'Class', 'Readout'],
    rows: [
      ['Database Connection Pool', 'critical', 'VALID', '8/9 firings showed severe degradation'],
      ['High Error Rate checkout', 'critical', 'VALID', '6/6 firings matched error-rate increase'],
      ['Cart Service Latency', 'warning', 'FLAPPING', '78 fires/day with no sampled degradation'],
      ['Frontend 5xx Errors', 'warning', 'FLAPPING', 'oscillates around threshold'],
      ['API Gateway Timeout', 'warning', 'NOISY', '120 fires/day, auto-resolves under 1 min'],
      ['test-alert', 'critical', 'STALE', 'firing since Apr 10 with invalid rule'],
    ],
    findingsTitle: 'Noise to tune first:',
    findings: [
      'Keep the database and checkout alerts; they correlate with real service degradation.',
      'Tune cart latency and frontend 5xx thresholds because they flap around noise.',
      'Fix API Gateway Timeout first for volume, and delete the stale test alert.',
    ],
  },
  {
    label: 'Logs',
    promptLead:
      'Show me recent error or warning logs related to search indexing or index lag, then find ',
    promptTail: 'what changed upstream.',
    toolLine: 'Let me search SigNoz logs for indexing lag, malformed events, and upstream deploys.',
    signalLine:
      'Grouped warning logs by service, counted malformed events, and checked deploy logs.',
    responseTitle: 'Search indexing lag - log investigation',
    columns: ['Signal', 'Service', 'Count', 'Readout'],
    rows: [
      ['Index lag warnings', 'search-indexer', '34', '4h+ behind head'],
      ['Malformed events', 'search-indexer', '9,847', 'sku_id and price schema mismatch'],
      ['Dead letter queue', 'search-indexer', '9,214', '~6,800 products affected'],
      ['Deployment started', 'catalog-pipeline', '1', 'v2.14.0 -> v2.15.0'],
      ['Schema migration', 'catalog-pipeline', '2 changes', 'sku_id nested, price stringified'],
      ['Throughput', 'search-indexer', '12/sec', 'normal is ~340/sec'],
    ],
    findingsTitle: 'Log correlation:',
    findings: [
      'The indexer is not down; it is stuck retrying malformed events from catalog-pipeline.',
      'The break starts after the v2.15.0 schema migration and backfill.',
      'Rollback catalog-pipeline or hotfix search-indexer, then replay the DLQ.',
    ],
  },
]

const thinkingVerbs = ['Channelling', 'Contemplating', 'Metamorphosing']

const agentIntegrations = [
  { label: 'OpenAI', domain: 'openai.com' },
  { label: 'Claude', domain: 'claude.ai' },
  { label: 'Cursor', domain: 'cursor.com' },
  { label: 'OpenCode', domain: 'opencode.ai' },
]

const signozMcpToolLine = 'Loaded tools, used SigNoz MCP Server integration ›'

const getFaviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`

function AgentIntegrationIcons() {
  return (
    <div className="flex items-center gap-1.5">
      {agentIntegrations.map((agent) => (
        <span
          key={agent.label}
          aria-label={agent.label}
          className="group relative flex size-5 items-center justify-center transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-125 sm:size-6 md:size-7"
          role="img"
          title={agent.label}
        >
          <span
            className="size-full rounded-[2px] bg-contain bg-center bg-no-repeat drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: `url("${getFaviconUrl(agent.domain)}")` }}
          />
        </span>
      ))}
    </div>
  )
}

function LocalAgentSurface() {
  const [activePromptIndex, setActivePromptIndex] = useState(0)
  const [animationCycle, setAnimationCycle] = useState(0)
  const activePrompt = agentPromptTabs[activePromptIndex]
  const toolCallLines = [activePrompt.toolLine, signozMcpToolLine, activePrompt.signalLine]
  const responseGridTemplate = `minmax(0, 1.9fr) repeat(${activePrompt.columns.length - 1}, minmax(72px, 0.82fr))`

  return (
    <div className="relative h-full overflow-hidden rounded-[3px] px-4 pb-6 pt-11 font-mono md:overflow-visible md:pb-10 md:pl-8 md:pr-10 md:pt-14 lg:pl-10 lg:pr-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-[3px] bg-gradient-to-r from-signoz_ink-400 via-signoz_ink-400/95 to-signoz_ink-400/0 shadow-[0_28px_90px_rgba(0,0,0,0.58)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-9 border-b border-white/[0.055] bg-gradient-to-r from-white/[0.025] via-white/[0.012] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 rounded-[3px] ring-1 ring-inset ring-white/[0.05]" />
      <div className="absolute left-0 top-[-42px] z-[3] hidden h-8 items-center gap-3 text-[16px] tracking-[-0.01em] text-[#8f948f] md:flex">
        <span>Work with your agent</span>
        <AgentIntegrationIcons />
        <span>and more</span>
      </div>
      <div className="absolute left-0 right-0 top-0 z-[2] flex h-9 items-center gap-1 overflow-x-auto overflow-y-hidden px-2 text-[11px] leading-none text-[#aaa79f] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {agentPromptTabs.map((tab, index) => {
          const isActive = index === activePromptIndex

          return (
            <button
              key={tab.label}
              className={`h-7 shrink-0 rounded-[5px] px-2.5 transition-colors ${
                isActive
                  ? 'bg-white/[0.075] text-signoz_vanilla-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                  : 'text-[#8d918f] hover:bg-white/[0.04] hover:text-[#c4c0b8]'
              }`}
              onClick={() => {
                setActivePromptIndex(index)
                setAnimationCycle((cycle) => cycle + 1)
              }}
              type="button"
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div key={`${activePrompt.label}-${animationCycle}`} className="relative z-[1] max-w-[840px]">
        <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 text-[13px] leading-[1.65] text-[#f1eee7] md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4 md:text-[15px] md:leading-[1.75]">
          <span className="homepage-agent-prompt-marker text-[18px] font-semibold leading-[1.75] text-[#ff8a3d]">
            &gt;
          </span>
          <div className="min-w-0">
            <p className="m-0">
              {activePrompt.promptLead}
              <span className="homepage-agent-prompt-tail inline-block">
                {activePrompt.promptTail}
              </span>
            </p>
          </div>

          <div className="relative col-span-2 mt-8 min-h-[300px] md:mt-10 md:min-h-[350px]">
            {thinkingVerbs.map((verb, index) => (
              <div
                key={verb}
                className="homepage-agent-thinking-line absolute inset-0 grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 text-[13px] font-semibold leading-[1.65] text-[#ff8a3d] md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4 md:text-[15px] md:leading-[1.75]"
                style={{ animationDelay: `${1600 + index * 650}ms` }}
              >
                <span>*</span>
                <span>{verb}</span>
              </div>
            ))}

            <div className="homepage-agent-response-shell absolute inset-0 max-h-[300px] overflow-y-auto overflow-x-hidden pr-1 text-[#aaa79f] md:max-h-[350px] md:pr-3">
              <div className="space-y-5 text-[13px] leading-[1.65] md:space-y-6 md:text-[15px] md:leading-[1.75]">
                {toolCallLines.map((line) => (
                  <div
                    key={line}
                    className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4"
                  >
                    <span className="homepage-agent-tool-marker mt-[0.55em] size-[9px] rounded-full bg-[#b8b5ad]" />
                    {line === signozMcpToolLine ? (
                      <span>
                        Loaded tools, used{' '}
                        <span className="relative -top-px inline-flex items-baseline gap-1.5 align-baseline">
                          <Image
                            alt=""
                            aria-hidden="true"
                            className="relative top-[2px] size-3.5 rounded-[3px]"
                            height={14}
                            src="/static/favicons/favicon-32x32.png"
                            width={14}
                          />
                          <span>SigNoz</span>
                        </span>{' '}
                        MCP Server integration ›
                      </span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 md:mt-9 md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4">
                <span aria-hidden="true" />
                <div className="min-w-0 text-[13px] leading-[1.65] text-[#aaa79f] md:text-[15px] md:leading-[1.75]">
                  <p className="m-0">{activePrompt.responseTitle}</p>

                  <div className="mt-5 hidden space-y-1 sm:block">
                    <div
                      className="grid gap-x-3 border-b border-[#aaa79f]/25 pb-1 text-[#c4c0b8]"
                      style={{ gridTemplateColumns: responseGridTemplate }}
                    >
                      {activePrompt.columns.map((column) => (
                        <span key={column} className="min-w-0 truncate">
                          {column}
                        </span>
                      ))}
                    </div>
                    {activePrompt.rows.map((row) => (
                      <div
                        key={row.join('|')}
                        className="grid gap-x-3"
                        style={{ gridTemplateColumns: responseGridTemplate }}
                      >
                        {row.map((cell, cellIndex) => (
                          <span key={`${cell}-${cellIndex}`} className="min-w-0 truncate">
                            {cell}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>

                  <p className="mb-0 mt-5 md:mt-7">{activePrompt.findingsTitle}</p>
                  <div className="mt-3 space-y-2">
                    {activePrompt.findings.map((finding) => (
                      <p
                        key={finding}
                        className="m-0 grid grid-cols-[12px_minmax(0,1fr)] gap-x-2 md:grid-cols-[14px_minmax(0,1fr)]"
                      >
                        <span>-</span>
                        <span>{finding}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-signoz_ink-400 via-signoz_ink-400/90 to-transparent" />
    </div>
  )
}

function NozPanelCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[18px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.045)_42%,rgba(255,255,255,0.10))] p-px shadow-[0_34px_120px_rgba(0,0,0,0.58)] ${className}`}
    >
      <div className="overflow-hidden rounded-[17px] bg-[#080b0f]">
        <Image
          alt="Noz assistant panel with suggested observability prompts"
          className="h-auto w-full rounded-[17px]"
          placeholder="blur"
          sizes="(min-width: 1024px) 430px, (min-width: 768px) 388px, 270px"
          src={nozPanel}
        />
      </div>
    </div>
  )
}

export default function AgentNativeObservabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-12% 0px -22% 0px', threshold: 0.24 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`homepage-agent-native-section relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 overflow-hidden bg-signoz_ink-500 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32 ${
        isActive ? 'homepage-agent-native-active' : ''
      }`}
      data-homepage-agent-native-observability
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_24%_42%,rgba(78,116,248,0.09),transparent_64%),radial-gradient(ellipse_72%_54%_at_82%_52%,rgba(35,196,248,0.055),transparent_66%),linear-gradient(180deg,rgba(22,25,34,0.08),rgba(11,12,14,0.42)_50%,rgba(11,12,14,0.1))] [mask-image:linear-gradient(180deg,transparent_0%,black_16%,black_82%,transparent_100%)]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[760px] sm:left-6 sm:right-6 lg:left-[78px] lg:right-[78px] lg:top-32"
          data-homepage-floating-cta="Explore agent-native observability"
          data-homepage-floating-href="/agent-native-observability/"
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-start md:gap-20">
          <h2 className="m-0 max-w-[540px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
            Agent-native observability, inside your IDE and SigNoz.
          </h2>

          <div className="max-w-[560px] md:pt-2">
            <p className="text-signoz_vanilla-300/82 m-0 text-[16px] leading-7 tracking-[-0.15px] sm:text-[19px] sm:leading-9 sm:tracking-[-0.28px]">
              Use the SigNoz MCP server to bring telemetry into coding agents, or use Noz, your AI
              teammate inside SigNoz, to investigate incidents, tune alerts, and build dashboards
              with the same production context your team sees.
            </p>
            <CustomLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300 sm:mt-9"
              href="/agent-native-observability/"
            >
              Explore MCP and Noz
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={15}
              />
            </CustomLink>
          </div>
        </div>

        <div className="-mx-5 mt-14 min-h-[560px] overflow-x-auto overflow-y-visible px-5 pb-4 pt-6 [scrollbar-width:none] sm:-mx-6 sm:mt-20 sm:px-6 md:hidden [&::-webkit-scrollbar]:hidden">
          <div className="relative h-[520px] w-[132vw] min-w-[510px] max-w-[560px]">
            <div className="absolute left-5 top-[118px] z-20 flex h-8 items-center gap-2 font-mono text-[15px] tracking-[-0.01em] text-[#8f948f]">
              <span>Work with</span>
              <AgentIntegrationIcons />
            </div>
            <div className="absolute left-0 top-12 h-[calc(100%-48px)] w-[66%] rounded-[18px] border border-signoz_slate-400/20 bg-[#06090d] shadow-[0_34px_120px_rgba(0,0,0,0.42)]" />
            <div className="opacity-82 absolute bottom-0 left-5 h-[360px] w-[62%] overflow-hidden rounded-[3px] ring-1 ring-white/[0.06]">
              <LocalAgentSurface />
            </div>
            <NozPanelCard className="absolute bottom-0 left-[62%] z-10 w-[300px]" />
          </div>
        </div>

        <div className="relative mt-20 hidden min-h-[650px] md:block lg:min-h-[700px]">
          <div className="absolute left-0 top-[88px] h-[560px] w-[76%] lg:top-[108px] lg:h-[592px] lg:w-[78%]">
            <LocalAgentSurface />
          </div>

          <div className="absolute right-0 top-0 z-20 w-[388px] lg:w-[430px]">
            <NozPanelCard />
          </div>
        </div>
      </div>
    </section>
  )
}
