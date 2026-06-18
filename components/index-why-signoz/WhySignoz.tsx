'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'
import { useState } from 'react'

import CustomLink from '@/components/Link'
import agentTelemetryContext from '@/public/img/graphics/homepage/agent-telemetry-context.png'
import debugRootCauseCorrelation from '@/public/img/graphics/homepage/debug-root-cause-correlation.png'
import instrumentOnceOpenTelemetry from '@/public/img/graphics/homepage/instrument-once-opentelemetry.png'

type WhySigNozItem = {
  description: string
  eyebrow: string
  graphic?: StaticImageData
  title: string
}

const items: WhySigNozItem[] = [
  {
    eyebrow: 'Deep correlation',
    title: 'Debug root cause faster',
    description:
      'Start from an alert or latency spike and jump across traces, logs, metrics, exceptions, and infra context without stitching together five tools during an incident.',
    graphic: debugRootCauseCorrelation,
  },
  {
    eyebrow: 'OpenTelemetry native',
    title: 'Instrument once. Keep your options open.',
    description:
      'Use OpenTelemetry SDKs and collectors to send traces, metrics, and logs into SigNoz without proprietary agents or backend lock-in.',
    graphic: instrumentOnceOpenTelemetry,
  },
  {
    eyebrow: 'Agent native',
    title: 'Give engineers and agents the same telemetry context',
    description:
      'Bring production telemetry to coding agents with MCP, and use Noz inside SigNoz to investigate incidents, explain alerts, and create operational follow-ups.',
    graphic: agentTelemetryContext,
  },
]

function GraphicPlaceholder({
  compact = false,
  src,
}: {
  compact?: boolean
  src?: StaticImageData
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex overflow-hidden rounded-[10px] ${
        src
          ? 'bg-transparent'
          : 'bg-signoz_ink-500/78 border border-signoz_slate-400/35 shadow-[0_22px_60px_rgba(0,0,0,0.3)]'
      } ${compact ? 'h-[268px] w-[520px]' : 'h-[300px] w-full'}`}
    >
      {src ? (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes={compact ? '520px' : '(min-width: 1024px) 664px, calc(100vw - 64px)'}
          src={src}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(78,116,248,0.08)_1px,transparent_1px),linear-gradient(rgba(78,116,248,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(78,116,248,0.22),transparent_38%)]" />
        </>
      )}
    </div>
  )
}

function MobileWhyCard({ item }: { item: WhySigNozItem }) {
  return (
    <article className="bg-signoz_ink-400/72 overflow-hidden rounded-[10px] border border-signoz_slate-400/45">
      <div className="p-5">
        <h3 className="m-0 text-2xl font-medium leading-tight tracking-[-0.45px] text-signoz_vanilla-100">
          {item.title}
        </h3>
      </div>
      <div className="bg-signoz_ink-500/72 mx-5 overflow-hidden rounded-[8px] border border-signoz_slate-400/35">
        <GraphicPlaceholder src={item.graphic} />
      </div>
      <p className="m-0 p-5 text-base leading-7 text-signoz_vanilla-400">{item.description}</p>
    </article>
  )
}

function DesktopWhyPanel({
  activeIndex,
  index,
  item,
  onSelect,
}: {
  activeIndex: number
  index: number
  item: WhySigNozItem
  onSelect: (index: number) => void
}) {
  const isActive = index === activeIndex
  const prefersReducedMotion = useReducedMotion()
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const }
  const widthStyle: CSSProperties = {
    transition: prefersReducedMotion ? undefined : 'width 720ms cubic-bezier(0.16, 1, 0.3, 1)',
    width: isActive ? 736 : 160,
  }

  return (
    <button
      aria-pressed={isActive}
      className={`group relative h-[576px] shrink-0 overflow-hidden border-y border-l border-dashed border-signoz_slate-400/35 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-signoz_ink-500 ${
        isActive
          ? 'bg-signoz_ink-400/72'
          : 'bg-signoz_ink-500/28 hover:bg-signoz_ink-400/42 focus-visible:bg-signoz_ink-400/42'
      }`}
      onClick={() => onSelect(index)}
      style={widthStyle}
      type="button"
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute inset-0"
        initial={false}
        transition={{ ...transition, duration: prefersReducedMotion ? 0 : 0.28 }}
      >
        <div className="px-9 pt-8">
          <h3 className="m-0 max-w-[520px] text-[28px] font-medium leading-tight tracking-[-0.5px] text-signoz_vanilla-100">
            {item.title}
          </h3>
        </div>

        <div className="mx-9 mt-9">
          <GraphicPlaceholder src={item.graphic} />
        </div>

        <p className="absolute bottom-9 left-9 m-0 max-w-[560px] text-[17px] leading-8 tracking-[-0.15px] text-signoz_vanilla-400">
          {item.description}
        </p>
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        className="absolute inset-0"
        initial={false}
        transition={{ ...transition, duration: prefersReducedMotion ? 0 : 0.28 }}
      >
        <div className="absolute inset-0 bg-signoz_ink-500/20" />
        <div className="relative px-7 pt-8">
          <h3 className="m-0 w-[300px] text-[26px] font-medium leading-tight tracking-[-0.45px] text-signoz_vanilla-300 transition-colors duration-300 group-hover:text-signoz_vanilla-100 group-focus-visible:text-signoz_vanilla-100">
            {item.title}
          </h3>
        </div>

        <div className="absolute left-7 top-[190px] opacity-35 blur-[0.4px] transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-55 group-hover:blur-0 group-focus-visible:translate-x-2 group-focus-visible:opacity-55 group-focus-visible:blur-0">
          <GraphicPlaceholder compact src={item.graphic} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-signoz_ink-500 transition-opacity duration-300 group-hover:opacity-75 group-focus-visible:opacity-75" />
      </motion.div>
    </button>
  )
}

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32"
      data-homepage-floating-cta="Start sending telemetry in 20 minutes"
      data-homepage-floating-href="/docs/install/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="m-0 max-w-[650px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
              Monitor and troubleshoot from one shared context.
            </h2>
          </div>

          <div className="pt-1 lg:pt-10">
            <p className="m-0 max-w-[560px] text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400 sm:text-[17px] sm:leading-8 sm:tracking-[-0.2px]">
              SigNoz brings production signals, OpenTelemetry context, and agent workflows into the
              same place, so every investigation can move from symptom to root cause to action.
            </p>
            <CustomLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/docs/install/"
            >
              Start sending your telemetry in the next 20 minutes
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={15}
              />
            </CustomLink>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-5 lg:hidden">
          {items.map((item) => (
            <MobileWhyCard item={item} key={item.title} />
          ))}
        </div>

        <div className="relative mt-16 hidden overflow-hidden lg:block">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[220px] bg-gradient-to-r from-transparent via-signoz_ink-500/55 to-signoz_ink-500" />
          <div className="flex min-w-[1100px]">
            {items.map((item, index) => (
              <DesktopWhyPanel
                activeIndex={activeIndex}
                index={index}
                item={item}
                key={item.title}
                onSelect={setActiveIndex}
              />
            ))}
            <div className="h-[576px] w-px shrink-0 border-r border-dashed border-signoz_slate-400/35" />
          </div>
        </div>
      </div>
    </section>
  )
}
