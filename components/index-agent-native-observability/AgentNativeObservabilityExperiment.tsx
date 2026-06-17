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
  },
  {
    label: 'Latency spike',
    promptLead:
      'Why did p99 latency for frontend jump after the deploy? Break it down by service, span, and dependency ',
    promptTail: 'so I can see where time moved.',
    toolLine: 'Let me inspect SigNoz traces and service latency around the deploy window.',
  },
  {
    label: 'Trace ID',
    promptLead:
      'Reconstruct trace bfb5cbf1e2fc0eadf86352a3bd659d34 end to end and point me to the slow span ',
    promptTail: 'with related logs.',
    toolLine: 'Let me pull the trace path, span timings, and related logs from SigNoz.',
  },
  {
    label: 'Alert audit',
    promptLead:
      'Which alerts fired in the last 24 hours without matching service degradation? Suggest thresholds ',
    promptTail: 'we should tune.',
    toolLine: 'Let me compare alert history with service metrics and incident signals in SigNoz.',
  },
  {
    label: 'Logs',
    promptLead:
      'Search checkout error logs for tenant acme-corp in the last hour and show the traces ',
    promptTail: 'that match the same failures.',
    toolLine: 'Let me search SigNoz logs and correlate matching traces for the tenant filter.',
  },
]

const thinkingVerbs = ['Channelling', 'Contemplating', 'Metamorphosing']

const sharedToolCallLines = [
  'Pulled p99 latency, call volume, and error-rate signals for the top operations.',
]

const signozMcpToolLine = 'Loaded tools, used SigNoz MCP Server integration ›'

const responseRows = [
  {
    operation: 'GET /api/recommendations',
    calls: '510 -> 540',
    p99Before: '112 ms',
    p99After: '170 ms',
    change: '+52%',
    errors: '0.8% -> 1.1%',
    assessment: 'p99 degraded',
  },
  {
    operation: 'GET /api/products/[productId]/index',
    calls: '405 -> 430',
    p99Before: '78 ms',
    p99After: '105 ms',
    change: '+35%',
    errors: '0% -> 14.4%',
    assessment: 'p99 + errors',
  },
  {
    operation: 'GET /api/cart',
    calls: '1156 -> 1250',
    p99Before: '3.78 ms',
    p99After: '4.23 ms',
    change: '+12%',
    errors: '0.09% -> 2.0%',
    assessment: 'errors spiked',
  },
  {
    operation: 'GET /api/products/index',
    calls: '192 -> 205',
    p99Before: '77 ms',
    p99After: '103 ms',
    change: '+33%',
    errors: '0.5% -> 0.5%',
    assessment: 'p99 degraded',
  },
  {
    operation: 'GET /api/currency',
    calls: '215 -> 228',
    p99Before: '210 ms',
    p99After: '250 ms',
    change: '+19%',
    errors: '0% -> 0%',
    assessment: 'minor',
  },
  {
    operation: 'GET /api/data',
    calls: '142 -> 136',
    p99Before: '104 ms',
    p99After: '98 ms',
    change: '-6%',
    errors: '0% -> 0%',
    assessment: 'ok',
  },
]

const degradedFindings = [
  'GET /api/products/[productId]/index - p99 went from ~78 ms to ~105 ms (+35%) and error rate jumped from 0% to 14.4%.',
  'GET /api/cart - error rate spiked from 0.09% to 2.0% (22x increase), though latency impact is minor.',
  'GET /api/recommendations - p99 jumped from ~112 ms to ~170 ms (+52%), the biggest latency regression on a moderate-traffic endpoint.',
  'GET /api/products/index - p99 went from ~77 ms to ~103 ms (+33%).',
]

function LocalAgentSurface() {
  const [activePromptIndex, setActivePromptIndex] = useState(0)
  const [animationCycle, setAnimationCycle] = useState(0)
  const activePrompt = agentPromptTabs[activePromptIndex]
  const toolCallLines = [activePrompt.toolLine, signozMcpToolLine, ...sharedToolCallLines]

  return (
    <div className="relative h-full overflow-hidden rounded-[3px] px-6 pb-8 pt-11 font-mono md:pb-10 md:pl-8 md:pr-10 md:pt-14 lg:pl-10 lg:pr-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-[3px] bg-gradient-to-r from-signoz_ink-400 via-signoz_ink-400/95 to-signoz_ink-400/0 shadow-[0_28px_90px_rgba(0,0,0,0.58)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-9 border-b border-white/[0.055] bg-gradient-to-r from-white/[0.025] via-white/[0.012] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 rounded-[3px] ring-1 ring-inset ring-white/[0.05]" />
      <div className="absolute left-0 right-0 top-0 z-[2] flex h-9 items-center gap-1 overflow-hidden px-2 text-[11px] leading-none text-[#aaa79f]">
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
        <div className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 text-[14px] leading-[1.75] text-[#f1eee7] md:text-[15px]">
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

          <div className="relative col-span-2 mt-10 min-h-[350px]">
            {thinkingVerbs.map((verb, index) => (
              <div
                key={verb}
                className="homepage-agent-thinking-line absolute inset-0 grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 text-[14px] font-semibold leading-[1.75] text-[#ff8a3d] md:text-[15px]"
                style={{ animationDelay: `${1600 + index * 650}ms` }}
              >
                <span>*</span>
                <span>{verb}</span>
              </div>
            ))}

            <div className="homepage-agent-response-shell absolute inset-0 max-h-[350px] overflow-y-auto overflow-x-hidden pr-3 text-[#aaa79f]">
              <div className="space-y-6 text-[14px] leading-[1.75] md:text-[15px]">
                {toolCallLines.map((line) => (
                  <div key={line} className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-4">
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

              <div className="mt-9 grid grid-cols-[20px_minmax(0,1fr)] gap-x-4">
                <span aria-hidden="true" />
                <div className="min-w-0 text-[14px] leading-[1.75] text-[#aaa79f] md:text-[15px]">
                  <p className="m-0">
                    Frontend service - Top operations comparison (30 min before vs after 10:00 AM
                    PST)
                  </p>

                  <div className="mt-5 space-y-1">
                    <div className="grid grid-cols-[minmax(0,1.9fr)_0.8fr_0.7fr_0.7fr_0.55fr_0.8fr_0.9fr] gap-x-3 border-b border-[#aaa79f]/25 pb-1 text-[#c4c0b8]">
                      <span>Operation</span>
                      <span>Calls</span>
                      <span>p99 before</span>
                      <span>p99 after</span>
                      <span>Change</span>
                      <span>Errors</span>
                      <span>Assessment</span>
                    </div>
                    {responseRows.map((row) => (
                      <div
                        key={row.operation}
                        className="grid grid-cols-[minmax(0,1.9fr)_0.8fr_0.7fr_0.7fr_0.55fr_0.8fr_0.9fr] gap-x-3"
                      >
                        <span className="truncate">{row.operation}</span>
                        <span>{row.calls}</span>
                        <span>{row.p99Before}</span>
                        <span>{row.p99After}</span>
                        <span>{row.change}</span>
                        <span>{row.errors}</span>
                        <span>{row.assessment}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mb-0 mt-7">Things that degraded after deployment:</p>
                  <div className="mt-3 space-y-2">
                    {degradedFindings.map((finding) => (
                      <p key={finding} className="m-0 grid grid-cols-[14px_minmax(0,1fr)] gap-x-2">
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

export default function AgentNativeObservabilityExperiment() {
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
      className={`homepage-variant-only homepage-agent-native-section relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-24 sm:px-6 lg:px-[78px] lg:py-32 ${
        isActive ? 'homepage-agent-native-active' : ''
      }`}
      data-homepage-agent-native-observability
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          className="absolute left-4 right-4 top-24 h-[760px] sm:left-6 sm:right-6 lg:left-[78px] lg:right-[78px] lg:top-32"
          data-homepage-floating-cta="Explore agent-native observability"
          data-homepage-floating-href="/agent-native-observability/"
          aria-hidden="true"
        />

        <div className="grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-start md:gap-20">
          <h2 className="m-0 max-w-[540px] text-[40px] font-medium leading-[1.04] tracking-[-1.1px] text-signoz_vanilla-100 md:text-[58px] md:tracking-[-1.65px]">
            Agent-native observability for production teams.
          </h2>

          <div className="max-w-[560px] md:pt-2">
            <p className="text-signoz_vanilla-300/82 m-0 text-[19px] leading-9 tracking-[-0.28px]">
              Give coding agents and Noz the same traces, logs, metrics, alerts, and infra context
              your engineers use, so investigations can start wherever your team is already working.
            </p>
            <CustomLink
              className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/agent-native-observability/"
            >
              Agent Native Observability
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={15}
              />
            </CustomLink>
          </div>
        </div>

        <div className="relative mt-20 min-h-[780px] md:min-h-[650px] lg:min-h-[700px]">
          <div className="absolute left-0 top-[92px] h-[520px] w-full md:top-[88px] md:h-[560px] md:w-[76%] lg:top-[108px] lg:h-[592px] lg:w-[78%]">
            <LocalAgentSurface />
          </div>

          <div className="absolute right-0 top-0 z-20 w-[330px] md:w-[388px] lg:w-[430px]">
            <div className="rounded-[18px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.045)_42%,rgba(255,255,255,0.10))] p-px shadow-[0_34px_120px_rgba(0,0,0,0.58)]">
              <div className="overflow-hidden rounded-[17px] bg-[#080b0f]">
                <Image
                  alt="Noz assistant panel with suggested observability prompts"
                  className="h-auto w-full rounded-[17px]"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 430px, (min-width: 768px) 388px, 330px"
                  src={nozPanel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
