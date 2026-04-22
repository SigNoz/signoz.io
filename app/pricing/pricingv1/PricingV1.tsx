import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/Card'
import Heading from '../../../components/ui/Heading'
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

const PricingCalculator = dynamic(() => import('./components/PricingCalculator'), {
  loading: () => <PricingCalculatorSkeleton />,
})

function PricingCalculatorSkeleton() {
  return (
    <div
      aria-hidden
      className="min-h-[560px] animate-pulse rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-500/40 md:min-h-[640px]"
    />
  )
}

export default function PricingV1Page() {
  return (
    <div className="relative mt-[-56px] bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      <main className="landing-section relative z-[1] mx-auto max-w-8xl" title="SigNoz Plans">
        <div className="relative !mx-auto flex !w-[100vw] max-w-8xl flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:!w-[80vw] md:px-5 md:pt-24">
          <div className="mx-auto mb-5 flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-0">
            <div className="absolute top-[-80px] z-[0] h-[7rem] !w-[80vw] max-w-8xl border !border-l-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400" />
            <Heading type={1} className="z-[1]">
              Simple Usage-based Predictable Observability Costs
            </Heading>
            <SigNozCloudPricingOverview className="w-full" />
          </div>

          <div className="pricing-plans mx-auto my-12 grid w-full grid-cols-1 gap-8 px-4 sm:px-0 lg:max-w-6xl lg:grid-cols-2">
            <TeamsPricingCard />
            <EnterpriseCard />
          </div>

          <Card variant="gradient" className="mx-4 w-[calc(100%-2rem)] sm:mx-0 sm:w-full">
            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-signoz_robin-500/30 bg-signoz_robin-500/20 px-4 py-2 text-sm font-medium text-signoz_robin-300">
                  🧮 Pricing Calculator
                </div>
                <h2 className="mb-4 text-2xl font-bold text-signoz_vanilla-100 md:text-3xl">
                  Calculate Your Exact Monthly Bill
                </h2>
                <p className="mx-auto max-w-2xl text-base text-signoz_vanilla-400 sm:text-lg">
                  Get an instant estimate based on your usage. No surprises, no hidden fees.
                </p>
              </div>
              <Suspense fallback={<PricingCalculatorSkeleton />}>
                <PricingCalculator />
              </Suspense>
            </div>
          </Card>
        </div>

        <ExploreAllFeatures />

        <TrustedByTeams page="pricing" className="max-w-8xl" />

        <StartupProgram />
        <InstrumentationSupport />
        <WhySelectSignoz isInPricingPage className="max-w-8xl" />

        <FAQ />

        <QuickStartCloud />
      </main>
    </div>
  )
}
