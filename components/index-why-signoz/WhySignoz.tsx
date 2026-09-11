'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'

import WhySignozProtoWorld, { type WhySignozWorldHandle } from './WhySignozProtoWorld'
import { WHY_SIGNOZ_STEPS } from './whySignozStages'
import './why-signoz.css'

const STEPS = WHY_SIGNOZ_STEPS.length

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const driverRef = useRef<HTMLDivElement | null>(null)
  const worldRef = useRef<WhySignozWorldHandle | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeRef = useRef(0)

  useEffect(() => {
    const driver = driverRef.current
    if (!driver) return

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let engaged = false
    let visible = false
    let raf = 0
    let queued = false
    let gTarget = 0
    let gCurrent = 0
    const lastFill: string[] = []

    const setStep = (g: number) => {
      const idx = Math.min(STEPS - 1, Math.floor(g))
      const local = Math.min(Math.max(g - idx, 0), 1)

      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActiveIndex(idx)
      }

      itemRefs.current.forEach((el, n) => {
        if (!el) return
        el.classList.toggle('is-active', n === idx)
        el.classList.toggle('is-done', n < idx)
        const fill = n === idx ? `${(local * 100).toFixed(1)}%` : n < idx ? '100%' : '0%'
        if (lastFill[n] !== fill) {
          lastFill[n] = fill
          el.style.setProperty('--progress', fill)
        }
      })
    }

    const apply = (g: number) => {
      worldRef.current?.update(g)
      setStep(g)
    }

    const tick = () => {
      raf = 0
      const delta = gTarget - gCurrent
      if (Math.abs(delta) < 0.0009) {
        gCurrent = gTarget
      } else {
        gCurrent += delta * 0.18
        raf = requestAnimationFrame(tick)
      }
      apply(gCurrent)
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        if (!engaged) return
        const rect = driver.getBoundingClientRect()
        const span = driver.offsetHeight - window.innerHeight
        const p = span > 0 ? -rect.top / span : 0
        gTarget = Math.min(Math.max(p, 0), 1) * STEPS
        request()
      })
    }

    const onResize = () => {
      worldRef.current?.relayout()
      onScroll()
    }

    const engage = () => {
      if (engaged) return
      engaged = true
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
    }

    const disengage = () => {
      if (!engaged) return
      engaged = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const sync = () => {
      setReducedMotion(reducedQuery.matches)
      if (visible && desktopQuery.matches && !reducedQuery.matches) engage()
      else disengage()
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        sync()
      },
      { rootMargin: '25% 0px' }
    )
    io.observe(driver)

    desktopQuery.addEventListener('change', sync)
    reducedQuery.addEventListener('change', sync)

    return () => {
      disengage()
      io.disconnect()
      desktopQuery.removeEventListener('change', sync)
      reducedQuery.removeEventListener('change', sync)
    }
  }, [])

  const scrollToStep = (index: number) => {
    const driver = driverRef.current
    if (!driver) return
    const span = driver.offsetHeight - window.innerHeight
    window.scrollTo({
      top: driver.offsetTop + ((index + 0.42) / STEPS) * span,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  const displayIndex = reducedMotion ? 0 : activeIndex

  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 overflow-clip bg-[var(--background)] px-5 py-16 text-[var(--l1-foreground)] sm:px-6 md:py-24 lg:px-20 lg:py-28 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="Start sending telemetry in 20 minutes"
      data-homepage-floating-href="/docs/install/"
    >
      <div className="mx-auto max-w-8xl">
        <h2 className="m-0 max-w-lg text-3xl font-medium leading-none text-[var(--l1-foreground)] sm:text-4xl sm:leading-none md:text-5xl xl:text-6xl">
          <span className="xl:whitespace-nowrap">Fast Troubleshooting.</span>
          <br />
          <span className="text-[var(--l3-foreground)] xl:whitespace-nowrap">
            No Context Switching.
          </span>
        </h2>

        {/* Scroll driver: tall track with a pinned 100vh stage inside (desktop,
            motion-safe). On mobile / reduced motion it collapses to normal flow. */}
        <div
          className="relative mt-10 lg:motion-safe:mt-0 lg:motion-safe:h-[512vh]"
          ref={driverRef}
        >
          <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:grid lg:motion-safe:h-screen lg:motion-safe:min-h-[660px] lg:motion-safe:grid-cols-2 lg:motion-safe:items-center lg:motion-safe:gap-16">
            <div className="why-rail relative flex min-w-0 flex-col lg:motion-safe:h-[min(88vh,780px)] lg:motion-safe:justify-start">
              {WHY_SIGNOZ_STEPS.map((step, index) => {
                const Icon = step.icon
                const isActive = index === displayIndex

                return (
                  <div
                    aria-current={isActive ? 'step' : undefined}
                    className={`why-item group relative py-8 lg:motion-safe:py-6 ${
                      isActive ? 'is-active' : index < displayIndex ? 'is-done' : ''
                    }`}
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
                      className="why-item-progress absolute left-0 top-0 hidden h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--l1-foreground)_20%,transparent)] to-[var(--l1-foreground)] lg:motion-safe:block"
                    />

                    <div className="why-reveal hidden lg:motion-safe:grid">
                      <div className="min-h-0 overflow-hidden">
                        <Icon
                          aria-hidden="true"
                          className="mb-5 h-6 w-6 text-[var(--l1-foreground)]"
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>

                    <h3 className="m-0 text-[17px] font-medium leading-6">
                      <button
                        className="why-item-title m-0 cursor-pointer border-0 bg-transparent p-0 text-left text-[17px] font-medium leading-6 transition-colors duration-300"
                        onClick={() => scrollToStep(index)}
                        type="button"
                      >
                        {step.title}
                      </button>
                    </h3>
                    <p className="why-item-desc m-0 mt-2 max-w-md text-sm leading-6 transition-colors duration-300">
                      {step.description}
                    </p>

                    {step.cta ? (
                      <div className="why-reveal why-reveal--cta grid">
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

                    <div className="mt-6 overflow-hidden rounded-md border border-[var(--l1-border)] bg-[var(--l2-background)] lg:motion-safe:hidden">
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
              <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-[var(--l2-border)] to-transparent"
              />
            </div>

            <div className="hidden min-w-0 justify-center lg:motion-safe:flex">
              <WhySignozProtoWorld ref={worldRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
