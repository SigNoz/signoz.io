'use client'

import Image from 'next/image'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import apmPreview from '@/public/img/website/hero-tabs/apm.png'
import alertsPreview from '@/public/img/website/hero-tabs/alerts.png'
import dashboardsPreview from '@/public/img/website/hero-tabs/dashboards.png'
import infrastructurePreview from '@/public/img/website/hero-tabs/infrastructure.png'
import logsPreview from '@/public/img/website/hero-tabs/logs.png'
import tracingPreview from '@/public/img/website/hero-tabs/tracing.png'

const heroTabs = [
  {
    label: 'Trace',
    description: 'every request',
    image: tracingPreview,
    alt: 'SigNoz tracing flame graph and waterfall view',
  },
  {
    label: 'Log',
    description: 'what changed',
    image: logsPreview,
    alt: 'SigNoz logs explorer with frequency chart and log entries',
  },
  {
    label: 'Infrastructure',
    description: 'hosts and pods',
    image: infrastructurePreview,
    alt: 'SigNoz infrastructure host metrics view',
  },
  {
    label: 'APM',
    description: 'service health',
    image: apmPreview,
    alt: 'SigNoz application performance monitoring service overview',
  },
  {
    label: 'Dashboards',
    description: 'shared views',
    image: dashboardsPreview,
    alt: 'SigNoz dashboard with service latency charts',
  },
  {
    label: 'Alerts',
    description: 'before impact',
    image: alertsPreview,
    alt: 'SigNoz metric alert configuration view',
  },
]

export default function HeroTracePreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [hasMounted, setHasMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.94, 1])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const activePreview = heroTabs[activeTab]

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26, filter: 'blur(22px)' }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        delay: 0.34,
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative mx-auto w-full max-w-[1296px] origin-center overflow-visible shadow-[0_32px_86px_rgba(0,0,0,0.72)]"
      style={{ scale: hasMounted ? scale : prefersReducedMotion ? 1 : 0.94 }}
    >
      <div className="-mx-5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-3">
          {heroTabs.map((tab, index) => (
            <article
              className="w-[86vw] max-w-[680px] shrink-0 snap-start overflow-hidden rounded-[10px] border border-signoz_slate-400/25 bg-signoz_ink-400/60"
              key={tab.label}
            >
              <div className="px-4 py-4">
                <h3 className="m-0 text-base font-medium leading-5 text-signoz_vanilla-100">
                  {tab.label}
                </h3>
                <p className="m-0 mt-1 text-sm font-medium leading-5 text-signoz_vanilla-400/60">
                  {tab.description}
                </p>
              </div>
              <div className="relative h-[310px] overflow-hidden sm:h-[390px]">
                <Image
                  src={tab.image}
                  alt={tab.alt}
                  priority={index === 0}
                  unoptimized
                  className="h-auto w-[720px] max-w-none sm:w-full"
                  sizes="86vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,rgba(8,9,10,0.44)_62%,rgba(8,9,10,0.78)_100%)]" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden px-4 pt-5 sm:px-6 lg:block lg:px-8">
        <LayoutGroup id="homepage-hero-preview-tabs">
          <div
            className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6"
            role="tablist"
            aria-label="SigNoz product preview"
          >
            {heroTabs.map((tab, index) => {
              const isActive = index === activeTab

              return (
                <button
                  aria-controls="homepage-hero-preview-panel"
                  aria-selected={isActive}
                  className="group relative min-h-[62px] pb-4 text-left text-signoz_vanilla-100 transition-colors duration-200"
                  id={`homepage-hero-preview-tab-${index}`}
                  key={tab.label}
                  onClick={() => {
                    if (index === activeTab) {
                      return
                    }

                    setSlideDirection(index > activeTab ? 1 : -1)
                    setActiveTab(index)
                  }}
                  role="tab"
                  type="button"
                >
                  <span className="block text-base font-medium leading-5 tracking-normal sm:text-lg sm:leading-6">
                    {tab.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-5 tracking-normal text-signoz_vanilla-400/55 transition-colors duration-200 group-hover:text-signoz_vanilla-400/70">
                    {tab.description}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-signoz_slate-100/70 transition-colors duration-200 group-hover:bg-signoz_slate-100" />
                  {isActive && (
                    <motion.span
                      className="absolute inset-x-0 bottom-0 z-10 h-px bg-signoz_vanilla-100"
                      layoutId="active-tab-rail"
                      transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </LayoutGroup>
      </div>

      <div
        aria-labelledby={`homepage-hero-preview-tab-${activeTab}`}
        className="relative mt-6 hidden h-[410px] overflow-hidden bg-transparent sm:h-[470px] md:h-[540px] lg:block lg:h-[600px]"
        id="homepage-hero-preview-panel"
        role="tabpanel"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="absolute inset-x-0 top-0 [mask-image:linear-gradient(180deg,#000_0%,#000_60%,rgba(0,0,0,0.86)_68%,rgba(0,0,0,0.42)_82%,rgba(0,0,0,0)_96%)]"
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, x: slideDirection * -72, filter: 'blur(8px)' }
            }
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, x: slideDirection * 72, filter: 'blur(8px)' }
            }
            key={activePreview.label}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={activePreview.image}
              alt={activePreview.alt}
              priority={activeTab === 0}
              unoptimized
              className="h-auto w-full"
              sizes="(max-width: 768px) 1180px, 1258px"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,rgba(8,9,10,0.48)_58%,rgba(8,9,10,0.82)_100%)]" />
      </div>
    </motion.div>
  )
}
