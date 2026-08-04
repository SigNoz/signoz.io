'use client'

import { useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

const customerVideos = [
  {
    company: 'Kernel',
    description:
      'Hiro Tamada explains how OpenTelemetry makes new services easy to onboard across Kernel’s bare-metal browser infrastructure.',
    href: '/customers/kernel/',
    logo: '/img/case_study/logos/kernel-logo.svg',
    outcome: 'OpenTelemetry-native infrastructure for AI agents',
    videoId: '0ZrTqonLE-I',
  },
  {
    company: 'Shaped',
    description:
      'Karl Lyons shows why SigNoz became the first place Shaped checks when an incident reaches the engineering team.',
    href: '/customers/shaped/',
    logo: '/img/case_study/logos/shaped-logo.svg',
    outcome: 'One place for logs, metrics, and traces',
    videoId: 'p4-dJkDtUbw',
  },
  {
    company: 'Alien Intelligence',
    description:
      'Leo Blondel walks through the AI SRE workflow his team built for the first pass of production alert triage.',
    href: '/customers/alien-intelligence-ai-sre-workflow-signoz/',
    logo: '/img/homepage/customer-logos/alien-intelligence.webp',
    outcome: 'Agent-led triage with a human in the loop',
    videoId: '0-IRNacWDDA',
  },
] as const

export default function CustomerVideoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    moved: false,
    scrollLeft: 0,
    startX: 0,
  })
  const suppressClickRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [interactiveVideoId, setInteractiveVideoId] = useState<string | null>(null)

  const progressPosition = ['translate-x-0', 'translate-x-full', 'translate-x-[200%]'] as const

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const nextIndex = (activeIndex + direction + customerVideos.length) % customerVideos.length

    setActiveIndex(nextIndex)
    viewport.scrollTo({
      behavior: 'smooth',
      left: nextIndex * viewport.clientWidth,
    })
  }

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    dragRef.current = {
      active: true,
      moved: false,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    }
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    const drag = dragRef.current
    if (!viewport || !drag.active || (event.buttons & 1) === 0) return

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    if (!drag.moved) return

    event.preventDefault()
    viewport.scrollLeft = drag.scrollLeft - distance
  }

  const finishDrag = () => {
    const drag = dragRef.current
    if (!drag.active) return

    suppressClickRef.current = drag.moved
    drag.active = false

    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  return (
    <div>
      <div
        aria-label="Customer video carousel"
        aria-roledescription="carousel"
        className="flex cursor-grab select-none snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl [scrollbar-width:none] [touch-action:pan-y] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return
          event.preventDefault()
          event.stopPropagation()
        }}
        onDragStart={(event) => event.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseLeave={finishDrag}
        onMouseMove={handleMouseMove}
        onMouseUp={finishDrag}
        onScroll={(event) => {
          const viewport = event.currentTarget
          const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth)
          setActiveIndex(Math.max(0, Math.min(customerVideos.length - 1, nextIndex)))
        }}
        ref={viewportRef}
        role="region"
        tabIndex={0}
      >
        {customerVideos.map((video) => (
          <div
            className="grid min-w-full snap-start overflow-hidden rounded-2xl border border-signoz_slate-400 bg-signoz_ink-400 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.65fr)]"
            key={video.company}
          >
            <div className="relative bg-signoz_ink-500">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
                loading="lazy"
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}${
                  interactiveVideoId === video.videoId ? '?autoplay=1' : ''
                }`}
                title={`${video.company} customer video`}
              />
              {interactiveVideoId === video.videoId ? null : (
                <button
                  aria-label={`Play the ${video.company} customer video`}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  onClick={() => setInteractiveVideoId(video.videoId)}
                  type="button"
                />
              )}
            </div>

            <Link
              className="group flex min-h-72 flex-col justify-between border-t border-signoz_slate-400 p-6 transition-colors hover:bg-signoz_ink-300 lg:border-l lg:border-t-0 lg:p-8"
              href={video.href}
            >
              <div className="flex items-start justify-between gap-4">
                <Image
                  alt={`${video.company} logo`}
                  className="max-h-10 w-auto max-w-36 object-contain object-left"
                  height={40}
                  src={video.logo}
                  width={144}
                />
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-signoz_vanilla-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={18}
                />
              </div>
              <div>
                <p className="text-xl font-medium leading-7 text-signoz_vanilla-100">
                  {video.outcome}
                </p>
                <p className="mt-3 text-sm leading-6 text-signoz_vanilla-400">
                  {video.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-signoz_robin-400">
                  Read the story
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-6">
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-xs tabular-nums text-signoz_vanilla-400"
        >
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(customerVideos.length).padStart(2, '0')}
        </span>
        <div
          aria-label={`Video ${activeIndex + 1} of ${customerVideos.length}`}
          aria-valuemax={customerVideos.length}
          aria-valuemin={1}
          aria-valuenow={activeIndex + 1}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-signoz_slate-400"
          role="progressbar"
        >
          <span
            className={`absolute inset-y-0 left-0 w-1/3 rounded-full bg-signoz_vanilla-100 transition-transform duration-300 ${progressPosition[activeIndex]}`}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Previous customer video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={() => move(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <button
            aria-label="Next customer video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={() => move(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}
