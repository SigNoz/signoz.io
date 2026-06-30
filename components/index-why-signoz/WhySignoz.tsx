'use client'

import { Activity, Bot, Cable, SearchCode, ServerCog, type LucideIcon } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import GrainientCardBackground from './GrainientCardBackground'

type WhySigNozItem = {
  alt: string
  description: string
  icon: LucideIcon
  image: StaticImageData | string
  imageClassName?: string
  imageFit?: 'contain' | 'cover'
  overlayImage?: string
  title: string
}

type WhySigNozItemMeasurement = {
  center: number
}

const MIN_REVEAL_PROGRESS = 0.32

const items: WhySigNozItem[] = [
  {
    title: 'Debug faster with correlated signals',
    description:
      'Move from a latency spike to the related logs, traces, metrics, and spans without stitching together separate tools.',
    icon: Activity,
    image: '/img/graphics/homepage/correlation.svg',
    imageClassName: 'object-bottom',
    imageFit: 'contain',
    alt: 'SigNoz view showing correlated telemetry for root cause debugging',
  },
  {
    title: 'Instrument once with OpenTelemetry',
    description:
      'Use open standards instead of vendor SDKs, so instrumentation stays portable as your stack changes.',
    icon: Cable,
    image: '/img/graphics/homepage/opentelemetry.svg',
    imageClassName: 'object-center',
    alt: 'OpenTelemetry instrumentation flowing into SigNoz',
  },
  {
    title: 'Query telemetry on a columnar store',
    description:
      'Use query builder, PromQL, and ClickHouse SQL on a fast columnar datastore built for high-cardinality observability data.',
    icon: SearchCode,
    image: '/img/graphics/homepage/columnar2.svg',
    imageClassName: 'object-left',
    imageFit: 'cover',
    alt: 'Flexible query controls backed by a columnar datastore in SigNoz',
  },
  {
    title: 'Give AI agents telemetry they understand',
    description:
      'One OpenTelemetry-native source gives agents a known schema for traces, logs, metrics, and services, so they can debug with less translation.',
    icon: Bot,
    image: '/img/graphics/homepage/agent-chat.svg',
    imageClassName: 'object-center',
    alt: 'Agent telemetry context for AI-assisted observability workflows',
  },
  {
    title: 'Flexible deployment options',
    description:
      'Use SigNoz Cloud, self-hosted, or managed deployments while keeping the same OpenTelemetry-native model.',
    icon: ServerCog,
    image: '/img/graphics/homepage/flexible-deploy.svg',
    imageClassName: 'object-center',
    imageFit: 'contain',
    alt: 'Flexible deployment options for running SigNoz',
  },
]

function getItemClasses(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return 'blur-0'
  }

  return 'blur-[0.6px]'
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function easeOutCubic(value: number) {
  const normalizedValue = clamp(value)

  return 1 - Math.pow(1 - normalizedValue, 3)
}

function RevealWords({ progress, text }: { progress: number; text: string }) {
  const tokens = text.split(/(\s+)/).filter(Boolean)
  const wordCount = tokens.filter((token) => !/^\s+$/.test(token)).length
  let wordIndex = -1

  return (
    <span aria-hidden="true">
      {tokens.map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          return token
        }

        wordIndex += 1

        const revealStart = wordCount <= 1 ? 0 : (wordIndex / (wordCount - 1)) * 0.72
        const revealProgress = easeOutCubic((progress - revealStart) / 0.24)
        const opacity = MIN_REVEAL_PROGRESS + revealProgress * (1 - MIN_REVEAL_PROGRESS)

        return (
          <span
            className="transition-opacity duration-300 ease-out"
            key={`${token}-${tokenIndex}`}
            style={{ opacity }}
          >
            {token}
          </span>
        )
      })}
    </span>
  )
}

function WhySignozImage({
  className,
  fill = false,
  item,
  loading,
  priority,
}: {
  className?: string
  fill?: boolean
  item: WhySigNozItem
  loading?: 'eager' | 'lazy'
  priority?: boolean
}) {
  const imageClassName = className ?? item.imageClassName ?? 'object-[60%_center]'
  const objectFitClassName = item.imageFit === 'contain' ? 'object-contain' : 'object-cover'

  if (!item.overlayImage) {
    if (fill) {
      return (
        <Image
          alt=""
          className={`${objectFitClassName} ${imageClassName}`}
          fill
          priority={priority}
          src={item.image}
        />
      )
    }

    return (
      <Image
        alt={item.alt}
        className="h-auto w-full"
        height={430}
        loading={loading}
        src={item.image}
        width={760}
      />
    )
  }

  return (
    <div className={fill ? 'relative h-full w-full' : 'relative aspect-[760/640] w-full'}>
      <Image
        alt={fill ? '' : item.alt}
        className="absolute left-0 top-0 h-auto w-[88%]"
        height={302}
        loading={fill ? undefined : loading}
        priority={priority}
        src={item.image}
        width={528}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="absolute bottom-[2%] right-0 h-auto w-[74%]"
        height={302}
        priority={priority}
        src={item.overlayImage}
        width={528}
      />
    </div>
  )
}

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [itemRevealProgresses, setItemRevealProgresses] = useState<number[]>(() =>
    items.map((_, index) => (index === 0 ? 1 : 0))
  )
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    let itemMeasurements: Array<WhySigNozItemMeasurement | null> = []

    const measureItems = () => {
      itemMeasurements = itemRefs.current.map((item) => {
        if (!item) return null

        const rect = item.getBoundingClientRect()

        return {
          center: rect.top + window.scrollY + rect.height * 0.5,
        }
      })
    }

    const updateActiveItem = () => {
      const focusLine = window.scrollY + window.innerHeight * 0.5
      const focusBand = Math.max(window.innerHeight * 0.48, 420)
      let nextIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      const nextRevealProgresses = items.map(() => 0)

      itemMeasurements.forEach((measurement, index) => {
        if (!measurement) return

        const distance = Math.abs(measurement.center - focusLine)
        const focusAmount = Math.max(0, 1 - distance / focusBand)

        nextRevealProgresses[index] = easeOutCubic(Math.min(focusAmount * 1.18, 1))

        if (distance < nearestDistance) {
          nearestDistance = distance
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
      nextRevealProgresses[nextIndex] = Math.max(nextRevealProgresses[nextIndex], 0.72)
      setItemRevealProgresses(nextRevealProgresses)
      frameRef.current = null
    }

    const requestActiveUpdate = () => {
      if (frameRef.current !== null) return

      frameRef.current = window.requestAnimationFrame(updateActiveItem)
    }

    const refreshMeasurements = () => {
      measureItems()
      requestActiveUpdate()
    }

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(refreshMeasurements) : undefined

    measureItems()
    updateActiveItem()
    itemRefs.current.forEach((item) => {
      if (item) resizeObserver?.observe(item)
    })
    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', requestActiveUpdate, { passive: true })
    window.addEventListener('resize', refreshMeasurements)

    return () => {
      window.removeEventListener('scroll', requestActiveUpdate)
      window.removeEventListener('resize', refreshMeasurements)
      resizeObserver?.disconnect()

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

          <div className="pb-16 pt-14 lg:pb-[24vh] lg:pt-20">
            {items.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex
              const revealProgress = itemRevealProgresses[index] ?? (isActive ? 1 : 0)

              return (
                <div
                  aria-current={index === activeIndex ? 'step' : undefined}
                  className={`grid min-h-[178px] grid-cols-[40px_minmax(0,1fr)] gap-6 border-b border-signoz_slate-100 py-8 transition-[filter] duration-500 ease-out lg:min-h-[286px] lg:py-14 ${getItemClasses(
                    index,
                    activeIndex
                  )}`}
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                >
                  <div
                    className="pt-1 text-signoz_robin-300 transition-opacity duration-300 ease-out"
                    style={{ opacity: MIN_REVEAL_PROGRESS + revealProgress * 0.68 }}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="m-0 text-[22px] font-semibold leading-7 text-signoz_vanilla-100">
                      <span className="sr-only">{item.title}</span>
                      <RevealWords progress={revealProgress} text={item.title} />
                    </h3>
                    <p className="m-0 mt-3 max-w-[470px] text-[15px] font-medium leading-7 text-signoz_vanilla-300">
                      <span className="sr-only">{item.description}</span>
                      <RevealWords
                        progress={Math.max(0, revealProgress - 0.12) / 0.88}
                        text={item.description}
                      />
                    </p>
                  </div>
                  <div className="col-span-2 mt-5 overflow-hidden rounded-md border border-signoz_slate-100 bg-signoz_slate-400 shadow-xl lg:hidden">
                    <WhySignozImage item={item} loading={index === 0 ? 'eager' : 'lazy'} />
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
            <div className="relative aspect-[0.92] w-full overflow-hidden rounded-[18px] bg-[#010409] shadow-[0_32px_90px_rgba(0,0,0,0.52)]">
              <div className="absolute inset-0 overflow-hidden">
                {items.map((item, index) => (
                  <div
                    aria-hidden={index !== activeIndex}
                    className="absolute inset-x-0 h-full transition-[top] duration-700 ease-out"
                    key={item.title}
                    style={{ top: `${(index - activeIndex) * 100}%` }}
                  >
                    {index === 0 && activeIndex === 0 ? (
                      <>
                        <GrainientCardBackground className="absolute inset-0 opacity-70" />
                        <div className="absolute inset-0 bg-signoz_ink-500/35" />
                      </>
                    ) : null}
                    <div className="relative z-10 h-full">
                      <WhySignozImage fill item={item} priority={index === 0} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
