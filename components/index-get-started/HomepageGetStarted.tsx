'use client'

import CustomLink from '@/components/Link'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'

type GetStartedOption = {
  description: string
  price: string
  priceLabel: string
  title: string
}

const getStartedOptions: GetStartedOption[] = [
  {
    title: 'Teams',
    description: 'For fast-scaling teams that need observability to scale with them.',
    priceLabel: 'Starts from',
    price: '$49/month',
  },
  {
    title: 'Enterprise',
    description: 'For larger orgs that need data residency, compliance, and support.',
    priceLabel: 'Starts from',
    price: '$4000/month',
  },
]

function GetStartedColumn({ option, index }: { option: GetStartedOption; index: number }) {
  return (
    <article
      className={`flex min-h-[188px] flex-col justify-between border-t border-signoz_slate-400/35 py-7 md:min-h-[220px] md:border-t-0 md:px-12 md:py-8 ${
        index === 0 ? 'md:border-x' : ''
      }`}
    >
      <div className="max-w-[330px]">
        <h3 className="m-0 text-sm leading-5 text-signoz_vanilla-400">{option.title}</h3>
        <p className="m-0 mt-3 text-[18px] font-medium leading-7 tracking-[-0.15px] text-signoz_vanilla-100 md:text-xl md:leading-8 md:tracking-[-0.2px]">
          {option.description}
        </p>
      </div>

      <div>
        <p className="m-0 text-[12px] font-medium uppercase tracking-[0.14em] text-signoz_robin-400">
          {option.priceLabel}
        </p>
        <p className="m-0 mt-2 text-[22px] font-medium leading-none tracking-[-0.35px] text-signoz_vanilla-100 md:text-[24px] md:tracking-[-0.45px]">
          {option.price}
        </p>
      </div>
    </article>
  )
}

export default function HomepageGetStarted() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-12 sm:px-6 sm:py-16 lg:px-[78px] lg:py-20"
      data-homepage-floating-cta="Get started"
      data-homepage-floating-href="/teams/"
    >
      <div className="mx-auto max-w-[1200px] border-y border-signoz_slate-400/35">
        <div className="grid gap-0 md:grid-cols-[0.82fr_1fr_1fr]">
          <div className="flex min-h-[190px] flex-col items-start justify-between border-b border-signoz_slate-400/35 py-7 md:min-h-[220px] md:border-b-0 md:py-8 md:pr-8">
            <div>
              <h2 className="m-0 max-w-[310px] text-[32px] font-medium leading-[1.08] tracking-[-0.65px] text-signoz_vanilla-100 sm:text-[38px] sm:tracking-[-0.95px] md:text-[44px] md:tracking-[-1.15px]">
                Get started with SigNoz.
              </h2>
            </div>
            <TrackingLink
              href="/pricing/"
              clickType="Primary CTA"
              clickName="Compare Plans Button"
              clickText="Compare plans"
              clickLocation="Homepage Get Started Section"
              className="block w-fit"
            >
              <Button as="span">Compare plans</Button>
            </TrackingLink>
          </div>

          {getStartedOptions.map((option, index) => (
            <GetStartedColumn key={option.title} index={index} option={option} />
          ))}
        </div>
      </div>
    </section>
  )
}
