import React from 'react'
import { Card } from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import TeamsPricingCard from './components/TeamsPricingCard'
import EnterpriseCard from './components/EnterpriseCard'
import ExploreAllFeatures from './components/ExploreAllFeatures'
import WhySelectSignoz from '@/components/why-select-signoz'
import { TrustedByTeams } from '@/components/trusted-by'
import QuickStartCloud from '@/components/QuickStartCloud'
import FAQ from './components/FAQ'
import StartupProgram from './components/StartupProgram'
import SigNozCloudPricingOverview from './components/SigNozCloudPricingOverview'
import InstrumentationSupport from './components/InstrumentationSupport'
import PricingCalculator from './components/PricingCalculator'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

export default function PricingV1Page() {
  return (
    <FeaturePageLayout showProductNav={false}>
      <div title="SigNoz Plans">
        <div className="relative !mx-auto flex flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:px-5 md:pt-24">
          {/* Header */}
          <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
            <Heading type={1} className="z-[1]">
              Simple Usage-based Predictable Observability Costs
            </Heading>
            <div className="hidden md:block">
              <SigNozCloudPricingOverview className="w-full" />
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="pricing-plans mx-auto my-12 grid grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-2">
            <TeamsPricingCard />
            <EnterpriseCard />
          </div>

          {/* Enhanced Pricing calculator section */}
          <Card variant="gradient">
            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-signoz_robin-500/30 bg-signoz_robin-500/20 px-4 py-2 text-sm font-medium text-signoz_robin-300">
                  🧮 Pricing Calculator
                </div>
                <h2 className="mb-4 text-2xl font-bold text-signoz_vanilla-100 md:text-3xl">
                  Calculate Your Exact Monthly Bill
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-signoz_vanilla-400">
                  Get an instant estimate based on your usage. No surprises, no hidden fees.
                </p>
              </div>
              <PricingCalculator />
            </div>
          </Card>
        </div>

        {/* Feature comparison section */}
        <ExploreAllFeatures />

        <TrustedByTeams page="pricing" />

        {/* Startup Program Section */}
        <StartupProgram />
        <InstrumentationSupport />
        <WhySelectSignoz isInPricingPage />
        <Divider />

        <FAQ />

        <SectionLayout variant="bordered">
          <QuickStartCloud />
        </SectionLayout>
      </div>
    </FeaturePageLayout>
  )
}
