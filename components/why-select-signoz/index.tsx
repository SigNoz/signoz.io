import React from 'react'
import Observability from '@/components/observability'
import DataProtectionLaws from '@/components/data-protection-laws'
import PricingStructure from '@/components/pricing-structure'
import { CommunityEdition } from '@/components/community-edition'
import { SignozDatalog } from '@/components/signoz-datalog'

const WhySelectSignoz = ({ isInPricingPage = false }) => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-8 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Why <br /> select <br /> SigNoz?{' '}
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 flex flex-col justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row  md:pl-10">
            <div className="flex shrink-[10] flex-col gap-16 px-8 md:px-0">
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Built for scale
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Our powerful ingestion engine has a proven track record of handling 10TB+ data
                  ingestion per day.
                </p>
              </div>
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Trusted across the globe
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high
                  seas.
                </p>
              </div>
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Powering observability for teams of all sizes
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz
                  to build more reliable products.
                </p>
              </div>
            </div>
            <div className="mx-auto aspect-[272/352] w-[272px] max-w-[50vw]">
              <img src="/img/graphics/homepage/feature-graphic-enterprise.webp" alt="" />
            </div>
          </div>
          {isInPricingPage ? (
            <>
              <SignozDatalog />
              <DataProtectionLaws isInPricingPage={isInPricingPage} />
              <Observability />
              <CommunityEdition />
            </>
          ) : (
            <>
              <Observability />
              <DataProtectionLaws isInPricingPage={isInPricingPage} />
              <PricingStructure />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WhySelectSignoz
