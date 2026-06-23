'use client'

import { Activity, Bot, Cable, Layers3, SearchCode, ServerCog, type LucideIcon } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import featureGraphicAi from '@/public/img/graphics/homepage/agent-telemetry-context.png'
import debugRootCauseCorrelation from '@/public/img/graphics/homepage/debug-root-cause-correlation.png'
import featureGraphicDeployment from '@/public/img/graphics/homepage/feature-graphic-flexible-deployment.svg?url'
import featureGraphicFlexibleQuerying from '@/public/img/graphics/homepage/feature-graphic-flexible-querying.svg?url'
import featureGraphicOtel from '@/public/img/graphics/homepage/instrument-once-opentelemetry.png'
import featureGraphicSingleContext from '@/public/img/graphics/homepage/feature-graphic-single-tool.svg?url'

type WhySigNozItem = {
  alt: string
  description: string
  icon: LucideIcon
  image: StaticImageData | string
  title: string
}

const items: WhySigNozItem[] = [
  {
    title: 'Debug faster with correlated signals',
    description:
      'Move from a latency spike to the related logs, traces, metrics, and spans without stitching together separate tools.',
    icon: Activity,
    image: debugRootCauseCorrelation,
    alt: 'SigNoz view showing correlated telemetry for root cause debugging',
  },
  {
    title: 'Instrument once with OpenTelemetry',
    description:
      'Use open standards instead of vendor SDKs, so instrumentation stays portable as your stack changes.',
    icon: Cable,
    image: featureGraphicOtel,
    alt: 'OpenTelemetry instrumentation flowing into SigNoz',
  },
  {
    title: 'Keep every investigation in the same context',
    description:
      'Carry the same service, time window, environment, and attributes as you move across signals.',
    icon: Layers3,
    image: featureGraphicSingleContext,
    alt: 'SigNoz workspace keeping telemetry context together across tools',
  },
  {
    title: 'Query telemetry your way',
    description:
      'Use query builder, ClickHouse SQL, saved views, and custom dashboards across raw and structured telemetry.',
    icon: SearchCode,
    image: featureGraphicFlexibleQuerying,
    alt: 'Flexible query controls for exploring telemetry in SigNoz',
  },
  {
    title: 'Give AI agents telemetry they understand',
    description:
      'OpenTelemetry gives agents public concepts like trace IDs, spans, services, environments, and resource attributes.',
    icon: Bot,
    image: featureGraphicAi,
    alt: 'Agent telemetry context for AI-assisted observability workflows',
  },
  {
    title: 'Run observability where your systems need it',
    description:
      'Use SigNoz Cloud, self-hosted, or managed deployments while keeping the same OpenTelemetry-native model.',
    icon: ServerCog,
    image: featureGraphicDeployment,
    alt: 'Flexible deployment options for running SigNoz',
  },
]

function getItemClasses(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return 'blur-0'
  }

  return 'blur-[0.6px]'
}

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const updateActiveItem = () => {
      const focusLine = window.innerHeight * 0.46
      let nextIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      itemRefs.current.forEach((item, index) => {
        if (!item) return

        const rect = item.getBoundingClientRect()
        const itemFocusLine = rect.top + rect.height * 0.5
        const distance = Math.abs(itemFocusLine - focusLine)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
      frameRef.current = null
    }

    const requestActiveUpdate = () => {
      if (frameRef.current !== null) return

      frameRef.current = window.requestAnimationFrame(updateActiveItem)
    }

    updateActiveItem()
    window.addEventListener('scroll', requestActiveUpdate, { passive: true })
    window.addEventListener('resize', requestActiveUpdate)

    return () => {
      window.removeEventListener('scroll', requestActiveUpdate)
      window.removeEventListener('resize', requestActiveUpdate)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 overflow-clip bg-signoz_ink-500 px-5 py-16 text-signoz_vanilla-100 sm:px-6 sm:py-24 lg:px-[78px] lg:py-28"
      data-homepage-floating-cta="Start sending telemetry in 20 minutes"
      data-homepage-floating-href="/docs/install/"
    >
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(430px,1fr)] lg:gap-20">
        <div className="min-w-0">
          <div className="sticky top-[104px] isolate z-20 pb-8 pt-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 bottom-0 left-1/2 z-0 w-[160vw] -translate-x-1/2 bg-signoz_ink-500"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full z-0 h-40 w-[160vw] -translate-x-1/2 bg-gradient-to-b from-signoz_ink-500 to-transparent"
            />
            <h2 className="relative z-10 m-0 max-w-[520px] text-[32px] font-medium leading-[1.08] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] md:text-[58px]">
              Why SigNoz
            </h2>
            <p className="relative z-10 m-0 mt-6 max-w-[520px] text-[17px] font-medium leading-7 text-signoz_vanilla-400">
              SigNoz keeps traces, metrics, logs, dashboards, alerts, and agent workflows together
              so every investigation starts from the same evidence.
            </p>
            <div className="relative z-10 mt-9 h-px w-full bg-signoz_slate-100" />
          </div>

          <div className="pb-16 pt-14 lg:pb-[42vh] lg:pt-20">
            {items.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex

              return (
                <div
                  aria-current={index === activeIndex ? 'step' : undefined}
                  className={`grid min-h-[178px] grid-cols-[40px_minmax(0,1fr)] gap-6 border-b border-signoz_slate-100 py-8 transition-[filter] duration-500 ease-out lg:min-h-[206px] lg:py-10 ${getItemClasses(
                    index,
                    activeIndex
                  )}`}
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  style={{ opacity: isActive ? 1 : 0.25 }}
                >
                  <div className="pt-1 text-signoz_robin-300">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="m-0 text-[22px] font-semibold leading-7 text-signoz_vanilla-100">
                      {item.title}
                    </h3>
                    <p className="m-0 mt-3 max-w-[470px] text-[15px] font-medium leading-7 text-signoz_vanilla-300">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-span-2 mt-5 overflow-hidden rounded-md border border-signoz_slate-100 bg-signoz_slate-400 shadow-xl lg:hidden">
                    <Image
                      alt={item.alt}
                      className="h-auto w-full"
                      height={430}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      src={item.image}
                      width={760}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative z-30 hidden min-w-0 lg:block">
          <div className="sticky top-[92px] flex h-[calc(100vh-124px)] max-h-[760px] min-h-[560px] items-center">
            <div className="relative aspect-[0.92] w-full overflow-hidden rounded-[18px] border border-signoz_slate-100 bg-signoz_ink-400 shadow-2xl">
              <div className="absolute left-[10%] top-[10%] h-[98%] w-[112%] overflow-hidden rounded-[10px] border border-signoz_slate-100 bg-signoz_ink-300 shadow-xl">
                {items.map((item, index) => (
                  <div
                    aria-hidden={index !== activeIndex}
                    className="absolute inset-x-0 h-full transition-[top] duration-700 ease-out"
                    key={item.title}
                    style={{ top: `${(index - activeIndex) * 100}%` }}
                  >
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      priority={index === 0}
                      src={item.image}
                    />
                  </div>
                ))}

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-signoz_ink-300 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-signoz_ink-400 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-signoz_ink-400 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-signoz_ink-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
