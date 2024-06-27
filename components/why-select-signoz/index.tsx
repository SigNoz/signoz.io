import React from 'react';
import Observability from '@/components/observability'
import DataProtectionLaws from '@/components/data-protection-laws'
import PricingStructure from '@/components/pricing-structure'
import {CommunityEdition} from '@/components/community-edition'
import { SignozDatalog } from '@/components/signoz-datalog'


const WhySelectSignoz = ({isInPricingPage = false}) => {
    return (
        <div className="container my-10 mb-16 border border-signoz_slate-400 border-dashed">
            <div className="flex flex-row">
                <div className='flex-1 '>
                    <p className='sticky top-[100px] pl-12 pt-10 text-signoz_vanilla-100 text-[44px] font-bold leading-[3.5rem]'>Why <br/> select <br/> signoz? </p>
                </div>
                <div className='flex-[2_2_0%]'>
                    <div className='flex border border-signoz_slate-400 border-dashed py-10 pl-10'>
                    <div className='flex flex-col gap-10'>
                        <div>
                            <p className='text-signoz_vanilla-100 text-base font-medium'>Built for scale</p>
                            <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>Our powerful ingestion engine has a proven track record of handling 10TB+ data ingestion per day.</p>
                        </div>
                        <div>
                            <p className='text-signoz_vanilla-100 text-base font-medium'>Trusted across the globe</p>
                            <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high seas.</p>
                        </div>
                        <div>
                            <p className='text-signoz_vanilla-100 text-base font-medium'>Powering observability for teams of all sizes</p>
                            <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz to build more reliable products.</p>
                        </div>
                    </div>
                    <div className="h-[352px] w-[449px] bg-signoz_ink-400">
                    </div>
                    </div>
                    <Observability />
                    {
                        isInPricingPage ? <SignozDatalog /> : null
                    }
                    <DataProtectionLaws />
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