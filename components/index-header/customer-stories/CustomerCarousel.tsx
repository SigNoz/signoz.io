'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

import { CUSTOMER_STORY_LOGOS, type CustomerStoryLogo } from './customerStories.constants'

const SCROLL_SPEED = 42

interface CardProps {
  customer: CustomerStoryLogo
  isClone?: boolean
}

function CustomerCard({ customer, isClone = false }: CardProps) {
  return (
    <a
      className="customer-card"
      href={customer.caseStudyHref ?? '/customers/'}
      aria-label={customer.name}
      aria-hidden={isClone || undefined}
      tabIndex={isClone ? -1 : undefined}
      data-case-study={customer.caseStudyHref ?? ''}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={customer.logoSrc} alt={isClone ? '' : customer.name} draggable={false} />
    </a>
  )
}

export default function CustomerCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const pillTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    const pill = pillRef.current
    const pillText = pillTextRef.current
    if (!wrapper || !track || !pill || !pillText) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let oneSetWidth = 0
    const setSize = CUSTOMER_STORY_LOGOS.length

    const measureSet = () => {
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0
      let width = 0
      for (let i = 0; i < setSize && i < track.children.length; i += 1) {
        width += (track.children[i] as HTMLElement).offsetWidth
      }
      oneSetWidth = width + gap * setSize
    }

    measureSet()
    window.addEventListener('resize', measureSet)

    let offset = 0
    let currentSpeed = SCROLL_SPEED
    let targetSpeed = SCROLL_SPEED
    let lastTime = 0
    let rafId = 0
    let running = false

    let mouseX = 0
    let mouseY = 0
    let pillX = 0
    let pillY = 0
    let activeCard: HTMLElement | null = null

    const tick = (now: number) => {
      if (!lastTime) lastTime = now
      const elapsed = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      currentSpeed += (targetSpeed - currentSpeed) * (1 - Math.pow(0.96, elapsed * 60))
      if (Math.abs(currentSpeed) < 0.05 && targetSpeed === 0) currentSpeed = 0
      offset -= currentSpeed * elapsed

      if (oneSetWidth > 0) {
        if (offset <= -oneSetWidth) offset += oneSetWidth
        if (offset > 0) offset -= oneSetWidth
      }

      track.style.transform = `translate3d(${Math.round(offset * 100) / 100}px, 0, 0)`

      if (activeCard) {
        pillX += (mouseX - pillX) * 0.18
        pillY += (mouseY - pillY) * 0.18
        pill.style.left = `${pillX}px`
        pill.style.top = `${pillY}px`

        const rect = activeCard.getBoundingClientRect()
        const deltaX = (mouseX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const deltaY = (mouseY - (rect.top + rect.height / 2)) / (rect.height / 2)
        activeCard.style.transform = `perspective(700px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) scale(1.025)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (running) return
      running = true
      lastTime = 0
      rafId = requestAnimationFrame(tick)
    }
    const stopLoop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }
    document.addEventListener('mousemove', onMouseMove)

    const onEnter = (event: Event) => {
      const card = event.currentTarget as HTMLElement
      card.classList.add('active')
      track.classList.add('has-hover')
      targetSpeed = 0
      activeCard = card
      pillText.textContent = card.dataset.caseStudy ? 'Read case study' : 'See all customers'
      pillX = mouseX
      pillY = mouseY
      pill.classList.add('visible')
    }

    const onLeave = (event: Event) => {
      const mouseEvent = event as MouseEvent
      const card = event.currentTarget as HTMLElement
      const related = mouseEvent.relatedTarget as HTMLElement | null
      const nextCard = related?.closest?.('.customer-card') as HTMLElement | null

      card.classList.remove('active')
      card.style.transform = ''

      if (nextCard && nextCard !== card) {
        activeCard = null
        targetSpeed = 0
        return
      }

      activeCard = null
      targetSpeed = SCROLL_SPEED
      track.classList.remove('has-hover')
      pill.classList.remove('visible')
    }

    const cards = Array.from(track.querySelectorAll('.customer-card'))
    cards.forEach((card) => {
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
    })

    let io: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) startLoop()
          else stopLoop()
        },
        { rootMargin: '120px' }
      )
      io.observe(wrapper)
    } else {
      startLoop()
    }

    return () => {
      stopLoop()
      io?.disconnect()
      window.removeEventListener('resize', measureSet)
      document.removeEventListener('mousemove', onMouseMove)
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div className="customer-stories__carousel">
      <div className="customer-stories__wrapper" ref={wrapperRef}>
        <div className="customer-stories__track" ref={trackRef}>
          {CUSTOMER_STORY_LOGOS.map((customer) => (
            <CustomerCard key={customer.name} customer={customer} />
          ))}
          {[1, 2].map((clone) =>
            CUSTOMER_STORY_LOGOS.map((customer) => (
              <CustomerCard key={`${customer.name}-clone-${clone}`} customer={customer} isClone />
            ))
          )}
        </div>
        <div className="customer-stories__edge customer-stories__edge--left" aria-hidden="true">
          <div className="edge-blur" />
          <div className="edge-fade" />
        </div>
        <div className="customer-stories__edge customer-stories__edge--right" aria-hidden="true">
          <div className="edge-blur" />
          <div className="edge-fade" />
        </div>
      </div>
      <div className="cursor-pill" ref={pillRef} aria-hidden="true">
        <span ref={pillTextRef} />
        <ArrowRight size={10} />
      </div>
    </div>
  )
}
