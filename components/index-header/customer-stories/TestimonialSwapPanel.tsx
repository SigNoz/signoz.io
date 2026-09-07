'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { type CustomerStoryQuote } from './customerStories.constants'

const SWAP_EVERY = 6200
const LEAVE_MS = 620

interface TestimonialSwapPanelProps {
  quotes: CustomerStoryQuote[]
  startIndex?: number
  staggerMs?: number
}

type Phase = 'idle' | 'leaving' | 'arriving'

export default function TestimonialSwapPanel({
  quotes,
  startIndex = 0,
  staggerMs = 0,
}: TestimonialSwapPanelProps) {
  const [index, setIndex] = useState(startIndex)
  const [phase, setPhase] = useState<Phase>('idle')
  const panelRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(false)
  const indexRef = useRef(startIndex)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let leaveTimer: ReturnType<typeof setTimeout> | undefined
    let arriveTimer: ReturnType<typeof setTimeout> | undefined
    let interval: ReturnType<typeof setInterval> | undefined

    const swap = () => {
      if (hoveredRef.current || document.hidden) return
      if (panelRef.current?.contains(document.activeElement)) return

      if (reduceMotion) {
        indexRef.current = (indexRef.current + 1) % quotes.length
        setIndex(indexRef.current)
        return
      }

      setPhase('leaving')
      leaveTimer = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % quotes.length
        setIndex(indexRef.current)
        setPhase('arriving')
        arriveTimer = setTimeout(() => setPhase('idle'), 40)
      }, LEAVE_MS)
    }

    const startTimer = setTimeout(() => {
      interval = setInterval(swap, SWAP_EVERY)
    }, staggerMs)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(leaveTimer)
      clearTimeout(arriveTimer)
      if (interval) clearInterval(interval)
    }
  }, [quotes.length, staggerMs])

  const quote = quotes[index % quotes.length]

  const handleMouseMove = (event: React.MouseEvent) => {
    const content = contentRef.current
    const panel = panelRef.current
    if (!content || !panel) return
    const rect = panel.getBoundingClientRect()
    const deltaX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const deltaY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    content.style.transform = `perspective(700px) rotateY(${deltaX * 2.5}deg) rotateX(${-deltaY * 2.5}deg) scale(1.008)`
  }

  const handleMouseLeave = () => {
    hoveredRef.current = false
    if (contentRef.current) contentRef.current.style.transform = ''
    panelRef.current?.classList.remove('active')
  }

  const handleMouseEnter = () => {
    hoveredRef.current = true
    panelRef.current?.classList.add('active')
  }

  const href = quote.caseStudyHref ?? '/customers/'
  const label = quote.caseStudyHref ? 'Read case study' : 'See all customers'

  return (
    <figure
      ref={panelRef}
      className="voice voice--testimonial group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`voice__body ${phase === 'leaving' ? 'is-leaving' : ''} ${
          phase === 'arriving' ? 'is-arriving' : ''
        }`}
      >
        <div className="voice__content" ref={contentRef}>
          <blockquote className="voice__quote">“{quote.text}”</blockquote>
          <figcaption className="voice__source">
            {quote.name}, <span className="voice__org">{quote.org}</span>
          </figcaption>
        </div>
      </div>
      <a
        href={href}
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--l1-foreground)_10%,transparent)] bg-[var(--l2-background)] px-2.5 py-1.5 text-xs font-medium text-[var(--l1-foreground)] no-underline opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover:opacity-100"
        aria-label={`${label}: ${quote.name}, ${quote.org}`}
      >
        {label}
        <ArrowRight size={10} aria-hidden="true" />
      </a>
    </figure>
  )
}
