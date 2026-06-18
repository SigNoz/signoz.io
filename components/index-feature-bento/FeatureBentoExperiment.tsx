'use client'

import Image from 'next/image'

import CustomLink from '@/components/Link'
import featureGraphic3 from '@/public/img/graphics/homepage/feature-graphic-3.svg?url'
import featureGraphic4 from '@/public/img/graphics/homepage/feature-graphic-4.svg?url'
import featureGraphic5 from '@/public/img/graphics/homepage/feature-graphic-5.svg?url'
import featureGraphic6 from '@/public/img/graphics/homepage/feature-graphic-6.svg?url'
import featureGraphic8 from '@/public/img/graphics/homepage/feature-graphic-8.svg?url'
import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

type BentoFeature = {
  description: string
  graphic: string
  href: string
  imageClassName?: string
  outcome: string
  pan?: 'left' | 'right' | 'up'
  product: string
  size?: 'large' | 'wide'
  visual?: 'tall'
}

const features: BentoFeature[] = [
  {
    product: 'APM.',
    outcome: 'P99, Apdex, database calls, and external calls per service.',
    description:
      'Monitor RED metrics, Apdex, database calls, and external calls from trace-derived service views.',
    graphic: '/img/graphics/homepage/apm-feature-bento-crop.png',
    href: '/application-performance-monitoring/',
    pan: 'right',
    size: 'large',
    visual: 'tall',
  },
  {
    product: 'Logs.',
    outcome: 'Columnar database search with trace correlation built in.',
    description:
      'Search logs in a columnar database, parse attributes, and use trace IDs to move between logs and traces.',
    graphic: featureGraphic4,
    href: '/log-management/',
    pan: 'right',
    visual: 'tall',
  },
  {
    product: 'Tracing.',
    outcome: 'Load and analyze traces with up to a million spans.',
    description:
      'Use flamegraphs, waterfalls, filters, and span aggregates to isolate slow work across high-volume traces.',
    graphic: featureGraphic3,
    href: '/distributed-tracing/',
    pan: 'right',
  },
  {
    product: 'Infra Monitoring.',
    outcome: 'Kubernetes, hosts, and cloud metrics next to every service.',
    description:
      'Bring host, Kubernetes, and cloud resource metrics into the same view as application signals.',
    graphic: featureGraphic6,
    href: '/docs/infrastructure-monitoring/overview/',
    pan: 'up',
  },
  {
    product: 'Alerts.',
    outcome: 'Threshold, anomaly, and Apdex alerts on any telemetry signal.',
    description:
      'Create threshold, anomaly, Apdex, metric, log, or trace alerts and tune them with alert history.',
    graphic: featureGraphic5,
    href: '/alerts-management/',
    pan: 'left',
  },
  {
    product: 'LLM Observability.',
    outcome: 'OpenAI, Azure OpenAI, Gemini, OpenRouter, LiteLLM, and agent telemetry.',
    description:
      'Monitor LiteLLM, OpenRouter, Azure OpenAI, Gemini, Hermes, and other AI workflows through OpenTelemetry.',
    graphic: featureGraphic8,
    href: '/llm-observability/',
    pan: 'right',
  },
  {
    product: 'Dashboards.',
    outcome: 'Reusable templates for services, infra, cloud, databases, and LLM usage.',
    description:
      'Start from templates or build custom views for services, infra, cloud, databases, and LLM usage.',
    graphic: '/img/graphics/homepage/dashboard-feature-bento-crop.png',
    href: '/metrics-and-dashboards/',
    pan: 'up',
    size: 'wide',
  },
]

function FeatureCard({ feature }: { feature: BentoFeature }) {
  const isWideCard = feature.size === 'large' || feature.size === 'wide'
  const imageWellClassName =
    feature.visual === 'tall'
      ? 'h-[176px] sm:h-[238px] lg:h-[284px]'
      : 'h-[176px] sm:h-[184px] lg:h-[214px]'

  const panClassName =
    feature.pan === 'left'
      ? 'translate-x-[-4%] group-hover:translate-x-0'
      : feature.pan === 'up'
        ? 'translate-y-[4%] group-hover:translate-y-0'
        : 'translate-x-[4%] group-hover:translate-x-0'

  return (
    <CustomLink
      aria-label={`${feature.product} ${feature.outcome}`}
      className={`group relative flex min-h-[276px] w-[82vw] max-w-[360px] shrink-0 snap-start flex-col justify-between overflow-hidden border border-signoz_slate-400/20 bg-[#07090d] no-underline transition-colors [--box-padding:16px] focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500/70 sm:min-h-[326px] sm:w-[76vw] sm:max-w-[420px] md:w-auto md:max-w-none md:shrink ${
        isWideCard ? 'md:col-span-2 md:min-h-0' : 'md:col-span-1 md:min-h-0'
      }`}
      href={feature.href}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_32%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_-18%,rgba(99,144,255,0.26),transparent_42%)] opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100" />
      <div className="pointer-events-none absolute -left-1/3 top-0 z-[2] hidden h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100 sm:block" />
      <div
        className={`relative z-[3] flex shrink-0 items-center justify-center overflow-hidden ${imageWellClassName}`}
      >
        <Image
          alt=""
          className={`h-[106%] max-h-none w-[106%] max-w-none object-cover opacity-[0.56] transition duration-500 ease-out group-hover:scale-[1.015] group-hover:opacity-[0.72] sm:h-[112%] sm:w-[112%] sm:opacity-[0.42] ${
            feature.imageClassName ?? 'object-center'
          } ${panClassName}`}
          height={feature.visual === 'tall' ? 330 : 260}
          sizes={
            isWideCard
              ? '(min-width: 1024px) 760px, calc(100vw - 48px)'
              : '(min-width: 1024px) 360px, calc(100vw - 48px)'
          }
          src={feature.graphic}
          width={isWideCard ? 760 : 360}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-signoz_ink-500 to-transparent" />
      </div>

      <div className="relative z-[3] flex min-h-[100px] items-start p-4 sm:min-h-[104px] md:p-6 lg:min-h-[116px]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-signoz_slate-400/25" />
        <h3 className="m-0 max-w-[720px] text-[18px] font-medium leading-[1.22] tracking-[-0.2px] sm:text-[20px] md:text-[22px] md:tracking-[-0.35px] lg:leading-[1.18]">
          <span className="text-signoz_vanilla-100">{feature.product}</span>{' '}
          <span className="text-signoz_vanilla-400/70">{feature.outcome}</span>
        </h3>
      </div>
    </CustomLink>
  )
}

function EnterpriseReadyStrip() {
  const compliances = [
    {
      Logo: Soc2Logo,
      label: 'SOC 2 Type II',
      description: 'Controls and operational safeguards for security-conscious teams.',
    },
    {
      Logo: HipaaLogo,
      label: 'HIPAA',
      description: 'Protected health information can be handled with the right safeguards.',
    },
  ]

  return (
    <div className="mt-14 border-y border-signoz_slate-400/35 md:mt-20">
      <div className="grid gap-0 md:grid-cols-[0.82fr_1fr_1fr]">
        <div className="flex items-center border-b border-signoz_slate-400/35 py-8 md:border-b-0 md:pr-8">
          <div>
            <p className="m-0 text-sm font-medium uppercase tracking-[0.14em] text-signoz_robin-400">
              Enterprise ready
            </p>
            <h3 className="m-0 mt-3 max-w-[300px] text-[24px] font-medium leading-tight tracking-[-0.35px] text-signoz_vanilla-100 md:max-w-[280px] md:text-[28px] md:tracking-[-0.5px]">
              Compliance posture for serious production teams.
            </h3>
          </div>
        </div>

        {compliances.map(({ Logo, description, label }, index) => (
          <div
            key={label}
            className={`flex min-h-[180px] flex-col justify-between border-t border-signoz_slate-400/35 py-7 md:min-h-[220px] md:border-t-0 md:px-12 ${
              index === 0 ? 'md:border-x' : ''
            } border-signoz_slate-400/35`}
          >
            <Logo className="h-12 w-auto opacity-70" />
            <div>
              <p className="m-0 text-sm leading-5 text-signoz_vanilla-400">{label} compliance</p>
              <p className="m-0 mt-3 max-w-[320px] text-[18px] font-medium leading-7 tracking-[-0.15px] text-signoz_vanilla-100 md:text-xl md:leading-8 md:tracking-[-0.2px]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeatureBentoExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32"
      data-homepage-feature-bento
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          className="absolute left-4 right-4 top-24 h-[720px] sm:left-6 sm:right-6 lg:left-[78px] lg:right-[78px] lg:top-32"
          data-homepage-floating-cta="Explore docs"
          data-homepage-floating-href="/docs/introduction/"
          aria-hidden="true"
        />

        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <h2 className="m-0 max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[40px] sm:leading-[1.04] sm:tracking-[-1.1px] md:text-[58px] md:tracking-[-1.65px]">
              Everything your team needs to investigate production.
            </h2>
          </div>
          <div className="max-w-[430px]">
            <p className="m-0 text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400 sm:text-[17px] sm:leading-8 sm:tracking-[-0.2px]">
              Move from symptoms to evidence across APM, logs, traces, infra, LLM telemetry, alerts,
              and dashboards.
            </p>
            <CustomLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/docs/introduction/"
            >
              Explore docs
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </CustomLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1200px]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              <div
                className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
                style={{ left: 'calc(33.333333% - 6.333px)' }}
              />
              <div
                className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
                style={{ left: 'calc(33.333333% - 0.333px)' }}
              />
              <div
                className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
                style={{ left: 'calc(66.666667% + 0.333px)' }}
              />
              <div
                className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
                style={{ left: 'calc(66.666667% + 6.333px)' }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-signoz_slate-400/30"
                style={{ top: 'calc(400px + 7px)' }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-signoz_slate-400/30"
                style={{ top: 'calc(400px + 13px)' }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-signoz_slate-400/30"
                style={{ top: 'calc(400px + 20px + 334px + 7px)' }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-signoz_slate-400/30"
                style={{ top: 'calc(400px + 20px + 334px + 13px)' }}
              />
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-6 sm:gap-4 sm:px-6 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:grid-rows-[344px_288px_288px] md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scrollbar-width:auto] lg:grid-rows-[400px_334px_334px] [&::-webkit-scrollbar]:hidden">
              {features.map((feature) => (
                <FeatureCard key={feature.product} feature={feature} />
              ))}
            </div>
          </div>
        </div>

        <EnterpriseReadyStrip />
      </div>
    </section>
  )
}
