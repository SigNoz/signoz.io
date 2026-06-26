'use client'

import { ArrowRight, Database, LineChart, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import TrackingLink from '@/components/TrackingLink'

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
    <article className="flex min-h-[176px] flex-col justify-between border-t border-signoz_slate-400/25 py-6 first:border-t-0 md:min-h-[220px] md:border-l md:border-t-0 md:px-10 md:py-1 md:first:border-l lg:px-12">
      <div>
        <div className="flex items-center gap-3 md:block">
          <Icon className="h-5 w-5 shrink-0 text-signoz_robin-400" />
          <p className="m-0 text-sm leading-5 text-signoz_vanilla-400 md:mt-0">{title}</p>
        </div>
        <p className="m-0 mt-3 max-w-[330px] text-[18px] font-medium leading-7 tracking-[-0.15px] text-signoz_vanilla-100 md:text-xl md:leading-8 md:tracking-[-0.2px]">
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
    <div ref={ctaRef} className="mt-6 w-fit">
      <TrackingLink
        className="homepage-button homepage-button--primary inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white"
        clickLocation="Homepage Pricing Section"
        clickName="Migration CTA"
        clickText={`Migrate from ${migrationSources[activeSourceIndex]}`}
        clickType="Primary CTA"
        href="/docs/migration/migrate-to-signoz/"
      >
        <span className="homepage-button__label flex min-w-0 items-center justify-center gap-1.5">
          Migrate from
          <span className="inline-block min-w-[72px] text-left transition-opacity duration-200">
            {migrationSources[activeSourceIndex]}
          </span>
        </span>
        <span className="homepage-button__icon homepage-button__icon--primary hidden">
          <ArrowRight size={14} />
        </span>
      </TrackingLink>
    </div>
  )
}

export default function Pricing() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-14 sm:px-6 sm:py-16 lg:px-[78px] lg:py-20"
      data-homepage-floating-cta="View pricing"
      data-homepage-floating-href="/pricing/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6">
          <h2 className="m-0 max-w-[720px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
            Pricing that stays predictable as you scale.
          </h2>
          <div className="max-w-[430px]">
            <p className="m-0 text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400 sm:text-[17px] sm:leading-8 sm:tracking-[-0.2px]">
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

        <div className="relative">
          <div className="grid md:grid-cols-3">
            {pricingValueProps.map(({ description, Icon, title }) => (
              <PricingValueColumn key={title} description={description} Icon={Icon} title={title} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-signoz_slate-400/25 pt-8 md:mt-16 md:grid-cols-[0.82fr_2fr]">
          <div>
            <p className="m-0 max-w-[310px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[38px] sm:tracking-[-0.95px] md:text-[44px] md:tracking-[-1.15px]">
              Switch to
              <br />
              SigNoz
            </p>
            <MigrationCta />
          </div>
          <div className="flex min-h-[220px] flex-col justify-between">
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
                  <span className="text-[18px] font-medium leading-7 tracking-[-0.15px] text-signoz_vanilla-100 transition-colors group-hover:text-signoz_robin-100">
                    {link.title}
                  </span>
                  <span className="text-sm font-medium text-signoz_robin-400 transition-transform duration-200 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
                <span className="mt-2 block max-w-[560px] text-sm leading-6 text-signoz_vanilla-400">
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
