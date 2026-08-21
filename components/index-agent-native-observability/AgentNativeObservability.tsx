'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { useLogEvent } from '@/hooks/useLogEvent'
import TrackingLink from '@/components/TrackingLink'
import nozPanel from '@/public/img/graphics/homepage/noz-agent-native-panel.webp'
import { HOMEPAGE_INTEGRATION_ICONS } from '@/constants/homepageIntegrationIcons'
import { cn } from 'app/lib/utils'
import { agentPromptTabs, signozMcpToolLine, thinkingVerbs } from './agentNativePrompts'

const agentIntegrations = [
  { label: 'OpenAI', iconSrc: HOMEPAGE_INTEGRATION_ICONS.openai },
  { label: 'Claude', iconSrc: HOMEPAGE_INTEGRATION_ICONS.claude },
  { label: 'Cursor', iconSrc: HOMEPAGE_INTEGRATION_ICONS.cursor },
  { label: 'OpenCode', iconSrc: HOMEPAGE_INTEGRATION_ICONS.opencode },
]

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
            className="size-full rounded-sm bg-contain bg-center bg-no-repeat drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: `url("${agent.iconSrc}")` }}
          />
        </span>
      ))}
    </div>
  )
}

function LocalAgentSurface({ isActive }: { isActive: boolean }) {
  const [activePromptIndex, setActivePromptIndex] = useState(0)
  const [animationCycle, setAnimationCycle] = useState(0)
  const logEvent = useLogEvent()
  const activePrompt = agentPromptTabs[activePromptIndex]
  const toolCallLines = [activePrompt.toolLine, signozMcpToolLine, activePrompt.signalLine]
  const responseGridTemplate = `minmax(0, 1.9fr) repeat(${activePrompt.columns.length - 1}, minmax(72px, 0.82fr))`

  return (
    <div className="relative h-full overflow-hidden rounded-sm px-4 pb-6 pt-11 font-mono md:overflow-visible md:pb-10 md:pl-8 md:pr-10 md:pt-14 lg:pl-10 lg:pr-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 rounded-sm bg-gradient-to-r from-signoz_ink-400 via-signoz_ink-400/95 to-signoz_ink-400/0 shadow-[0_28px_90px_rgba(0,0,0,0.58)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-9 border-b border-white/[0.055] bg-gradient-to-r from-white/[0.025] via-white/[0.012] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 rounded-sm ring-1 ring-inset ring-white/[0.05]" />
      <div className="absolute left-8 top-[-42px] z-[3] hidden h-8 items-center gap-3 text-base tracking-[-0.01em] text-[#8f948f] md:flex lg:left-10">
        <span>Work with your agent</span>
        <AgentIntegrationIcons />
        <span>and more</span>
      </div>
      <div className="absolute left-0 right-0 top-0 z-[2] flex h-9 items-center gap-1 overflow-x-auto overflow-y-hidden px-2 text-[11px] leading-none text-[#aaa79f] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {agentPromptTabs.map((tab, index) => {
          const isPromptActive = index === activePromptIndex

          return (
            <button
              key={tab.label}
              className={`h-7 shrink-0 rounded-md px-2.5 transition-colors ${
                isPromptActive
                  ? 'bg-white/[0.075] text-signoz_vanilla-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                  : 'text-[#8d918f] hover:bg-white/[0.04] hover:text-[#c4c0b8]'
              }`}
              onClick={() => {
                logEvent({
                  eventName: 'Website Click',
                  eventType: 'track',
                  attributes: {
                    clickType: 'Agent Prompt Tab',
                    clickName: 'Homepage Agent Prompt Tab',
                    clickLocation: 'Homepage Agent Native Observability Section',
                    clickText: tab.label,
                  },
                })
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
              <span
                className={cn(
                  'inline-block [clip-path:inset(0_100%_0_0)] motion-reduce:[clip-path:inset(0_0_0_0)]',
                  isActive && 'animate-homepage-agent-prompt-tail motion-reduce:animate-none'
                )}
              >
                {activePrompt.promptTail}
              </span>
            </p>
          </div>

          <div className="relative col-span-2 mt-8 min-h-[300px] md:mt-10 md:min-h-[350px]">
            {thinkingVerbs.map((verb, index) => (
              <div
                key={verb}
                className={cn(
                  'absolute inset-0 grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 text-[13px] font-semibold leading-[1.65] text-[#ff8a3d] opacity-0 motion-reduce:opacity-100 md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4 md:text-[15px] md:leading-[1.75]',
                  isActive && 'animate-homepage-agent-thinking-cycle motion-reduce:animate-none'
                )}
                style={{ animationDelay: `${1600 + index * 650}ms` }}
              >
                <span>*</span>
                <span>{verb}</span>
              </div>
            ))}

            <div
              className={cn(
                'absolute inset-0 m-0 max-h-[300px] overflow-y-auto overflow-x-hidden rounded-none bg-transparent p-0 pr-1 text-[#b8b5ad] opacity-0 motion-reduce:opacity-100 md:max-h-[350px] md:pr-3',
                isActive && 'animate-homepage-agent-response-reveal motion-reduce:animate-none'
              )}
            >
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
                            className="relative top-[2px] size-3.5 rounded-sm"
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
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 overflow-hidden bg-signoz_ink-500 px-5 py-16 sm:px-6 md:py-24 lg:px-20 lg:py-32 wide:px-0"
      data-homepage-agent-native-observability
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_24%_42%,rgba(78,116,248,0.09),transparent_64%),radial-gradient(ellipse_72%_54%_at_82%_52%,rgba(35,196,248,0.055),transparent_66%),linear-gradient(180deg,rgba(22,25,34,0.08),rgba(11,12,14,0.42)_50%,rgba(11,12,14,0.1))] [mask-image:linear-gradient(180deg,transparent_0%,black_16%,black_82%,transparent_100%)]" />
      <div className="relative mx-auto max-w-8xl">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[760px] sm:left-6 sm:right-6 lg:left-20 lg:right-20 lg:top-32"
          data-homepage-floating-cta="Explore agent-native observability"
          data-homepage-floating-href="/agent-native-observability/"
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-start md:gap-20">
          <h2 className="m-0 max-w-[540px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
            Agent-native observability,
            <br />
            <span className="text-signoz_vanilla-400">inside your IDE and SigNoz Cloud.</span>
          </h2>

          <div className="max-w-[560px] md:pt-2">
            <p className="text-signoz_vanilla-300/82 m-0 text-base leading-7 tracking-[-0.15px] sm:text-[19px] sm:leading-9 sm:tracking-[-0.28px]">
              Use the SigNoz MCP server to bring telemetry into coding agents, or use Noz, your AI
              teammate inside SigNoz Cloud, to investigate incidents, tune alerts, and build
              dashboards with the same production context your team sees.
            </p>
            <TrackingLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300 sm:mt-9"
              clickLocation="Homepage Agent Native Observability Section"
              clickName="Explore MCP and Noz Link"
              clickText="Explore MCP and Noz"
              clickType="Secondary CTA"
              href="/agent-native-observability/"
            >
              Explore MCP and Noz
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={15}
              />
            </TrackingLink>
          </div>
        </div>

        <div className="-mx-5 mt-14 min-h-[560px] overflow-x-auto overflow-y-visible px-5 pb-4 pt-6 [scrollbar-width:none] sm:-mx-6 sm:mt-20 sm:px-6 md:hidden [&::-webkit-scrollbar]:hidden">
          <div className="relative h-[520px] w-[132dvw] min-w-[510px] max-w-[560px]">
            <div className="absolute left-5 top-[118px] z-20 flex h-8 items-center gap-2 font-mono text-[15px] tracking-[-0.01em] text-[#8f948f]">
              <span>Work with</span>
              <AgentIntegrationIcons />
            </div>
            <div
              className={cn(
                'absolute left-0 top-12 h-[calc(100%-48px)] w-[66%] rounded-[18px] border border-signoz_slate-400/20 bg-[#06090d] opacity-0 shadow-[0_34px_120px_rgba(0,0,0,0.42)] will-change-[opacity,transform] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:will-change-auto',
                isActive && 'animate-homepage-agent-terminal-enter motion-reduce:animate-none'
              )}
            />
            <div
              className={cn(
                'absolute bottom-0 left-5 h-[360px] w-[62%] overflow-hidden rounded-sm opacity-0 ring-1 ring-white/[0.06] will-change-[opacity,transform] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:will-change-auto',
                isActive && 'animate-homepage-agent-terminal-enter motion-reduce:animate-none'
              )}
            >
              <LocalAgentSurface isActive={isActive} />
            </div>
            <NozPanelCard
              className={cn(
                'absolute bottom-0 left-[62%] z-10 w-[300px] opacity-0 will-change-[opacity,transform] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:will-change-auto',
                isActive && 'animate-homepage-agent-noz-enter motion-reduce:animate-none'
              )}
            />
          </div>
        </div>

        <div className="relative mt-20 hidden min-h-[650px] md:block lg:min-h-[700px]">
          <div
            className={cn(
              'absolute left-0 top-[88px] h-[560px] w-[76%] opacity-0 will-change-[opacity,transform] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:will-change-auto lg:top-[108px] lg:h-[592px] lg:w-[78%]',
              isActive && 'animate-homepage-agent-terminal-enter motion-reduce:animate-none'
            )}
          >
            <LocalAgentSurface isActive={isActive} />
          </div>

          <div
            className={cn(
              'absolute right-0 top-0 z-20 w-[388px] opacity-0 will-change-[opacity,transform] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:will-change-auto lg:w-[430px]',
              isActive && 'animate-homepage-agent-noz-enter motion-reduce:animate-none'
            )}
          >
            <NozPanelCard />
          </div>
        </div>
      </div>
    </section>
  )
}
