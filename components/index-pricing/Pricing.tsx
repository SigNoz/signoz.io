'use client'

import { ArrowRight, Database, LineChart, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

const pricingValueProps = [
  {
    Icon: Server,
    title: 'No host-based pricing',
    description:
      'Autoscale infrastructure without turning every node, container, or host into a billing surprise.',
  },
  {
    Icon: Database,
    title: 'No user-based pricing',
    description:
      'Bring engineering, support, and on-call teams into SigNoz without seat limits or seat math.',
  },
  {
    Icon: LineChart,
    title: 'Simple usage pricing',
    description:
      'Send any mix of logs, traces, and metrics. Pay for telemetry volume, not custom metrics complexity.',
  },
]

const alternativeLinks = [
  {
    title: 'Datadog alternative',
    description: 'Predictable usage-based pricing without per-host or per-user billing.',
    href: '/datadog-alternative/',
  },
  {
    title: 'Grafana alternative',
    description: 'Logs, metrics, traces, dashboards, and alerts in one OpenTelemetry-native tool.',
    href: '/grafana-alternative/',
  },
  {
    title: 'CloudWatch alternative',
    description: 'Correlate AWS telemetry with application traces and logs across your stack.',
    href: '/cloudwatch-alternative/',
  },
]

const migrationSources = ['Datadog', 'Grafana', 'New Relic', 'CloudWatch', 'ELK']

function PricingValueColumn({
  description,
  Icon,
  title,
}: {
  description: string
  Icon: LucideIcon
  title: string
}) {
  return (
    <article className="flex min-h-44 flex-col justify-between border-t border-signoz_slate-400/35 py-7 first:border-t-0 md:min-h-56 md:border-l md:border-t-0 md:px-10 md:py-8 md:first:border-l-0 lg:px-12">
      <div>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-signoz_robin-400" />
          <p className="m-0 text-lg font-medium leading-7 tracking-normal text-signoz_vanilla-100 md:text-xl md:leading-8">
            {title}
          </p>
        </div>
        <p className="m-0 mt-3 max-w-sm text-base leading-7 tracking-normal text-signoz_vanilla-400 md:text-lg md:leading-8">
          {description}
        </p>
      </div>
    </article>
  )
}

function MigrationCta() {
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const [activeSourceIndex, setActiveSourceIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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

    const intervalId = window.setInterval(() => {
      setActiveSourceIndex((currentIndex) => (currentIndex + 1) % migrationSources.length)
    }, 1800)

    return () => window.clearInterval(intervalId)
  }, [isVisible])

  return (
    <div ref={ctaRef} className="mt-6 w-64">
      <TrackingLink
        className={cn(
          'homepage-button !flex !h-8 !gap-0 !overflow-hidden !rounded !bg-signoz_robin-500 !p-0 transition-colors duration-200 hover:!bg-signoz_robin-400 active:!bg-signoz_robin-600',
          'inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white'
        )}
        clickLocation="Homepage Pricing Section"
        clickName="Migration CTA"
        clickText={`Migrate from ${migrationSources[activeSourceIndex]}`}
        clickType="Primary CTA"
        href="/docs/migration/migrate-to-signoz/"
      >
        <span
          className={cn(
            'homepage-button__label flex !h-full min-w-0 !flex-1 items-center justify-center gap-1.5 !whitespace-nowrap !px-3',
            '[&_svg:not(.animate-spin)]:hidden'
          )}
        >
          Migrate from
          <span className="inline-block min-w-24 text-left transition-opacity duration-200">
            {migrationSources[activeSourceIndex]}
          </span>
        </span>
        <span
          className={cn(
            'homepage-button__icon hidden !h-full !w-8 !shrink-0 !items-center !justify-center !rounded !text-white',
            '!flex !bg-signoz_robin-400'
          )}
        >
          <ArrowRight size={14} />
        </span>
      </TrackingLink>
    </div>
  )
}

export default function Pricing() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-14 sm:px-6 sm:py-16 lg:px-20 lg:py-20 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="View pricing"
      data-homepage-floating-href="/pricing/"
    >
      <div className="mx-auto max-w-8xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6">
          <h2 className="m-0 max-w-3xl text-3xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-4xl sm:leading-none md:text-6xl">
            Pricing that stays predictable
            <br />
            <span className="text-signoz_vanilla-400">as you scale.</span>
          </h2>
          <div className="max-w-md">
            <p className="m-0 text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:text-lg sm:leading-8">
              Add teammates freely, monitor autoscaling infrastructure, and estimate telemetry costs
              before you commit.
            </p>
            <TrackingLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              clickLocation="Homepage Pricing Section"
              clickName="View Pricing Link"
              clickText="View pricing"
              clickType="Secondary CTA"
              href="/pricing/"
            >
              View pricing
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </TrackingLink>
          </div>
        </div>

        <div className="relative border-y border-signoz_slate-400/35">
          <div className="grid md:grid-cols-3">
            {pricingValueProps.map(({ description, Icon, title }) => (
              <PricingValueColumn key={title} description={description} Icon={Icon} title={title} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-signoz_slate-400/25 pt-8 md:mt-16 md:grid-cols-3 lg:gap-12">
          <div>
            <p className="m-0 max-w-xs text-3xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-4xl md:text-5xl">
              Switch to
              <br />
              SigNoz
            </p>
            <MigrationCta />
          </div>
          <div className="flex min-h-56 flex-col justify-between md:col-span-2">
            {alternativeLinks.map((link) => (
              <TrackingLink
                key={link.title}
                className="group border-t border-signoz_slate-400/25 py-5 first:border-t-0 first:pt-0 last:pb-0"
                clickLocation="Homepage Pricing Section"
                clickName={`${link.title} Link`}
                clickText={link.title}
                clickType="Alternative Link"
                href={link.href}
              >
                <span className="flex items-start justify-between gap-8">
                  <span className="text-lg font-medium leading-7 tracking-normal text-signoz_vanilla-100 transition-colors group-hover:text-signoz_robin-100">
                    {link.title}
                  </span>
                  <span className="text-sm font-medium text-signoz_robin-400 transition-transform duration-200 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-6 text-signoz_vanilla-400">
                  {link.description}
                </span>
              </TrackingLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
