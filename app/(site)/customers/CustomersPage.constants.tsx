import type { CustomerMetric, CustomersHeroCta } from '@/components/Customers/CustomersHero'

export const HERO_TITLE = (
  <>
    Meet the teams
    <br />
    using SigNoz Cloud
    <br />
    <span className="text-[var(--l2-foreground)]">in production.</span>
  </>
)

export const HERO_METRICS: CustomerMetric[] = [
  {
    value: 'Up to 80%',
    label: 'savings on your Datadog bill',
  },
  {
    value: '10 TB+/day',
    label: 'daily ingest for one deployment',
  },
  {
    value: '10K+',
    label: 'of engineering teams in production',
  },
]

export const HERO_CTAS: CustomersHeroCta[] = [
  {
    label: 'Get started free',
    href: '/teams/',
    clickName: 'Sign Up Button',
    variant: 'default',
  },
  {
    label: 'Contact us',
    href: '/contact-us/?source=customers',
    clickName: 'Contact Us Button',
    variant: 'secondary',
  },
]

export const STORIES_HEADING = {
  primary: 'Stories from teams running SigNoz in production',
  secondary: 'Learn how engineering teams instrument, investigate, migrate, and scale with SigNoz.',
}

export const PROOF_HEADING = {
  primary: '10K+ engineering teams. One observability platform.',
  secondary:
    'From tool consolidation and self-hosting to agent workflows and production-scale debugging.',
}
