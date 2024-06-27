import React, { useState } from 'react';
import Link from 'next/link';




const MonthlyEstimate = () => {

    return (

        <div className="container my-10 mb-16 border border-signoz_slate-400 border-dashed">
            <div className="grid grid-cols-6 grid-rows-4 gap-4">
                <div className="p-2"> </div>
                <div className="p-2">Price per unit</div>
                <div className="p-2">Retention</div>
                <div className="p-2">Scale of ingestion</div>
                <div className="p-2">Estimated usage</div>
                <div className="p-2">subtotal</div>

                <div className="flex p-2 gap-2">
                    <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-6 h-6" />Traces</div>
                <div className="p-2"><span className='text-signoz_robin-400 text-base font-medium'>$0.3 </span>/GB</div>
                <div className="p-2">15 days</div>
                <div className="p-2">sider</div>
                <div className="p-2">600GB</div>
                <div className="p-2">0.3</div>


                <div className="flex p-2 gap-2">
                    <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-6 h-6" />Logs</div>
                <div className="p-2"><span className='text-signoz_sakura-400 text-base font-medium'>$0.3 </span>/GB</div>
                <div className="p-2">15 days</div>
                <div className="p-2">slider</div>
                <div className="p-2">600Gb</div>
                <div className="p-2">0.3</div>

                <div className="flex p-2 gap-2">
                    <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-6 h-6" />Metrics</div>
                <div className="p-2"><span className='text-signoz_amber-400 text-base font-medium'>$0.15 </span>/ mn samples</div>
                <div className="p-2">15 days</div>
                <div className="p-2">slider</div>
                <div className="p-2">600</div>
                <div className="p-2">0.3</div>
            </div>


            <div className="flex justify-between items-center mt-6 pt-4 button-background px-3 py-4 border border-transparent rounded-md">
                <div>Monthly estimate for usage-based plan</div>
                <div>$199</div>
            </div>
            <div className="flex justify-between items-center mt-4 bg-[#4E74F81A] px-3 py-4 border border-transparent rounded-md">
                <p className='m-0'>Reach out to us for custom pricing and retention for high volume</p>
                <Link
                    id="btn-pricing-signoz-enterprise-2"
                    className={`bg-signoz_robin-500 h-8 pr-3 pl-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 truncate text-center font-medium leading-5 text-white`}
                    href={'/enterprise/'}
                >
                    Contact Us
                </Link>
            </div>
        </div>

    )
};

export default MonthlyEstimate;
