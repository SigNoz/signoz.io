'use client'

import React from 'react'
import FAQBody from '../../../../components/FAQPricing'

export default function FAQ() {
  return (
    <section className="relative !m-0 !mx-auto !w-[100vw] border !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
      <div className="mx-auto min-w-0 max-w-full">
        <div className="flex w-full min-w-0 flex-col sm:flex-row">
          <div className="w-full shrink-0 sm:w-[300px] sm:max-w-[300px]">
            <p className="pl-8 pt-10 text-4xl font-semibold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
              Frequently <br /> Asked <br /> Questions
            </p>
          </div>
          <div className="card-demo left-0 min-w-0 flex-1 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 sm:flex-[2_2_0%]">
            <FAQBody />
          </div>
        </div>
      </div>
    </section>
  )
}
