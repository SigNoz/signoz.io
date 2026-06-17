'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

type FloatingCtaState = {
  href: string
  text: string
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

    let frame = 0

    const updateActiveCta = () => {
      frame = 0
      const handoffLine = window.scrollY + window.innerHeight * 0.58
      const activeSection = sections.reduce<HTMLElement | null>((active, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        if (sectionTop > handoffLine) return active

        if (!active) return section

        const activeTop = active.getBoundingClientRect().top + window.scrollY
        return sectionTop >= activeTop ? section : active
      }, null)

      if (!activeSection) {
        setIsVisible(false)
        return
      }

      if (activeSection.dataset.homepageFloatingStop === 'true') {
        setIsVisible(false)
        return
      }

      setCta({
        href: activeSection.dataset.homepageFloatingHref || defaultCta.href,
        text: activeSection.dataset.homepageFloatingCta || defaultCta.text,
      })
      setIsVisible(true)
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateActiveCta)
    }

    updateActiveCta()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div
      className={`homepage-variant-only pointer-events-none fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-[430px] -translate-x-1/2 transition-all duration-300 md:bottom-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <a
        className="bg-signoz_ink-400/92 group pointer-events-auto flex h-11 items-center justify-center gap-2 rounded-[6px] border border-signoz_slate-400/55 px-4 text-sm font-medium text-signoz_vanilla-100 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-signoz_robin-400/70 hover:bg-signoz_ink-300"
        href={cta.href}
      >
        {cta.text}
        <ArrowRight
          className="transition-transform duration-200 group-hover:translate-x-1"
          size={15}
        />
      </a>
    </div>
  )
}
