'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { CTA_STEPS } from './constants'

const SECTION_NAME = 'Docs CTA Section'

export default function DocsCtaSection() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 px-4 pt-16 pb-4 md:flex-row">
      <div className="flex flex-col gap-4 pl-12">
        <h2 className="text-foreground text-2xl leading-9 font-semibold">
          Slow is the new Downtime
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-8 w-fit items-center gap-2 rounded-full px-4 pr-3.5 text-sm font-medium transition-colors"
        >
          Sign up for SigNoz Cloud
          <ArrowRight size={12} className="rotate-[-45deg]" />
        </TrackingLink>
      </div>

      <div className="flex w-full max-w-lg gap-3">
        <div className="flex flex-col items-center gap-1">
          {CTA_STEPS.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-muted flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                <span className="text-foreground font-mono text-sm">{index + 1}</span>
              </div>
              {index < CTA_STEPS.length - 1 && (
                <div className="border-border w-px flex-1 border-l border-dashed" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col gap-11 pt-1">
          {CTA_STEPS.map((step, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-foreground text-base font-medium">{step.title}</p>
              <p className="text-muted-foreground text-sm leading-5">{step.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
