import React from 'react';
import Observability from '@/components/observability'
import DataProtectionLaws from '@/components/data-protection-laws'
import PricingStructure from '@/components/pricing-structure'


const WhySelectSignoz = () => {
    return (
        <div className="container my-10 mb-16">
            <div className="flex flex-row">
                <div>
                    <p>Why select signoz?</p>
                </div>
                <div>
                    <div className='flex flex-col gap-10 mb-10'>
                        <div>
                            <p>Built for scale</p>
                            <p>Our powerful ingestion engine has a proven track record of handling 10TB+ data ingestion per day.</p>
                        </div>
                        <div>
                            <p>Trusted across the globe</p>
                            <p>Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high seas.</p>
                        </div>
                        <div>
                            <p>Powering observability for teams of all sizes</p>
                            <p>Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz to build more reliable products.</p>
                        </div>
                    </div>
                    <Observability />
                    <DataProtectionLaws />
                    <PricingStructure />
                </div>
            </div>
        </div>
    )
}

export default WhySelectSignoz