import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import Eyebrow from '@/components/homepage/Eyebrow'

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
    price: '$4,000/month',
  },
]

function GetStartedColumn({ option, index }: { option: GetStartedOption; index: number }) {
  return (
    <article className="rule-fade-x md:vrule-solid flex min-h-48 flex-col justify-between border-t border-[var(--l2-border)] py-7 md:min-h-56 md:border-t-0 md:px-12 md:py-8">
      <div className="max-w-sm">
        <h3 className="m-0 text-sm font-medium uppercase leading-5 tracking-widest text-[var(--l2-foreground)]">
          {option.title}
        </h3>
        <p className="m-0 mt-3 text-lg font-medium leading-7 tracking-normal text-[var(--l1-foreground)] md:text-xl md:leading-8">
          {option.description}
        </p>
      </div>

      <div>
        <p className="m-0 text-xs font-medium uppercase tracking-widest text-[var(--l2-foreground)]">
          {option.priceLabel}
        </p>
        <p className="m-0 mt-2 text-2xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] md:text-2xl">
          {option.price}
        </p>
      </div>
    </article>
  )
}

export default function HomepageGetStarted() {
  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 px-5 py-12 sm:px-6 sm:py-16 lg:px-20 lg:py-20 wide:max-w-8xl wide:px-0"
      data-homepage-floating-cta="Get started"
      data-homepage-floating-href="/teams/"
    >
      <div className="rule-fade-x mx-auto max-w-8xl border-y border-[var(--l2-border)]">
        <div className="grid gap-0 md:grid-cols-3">
          <div className="rule-fade-x flex min-h-48 flex-col items-start justify-between border-b border-[var(--l2-border)] py-7 md:min-h-56 md:border-b-0 md:py-8 md:pr-8">
            <div>
              <Eyebrow>Built for scale</Eyebrow>
              <h2 className="m-0 mt-3 max-w-xs text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl md:text-5xl">
                Get Started with SigNoz Cloud
              </h2>
            </div>
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Get Started Button"
              clickText="Get Started"
              clickLocation="Homepage Get Started Section"
              className="btn-tactile btn-tactile--primary mt-6 no-underline"
            >
              Get Started
              <ArrowRight size={12} aria-hidden="true" />
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
