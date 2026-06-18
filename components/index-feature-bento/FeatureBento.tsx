'use client'

import Image from 'next/image'

import CustomLink from '@/components/Link'
import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

type BentoFeature = {
  description: string
  href: string
  layout: string
  outcome: string
  product: string
  texturePosition: string
  visual?: 'apm-browser'
}

const features: BentoFeature[] = [
  {
    product: 'APM.',
    outcome: 'P99, Apdex, database calls, and external calls per service.',
    description:
      'Monitor RED metrics, Apdex, database calls, and external calls from trace-derived service views.',
    href: '/application-performance-monitoring/',
    layout: 'md:col-span-4 md:col-start-1 md:row-span-1 md:row-start-1',
    texturePosition: 'object-left-top',
    visual: 'apm-browser',
  },
  {
    product: 'Logs.',
    outcome: 'Columnar database search with trace correlation built in.',
    description:
      'Search logs in a columnar database, parse attributes, and use trace IDs to move between logs and traces.',
    href: '/log-management/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1',
    texturePosition: 'object-right-top',
  },
  {
    product: 'Tracing.',
    outcome: 'Load and analyze traces with up to a million spans.',
    description:
      'Use flamegraphs, waterfalls, filters, and span aggregates to isolate slow work across high-volume traces.',
    href: '/distributed-tracing/',
    layout: 'md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-2',
    texturePosition: 'object-left-bottom',
  },
  {
    product: 'Alerts.',
    outcome: 'Threshold, anomaly, and Apdex alerts on any telemetry signal.',
    description:
      'Create threshold, anomaly, Apdex, metric, log, or trace alerts and tune them with alert history.',
    href: '/alerts-management/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-2',
    texturePosition: 'object-center',
  },
  {
    product: 'LLM Observability.',
    outcome: 'OpenAI, Azure OpenAI, Gemini, OpenRouter, LiteLLM, and agent telemetry.',
    description:
      'Monitor LiteLLM, OpenRouter, Azure OpenAI, Gemini, Hermes, and other AI workflows through OpenTelemetry.',
    href: '/llm-observability/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-3',
    texturePosition: 'object-right-bottom',
  },
  {
    product: 'Infra Monitoring.',
    outcome: 'Kubernetes, hosts, and cloud metrics next to every service.',
    description:
      'Bring host, Kubernetes, and cloud resource metrics into the same view as application signals.',
    href: '/docs/infrastructure-monitoring/overview/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-2',
    texturePosition: 'object-center',
  },
  {
    product: 'Dashboards.',
    outcome: 'Reusable templates for services, infra, cloud, databases, and LLM usage.',
    description:
      'Start from templates or build custom views for services, infra, cloud, databases, and LLM usage.',
    href: '/metrics-and-dashboards/',
    layout: 'md:col-span-6 md:col-start-1 md:row-span-1 md:row-start-4',
    texturePosition: 'object-left-bottom',
  },
]

function ApmBrowserShell() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-24px] left-[20%] hidden h-[500px] w-[720px] overflow-hidden rounded-t-[4px] border border-signoz_slate-100 bg-signoz_slate-300 shadow-[0_26px_80px_rgba(0,0,0,0.24)] md:block lg:bottom-[-28px] lg:left-[20%] lg:h-[520px] lg:w-[760px]"
    >
      <div className="flex h-14 items-center gap-5 bg-signoz_slate-300 px-7">
        <div className="flex gap-[7px]">
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
          <span className="h-3 w-3 rounded-full bg-signoz_slate-50/45" />
        </div>
        <div className="ml-auto flex h-[34px] w-[420px] items-center justify-center rounded-[18px] border border-signoz_slate-100 bg-signoz_slate-200 text-[13px] font-medium leading-none text-signoz_vanilla-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          olly.us.signoz.cloud/services/cartservice/
        </div>
      </div>

      <div className="relative ml-1.5 h-[calc(100%-56px)] w-[calc(100%-6px)] overflow-hidden rounded-[8px] bg-[#070b12]">
        <Image
          alt=""
          className="h-full w-full rounded-[8px] object-cover object-left-top"
          height={462}
          src="/img/graphics/homepage/apm-browser-overview.png"
          width={758}
        />
      </div>
    </div>
  )
}

function FeatureCard({ feature }: { feature: BentoFeature }) {
  return (
    <CustomLink
      aria-label={`${feature.product} ${feature.outcome}`}
      className={`relative flex min-h-[430px] flex-col overflow-hidden rounded-[6px] border border-signoz_slate-400/25 bg-[#07090d] no-underline transition-[transform,border-color] duration-300 ease-out hover:scale-[1.012] hover:border-signoz_slate-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500/70 md:min-h-0 ${feature.layout}`}
      href={feature.href}
    >
      <Image
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.28] mix-blend-screen ${feature.texturePosition}`}
        height={574}
        src="/img/graphics/homepage/bento-purple-texture.png"
        width={1020}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(7,9,13,0.12),rgba(7,9,13,0.82)_78%)]" />
      <div className="p-5 sm:p-6 lg:p-7">
        <h3 className="m-0 max-w-[720px] text-[22px] font-light leading-[1.12] tracking-[-0.22px] text-signoz_vanilla-100 sm:text-[24px] md:text-[26px] md:tracking-[-0.26px]">
          <span className="text-signoz_vanilla-100">{feature.product}</span>{' '}
          <span className="text-signoz_vanilla-400/70">{feature.outcome}</span>
        </h3>
      </div>
      {feature.visual === 'apm-browser' ? <ApmBrowserShell /> : null}
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

export default function FeatureBento() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-[78px] lg:py-32"
      data-homepage-feature-bento
    >
      <div className="mx-auto max-w-[1245px]">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[1740px] sm:left-6 sm:right-6 lg:left-[78px] lg:right-[78px] lg:top-32"
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

        <div className="relative mx-auto w-full max-w-[1245px]">
          <div className="relative">
            <div className="grid gap-2 md:grid-cols-6 md:grid-rows-[686px_342px_342px_456px] lg:gap-[6px]">
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
