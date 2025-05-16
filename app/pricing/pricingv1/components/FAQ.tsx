'use client'

import React from 'react'
import FAQBody from '../../../../components/FAQPricing'

export default function FAQ() {
  return (
    <section className="relative !m-0 !mx-auto !w-[100vw] border !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
      <div className="mx-auto">
        <div className="flex w-full flex-col sm:flex-row">
          <div className="!w-[300px] flex-1">
            <p className="pl-12 pt-10 text-4xl font-semibold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Frequently <br /> Asked <br /> Questions
            </p>
          </div>
          <div className="card-demo left-0 flex-[2_2_0%] border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400">
            <FAQBody />
          </div>
        </div>
      </div>
    </section>
  )
}
