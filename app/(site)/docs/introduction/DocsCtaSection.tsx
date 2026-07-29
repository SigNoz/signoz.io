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
          <h2 className="m-0 text-2xl font-semibold leading-9 text-[var(--l1-foreground)]">
            Slow is the new Downtime
          </h2>
          <p className="text-base leading-relaxed text-[var(--l3-foreground)]">
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
            className="mx-auto flex h-8 w-fit items-center gap-2 rounded-full bg-[var(--primary-background)] px-4 pr-3.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-background-hover)] md:mx-0"
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
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--l3-background)]">
                  <span className="font-mono text-sm text-[var(--l1-foreground)]">{index + 1}</span>
                </div>
                {index < CTA_STEPS.length - 1 && (
                  <div className="my-1 w-px flex-1 border-l border-dashed border-[var(--l1-border)]" />
                )}
              </div>
              <div className={`flex flex-col gap-2 ${index < CTA_STEPS.length - 1 ? 'pb-8' : ''}`}>
                <p className="m-0 text-base font-medium leading-6 text-[var(--l1-foreground)]">
                  {step.title}
                </p>
                <p className="text-sm leading-5 text-[var(--l3-foreground)]">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DitherCanvas>
  )
}
