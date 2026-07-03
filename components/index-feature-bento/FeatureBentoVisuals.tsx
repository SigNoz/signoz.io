'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

import { llmIntegrations, logEntries, severityClassNames, traceSpans } from './FeatureBentoData'
import type { BentoFeature } from './FeatureBentoData'

function TraceSpansVisual() {
  const visualRef = useRef<HTMLDivElement>(null)
  const visualBoundsRef = useRef({ height: 1, top: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const spanRows = [...traceSpans, ...traceSpans]

  useEffect(() => {
    let frame = 0

    const measureVisual = () => {
      const visual = visualRef.current
      if (!visual) return

      const rect = visual.getBoundingClientRect()
      visualBoundsRef.current = {
        height: Math.max(1, rect.height),
        top: rect.top + window.scrollY,
      }
    }

    const updateProgress = () => {
      const { height, top } = visualBoundsRef.current
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const travel = height * 1.35
      const progress = (viewportHeight * 0.7 - (top - window.scrollY)) / travel

      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateProgress)
    }

    const refreshVisualBounds = () => {
      measureVisual()
      requestUpdate()
    }

    const visual = visualRef.current
    const resizeObserver =
      visual && 'ResizeObserver' in window ? new ResizeObserver(refreshVisualBounds) : undefined

    measureVisual()
    updateProgress()
    if (visual) resizeObserver?.observe(visual)
    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', refreshVisualBounds)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', refreshVisualBounds)
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
          className="relative space-y-1.5 font-mono transition-transform duration-[140ms] ease-linear motion-reduce:transition-none"
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
                  className={`absolute top-1/2 flex h-[20px] -translate-y-1/2 items-center justify-between rounded-[2px] px-2 text-[10px] font-semibold text-signoz_ink-500 opacity-70 shadow-[0_8px_18px_rgba(0,0,0,0.16)] ${span.color}`}
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
                  style={{ backgroundImage: `url("${integration.iconSrc}")` }}
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

function DashboardPanelsVisual() {
  const metricPanels = [
    {
      className: 'left-[550px] top-0 h-[116px] w-[170px]',
      label: 'Pod CPU utilization',
      unit: '%',
      value: '0.88',
    },
    {
      className: 'left-[732px] top-0 h-[116px] w-[170px]',
      label: 'Pod memory usage',
      unit: 'MiB',
      value: '73.2',
    },
    {
      className: 'left-[550px] top-[128px] h-[116px] w-[352px]',
      label: 'GC pause (rate of .NET GC duration)',
      unit: 'μs',
      value: '20.67',
    },
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-5 left-[360px] z-[1] h-[244px] w-[902px] font-mono"
    >
      {metricPanels.map((panel) => (
        <div
          key={panel.label}
          className={`absolute overflow-hidden rounded-[4px] bg-[#111217] shadow-[0_20px_54px_rgba(0,0,0,0.24)] ${panel.className}`}
        >
          <p className="text-signoz_vanilla-100/88 m-0 px-3.5 pt-4 text-[12px] font-semibold leading-[1.15] tracking-[-0.1px]">
            {panel.label}
          </p>
          <div className="text-signoz_vanilla-100/88 absolute inset-x-0 bottom-7 flex items-baseline justify-center gap-1.5">
            <span className="text-[38px] font-light leading-none tracking-[-1.2px]">
              {panel.value}
            </span>
            <span className="text-[20px] font-light leading-none text-signoz_vanilla-400">
              {panel.unit}
            </span>
          </div>
        </div>
      ))}
      <div className="absolute left-0 top-0 h-[244px] w-[524px] overflow-hidden rounded-[4px] shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
        <Image
          alt=""
          className="h-full w-full object-cover object-left-top"
          height={632}
          src="/img/graphics/homepage/infra-getcart-latency.webp"
          width={1356}
        />
      </div>
    </div>
  )
}

function DashboardMobileChartVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-10px] left-5 right-5 z-[1] h-[238px] overflow-hidden rounded-[5px] bg-[#111217] shadow-[0_24px_64px_rgba(0,0,0,0.28)] md:hidden"
    >
      <Image
        alt=""
        className="h-full w-[510px] max-w-none object-cover object-left-top opacity-90"
        height={632}
        src="/img/graphics/homepage/infra-getcart-latency.webp"
        width={1356}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-signoz_ink-500 to-transparent" />
    </div>
  )
}

function InfraAlbumVisual() {
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null)
  const charts = [
    {
      alt: '',
      src: '/img/graphics/homepage/infra-cpu-usage.webp',
    },
    {
      alt: '',
      src: '/img/graphics/homepage/infra-memory-usage.webp',
    },
    {
      alt: '',
      src: '/img/graphics/homepage/infra-cpu-request-limit.webp',
    },
    {
      alt: '',
      src: '/img/graphics/homepage/infra-network-rate.webp',
    },
  ]

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-5 bottom-5 top-[170px] z-[1] grid gap-2 overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:inset-x-6"
      onMouseLeave={() => setActiveChartIndex(null)}
      style={{
        gridTemplateRows:
          activeChartIndex === null
            ? charts.map(() => '1fr').join(' ')
            : charts.map((_, index) => (index === activeChartIndex ? '3.8fr' : '0.5fr')).join(' '),
      }}
    >
      {charts.map((chart, index) => (
        <div
          key={chart.src}
          className="group/infra-sheet min-h-0 overflow-hidden rounded-[5px] bg-[#111217] shadow-[0_22px_58px_rgba(0,0,0,0.28)] transition-[filter] duration-300 ease-out hover:filter-none"
          onMouseEnter={() => setActiveChartIndex(index)}
          style={{ filter: `brightness(${index === 0 ? 0.86 : 0.72})` }}
        >
          <Image
            alt={chart.alt}
            className="h-full w-full max-w-none object-cover object-left-top opacity-85 transition-opacity duration-300 ease-out group-hover/infra-sheet:opacity-100"
            height={686}
            src={chart.src}
            width={992}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-signoz_ink-500 to-transparent" />
    </div>
  )
}

function LogsStreamVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
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
    const element = containerRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: '120px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = window.setInterval(() => {
      setCursor((current) => (current + 1) % logEntries.length)
    }, 1350)

    return () => window.clearInterval(interval)
  }, [isVisible])

  return (
    <div
      ref={containerRef}
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
      className="pointer-events-none absolute bottom-[-26px] left-[18px] h-[330px] w-[510px] overflow-hidden rounded-t-[4px] border border-signoz_slate-100 bg-signoz_slate-300 shadow-[0_26px_80px_rgba(0,0,0,0.24)] md:bottom-[-24px] md:left-[20%] md:h-[500px] md:w-[720px] lg:bottom-[-28px] lg:left-[20%] lg:h-[520px] lg:w-[760px]"
    >
      <div className="flex h-11 items-center gap-3 bg-signoz_slate-300 px-5 md:h-14 md:gap-5 md:px-7">
        <div className="flex gap-[6px] md:gap-[7px]">
          <span className="h-2.5 w-2.5 rounded-full bg-signoz_slate-50/45 md:h-3 md:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-signoz_slate-50/45 md:h-3 md:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-signoz_slate-50/45 md:h-3 md:w-3" />
        </div>
        <div className="ml-auto flex h-[28px] w-[310px] items-center justify-center rounded-[14px] border border-signoz_slate-100 bg-signoz_slate-200 text-[11px] font-medium leading-none text-signoz_vanilla-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] md:h-[34px] md:w-[420px] md:rounded-[18px] md:text-[13px]">
          olly.us.signoz.cloud/services/cartservice/
        </div>
      </div>

      <div className="relative ml-1.5 h-[calc(100%-44px)] w-[calc(100%-6px)] overflow-hidden rounded-[8px] bg-[#070b12] md:h-[calc(100%-56px)]">
        <Image
          alt=""
          className="h-full w-full rounded-[8px] object-cover object-left-top"
          height={462}
          src="/img/graphics/homepage/apm-browser-overview.webp"
          width={758}
        />
      </div>
    </div>
  )
}

export function FeatureVisual({ visual }: { visual: BentoFeature['visual'] }) {
  return (
    <>
      {visual === 'apm-browser' ? <ApmBrowserShell /> : null}
      {visual === 'logs-stream' ? <LogsStreamVisual /> : null}
      {visual === 'infra-album' ? <InfraAlbumVisual /> : null}
      {visual === 'dashboard-panels' ? <DashboardPanelsVisual /> : null}
      {visual === 'dashboard-panels' ? <DashboardMobileChartVisual /> : null}
      {visual === 'llm-logo-grid' ? <LlmLogoGridVisual /> : null}
      {visual === 'alert-card' ? <AlertCardVisual /> : null}
      {visual === 'trace-spans' ? <TraceSpansVisual /> : null}
    </>
  )
}
