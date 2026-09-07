'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'

import { WHY_SIGNOZ_STAGES, WHY_SIGNOZ_STEPS } from './whySignozStages'

const FOCUS_RATIO = 0.5

type StepBounds = {
  center: number
  end: number
  start: number
}

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let bounds: Array<StepBounds | null> = []
    let frameId: number | null = null
    let engaged = false
    let visible = false

    const measure = () => {
      const centers = itemRefs.current.map((item) => {
        if (!item) return null
        const rect = item.getBoundingClientRect()
        return {
          center: rect.top + window.scrollY + rect.height / 2,
          half: rect.height / 2,
        }
      })

      bounds = centers.map((measurement, index) => {
        if (!measurement) return null
        const previous = centers[index - 1]
        const next = centers[index + 1]
        return {
          center: measurement.center,
          start: previous
            ? (previous.center + measurement.center) / 2
            : measurement.center - measurement.half,
          end: next
            ? (measurement.center + next.center) / 2
            : measurement.center + measurement.half,
        }
      })
    }

    const update = () => {
      frameId = null
      if (!engaged) return

      const focusLine = window.scrollY + window.innerHeight * FOCUS_RATIO
      let nextIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      bounds.forEach((stepBounds, index) => {
        if (!stepBounds) return
        const distance = Math.abs(stepBounds.center - focusLine)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nextIndex = index
        }
      })

      const active = bounds[nextIndex]
      const progress =
        active && active.end > active.start
          ? Math.min(Math.max((focusLine - active.start) / (active.end - active.start), 0), 1)
          : 0

      list.style.setProperty('--why-stage-progress', progress.toFixed(4))
      setActiveIndex(nextIndex)
    }

    const requestUpdate = () => {
      if (frameId === null && engaged) frameId = window.requestAnimationFrame(update)
    }

    const handleResize = () => {
      if (!engaged) return
      measure()
      requestUpdate()
    }

    const engage = () => {
      if (engaged) return
      engaged = true
      measure()
      requestUpdate()
      window.addEventListener('scroll', requestUpdate, { passive: true })
      window.addEventListener('resize', handleResize)
    }

    const disengage = () => {
      if (!engaged) return
      engaged = false
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', handleResize)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    const sync = () => {
      setReducedMotion(reducedQuery.matches)
      if (visible && desktopQuery.matches && !reducedQuery.matches) engage()
      else disengage()
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        sync()
      },
      { rootMargin: '25% 0px' }
    )
    intersectionObserver.observe(section)

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(handleResize) : undefined
    resizeObserver?.observe(list)

    desktopQuery.addEventListener('change', sync)
    reducedQuery.addEventListener('change', sync)

    return () => {
      disengage()
      intersectionObserver.disconnect()
      resizeObserver?.disconnect()
      desktopQuery.removeEventListener('change', sync)
      reducedQuery.removeEventListener('change', sync)
    }
  }, [])

  const scrollToStep = (index: number) => {
    const item = itemRefs.current[index]
    if (!item) return
    const rect = item.getBoundingClientRect()
    window.scrollTo({
      top: rect.top + window.scrollY + rect.height / 2 - window.innerHeight * FOCUS_RATIO,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  const displayIndex = reducedMotion ? 0 : activeIndex

  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 overflow-clip bg-[var(--background)] px-5 py-16 text-[var(--l1-foreground)] sm:px-6 md:py-24 lg:px-20 lg:py-28 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="Start sending telemetry in 20 minutes"
      data-homepage-floating-href="/docs/install/"
      ref={sectionRef}
    >
      <div className="relative z-10 mx-auto grid max-w-8xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(430px,1fr)] lg:gap-20">
        <div className="min-w-0">
          <div className="sticky top-28 isolate z-20 pb-8 pt-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 bottom-0 left-1/2 z-0 w-[160dvw] -translate-x-1/2 bg-[var(--background)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full z-0 h-40 w-[160dvw] -translate-x-1/2 bg-gradient-to-b from-[var(--background)] to-transparent"
            />
            <h2 className="relative z-10 m-0 max-w-lg text-3xl font-medium leading-none text-[var(--l1-foreground)] sm:text-4xl sm:leading-none md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              <span className="xl:whitespace-nowrap">Fast Troubleshooting.</span>
              <br />
              <span className="text-[var(--l3-foreground)] xl:whitespace-nowrap">
                No Context Switching.
              </span>
            </h2>
            <div className="relative z-10 mt-9 h-px w-full bg-[var(--l2-border)]" />
          </div>

          <div className="pb-0 pt-10 lg:pb-[24dvh] lg:pt-0" ref={listRef}>
            {WHY_SIGNOZ_STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeIndex
              const expanded = isActive || reducedMotion
              const revealClass = `grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-out ${
                expanded ? 'lg:grid-rows-[1fr] lg:opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0'
              }`

              return (
                <div
                  aria-current={isActive ? 'step' : undefined}
                  className="group relative py-8 transition-[padding] duration-500 ease-out lg:py-10"
                  key={step.key}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--l2-border)] to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-0 hidden h-px bg-gradient-to-r from-transparent via-[var(--l3-foreground)] to-[var(--l1-foreground)] transition-opacity duration-300 lg:block ${
                      isActive && !reducedMotion ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      width: isActive ? 'calc(var(--why-stage-progress, 0) * 100%)' : '0%',
                    }}
                  />

                  <div className={revealClass}>
                    <div className="min-h-0 overflow-hidden">
                      <Icon
                        aria-hidden="true"
                        className="mb-5 h-6 w-6 text-[var(--l1-foreground)]"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>

                  <h3 className="m-0 text-lg font-medium leading-6">
                    <button
                      className={`m-0 cursor-pointer border-0 bg-transparent p-0 text-left text-lg font-medium leading-6 transition-colors duration-300 ${
                        expanded
                          ? 'text-[var(--l1-foreground)]'
                          : 'text-[var(--l1-foreground)] lg:text-[var(--l3-foreground)] lg:group-hover:text-[var(--l1-foreground)]'
                      }`}
                      onClick={() => scrollToStep(index)}
                      type="button"
                    >
                      {step.title}
                    </button>
                  </h3>
                  <p
                    className={`m-0 mt-2.5 max-w-md text-sm leading-6 text-[var(--l2-foreground)] transition-opacity duration-300 ${
                      expanded ? '' : 'lg:opacity-50'
                    }`}
                  >
                    {step.description}
                  </p>

                  {step.cta ? (
                    <div className={`${revealClass} ${expanded ? 'lg:delay-75' : ''}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="pt-5">
                          <TrackingLink
                            className="btn-tactile btn-tactile--secondary no-underline"
                            clickLocation="Homepage Why SigNoz"
                            clickName={step.cta.clickName}
                            clickText={step.cta.label}
                            clickType="Secondary CTA"
                            href={step.cta.href}
                          >
                            {step.cta.label}
                            <ArrowRight aria-hidden="true" size={12} />
                          </TrackingLink>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 overflow-hidden rounded-md border border-[var(--l1-border)] bg-[var(--l2-background)] lg:hidden">
                    <Image
                      alt={step.alt}
                      className="h-auto w-full"
                      height={430}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      src={step.image}
                      width={760}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative z-30 hidden min-w-0 lg:block">
          <div className="sticky top-24 flex h-[calc(100dvh-124px)] max-h-[760px] min-h-96 items-center">
            <div
              aria-hidden="true"
              className="relative h-full w-full overflow-hidden rounded-xl border border-[var(--l1-border)] bg-[var(--l1-background)]"
              data-markdown-ignore
            >
              <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,var(--l2-border)_1px,transparent_1px)] [background-size:22px_22px]" />

              {WHY_SIGNOZ_STAGES.map((stage, index) => {
                const isStageActive = index === displayIndex

                return (
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-6 pb-10 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                      isStageActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-6 opacity-0'
                    }`}
                    key={stage.key}
                  >
                    {stage.image ? (
                      <div className="relative h-full w-full">
                        <Image
                          alt=""
                          className="object-contain object-bottom"
                          fill
                          src={stage.image}
                        />
                      </div>
                    ) : (
                      <stage.Visual isActive={isStageActive} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
