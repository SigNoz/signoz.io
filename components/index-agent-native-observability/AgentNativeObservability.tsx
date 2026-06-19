'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { EXPERIMENTS } from '@/constants/experiments'
import { useLogEvent } from '@/hooks/useLogEvent'
import nozPanel from '@/public/img/graphics/homepage/noz-agent-native-panel.webp'
import { agentPromptTabs, signozMcpToolLine, thinkingVerbs } from './agentNativePrompts'

const agentIntegrations = [
  { label: 'OpenAI', iconSrc: '/img/icons/listicle/si-openai.svg' },
  { label: 'Claude', iconSrc: '/img/icons/listicle/si-claude-b55c04.svg' },
  { label: 'Cursor', iconSrc: '/img/docs/cursor-icon.webp' },
  { label: 'OpenCode', iconSrc: '/svgs/icons/LLMMonitoring/opencode-logo.webp' },
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
          <Image
            alt=""
            aria-hidden="true"
            className="size-full rounded-[2px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            height={28}
            src={agent.iconSrc}
            width={28}
          />
        </span>
      ))}
    </div>
  )
}

function LocalAgentSurface({ isActive }: { isActive: boolean }) {
  const [activePromptIndex, setActivePromptIndex] = useState(0)
  const [animationCycle, setAnimationCycle] = useState(0)
  const pathname = usePathname()
  const logEvent = useLogEvent()
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
      <div
        aria-label="Agent-native prompt examples"
        className="absolute left-0 right-0 top-0 z-[2] flex h-9 items-center gap-1 overflow-x-auto overflow-y-hidden px-2 text-[11px] leading-none text-[#aaa79f] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
      >
        {agentPromptTabs.map((tab, index) => {
          const isTabActive = index === activePromptIndex

          return (
            <button
              key={tab.label}
              aria-controls="agent-native-prompt-panel"
              aria-selected={isTabActive}
              className={`h-7 shrink-0 rounded-[5px] px-2.5 transition-colors ${
                isTabActive
                  ? 'bg-white/[0.075] text-signoz_vanilla-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                  : 'text-[#8d918f] hover:bg-white/[0.04] hover:text-[#c4c0b8]'
              }`}
              id={`agent-native-tab-${index}`}
              onClick={() => {
                logEvent({
                  eventName: 'Website Click',
                  eventType: 'track',
                  attributes: {
                    clickType: 'Tab',
                    button_type: 'Tab',
                    clickName: 'Agent Native Prompt Tab',
                    clickLocation: 'Agent Native Observability Section',
                    clickText: tab.label,
                    pageLocation: pathname,
                    is_experiment_conversion: true,
                    experiment_id: EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id,
                    variant_id: EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT,
                  },
                })
                setActivePromptIndex(index)
                setAnimationCycle((cycle) => cycle + 1)
              }}
              role="tab"
              tabIndex={isTabActive ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        key={`${activePrompt.label}-${animationCycle}`}
        aria-labelledby={`agent-native-tab-${activePromptIndex}`}
        className="relative z-[1] max-w-[840px]"
        id="agent-native-prompt-panel"
        role="tabpanel"
      >
        <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 text-[13px] leading-[1.65] text-[#f1eee7] md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4 md:text-[15px] md:leading-[1.75]">
          <span className="homepage-agent-prompt-marker text-[18px] font-semibold leading-[1.75] text-[#ff8a3d]">
            &gt;
          </span>
          <div className="min-w-0">
            <p className="m-0">
              {activePrompt.promptLead}
              <span
                className={`${activePrompt.breakBeforePromptTail ? 'block' : 'inline-block'} [clip-path:inset(0_100%_0_0)] motion-reduce:[clip-path:inset(0_0_0_0)] ${
                  isActive ? 'animate-homepage-agent-prompt-tail motion-reduce:animate-none' : ''
                }`}
              >
                {activePrompt.promptTail}
              </span>
            </p>
          </div>

          <div className="relative col-span-2 mt-8 min-h-[300px] md:mt-10 md:min-h-[350px]">
            {thinkingVerbs.map((verb, index) => (
              <div
                key={verb}
                className={`absolute inset-0 grid grid-cols-[16px_minmax(0,1fr)] gap-x-3 text-[13px] font-semibold leading-[1.65] text-[#ff8a3d] opacity-0 motion-reduce:animate-none md:grid-cols-[20px_minmax(0,1fr)] md:gap-x-4 md:text-[15px] md:leading-[1.75] ${
                  isActive ? 'animate-homepage-agent-thinking-cycle' : ''
                }`}
                style={{ animationDelay: `${1600 + index * 650}ms` }}
              >
                <span>*</span>
                <span>{verb}</span>
              </div>
            ))}

            <div
              className={`absolute inset-0 max-h-[300px] overflow-y-auto overflow-x-hidden pr-1 text-[#aaa79f] opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:max-h-[350px] md:pr-3 ${
                isActive ? 'animate-homepage-agent-response-reveal' : ''
              }`}
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
  const visualRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return undefined

    let hasActivated = false

    const activate = () => {
      if (hasActivated) return
      hasActivated = true
      setIsActive(true)
      observer.disconnect()
      window.removeEventListener('scroll', activateIfVisible)
      window.removeEventListener('resize', activateIfVisible)
    }

    const activateIfVisible = () => {
      const rect = visual.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const visibleHeight = Math.min(rect.bottom, viewportHeight * 0.9) - Math.max(rect.top, 0)

      if (visibleHeight >= Math.min(rect.height * 0.18, 160)) {
        activate()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate()
        }
      },
      { rootMargin: '-8% 0px -18% 0px', threshold: 0.18 }
    )

    observer.observe(visual)
    window.addEventListener('scroll', activateIfVisible, { passive: true })
    window.addEventListener('resize', activateIfVisible)
    const rafId = window.requestAnimationFrame(activateIfVisible)

    return () => {
      window.cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('scroll', activateIfVisible)
      window.removeEventListener('resize', activateIfVisible)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32"
      data-homepage-agent-native-observability
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_24%_42%,rgba(242,71,105,0.10),transparent_64%),radial-gradient(ellipse_72%_54%_at_82%_52%,rgba(229,72,77,0.065),transparent_66%),linear-gradient(180deg,rgba(22,25,34,0.08),rgba(11,12,14,0.42)_50%,rgba(11,12,14,0.1))] [mask-image:linear-gradient(180deg,transparent_0%,black_16%,black_82%,transparent_100%)]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="m-0 text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
            Agent-native observability,
            <br />
            inside your IDE and SigNoz.
          </h2>

          <p className="text-signoz_vanilla-300/82 mx-auto mt-5 max-w-3xl text-[16px] leading-7 tracking-[-0.15px] sm:text-[19px] sm:leading-9 sm:tracking-[-0.28px]">
            Use the SigNoz MCP server to bring telemetry into coding agents, or use Noz, your AI
            teammate inside SigNoz, to investigate incidents, tune alerts, and build dashboards with
            the same production context your team sees.
          </p>
        </div>

        <div ref={visualRef}>
          <div className="-mx-5 mt-14 min-h-[560px] overflow-x-auto overflow-y-visible px-5 pb-4 pt-6 [scrollbar-width:none] sm:-mx-6 sm:mt-20 sm:px-6 md:hidden [&::-webkit-scrollbar]:hidden">
            <div className="relative h-[520px] w-[132vw] min-w-[510px] max-w-[560px]">
              <div className="absolute left-5 top-[118px] z-20 flex h-8 items-center gap-2 font-mono text-[15px] tracking-[-0.01em] text-[#8f948f]">
                <span>Work with</span>
                <AgentIntegrationIcons />
              </div>
              <div
                className={`absolute left-0 top-12 h-[calc(100%-48px)] w-[66%] rounded-[18px] border border-signoz_slate-400/20 bg-[#06090d] opacity-0 shadow-[0_34px_120px_rgba(0,0,0,0.42)] will-change-[opacity,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:will-change-auto ${
                  isActive ? 'animate-homepage-agent-terminal-enter' : ''
                }`}
              />
              <div
                className={`absolute bottom-0 left-5 h-[360px] w-[62%] overflow-hidden rounded-[3px] opacity-0 ring-1 ring-white/[0.06] will-change-[opacity,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:will-change-auto ${
                  isActive ? 'animate-homepage-agent-terminal-enter' : ''
                }`}
              >
                <LocalAgentSurface isActive={isActive} />
              </div>
              <NozPanelCard
                className={`absolute bottom-0 left-[62%] z-10 w-[300px] opacity-0 will-change-[opacity,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:will-change-auto ${
                  isActive ? 'animate-homepage-agent-noz-enter' : ''
                }`}
              />
            </div>
          </div>

          <div className="relative mt-20 hidden min-h-[650px] md:block lg:min-h-[700px]">
            <div
              className={`absolute left-0 top-[88px] h-[560px] w-[76%] opacity-0 will-change-[opacity,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:will-change-auto lg:top-[108px] lg:h-[592px] lg:w-[78%] ${
                isActive ? 'animate-homepage-agent-terminal-enter' : ''
              }`}
            >
              <LocalAgentSurface isActive={isActive} />
            </div>

            <div
              className={`absolute right-0 top-0 z-20 w-[388px] opacity-0 will-change-[opacity,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:will-change-auto lg:w-[430px] ${
                isActive ? 'animate-homepage-agent-noz-enter' : ''
              }`}
            >
              <NozPanelCard />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center md:mt-10">
          <TrackingLink
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signoz_slate-500 px-5 text-sm font-medium text-signoz_vanilla-100 transition-colors hover:bg-signoz_slate-400 sm:h-[52px] sm:px-7 sm:text-base"
            href="https://signoz.io/docs/ai/noz/"
            clickType="Secondary CTA"
            clickName="Agent Native Observability Link"
            clickText="Explore MCP and Noz"
            clickLocation="Agent Native Observability Section"
          >
            Explore MCP and Noz
            <ArrowRight
              className="transition-transform duration-200 group-hover:translate-x-1"
              size={15}
            />
          </TrackingLink>
        </div>
      </div>
    </section>
  )
}
