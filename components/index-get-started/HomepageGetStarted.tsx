'use client'

import Button from '@/components/ui/Button'
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
      className={`flex min-h-48 flex-col justify-between border-t border-signoz_slate-400/35 py-7 md:min-h-56 md:border-t-0 md:px-12 md:py-8 ${
        index === 0 ? 'md:border-x' : ''
      }`}
    >
      <div className="max-w-sm">
        <h3 className="m-0 text-sm leading-5 text-signoz_vanilla-400">{option.title}</h3>
        <p className="m-0 mt-3 text-lg font-medium leading-7 tracking-normal text-signoz_vanilla-100 md:text-xl md:leading-8">
          {option.description}
        </p>
      </div>

      <div>
        <p className="m-0 text-xs font-medium uppercase tracking-widest text-signoz_robin-400">
          {option.priceLabel}
        </p>
        <p className="m-0 mt-2 text-2xl font-medium leading-none tracking-tight text-signoz_vanilla-100 md:text-2xl">
          {option.price}
        </p>
      </div>
    </article>
  )
}

export default function HomepageGetStarted() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-12 sm:px-6 sm:py-16 lg:px-20 lg:py-20 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="Get started"
      data-homepage-floating-href="/teams/"
    >
      <div className="mx-auto max-w-8xl border-y border-signoz_slate-400/35">
        <div className="grid gap-0 md:grid-cols-3">
          <div className="flex min-h-48 flex-col items-start justify-between border-b border-signoz_slate-400/35 py-7 md:min-h-56 md:border-b-0 md:py-8 md:pr-8">
            <div>
              <h2 className="m-0 max-w-xs text-3xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-4xl md:text-5xl">
                Get started with SigNoz Cloud.
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
              <Button as="span" variant="legacyPrimary" withIcon>
                Compare plans
              </Button>
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
