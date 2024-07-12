import React from 'react';
import Observability from '@/components/observability'
import DataProtectionLaws from '@/components/data-protection-laws'
import PricingStructure from '@/components/pricing-structure'
import { CommunityEdition } from '@/components/community-edition'
import { SignozDatalog } from '@/components/signoz-datalog'


const WhySelectSignoz = ({ isInPricingPage = false }) => {
  return (
    <div className="!w-[80vw] !mx-auto !px-0 container border border-signoz_slate-400 border-dashed !border-b-0">
      <div className="flex flex-col sm:flex-row">
        <div className='flex-1 !w-[300px]'>
          <p className='sticky top-[100px] pl-12 pt-10 text-signoz_vanilla-100 text-4xl sm:text-[44px] font-bold leading-[3.5rem]'>Why <br /> select <br /> signoz? </p>
        </div>
        <div className='flex-[2_2_0%]'>
          <div className='flex flex-col sm:flex-row border border-signoz_slate-400 border-dashed py-10 pl-10 !border-r-0 !border-t-0 !border-b-0 gap-8'>
            <div className='flex flex-col gap-16 shrink-[10]'>
              <div>
                <p className='text-signoz_vanilla-100 text-base font-medium block mb-2'>Built for scale</p>
                <p className='text-signoz_vanilla-400 text-sm font-normal block m-0 leading-9'>Our powerful ingestion engine has a proven track record of handling 10TB+ data ingestion per day.</p>
              </div>
              <div>
                <p className='text-signoz_vanilla-100 text-base font-medium block mb-2'>Trusted across the globe</p>
                <p className='text-signoz_vanilla-400 text-sm font-normal block m-0 leading-9'>Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high seas.</p>
              </div>
              <div>
                <p className='text-signoz_vanilla-100 text-base font-medium block mb-2'>Powering observability for teams of all sizes</p>
                <p className='text-signoz_vanilla-400 text-sm font-normal block m-0 leading-9'>Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz to build more reliable products.</p>
              </div>
            </div>
            <div className="aspect-[272/352] max-w-[50vw] w-[272px]">
            <img src="/img/graphics/homepage/feature-graphic-enterprise.webp" alt="" />
            </div>
          </div>
          <Observability />
          {
            isInPricingPage ? <SignozDatalog /> : null
          }
          <DataProtectionLaws isInPricingPage= {isInPricingPage} />
          {
            !isInPricingPage ? <PricingStructure /> : null
          }
          {
            isInPricingPage ? <CommunityEdition /> : null
          }
        </div>
      </div>
    </div>
  )
}

export default WhySelectSignoz