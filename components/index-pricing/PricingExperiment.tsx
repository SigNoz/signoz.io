'use client'

import { ArrowUpRight, Check, Database, LineChart, Server, ShieldCheck } from 'lucide-react'

import CustomLink from '@/components/Link'

type PricingPlan = {
  description: string
  features: string[]
  price: string
  priceSuffix: string
  title: string
}

type CompareCard = {
  description: string
  href: string
  title: string
}

const pricingPlans: PricingPlan[] = [
  {
    title: 'Teams',
    description:
      'For fast-scaling teams that want cloud observability without user or host pricing.',
    price: '$49',
    priceSuffix: '/month',
    features: [
      'Includes $49 of usage',
      'Logs and traces from $0.30/GB',
      'Metrics from $0.10/mn samples',
      'Unlimited teammates and hosts',
    ],
  },
  {
    title: 'Enterprise',
    description:
      'For larger orgs that need data residency, compliance posture, guided migration, and support.',
    price: 'Custom',
    priceSuffix: 'starts at $4000/month',
    features: [
      'Dedicated cloud, BYOC, or self-hosted',
      'HIPAA, BAA, and security support',
      'Dedicated Slack and email support',
      'Team training and migration help',
    ],
  },
]

const pricingPrinciples = [
  {
    Icon: Server,
    title: 'No host-based pricing',
    description:
      'Autoscale without turning every node, container, or host into a billing surprise.',
  },
  {
    Icon: Database,
    title: 'No user-based pricing',
    description: 'Bring engineering, support, and on-call teams into SigNoz without seat math.',
  },
  {
    Icon: LineChart,
    title: 'Simple usage pricing',
    description: 'Pay for the telemetry you send, with no special pricing for custom metrics.',
  },
]

const compareCards: CompareCard[] = [
  {
    title: 'vs Datadog',
    description:
      'Compare predictable usage-based pricing, OpenTelemetry-native data, and migration paths.',
    href: '/datadog-alternative/',
  },
  {
    title: 'vs Grafana',
    description:
      'See how one integrated workspace compares with maintaining Prometheus, Loki, and Tempo.',
    href: '/grafana-alternative/',
  },
  {
    title: 'vs CloudWatch',
    description:
      'Understand the difference between AWS-native telemetry and cross-signal investigation.',
    href: '/cloudwatch-alternative/',
  },
]

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className="bg-signoz_ink-500/72 flex min-h-[420px] flex-col justify-between rounded-[22px] border border-signoz_slate-400/45 p-8">
      <div>
        <h3 className="m-0 text-[30px] font-medium leading-tight tracking-[-0.55px] text-signoz_vanilla-100">
          {plan.title}
        </h3>
        <p className="m-0 mt-4 max-w-[420px] text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400">
          {plan.description}
        </p>

        <div className="mt-12 rounded-2xl border border-signoz_slate-400/35 bg-white/[0.035] p-6">
          <div className="flex items-end gap-2">
            <span className="text-[46px] font-medium leading-none tracking-[-1.3px] text-signoz_vanilla-100">
              {plan.price}
            </span>
            <span className="pb-1 text-[15px] leading-6 text-signoz_vanilla-400">
              {plan.priceSuffix}
            </span>
          </div>
        </div>
      </div>

      <ul className="m-0 mt-8 space-y-3 p-0">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-[15px] leading-6 text-signoz_vanilla-300"
          >
            <Check className="mt-1 h-4 w-4 shrink-0 text-signoz_robin-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function CompareCard({ card }: { card: CompareCard }) {
  return (
    <CustomLink
      className="group flex min-h-[190px] flex-col justify-between rounded-[18px] border border-signoz_slate-400/40 bg-signoz_ink-500/60 p-6 transition-colors hover:border-signoz_robin-400/50"
      href={card.href}
    >
      <div>
        <h3 className="m-0 text-[24px] font-medium leading-tight tracking-[-0.35px] text-signoz_vanilla-100">
          {card.title}
        </h3>
        <p className="m-0 mt-3 text-[15px] leading-6 tracking-[-0.1px] text-signoz_vanilla-400">
          {card.description}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400">
        Compare
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </CustomLink>
  )
}

export default function PricingExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-24 sm:px-6 lg:px-[78px] lg:py-32"
      data-homepage-floating-cta="View pricing"
      data-homepage-floating-href="/pricing/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="m-0 max-w-[680px] text-[42px] font-medium leading-[1.04] tracking-[-1.15px] text-signoz_vanilla-100 md:text-[64px] md:tracking-[-1.9px]">
              Pricing that stays predictable as you scale.
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="m-0 text-[17px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
              Send any mix of logs, traces, and metrics. Add teammates freely. Monitor autoscaling
              infrastructure without host-based surprises.
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

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr_1fr]">
          <div className="bg-signoz_ink-500/72 rounded-[22px] border border-signoz_slate-400/45 p-8">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-signoz_slate-400/40 bg-white/[0.04] text-signoz_vanilla-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="m-0 text-[28px] font-medium leading-tight tracking-[-0.5px] text-signoz_vanilla-100">
              No surprise bill mechanics.
            </h3>
            <div className="mt-8 space-y-4">
              {pricingPrinciples.map(({ Icon, description, title }) => (
                <div key={title} className="border-t border-signoz_slate-400/30 pt-4">
                  <div className="flex items-center gap-3 text-signoz_vanilla-100">
                    <Icon className="h-4 w-4 text-signoz_robin-400" />
                    <p className="m-0 text-base font-medium">{title}</p>
                  </div>
                  <p className="m-0 mt-2 text-sm leading-6 text-signoz_vanilla-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.title} plan={plan} />
          ))}
        </div>

        <div className="bg-signoz_ink-500/56 mt-6 rounded-[22px] border border-signoz_slate-400/40 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="m-0 text-[24px] font-medium leading-tight tracking-[-0.35px] text-signoz_vanilla-100">
              Estimate monthly usage before you commit.
            </h3>
            <p className="m-0 mt-3 max-w-[680px] text-[15px] leading-6 text-signoz_vanilla-400">
              Model logs, traces, and metrics retention against your expected volume on the pricing
              page.
            </p>
          </div>
          <CustomLink
            className="experiment-button experiment-button--secondary mt-6 inline-flex h-10 items-center justify-center gap-3 px-4 text-sm md:mt-0"
            href="/pricing/#estimate-your-monthly-bill"
          >
            Estimate your bill
            <ArrowUpRight className="h-4 w-4" />
          </CustomLink>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {compareCards.map((card) => (
            <CompareCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
