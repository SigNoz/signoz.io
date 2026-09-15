'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useScramble } from 'use-scramble'

import TrackingLink from '@/components/TrackingLink'

const migrationSources = ['Datadog', 'Grafana', 'New Relic', 'CloudWatch', 'ELK']

export default function MigrationCta() {
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const [activeSourceIndex, setActiveSourceIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const { ref: scrambleRef } = useScramble({
    text: migrationSources[activeSourceIndex],
    speed: 0.7,
    tick: 1,
    step: 1,
    scramble: 5,
    seed: 2,
    overdrive: false,
  })

  useEffect(() => {
    const element = ctaRef.current

    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: '120px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSourceIndex((currentIndex) => (currentIndex + 1) % migrationSources.length)
    }, 1800)

    return () => window.clearInterval(intervalId)
  }, [isVisible])

  return (
    <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-3">
      <TrackingLink
        className="btn-tactile btn-tactile--primary no-underline"
        clickLocation="Homepage Pricing Section"
        clickName="Migration CTA"
        clickText={`Migrate from ${migrationSources[activeSourceIndex]}`}
        clickType="Primary CTA"
        href="/docs/migration/migrate-to-signoz/"
      >
        Migrate from
        <span
          ref={scrambleRef}
          className="-ml-0.5 inline-block min-w-20 text-left"
          aria-label={migrationSources[activeSourceIndex]}
        />
        <ArrowRight size={12} aria-hidden="true" />
      </TrackingLink>
      <TrackingLink
        className="btn-tactile btn-tactile--secondary no-underline"
        clickLocation="Homepage Pricing Section"
        clickName="Book a Demo Button"
        clickText="Book a demo"
        clickType="Secondary CTA"
        href="/contact-us/?source=homepage"
        prefetch={false}
      >
        Book a demo
        <ArrowRight size={12} aria-hidden="true" />
      </TrackingLink>
    </div>
  )
}
