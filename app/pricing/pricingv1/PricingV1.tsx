import React from 'react'
import Heading from '../../../components/ui/Heading'
import PricingFeatures from './components/PricingFeatures'
import TeamsPricingCard from './components/TeamsPricingCard'
import EnterpriseCard from './components/EnterpriseCard'
import PricingCalculator from './components/PricingCalculator'
import ExploreAllFeatures from './components/ExploreAllFeatures'
import WhySelectSignoz from '@/components/why-select-signoz'
import { TrustedByTeams } from '@/components/trusted-by'
import QuickStartCloud from '@/components/QuickStartCloud'
import FAQ from './components/FAQ'
import StartupProgram from './components/StartupProgram'
import SigNozCloudPricingOverview from '@/components/SigNozCloudPricingOverviewCard/SigNozCloudPricingOverview'

export default function PricingV1Page() {
  return (
    <div className="relative bg-signoz_ink-500">
      {/* Same background as original pricing page */}
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      <div title="SigNoz Plans">
        <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:!w-[80vw] md:px-5 md:pt-24">
          {/* Header */}
          <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
            <div className="absolute top-[-80px] z-[0] h-[7rem] !w-[80vw] border !border-l-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400" />
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

          {/* Pricing calculator - now below the cards */}
          <div className="mx-auto mt-10 w-full lg:max-w-6xl">
            <PricingCalculator />
          </div>
        </div>

        {/* Feature comparison section */}
        <ExploreAllFeatures />

        <TrustedByTeams page="pricing" />

        {/* Startup Program Section */}
        <StartupProgram />
        <WhySelectSignoz isInPricingPage />

        <FAQ />

        <QuickStartCloud />
      </div>
    </div>
  )
}
