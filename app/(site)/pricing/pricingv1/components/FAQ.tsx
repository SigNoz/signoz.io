'use client'

import React from 'react'
import FAQBody from '@/components/FAQPricing'

export default function FAQ() {
  return (
    <section className="border-border relative !m-0 !mx-auto border !border-t-0 border-dashed">
      <div className="mx-auto max-w-full min-w-0">
        <div className="flex w-full min-w-0 flex-col sm:flex-row">
          <div className="w-full shrink-0 sm:w-[300px] sm:max-w-[300px]">
            <p className="text-l1-foreground pt-10 pl-8 text-4xl !leading-[3.5rem] font-semibold sm:text-4xl">
              Frequently <br /> Asked <br /> Questions
            </p>
          </div>
          <div className="border-border left-0 min-w-0 flex-1 border !border-t-0 !border-r-0 !border-b-0 border-dashed sm:flex-[2_2_0%]">
            <FAQBody />
          </div>
        </div>
      </div>
    </section>
  )
}
