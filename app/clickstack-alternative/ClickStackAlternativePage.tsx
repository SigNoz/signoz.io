'use client'

import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import {
  CLICKSTACK_BILLING_CARDS,
  VENDORS,
  CLICKSTACK_COMPARISON_TABLE_ROWS,
  DASHBOARD_HELP_YOU_INVESTIGATE_CARDS,
  ALERTING_ABOVE_HISTORY_CARDS,
  ALERTING_BELOW_HISTORY_CARDS,
  QUERY_YOUR_DATA_CARDS,
} from './ClickStackAlternativePage.constants'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import Link from 'next/link'

const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'ClickStack Alternative Hero Start Trial',
        clickLocation: 'ClickStack Alternative Hero',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'ClickStack Alternative Hero Docs',
        clickLocation: 'ClickStack Alternative Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={'ClickStack/HyperDX Alternative'}
      description={
        <>
          SigNoz gives you interactive dashboards, anomaly detection-based alerting, and PromQL{' '}
          <br className="hidden md:block" /> support. You're billed on how much data you ingest, not
          how often you query it.
        </>
      }
      buttons={headerButtons}
      sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
      heroImageAlt="ClickStack/HyperDX Alternative hero"
      heroImage="/img/platform/ClickStackAlternativeMeta.webp"
    />
  )
}

const QuickEvaluation: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-b-1 relative mx-auto w-[100vw] overflow-hidden border !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]"
    >
      <div className="relative flex flex-col gap-6 pt-32 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-12 text-2xl leading-[3.25rem]">
            <h2 className="my-6 text-center text-4xl font-semibold text-signoz_sakura-100">
              A Quick Evaluation
            </h2>
            <SectionLayout
              variant="no-border"
              className="!mx-auto flex items-center justify-center"
            >
              <ComparisonTable
                vendors={VENDORS}
                rows={CLICKSTACK_COMPARISON_TABLE_ROWS}
                className="[&_td]:text-center [&_td_span]:justify-center [&_th]:text-center"
              />
            </SectionLayout>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

const CostComparison: React.FC = () => {
  return (
    <>
      <SectionLayout
        variant="bordered"
        className="!border-b-1 !border-t-1 flex flex-col gap-y-9 border-dashed border-signoz_slate-400 !px-0"
      >
        <div className="flex flex-col gap-4 px-10 py-12 md:px-12">
          <h2 className="text-5xl font-normal text-signoz_vanilla-300">Pricing</h2>
          <h4 className="m-0 text-xl font-bold text-signoz_vanilla-100">
            You shouldn't pay to investigate your own data
          </h4>
          <div className="text-sm text-signoz_vanilla-400">
            ClickStack bills across 4 separate dimensions, only two of which have published rates.
            SigNoz charges $0.30/GB for logs and traces, $0.10 per million metric samples. Querying
            is free.
          </div>
        </div>
        <div className="border-t-1 flex flex-col border-dashed border-signoz_slate-400 sm:flex-row">
          <div className="!w-[100%] flex-1 md:!w-[300px] md:min-w-fit">
            <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start gap-4 px-10 py-10 md:px-0 md:pl-12">
              <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
                ClickStack's <br className="hidden md:block" /> billing{' '}
                <br className="hidden md:block" /> complexity
              </h2>
              <Button asChild variant="secondary" rounded="full">
                <TrackingLink
                  href="/blog/clickstack-managed-pricing-compute-costs/"
                  clickType="Secondary CTA"
                  clickName="ClickStack Alternative Cost Comparison ClickStack Pricing Details Button"
                  clickLocation="ClickStack Alternative Cost Comparison"
                  clickText="ClickStack pricing details"
                >
                  ClickStack pricing details <ArrowRight size={16} />
                </TrackingLink>
              </Button>
            </div>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
              <div className="flex flex-col gap-4 px-10 py-10">
                {CLICKSTACK_BILLING_CARDS.map((card) => (
                  <Card
                    key={card.title}
                    className="rounded-md p-0 [&>*]:rounded-md [&>*]:border-solid [&>*]:border-signoz_slate-500"
                  >
                    <div className="p-6">
                      <h4 className="mb-2 font-semibold text-signoz_vanilla-100">{card.title}</h4>
                      <p className="m-0 text-sm text-signoz_vanilla-400">{card.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

const DashboardsThatHelpYouInvestigate: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-4xl font-semibold text-signoz_sakura-100">
              Dashboards That Help You Investigate
            </h2>
            <div className="text-center text-base text-signoz_vanilla-100">
              ClickStack gives you views. SigNoz gives you the ability to move from a dashboard
              panel into <br className="hidden md:block" /> the exact logs and traces behind it,
              with all your filters intact.
            </div>
          </div>
          <SectionLayout
            variant="no-border"
            className="!mx-auto flex items-center justify-center !p-0"
          >
            <IconTitleDescriptionCardGrid
              cards={DASHBOARD_HELP_YOU_INVESTIGATE_CARDS}
              variant="lg"
            />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const AlertingThatTellsYouWhatMatters: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-4xl font-semibold text-signoz_sakura-100">
              Alerting That Tells You What Matters
            </h2>
            <div className="text-center text-base text-signoz_vanilla-100">
              SigNoz gives you a dedicated alerts workflow with anomaly detection, multi-threshold
              rules, and <br className="hidden md:block" /> full alert history. ClickStack is
              limited to creating alerts from search or dashboard context only.
            </div>
          </div>
          <SectionLayout variant="no-border" className="!mx-auto !p-0">
            <IconTitleDescriptionCardGrid cards={ALERTING_ABOVE_HISTORY_CARDS} variant="lg" />
            <div className="flex flex-col items-start gap-4 border-dashed border-signoz_slate-400 px-8 py-6 text-left">
              <h4 className="m-0 p-0 font-semibold text-signoz_vanilla-100">Alert history</h4>
              <p className="m-0 p-0 text-sm text-signoz_vanilla-400">
                SigNoz maintains a full alert history with attribute breakdowns. You can see which
                specific attribute values, like a service name or a Kubernetes pod, contributed most
                to triggering an alert over time.
              </p>
              <p className="m-0 p-0 text-sm text-signoz_vanilla-400">
                ClickStack <span className="text-signoz_cherry-300">does not maintain</span> alert
                history.
              </p>
              <Image
                src="/img/clickstack-alternative/alert-history.webp"
                alt="Alert history"
                width={1200}
                height={675}
                className="rounded-md"
              />
            </div>
            <IconTitleDescriptionCardGrid cards={ALERTING_BELOW_HISTORY_CARDS} variant="lg" />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const BetterChoiceBanner: React.FC = () => {
  const betterChoiceButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'ClickStack Alternative Better Choice Banner Start Trial',
        clickLocation: 'ClickStack Alternative Better Choice Banner',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/introduction/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'ClickStack Alternative Better Choice Banner Read Documentation',
        clickLocation: 'ClickStack Alternative Better Choice Banner',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <SectionLayout variant="bordered" className="flex flex-col items-center justify-center !py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        ClickStack or HyperDX? <br />
        Either way, SigNoz is the better choice.
      </h2>
      <ButtonGroup buttons={betterChoiceButtons} />
    </SectionLayout>
  )
}

const QueryYourData: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
      <div className="mx-auto my-8 max-w-4xl p-6">
        <h2 className="my-4 text-center text-4xl font-semibold text-signoz_sakura-100">
          Query Your Data, Any Way You Want
        </h2>
        <p className="mb-8 text-center leading-relaxed text-signoz_vanilla-100">
          SigNoz supports PromQL, a visual query builder, and SQL across logs, traces, and metrics.{' '}
          <br className="hidden md:block" />
          ClickStack supports Lucene search and SQL only.
        </p>
      </div>

      <Image
        src="/img/log-management/logs-explorer-qb.png"
        alt="Query Builder"
        width={1200}
        height={675}
        className="mb-8 p-6"
      />

      <HeroCards
        cards={QUERY_YOUR_DATA_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
        className="px-6"
      />
    </div>
  )
}

const ClickStackAlternativePage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <QuickEvaluation />
        <DashboardsThatHelpYouInvestigate />
        <AlertingThatTellsYouWhatMatters />
        <QueryYourData />
        <CostComparison />
      </SectionLayout>

      <UsageBasedPricing
        show={['traces', 'metrics', 'logs']}
        sectionTitle=""
        sectionDescription={
          <>
            <p>
              SigNoz eliminates query costs, dashboard fees, and API charges. Pay only for data
              volume ingested.
            </p>
            <p>
              Use the calculator below to estimate costs, then track actual usage with{' '}
              <Link
                href="/docs/cost-meter/overview/"
                className="font-semibold text-signoz_robin-500 underline decoration-signoz_robin-500 underline-offset-2"
              >
                Cost Meter
              </Link>{' '}
              to catch unexpected bursts before they impact your bill.
            </p>
          </>
        }
      />
      <BetterChoiceBanner />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'ClickStack Alternative Customer Stories Button',
          clickLocation: 'ClickStack Alternative Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default ClickStackAlternativePage
