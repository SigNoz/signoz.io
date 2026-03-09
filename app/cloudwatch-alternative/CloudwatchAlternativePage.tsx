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
  TEAM_SWITCH_CARDS,
  CLOUDWATCH_COMPARISON_TABLE_ROWS,
  CLOUDWATCH_BILLING_CARDS,
  VENDORS,
  DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_ABOVE,
  DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_BELOW,
} from './CloudwatchAlternativePage.constants'
import TrackingLink from '@/components/TrackingLink'

const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Cloudwatch Alternative Hero Start Trial',
        clickLocation: 'Cloudwatch Alternative Hero',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/cloud/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Cloudwatch Alternative Hero Docs',
        clickLocation: 'Cloudwatch Alternative Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={
        <>
          <div className="mb-4 p-3 text-base font-semibold">SIGNOZ VS AWS CLOUDWATCH</div>
          <div className="text-5xl font-bold leading-none">
            AWS CloudWatch <br className="hidden md:block" /> Alternative
          </div>
        </>
      }
      description={
        <>
          Open-source observability with transparent pricing. Get logs, metrics, and traces in{' '}
          <br className="hidden md:block" /> one place without CloudWatch's fragmented consoles and
          12+ billing components.
        </>
      }
      buttons={headerButtons}
      sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
      heroImageAlt="Cloudwatch Alternative hero"
      heroImage="/img/platform/CloudwatchAlternativeMeta.webp"
    />
  )
}

const WhyTeamsSwitchFromCloudWatch: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="relative flex flex-col gap-6 pt-32 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-12 text-2xl leading-[3.25rem]">
            <h2 className="my-6 py-10 text-center text-4xl font-normal text-signoz_vanilla-300">
              Why Teams Switch From CloudWatch
            </h2>
            <SectionLayout variant="no-border" className="!mx-auto p-0">
              <IconTitleDescriptionCardGrid cards={TEAM_SWITCH_CARDS} variant="xl" />
            </SectionLayout>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

const DeploymentAndDataResidency: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] !pb-24 !pt-24"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-center text-4xl font-normal text-signoz_vanilla-100">
          Deployment & Data Residency
        </h2>
        <h4 className="mb-24 text-xl font-normal text-signoz_vanilla-100">
          Your Data, Your Infrastructure, Your Rules.
        </h4>
        <IconTitleDescriptionCardGrid
          cards={DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_ABOVE}
          variant="xl"
        />
        <div className="relative hidden w-full items-center gap-0 md:flex">
          <div className="h-px flex-1 border-t border-dashed border-signoz_sakura-600" />
          <div className="absolute z-[1] flex w-full items-center justify-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white bg-signoz_sakura-600 text-xl font-bold text-white">
              VS
            </span>
          </div>
          <div className="h-px flex-1 border-t border-dashed border-signoz_sakura-600" />
        </div>
        <IconTitleDescriptionCardGrid
          cards={DEPLOYMENT_AND_DATA_RESIDENCY_CARDS_BELOW}
          variant="xl"
        />
      </div>
    </SectionLayout>
  )
}

const CostComparison: React.FC = () => {
  return (
    <>
      <SectionLayout
        variant="bordered"
        className="flex flex-col gap-y-9 !border-b-1 !border-t-1 border-dashed border-signoz_slate-400 !px-0"
      >
        <div className="flex flex-col gap-4 px-10 py-12 md:px-12">
          <h2 className="text-5xl font-normal text-signoz_vanilla-300">Pricing</h2>
          <h4 className="m-0 text-xl font-bold text-signoz_vanilla-100">
            You shouldn't pay to look at your own data
          </h4>
          <div className="text-sm text-signoz_vanilla-400">
            CloudWatch bills across 12+ separate components for ingestion, storage, queries,
            metrics, alarms, dashboards, and API access. SigNoz charges $0.30/GB for logs and
            traces, $0.10 per million samples for metrics. Once data is ingested, query it unlimited
            times at no extra charge.
          </div>
        </div>
        <div className="flex flex-col border-t-1 border-dashed border-signoz_slate-400 sm:flex-row">
          <div className="!w-[100%] flex-1 md:!w-[300px] md:min-w-fit">
            <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start gap-4 px-10 py-10 md:px-0 md:pl-12">
              <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
                CloudWatch's <br className="hidden md:block" /> billing{' '}
                <br className="hidden md:block" /> complexity
              </h2>
              <Button asChild variant="secondary" rounded="full">
                <TrackingLink
                  href="https://aws.amazon.com/cloudwatch/pricing/"
                  clickType="Secondary CTA"
                  clickName="Cloudwatch Alternative Cost Comparison CloudWatch Pricing Details Button"
                  clickLocation="Cloudwatch Alternative Cost Comparison"
                  clickText="CloudWatch pricing details"
                >
                  CloudWatch pricing details <ArrowRight size={16} />
                </TrackingLink>
              </Button>
            </div>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
              <div className="flex flex-col gap-4 px-10 py-10">
                {CLOUDWATCH_BILLING_CARDS.map((card) => (
                  <Card
                    key={card.title}
                    className="rounded-md p-0 [&>*]:rounded-md [&>*]:border-solid [&>*]:border-signoz_slate-500"
                  >
                    <div className="p-6">
                      <h4 className="mb-2 font-semibold text-signoz_vanilla-100">{card.title}</h4>
                      <p className="text-sm text-signoz_vanilla-400">{card.description}</p>
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

const ArchitectureAndApproach: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-4xl font-semibold text-signoz_sakura-100">
              Architecture & Approach
            </h2>
            <div className="text-center text-base text-signoz_vanilla-100">
              These CloudWatch problems stem from architectural choices. CloudWatch splits telemetry{' '}
              <br className="hidden md:block" />
              across separate services (Metrics, Logs, X-Ray, Application Signals), each with its
              own <br className="hidden md:block" />
              storage, console, and query language. SigNoz stores all telemetry in a single
              ClickHouse <br className="hidden md:block" />
              database with a unified query interface.
            </div>
          </div>
          <SectionLayout variant="no-border" className="!mx-auto flex items-center justify-center">
            <ComparisonTable vendors={VENDORS} rows={CLOUDWATCH_COMPARISON_TABLE_ROWS} />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const CloudwatchAlternativePage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <WhyTeamsSwitchFromCloudWatch />
        <ArchitectureAndApproach />
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
              Use the calculator below to estimate costs, then track actual usage with Cost Meter to
              catch unexpected bursts before they impact your bill.
            </p>
          </>
        }
      />
      <DeploymentAndDataResidency />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Cloudwatch Alternative Customer Stories Button',
          clickLocation: 'Cloudwatch Alternative Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default CloudwatchAlternativePage
