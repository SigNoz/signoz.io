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

import { useLogEvent } from '@/hooks/useLogEvent'
import apmPreview from '@/public/img/website/hero-tabs/apm.webp'
import alertsPreview from '@/public/img/website/hero-tabs/alerts.webp'
import dashboardsPreview from '@/public/img/website/hero-tabs/dashboards.webp'
import infrastructurePreview from '@/public/img/website/hero-tabs/infrastructure.webp'
import logsPreview from '@/public/img/website/hero-tabs/logs.webp'
import tracingPreview from '@/public/img/website/hero-tabs/tracing.webp'

const heroTabs = [
  {
    label: 'Trace',
    image: tracingPreview,
    video: '/img/website/hero-tabs/signoz-trace-demo.mp4',
    alt: 'SigNoz tracing flame graph and waterfall view',
  },
  {
    label: 'Log',
    image: logsPreview,
    video: '/img/website/hero-tabs/signoz-log-demo.mp4',
    alt: 'SigNoz logs explorer with frequency chart and log entries',
  },
  {
    label: 'Infrastructure',
    image: infrastructurePreview,
    video: '/img/website/hero-tabs/signoz-infrastructure-demo.mp4',
    alt: 'SigNoz infrastructure host metrics view',
  },
  {
    label: 'APM',
    image: apmPreview,
    video: '/img/website/hero-tabs/signoz-apm-demo.mp4',
    alt: 'SigNoz application performance monitoring service overview',
  },
  {
    label: 'Dashboards',
    image: dashboardsPreview,
    video: '/img/website/hero-tabs/signoz-dashboards-demo.mp4',
    alt: 'SigNoz dashboard with service latency charts',
  },
  {
    label: 'Alerts',
    image: alertsPreview,
    video: '/img/website/hero-tabs/signoz-alert-demo.mp4',
    alt: 'SigNoz metric alert configuration view',
  },
]

export default function HeroTracePreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [hasMounted, setHasMounted] = useState(false)
  const logEvent = useLogEvent()
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

  const renderPreviewMedia = (
    tab: (typeof heroTabs)[number],
    className: string,
    sizes: string,
    priority = false
  ) => {
    if (tab.video && !prefersReducedMotion) {
      return (
        <video
          aria-label={tab.alt}
          autoPlay
          className={className}
          loop
          muted
          playsInline
          poster={tab.image.src}
        >
          <source src={tab.video} type="video/mp4" />
        </video>
      )
    }

    return (
      <Image
        src={tab.image}
        alt={tab.alt}
        priority={priority}
        unoptimized
        className={className}
        sizes={sizes}
      />
    )
  }

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
      className="max-w-8xl relative mx-auto w-full origin-center overflow-visible shadow-[0_32px_86px_rgba(0,0,0,0.72)]"
      style={{ scale: hasMounted ? scale : prefersReducedMotion ? 1 : 0.94 }}
    >
      <div className="-mx-5 [scrollbar-width:none] overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-3">
          {heroTabs.map((tab, index) => (
            <article
              className="border-border/25 bg-card/60 w-[86dvw] max-w-2xl shrink-0 snap-start overflow-hidden rounded-lg border"
              key={tab.label}
            >
              <div className="px-4 py-4">
                <h3 className="text-l1-foreground m-0 text-base leading-5 font-medium">
                  {tab.label}
                </h3>
              </div>
              <div className="relative h-80 overflow-hidden sm:h-96">
                {renderPreviewMedia(
                  tab,
                  'h-auto w-[720px] max-w-none sm:w-full',
                  '86dvw',
                  index === 0
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,rgba(8,9,10,0.44)_62%,rgba(8,9,10,0.78)_100%)]" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-background/90 relative z-10 hidden px-4 pt-5 sm:px-6 lg:block lg:px-6 xl:px-8">
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
                  className="group text-foreground relative min-h-10 pb-3 text-left transition-colors duration-200 xl:min-h-11 xl:pb-4"
                  id={`homepage-hero-preview-tab-${index}`}
                  key={tab.label}
                  onClick={() => {
                    if (index === activeTab) {
                      return
                    }

                    logEvent({
                      eventName: 'Website Click',
                      eventType: 'track',
                      attributes: {
                        clickType: 'Product Preview Tab',
                        clickName: 'Homepage Hero Preview Tab',
                        clickLocation: 'Hero Section',
                        clickText: tab.label,
                      },
                    })
                    setSlideDirection(index > activeTab ? 1 : -1)
                    setActiveTab(index)
                  }}
                  role="tab"
                  type="button"
                >
                  <span className="block text-base leading-5 font-medium tracking-normal whitespace-nowrap xl:text-lg xl:leading-6">
                    {tab.label}
                  </span>
                  <span className="bg-l3-background/70 group-hover:bg-l3-background absolute inset-x-0 bottom-0 h-px transition-colors duration-200" />
                  {isActive && (
                    <motion.span
                      className="bg-card absolute inset-x-0 bottom-0 z-10 h-px"
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
        className="relative mt-6 hidden h-96 overflow-hidden bg-transparent sm:h-96 md:h-[570px] lg:block lg:h-[560px] xl:h-[640px]"
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
            {renderPreviewMedia(
              activePreview,
              'h-auto w-full',
              '(max-width: 768px) 1180px, 1258px',
              activeTab === 0
            )}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,rgba(8,9,10,0.48)_58%,rgba(8,9,10,0.82)_100%)]" />
      </div>
    </motion.div>
  )
}
