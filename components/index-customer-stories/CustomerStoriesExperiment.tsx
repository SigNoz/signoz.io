'use client'

import Image from 'next/image'

import CustomLink from '@/components/Link'

type CustomerStory = {
  description: string
  href: string
  logoAlt: string
  logoClassName?: string
  logoSrc: string
  metric: string
  title: string
}

const customerStories: CustomerStory[] = [
  {
    title: 'Kernel',
    description:
      'Uses SigNoz MCP and OpenTelemetry-native observability to debug AI agent browser infrastructure and triage HTTP 502 errors faster.',
    href: '/case-study/kernel/',
    logoAlt: 'Kernel logo',
    logoSrc: '/img/case_study/logos/kernel-logo.svg',
    metric: '140ms to 30ms browser acquisition',
  },
  {
    title: 'Shaped AI',
    description:
      'Consolidated CloudWatch and Honeycomb into SigNoz so engineers can investigate logs, metrics, and traces in one place.',
    href: '/case-study/shaped/',
    logoAlt: 'Shaped AI logo',
    logoSrc: '/img/case_study/logos/shaped-logo.svg',
    metric: 'One-stop observability',
  },
  {
    title: 'Mailmodo',
    description:
      'Centralized 200GB+ daily logs from 200+ microservices so support teams could investigate customer issues without waiting on engineering.',
    href: '/case-study/mailmodo/',
    logoAlt: 'Mailmodo logo',
    logoSrc: '/img/case_study/mailmodo-logo-white.svg',
    metric: '6 hours saved daily',
  },
]

function StoryColumn({ story }: { story: CustomerStory }) {
  return (
    <article className="flex min-h-[320px] flex-col border-l border-signoz_slate-400/25 px-8 py-1 md:px-10 lg:px-12">
      <div>
        <div className="mb-10 flex h-[72px] items-center">
          <Image
            alt={story.logoAlt}
            className={`w-auto object-contain opacity-95 ${story.logoClassName ?? 'max-h-12 max-w-[150px]'}`}
            height={64}
            src={story.logoSrc}
            width={170}
          />
        </div>

        <p className="m-0 mb-5 text-[12px] font-medium uppercase tracking-[0.14em] text-signoz_robin-400">
          {story.metric}
        </p>
        <p className="m-0 max-w-[340px] text-[20px] font-normal leading-[1.42] tracking-[-0.3px] text-signoz_vanilla-100">
          {story.description}
        </p>
      </div>

      <div className="mt-auto pt-10">
        <CustomLink
          className="inline-flex h-9 shrink-0 items-center rounded-md border border-signoz_slate-400/35 px-3.5 text-sm font-medium text-signoz_vanilla-300 transition-colors hover:border-signoz_robin-400/55 hover:text-signoz_vanilla-100"
          href={story.href}
        >
          Read case study
        </CustomLink>
      </div>
    </article>
  )
}

export default function CustomerStoriesExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-24 sm:px-6 lg:px-[78px] lg:py-32"
      data-homepage-floating-cta="Read customer stories"
      data-homepage-floating-href="/case-study/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="m-0 max-w-[760px] text-[40px] font-medium leading-[1.04] tracking-[-1.1px] text-signoz_vanilla-100 md:text-[58px] md:tracking-[-1.65px]">
              Production stories from teams running SigNoz.
            </h2>
          </div>

          <div className="max-w-[430px]">
            <p className="m-0 text-[17px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
              See how engineering teams use SigNoz to debug faster, reduce tool sprawl, and keep
              production reliable.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3">
              <CustomLink
                className="group inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
                href="/case-study/"
              >
                Read customer stories
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  -&gt;
                </span>
              </CustomLink>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-y-12 md:grid-cols-3">
            {customerStories.map((story) => (
              <StoryColumn key={story.title} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
