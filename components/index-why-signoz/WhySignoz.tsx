'use client'

import { Activity, Bot, Cable, SearchCode, ServerCog, type LucideIcon } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import whySignozPlaceholderAlt from '@/public/img/graphics/homepage/why-signoz-placeholder-alt.webp'
import whySignozPlaceholder from '@/public/img/graphics/homepage/why-signoz-placeholder.webp'

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
    image: whySignozPlaceholder,
    alt: 'SigNoz view showing correlated telemetry for root cause debugging',
  },
  {
    title: 'Instrument once with OpenTelemetry',
    description:
      'Use open standards instead of vendor SDKs, so instrumentation stays portable as your stack changes.',
    icon: Cable,
    image: whySignozPlaceholderAlt,
    alt: 'OpenTelemetry instrumentation flowing into SigNoz',
  },
  {
    title: 'Query telemetry on a columnar store',
    description:
      'Use query builder, PromQL, and ClickHouse SQL on a fast columnar datastore built for high-cardinality observability data.',
    icon: SearchCode,
    image: whySignozPlaceholder,
    alt: 'Flexible query controls backed by a columnar datastore in SigNoz',
  },
  {
    title: 'Give AI agents telemetry they understand',
    description:
      'One OpenTelemetry-native source gives agents a known schema for traces, logs, metrics, and services, so they can debug with less translation.',
    icon: Bot,
    image: whySignozPlaceholderAlt,
    alt: 'Agent telemetry context for AI-assisted observability workflows',
  },
  {
    title: 'Flexible deployment options',
    description:
      'Use SigNoz Cloud, self-hosted, or managed deployments while keeping the same OpenTelemetry-native model.',
    icon: ServerCog,
    image: whySignozPlaceholder,
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
  const [itemOpacities, setItemOpacities] = useState<number[]>(() =>
    items.map((_, index) => (index === 0 ? 1 : 0.38))
  )
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const updateActiveItem = () => {
      const focusLine = window.innerHeight * 0.5
      const focusBand = window.innerHeight * 0.3
      let nextIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      const nextOpacities = items.map(() => 0.38)

      itemRefs.current.forEach((item, index) => {
        if (!item) return

        const rect = item.getBoundingClientRect()
        const itemFocusLine = rect.top + rect.height * 0.5
        const distance = Math.abs(itemFocusLine - focusLine)
        const focusAmount = Math.max(0, 1 - distance / focusBand)

        nextOpacities[index] = Math.max(0.38, 0.38 + focusAmount * 0.62)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nextIndex = index
        }
      })

      nextOpacities[nextIndex] = 1
      setActiveIndex(nextIndex)
      setItemOpacities(nextOpacities)
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

          <div className="pb-16 pt-14 lg:pb-[18vh] lg:pt-20">
            {items.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex

              return (
                <div
                  aria-current={index === activeIndex ? 'step' : undefined}
                  className={`grid min-h-[178px] grid-cols-[40px_minmax(0,1fr)] gap-6 border-b border-signoz_slate-100 py-8 transition-[filter,opacity] duration-500 ease-out lg:min-h-[206px] lg:py-10 ${getItemClasses(
                    index,
                    activeIndex
                  )}`}
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  style={{ opacity: itemOpacities[index] ?? (isActive ? 1 : 0.38) }}
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
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(190,198,207,0.12)_0%,rgba(86,95,104,0.08)_42%,rgba(8,9,10,0)_72%)] blur-2xl"
            />
            <div className="relative aspect-[0.92] w-full overflow-hidden rounded-[18px] border border-signoz_slate-100 bg-signoz_ink-400 shadow-[0_32px_90px_rgba(0,0,0,0.52)]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.045),transparent_30%),linear-gradient(180deg,rgba(11,12,14,0.05),rgba(11,12,14,0.42)_88%)]" />
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
                      className="object-cover object-[60%_center]"
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
