'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'

type FloatingCtaState = {
  href: string
  text: string
}

type FloatingCtaSection = FloatingCtaState & {
  isStop: boolean
  top: number
}

const defaultCta: FloatingCtaState = {
  href: '/docs/install/',
  text: 'Start sending telemetry in 20 minutes',
}

export default function HomepageFloatingCta() {
  const [cta, setCta] = useState<FloatingCtaState>(defaultCta)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-homepage-floating-cta], [data-homepage-floating-stop]'
      )
    )

    if (!sections.length) return undefined

    let cachedSections: FloatingCtaSection[] = []
    let frame = 0

    const measureSections = () => {
      cachedSections = sections
        .map((section) => ({
          href: section.dataset.homepageFloatingHref || defaultCta.href,
          isStop: section.dataset.homepageFloatingStop === 'true',
          text: section.dataset.homepageFloatingCta || defaultCta.text,
          top: section.getBoundingClientRect().top + window.scrollY,
        }))
        .sort((first, second) => first.top - second.top)
    }

    const updateActiveCta = () => {
      frame = 0
      const handoffLine = window.scrollY + window.innerHeight * 0.58
      let activeSection: FloatingCtaSection | null = null

      for (const section of cachedSections) {
        if (section.top > handoffLine) break
        activeSection = section
      }

      if (!activeSection) {
        setIsVisible(false)
        return
      }

      if (activeSection.isStop) {
        setIsVisible(false)
        return
      }

      setCta({
        href: activeSection.href,
        text: activeSection.text,
      })
      setIsVisible(true)
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateActiveCta)
    }

    const refreshSections = () => {
      measureSections()
      requestUpdate()
    }

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(refreshSections) : undefined

    measureSections()
    updateActiveCta()
    sections.forEach((section) => resizeObserver?.observe(section))
    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', refreshSections)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', refreshSections)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 transition-all duration-300 md:bottom-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <TrackingLink
        className="bg-card/92 group border-border/55 text-l1-foreground hover:border-accent-primary/70 hover:bg-l3-background pointer-events-auto flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors"
        clickLocation="Homepage Floating CTA"
        clickName="Floating CTA"
        clickText={cta.text}
        clickType="Primary CTA"
        href={cta.href}
      >
        {cta.text}
        <ArrowRight
          className="transition-transform duration-200 group-hover:translate-x-1"
          size={15}
        />
      </TrackingLink>
    </div>
  )
}
