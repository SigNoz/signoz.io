'use client'

import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import {
  HIGH_GROWTH_TEAMS_CARDS,
  NUMBERS_THAT_SPEAK_CARDS,
  TRUSTED_BY_LOGOS,
  OBSERVABILITY_LANDSCAPE_CARDS,
  GETTING_STARTED_CARDS,
} from './EnterprisePage.constants'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import { Card } from '@/components/ui/Card'

interface CTAButtonGroupProps {
  clickLocation: string
  bookDemoClickName: string
  startTrialClickName: string
}

const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  clickLocation,
  bookDemoClickName,
  startTrialClickName,
}) => (
  <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
    <Button
      asChild
      variant="default"
      rounded="full"
      className="flex-center flex !w-fit items-center gap-2"
    >
      <TrackingLink
        href="/contact-us/?source=why-signoz"
        clickType="Primary CTA"
        clickName={bookDemoClickName}
        clickLocation={clickLocation}
        clickText="Book a demo"
      >
        Book a demo
        <ArrowRight size={14} />
      </TrackingLink>
    </Button>
    <Button
      asChild
      variant="secondary"
      rounded="full"
      className="flex-center flex !w-fit items-center gap-2"
    >
      <TrackingLink
        href="/teams/"
        clickType="Secondary CTA"
        clickName={startTrialClickName}
        clickLocation={clickLocation}
        clickText="Get Started - Free"
      >
        Get Started - Free
        <ArrowRight size={14} />
      </TrackingLink>
    </Button>
  </div>
)

const Header: React.FC = () => {
  const enterpriseHeaderButtonGroup = (
    <CTAButtonGroup
      clickLocation="Why SigNoz Page Hero"
      bookDemoClickName="Why SigNoz Page Hero Book a demo"
      startTrialClickName="Why SigNoz Page Hero Start Trial"
    />
  )

  return (
    <FeaturePageHeader
      title={
        <>
          Enterprise observability, <br /> built for the AI era.
        </>
      }
      description={
        <>
          Logs, metrics, traces, and LLM observability unified in a single OpenTelemetry-native
          platform. <br className="hidden md:block" /> Built for engineering teams, from start up to
          scale. 100% Predictable & Transparent Pricing.
        </>
      }
      buttonGroup={enterpriseHeaderButtonGroup}
      sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-border max-md:-mb-[3rem]"
      heroImageAlt="Enterprise observability hero"
      heroImage="/img/platform/ClickStackAlternativeMeta.webp"
      buttonDescription={
        <div className="text-muted-foreground text-center text-sm">
          No sales deck. No 45-minute intro call. <br /> Engineers talk to engineers.
        </div>
      }
      className="mt-0"
    />
  )
}

const TrustedByTeams: React.FC = () => {
  return (
    <div className="max-w-8xl border-border relative mx-auto flex w-full flex-col items-center justify-center gap-10 overflow-hidden border !border-t-0 !border-b-1 border-dashed py-16">
      <div className="text-muted-foreground text-center text-sm font-semibold tracking-[0.05em] uppercase">
        Trusted by the <span className="text-foreground">best platform teams</span>
      </div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-10 px-4">
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div key={logo.alt} className="flex h-12 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={48}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <Button
          variant="secondary"
          rounded="full"
          className="mx-auto flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/case-study/"
            clickType="Secondary CTA"
            clickName="Observability for AI Native Companies Customer Stories Button"
            clickLocation="Observability for AI Native Companies Testimonials"
            clickText="Read customer stories"
          >
            <span>Read customer stories</span>
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    </div>
  )
}

const HighGrowthTeams: React.FC = () => {
  return (
    <section className="max-w-8xl border-border relative mx-auto w-full overflow-hidden border-t border-dashed pt-14">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <div className="text-l1-foreground dark:text-sienna-100 flex flex-col items-center gap-14 text-2xl leading-[3.25rem] font-medium">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-l1-foreground text-center text-4xl font-semibold">
              <span className="text-danger-foreground">#1</span> Observability Platform for{' '}
              <br className="hidden md:block" /> High-Growth Engineering Teams
            </h2>
            <div className="text-l1-foreground text-center text-base">
              Every signal type. One backend. Built on open standards.{' '}
              <br className="hidden md:block" /> Advanced observability for micro services to LLMs.
            </div>
          </div>
          <SectionLayout variant="no-border" className="!mx-auto !p-0">
            <IconTitleDescriptionCardGrid cards={HIGH_GROWTH_TEAMS_CARDS} variant="lg" />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const ObservabilityLandscape: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="flex flex-col items-center justify-center gap-10 !px-8 !py-20 md:!px-0"
    >
      <h2 className="text-l1-foreground mb-6 text-center text-4xl">
        Observability Landscape is changing. <br /> Are you Ready?
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-3">
        {OBSERVABILITY_LANDSCAPE_CARDS.map((card) => (
          <Card key={card.id} className="group h-full" variant="aqua">
            <div className="flex h-full flex-col items-start gap-4 px-8 py-6">
              <span className="inline-block bg-[linear-gradient(to_right,rgba(78,116,248)_50%,#ffffff_50%)] bg-[length:200%_100%] bg-clip-text bg-right text-transparent transition-[background-position] duration-300 ease-out group-hover:bg-left">
                {card.title}
              </span>
              {card.description && (
                <div className="text-muted-foreground m-0 w-full text-left text-xs">
                  {card.description}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </SectionLayout>
  )
}

const NumbersThatSpeak: React.FC = () => {
  return (
    <div className="border-border bg-background border-y-1 border-dashed py-12">
      <div className="mx-auto my-8 max-w-4xl p-6">
        <h2 className="text-l1-foreground my-4 text-center text-4xl font-semibold">
          Numbers that speak for themselves
        </h2>
      </div>

      <HeroCards
        cards={NUMBERS_THAT_SPEAK_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
        className="md:!px-24"
      />
    </div>
  )
}

const EnterpriseObservability: React.FC = () => {
  return (
    <SectionLayout
      variant="full-width"
      className="flex flex-col items-center justify-center gap-6 !px-8 !py-20 md:!px-0"
    >
      <h2 className="text-l1-foreground mx-auto mb-6 max-w-4xl text-center text-4xl font-semibold">
        Enterprise Observability that scales with you.
        <br />
        <span className="text-danger-foreground">No Pricing Shocks. Guaranteed.</span>
      </h2>
      <p className="text-l1-foreground mx-auto max-w-2xl text-center text-base">
        30 minutes with a SigNoz Observability Expert. We will show you what your stack looks like
        unified, and give you a predictable cost model you can trust from Day Zero.
      </p>
      <div className="flex flex-col items-center justify-center gap-4">
        <CTAButtonGroup
          clickLocation="Why SigNoz Page Enterprise Observability Section"
          bookDemoClickName="Why SigNoz Page Enterprise Observability Section Book a demo"
          startTrialClickName="Why SigNoz Page Enterprise Observability Section Start Trial"
        />
        <p className="text-muted-foreground text-center text-sm">
          No sales deck. No 45-minute intro call. <br /> Engineers talk to engineers.
        </p>
      </div>
    </SectionLayout>
  )
}

const GettingStarted: React.FC = () => {
  return (
    <SectionLayout
      variant="full-width"
      className="border-border flex flex-col items-center justify-center gap-10 border-y border-dashed !px-8 !py-20 md:!px-0"
    >
      <h2 className="text-l1-foreground mb-6 text-center text-4xl">Getting Started with SigNoz</h2>
      <IconTitleDescriptionCardGrid
        cards={GETTING_STARTED_CARDS}
        variant="lg"
        className="md:grid-cols-3"
      />
    </SectionLayout>
  )
}

const PricingToScale: React.FC = () => {
  return (
    <SectionLayout
      variant="full-width"
      className="flex flex-col items-center justify-center gap-10 !px-8 !py-20 md:!px-0"
    >
      <div>
        <h2 className="text-l1-foreground mb-4 text-center text-4xl">
          Pricing to scale your business, <br className="hidden md:block" /> not slow you down
        </h2>
        <p className="text-muted-foreground text-center text-base">
          We have 2 deployment options - Cloud and Self-Managed. <br className="hidden md:block" />{' '}
          Almost all our features are available on both. For more details, see below
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
        <Card variant={'gradient'}>
          <div className="m-6 flex flex-grow flex-col">
            <h3 className="text-l1-foreground text-2xl font-bold">Enterprise Cloud</h3>
            <p className="text-muted-foreground text-base">
              SigNoz hosts everything - ClickHouse cluster, the ingestion pipeline, the dashboards,
              the storage. You get zero ops overhead, SOC 2 / HIPAA compliance, and you're live in
              minutes.
            </p>
            <TrackingLink
              href="/pricing/#teams"
              clickType="Secondary CTA"
              clickName="Why SigNoz Page View Pricing Button"
              clickLocation="Why SigNoz Page Pricing Cloud Section"
              clickText="View Pricing"
            >
              <Button
                isButton
                variant="default"
                rounded="full"
                className="flex-center flex !w-fit items-center gap-2"
              >
                View Pricing
                <ArrowRight size={14} />
              </Button>
            </TrackingLink>
          </div>
        </Card>
        <Card variant={'gradient'}>
          <div className="m-6 flex flex-grow flex-col">
            <h3 className="text-l1-foreground text-2xl font-bold">Enterprise Self-Hosted / BYOC</h3>
            <p className="text-muted-foreground text-base">
              SigNoz deploys and manages the SigNoz stack inside your AWS/GCP/Azure account. You own
              the infrastructure, SigNoz operates it. Your data never leaves your VPC.
            </p>
            <TrackingLink
              href="/pricing/#enterprise"
              clickType="Secondary CTA"
              clickName="Why SigNoz Page View Pricing Button"
              clickLocation="Why SigNoz Page Pricing Self Hosted Section"
              clickText="View Pricing"
            >
              <Button
                isButton
                variant="default"
                rounded="full"
                className="flex-center flex !w-fit items-center gap-2"
              >
                View Pricing
                <ArrowRight size={14} />
              </Button>
            </TrackingLink>
          </div>
        </Card>
      </div>
    </SectionLayout>
  )
}

const EnterpriseDemoPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <Header />
      <TrustedByTeams />
      <ObservabilityLandscape />

      <SectionLayout variant="bordered" className="!px-0">
        <HighGrowthTeams />

        <div className="flex flex-col items-center justify-center gap-6 pt-12">
          <h2 className="text-l1-foreground mb-6 text-center text-4xl">
            What our Customers have to say
          </h2>
          <CustomerStoriesSection
            tracking={{
              clickName: 'Why SigNoz Page Customer Stories Button',
              clickLocation: 'Why SigNoz Page Testimonials',
            }}
            showOverlay={false}
            showFeaturedCaseStudy={false}
          />
        </div>
        <PricingToScale />

        <GettingStarted />

        <NumbersThatSpeak />
        <EnterpriseObservability />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default EnterpriseDemoPage
