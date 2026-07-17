'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { CTA_STEPS } from './constants'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'

const SECTION_NAME = 'Docs CTA Section'

export default function DocsCtaSection() {
  return (
    <DitherCanvas enableClick={false} className="w-full">
      <div className="flex w-full flex-col items-start justify-between gap-8 px-4 pb-0 pt-16 md:flex-row">
        <div className="flex flex-col gap-4 pl-0 md:pl-12">
          <h2 className="text-2xl font-semibold leading-9 text-signoz_vanilla-100">
            Slow is the new Downtime
          </h2>
          <p className="text-base leading-relaxed text-signoz_vanilla-400">
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
            className="mx-auto flex h-8 w-fit items-center gap-2 rounded-full bg-signoz_robin-500 px-4 pr-3.5 text-sm font-medium text-signoz_vanilla-100 transition-colors hover:bg-signoz_robin-600 md:mx-0"
          >
            Sign up for SigNoz Cloud
            <ArrowRight size={12} className="rotate-[-45deg]" />
          </TrackingLink>
        </div>

        {/* Align timeline under the 2nd card's arrow (~1/3 + inset); keep pt-16 on parent */}
        <div className="flex w-full max-w-lg flex-col md:pl-[calc(33.333%-1rem)] lg:pl-16">
          {CTA_STEPS.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_ink-300">
                  <span className="font-mono text-sm text-signoz_vanilla-100">{index + 1}</span>
                </div>
                {index < CTA_STEPS.length - 1 && (
                  <div className="my-1 w-px flex-1 border-l border-dashed border-signoz_ink-200" />
                )}
              </div>
              <div className={`flex flex-col gap-2 ${index < CTA_STEPS.length - 1 ? 'pb-8' : ''}`}>
                <p className="text-base font-medium leading-6 text-signoz_vanilla-100">
                  {step.title}
                </p>
                <p className="text-sm leading-5 text-signoz_vanilla-400">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DitherCanvas>
  )
}
