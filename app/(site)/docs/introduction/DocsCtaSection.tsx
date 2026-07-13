'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { CTA_STEPS } from './constants'

const SECTION_NAME = 'Docs CTA Section'

export default function DocsCtaSection() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 px-4 pb-4 pt-16 md:flex-row">
      <div className="flex flex-col gap-4 pl-12">
        <h2 className="text-2xl font-semibold leading-9 text-white">Slow is the new Downtime</h2>
        <p className="text-base leading-[26px] text-signoz_vanilla-400">
          SigNoz Cloud is the fastest way to try out SigNoz. Instrument your
          <br className="hidden md:block" />
          application and start sending data today.
        </p>
        <TrackingLink
          href="/teams/"
          clickType="Primary CTA"
          clickName="Sign up for SigNoz Cloud CTA"
          clickText="Sign up for SigNoz Cloud"
          clickLocation={SECTION_NAME}
          className="flex h-8 w-fit items-center gap-2 rounded-full bg-[#4e74f8] px-4 pr-3.5 text-[13px] font-medium tracking-[-0.065px] text-[#eceef2] transition-colors hover:bg-[#3d63e7]"
        >
          Sign up for SigNoz Cloud
          <ArrowRight size={12} className="rotate-[-45deg]" />
        </TrackingLink>
      </div>

      <div className="flex w-full max-w-[502px] gap-3">
        {/* Number column with connecting lines */}
        <div className="flex flex-col items-center gap-1">
          {CTA_STEPS.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_ink-300">
                <span className="font-mono text-sm text-signoz_vanilla-100">{index + 1}</span>
              </div>
              {index < CTA_STEPS.length - 1 && (
                <div className="w-px flex-1 border-l border-dashed border-signoz_ink-200" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step descriptions */}
        <div className="flex flex-col gap-11 pt-1">
          {CTA_STEPS.map((step, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-base font-medium text-white">{step.title}</p>
              <p className="text-sm leading-5 tracking-[-0.065px] text-signoz_vanilla-400">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
