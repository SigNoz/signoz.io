import { ArrowRight, Database, LineChart, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import SectionHeader from '@/components/homepage/SectionHeader'

import MigrationCta from './MigrationCta'

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
      'Bring engineering, support, and on-call teams into SigNoz Cloud without seat limits or seat math.',
  },
  {
    Icon: LineChart,
    title: 'Simple usage-based pricing',
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
    <article className="rule-fade-x md:vrule-solid flex min-h-44 flex-col justify-between gap-10 border-t border-[var(--l2-border)] py-7 first:border-t-0 md:min-h-56 md:border-t-0 md:px-10 md:py-8 md:first:before:hidden lg:px-12">
      <Icon className="h-5 w-5 shrink-0 text-[var(--l2-foreground)]" aria-hidden="true" />
      <div>
        <p className="m-0 text-lg font-medium leading-7 tracking-normal text-[var(--l1-foreground)] md:text-xl md:leading-8">
          {title}
        </p>
        <p className="m-0 mt-3 max-w-sm text-base leading-7 tracking-normal text-[var(--l2-foreground)] md:text-lg md:leading-8">
          {description}
        </p>
      </div>
    </article>
  )
}

export default function Pricing() {
  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 px-5 py-14 sm:px-6 sm:py-16 lg:px-20 lg:py-20 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="View pricing"
      data-homepage-floating-href="/pricing/"
    >
      <div className="mx-auto max-w-8xl">
        <SectionHeader
          title="Pricing that stays predictable"
          mutedTitle="as you scale."
          description="Add teammates freely, monitor autoscaling infrastructure, and estimate telemetry costs before you commit."
          cta={{
            label: 'View Pricing',
            href: '/pricing/',
            clickLocation: 'Homepage Pricing Section',
            clickName: 'View Pricing Link',
          }}
        />

        <div className="rule-fade-x relative border-y border-[var(--l2-border)]">
          <div className="grid md:grid-cols-3">
            {pricingValueProps.map(({ description, Icon, title }) => (
              <PricingValueColumn key={title} description={description} Icon={Icon} title={title} />
            ))}
          </div>
        </div>

        <div className="rule-fade-x mt-12 grid gap-10 border-t border-[var(--l2-border)] pt-8 md:mt-16 md:grid-cols-3 lg:gap-12">
          <div>
            <p className="m-0 max-w-xs text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl md:text-5xl">
              Switch to
              <br />
              SigNoz Cloud
            </p>
            <MigrationCta />
          </div>
          <div className="flex min-h-56 flex-col justify-between md:col-span-2">
            {alternativeLinks.map((link) => (
              <TrackingLink
                key={link.title}
                className="rule-fade-x group border-t border-[var(--l2-border)] py-5 no-underline first:border-t-0 first:pt-0 last:pb-0"
                clickLocation="Homepage Pricing Section"
                clickName={`${link.title} Link`}
                clickText={link.title}
                clickType="Alternative Link"
                href={link.href}
              >
                <span className="flex items-start justify-between gap-8">
                  <span className="text-lg font-medium leading-7 tracking-normal text-[var(--l1-foreground)] transition-colors group-hover:text-[var(--bg-robin-300)]">
                    {link.title}
                  </span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[var(--l2-foreground)] transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-6 text-[var(--l2-foreground)]">
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
