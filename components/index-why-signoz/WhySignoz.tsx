'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'

import { WHY_SIGNOZ_STAGES, WHY_SIGNOZ_STEPS } from './whySignozStages'
import './why-signoz.css'

const STEPS = WHY_SIGNOZ_STEPS.length
const PARK = 0.8

const smoothstep = (t: number) => t * t * (3 - 2 * t)

const BEATS: Record<string, [number, number]> = {
  otel: [1.04, 1.3],
  link1: [1.34, 1.76],
  tab: [1.52, 1.78],
  link2: [1.92, 2.1],
  store: [2.02, 2.3],
  rows: [2.1, 2.38],
  search: [2.26, 2.44],
  type: [2.58, 2.82],
  cond: [2.84, 2.95],
  link3: [3.06, 3.46],
  agent: [3.18, 3.58],
}

const TOGGLES: { cls: string; on: (g: number) => boolean }[] = [
  { cls: 'pulse-on', on: (g) => g > 1.42 && g < 2.62 },
  { cls: 's-pill', on: (g) => g > 2.46 },
  { cls: 's-glow', on: (g) => g > 2.52 },
  { cls: 's-cond', on: (g) => g > 2.88 },
  { cls: 'agent-peek', on: (g) => g > 3.18 },
]

export default function WhySignoz() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const driverRef = useRef<HTMLDivElement | null>(null)
  const worldRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const travelerRef = useRef<HTMLDivElement | null>(null)
  const wiresRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeRef = useRef(0)

  useEffect(() => {
    const driver = driverRef.current
    const world = worldRef.current
    const viewport = viewportRef.current
    if (!driver || !world || !viewport) return

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let engaged = false
    let visible = false
    let raf = 0
    let queued = false
    let stageHeight = viewport.clientHeight || 700
    let gTarget = 0
    let gCurrent = 0
    const lastFill: string[] = []

    const worldY = (g: number) => {
      const idx = Math.min(STEPS - 1, Math.floor(g))
      const local = Math.min(Math.max(g - idx, 0), 1)
      const glide = local <= PARK ? 0 : smoothstep((local - PARK) / (1 - PARK))
      return Math.min(idx + glide, STEPS - 1) * stageHeight
    }

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

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

    const lastVar: Record<string, string> = {}
    const lastCls: Record<string, boolean> = {}
    const setVars = (g: number) => {
      for (const key in BEATS) {
        const [from, to] = BEATS[key]
        const value = clamp01((g - from) / (to - from)).toFixed(3)
        if (lastVar[key] !== value) {
          lastVar[key] = value
          world.style.setProperty(`--b-${key}`, value)
        }
      }
      for (const toggle of TOGGLES) {
        const on = toggle.on(g)
        if (lastCls[toggle.cls] !== on) {
          lastCls[toggle.cls] = on
          world.classList.toggle(toggle.cls, on)
        }
      }
    }

    const apply = (g: number) => {
      const cameraY = worldY(g)
      world.style.transform = `translate3d(0, ${(-cameraY).toFixed(1)}px, 0)`
      setVars(g)

      const traveler = travelerRef.current
      if (traveler) {
        const stageThree = clamp01((g - 2) / 0.35)
        const travelerIn = clamp01((g - 0.38) / 0.08)
        const travelerOut = clamp01((3.04 - g) / 0.08)
        const y = cameraY + stageHeight * 0.58 + g * 18
        const x = -36 * stageThree
        traveler.style.setProperty('--rider-close', `${(-10 * stageThree).toFixed(1)}px`)
        traveler.style.opacity = Math.min(travelerIn, travelerOut).toFixed(3)
        traveler.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      }

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

    const measure = () => {
      stageHeight = viewport.clientHeight || 700
      driver.style.setProperty('--stage-h', `${stageHeight}px`)
      layoutWires()
      apply(gCurrent)
    }

    const layoutWires = () => {
      const wires = wiresRef.current
      if (!wires) return
      const anchors = Array.from(world.querySelectorAll<HTMLElement>('[data-why-anchor]'))
      const segments = Array.from(wires.children) as HTMLElement[]
      if (anchors.length < 2) return
      const worldRect = world.getBoundingClientRect()
      segments.forEach((segment, index) => {
        const from = anchors[index]
        const to = anchors[index + 1]
        if (!from || !to) return
        const top = from.getBoundingClientRect().bottom - worldRect.top - 2
        const bottom = to.getBoundingClientRect().top - worldRect.top + 2
        segment.style.top = `${top.toFixed(1)}px`
        segment.style.height = `${Math.max(bottom - top, 0).toFixed(1)}px`
      })
    }

    const engage = () => {
      if (engaged) return
      engaged = true
      measure()
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', measure)
    }

    const disengage = () => {
      if (!engaged) return
      engaged = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
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

    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : undefined
    ro?.observe(viewport)

    desktopQuery.addEventListener('change', sync)
    reducedQuery.addEventListener('change', sync)

    return () => {
      disengage()
      io.disconnect()
      ro?.disconnect()
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
              <div
                aria-hidden="true"
                className="relative flex h-[min(88vh,780px)] w-full max-w-[640px] flex-col overflow-hidden rounded-md border border-[var(--l1-border)] bg-[var(--l1-background)]"
                data-markdown-ignore
              >
                <div className="relative flex-1 overflow-hidden [contain:paint]" ref={viewportRef}>
                  <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,var(--l2-border)_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div
                    className="why-world absolute inset-x-0 top-0 will-change-transform [backface-visibility:hidden]"
                    ref={worldRef}
                  >
                    <div aria-hidden="true" className="why-wires" ref={wiresRef}>
                      <div
                        className="why-wire"
                        style={{ '--t': 'var(--b-link1, 1)' } as React.CSSProperties}
                      />
                      <div
                        className="why-wire"
                        style={{ '--t': 'var(--b-link2, 1)' } as React.CSSProperties}
                      />
                      <div
                        className="why-wire why-wire--glow"
                        style={{ '--t': 'var(--b-link3, 1)' } as React.CSSProperties}
                      />
                    </div>

                    {WHY_SIGNOZ_STAGES.map((stage, index) => (
                      <div
                        className="flex h-[var(--stage-h,700px)] flex-col justify-start p-6 pt-8"
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
                          <stage.Visual isActive={index === displayIndex} />
                        )}
                      </div>
                    ))}

                    <div className="noz-traveler" ref={travelerRef}>
                      <div className="noz-traveler-inner">
                        <div className="olly-rider olly-rider--large">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/img/graphics/homepage/olly.svg" alt="" />
                          <svg
                            className="rider-cube"
                            viewBox="0 0 94 80"
                            fill="none"
                            aria-hidden="true"
                          >
                            <g className="rider-emanation rider-emanation--left">
                              <polygon points="-22,36 23,58 23,90 -22,68" />
                              <polygon points="-43,47 2,69 2,101 -43,79" />
                            </g>
                            <g className="rider-emanation rider-emanation--right">
                              <polygon points="71,58 116,36 116,68 71,90" />
                              <polygon points="92,69 137,47 137,79 92,101" />
                            </g>
                            <polygon
                              points="47,2 92,24 47,46 2,24"
                              fill="var(--bg-neutral-dark-800)"
                              stroke="var(--bg-neutral-dark-500)"
                            />
                            <polygon
                              points="2,24 47,46 47,78 2,56"
                              fill="var(--bg-neutral-dark-1000)"
                              stroke="var(--bg-neutral-dark-700)"
                            />
                            <polygon
                              points="47,46 92,24 92,56 47,78"
                              fill="var(--bg-neutral-dark-950)"
                              stroke="var(--bg-neutral-dark-600)"
                            />
                            <polygon
                              points="47,9 78,24 47,39 16,24"
                              fill="var(--bg-neutral-dark-700)"
                              stroke="var(--bg-neutral-dark-500)"
                            />
                          </svg>
                        </div>
                        <div className="olly-rider olly-rider--small">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/img/graphics/homepage/olly.svg" alt="" />
                          <svg
                            className="rider-cube"
                            viewBox="0 0 94 80"
                            fill="none"
                            aria-hidden="true"
                          >
                            <g className="rider-emanation rider-emanation--left">
                              <polygon points="-22,36 23,58 23,90 -22,68" />
                              <polygon points="-43,47 2,69 2,101 -43,79" />
                            </g>
                            <g className="rider-emanation rider-emanation--right">
                              <polygon points="71,58 116,36 116,68 71,90" />
                              <polygon points="92,69 137,47 137,79 92,101" />
                            </g>
                            <polygon
                              points="47,2 92,24 47,46 2,24"
                              fill="var(--bg-neutral-dark-800)"
                              stroke="var(--bg-neutral-dark-500)"
                            />
                            <polygon
                              points="2,24 47,46 47,78 2,56"
                              fill="var(--bg-neutral-dark-1000)"
                              stroke="var(--bg-neutral-dark-700)"
                            />
                            <polygon
                              points="47,46 92,24 92,56 47,78"
                              fill="var(--bg-neutral-dark-950)"
                              stroke="var(--bg-neutral-dark-600)"
                            />
                            <polygon
                              points="47,9 78,24 47,39 16,24"
                              fill="var(--bg-neutral-dark-700)"
                              stroke="var(--bg-neutral-dark-500)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-14 bg-gradient-to-b from-[var(--l1-background)] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-14 bg-gradient-to-t from-[var(--l1-background)] to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
