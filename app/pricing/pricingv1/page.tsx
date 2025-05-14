'use client'

import React from 'react'
import styles from '../styles.module.css'
import Heading from '@/components/ui/Heading'
import { CheckCircle } from 'lucide-react'

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

            {/* Top features section */}
            <div className="my-6 flex w-full max-w-4xl flex-col items-center gap-3 font-bold md:flex-row md:justify-between md:gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-base text-signoz_vanilla-400">No user-based pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-base text-signoz_vanilla-400">No host-based pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-base text-signoz_vanilla-400">
                  No special pricing for custom metrics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
