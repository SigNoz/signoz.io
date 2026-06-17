'use client'

import { Database, LineChart, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import CustomLink from '@/components/Link'

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
    <article className="flex min-h-[220px] flex-col justify-between border-l border-signoz_slate-400/25 px-8 py-1 md:px-10 lg:px-12">
      <Icon className="h-5 w-5 text-signoz_robin-400" />
      <div>
        <p className="m-0 text-sm leading-5 text-signoz_vanilla-400">{title}</p>
        <p className="m-0 mt-3 max-w-[330px] text-xl font-medium leading-8 tracking-[-0.2px] text-signoz_vanilla-100">
          {description}
        </p>
      </div>
    </article>
  )
}

export default function PricingExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-16 sm:px-6 lg:px-[78px] lg:py-20"
      data-homepage-floating-cta="View pricing"
      data-homepage-floating-href="/pricing/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="m-0 max-w-[720px] text-[40px] font-medium leading-[1.04] tracking-[-1.1px] text-signoz_vanilla-100 md:text-[58px] md:tracking-[-1.65px]">
            Pricing that stays predictable as you scale.
          </h2>
          <div className="max-w-[430px]">
            <p className="m-0 text-[17px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
              Add teammates freely, monitor autoscaling infrastructure, and estimate telemetry costs
              before you commit.
            </p>
            <CustomLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/pricing/"
            >
              View pricing
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </CustomLink>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-y-12 md:grid-cols-3">
            {pricingValueProps.map(({ description, Icon, title }) => (
              <PricingValueColumn key={title} description={description} Icon={Icon} title={title} />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-signoz_slate-400/25 pt-8 md:grid-cols-[0.82fr_2fr]">
          <p className="m-0 max-w-[310px] text-[38px] font-medium leading-[1.08] tracking-[-0.95px] text-signoz_vanilla-100 md:text-[44px] md:tracking-[-1.15px]">
            What makes
            <br />
            SigNoz different
          </p>
          <div className="flex min-h-[220px] flex-col justify-between">
            {alternativeLinks.map((link) => (
              <CustomLink
                key={link.title}
                className="group border-t border-signoz_slate-400/25 py-5 first:border-t-0 first:pt-0 last:pb-0"
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
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
