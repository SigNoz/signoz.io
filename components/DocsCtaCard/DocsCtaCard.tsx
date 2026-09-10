'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingButton from '@/components/TrackingButton'

const SECTION_NAME = 'Docs CTA Card'

interface DocsCtaCardProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function DocsCtaCard({
  title = 'Slow is the new Downtime',
  description = 'SigNoz Cloud is the fastest way to try out SigNoz. Instrument your\napplication and start sending data today.',
  buttonText = 'Sign up for SigNoz Cloud',
  buttonHref = '/teams/',
}: DocsCtaCardProps) {
  const descriptionLines = description.split('\n')

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-4 border-t border-dashed border-[var(--l1-border)] py-20"
      data-markdown-ignore
    >
      <h2 className="m-0 text-2xl font-semibold leading-9 text-[var(--l1-foreground-hover)]">
        {title}
      </h2>
      <p className="m-0 text-center text-base leading-[26px] text-[var(--l2-foreground)]">
        {descriptionLines.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br className="hidden sm:block" />}
            {index > 0 && <span className="sm:hidden"> </span>}
            {line}
          </React.Fragment>
        ))}
      </p>
      <TrackingButton
        href={buttonHref}
        clickType="Primary CTA"
        clickName={`${buttonText} Button`}
        clickLocation={SECTION_NAME}
        clickText={buttonText}
        className="flex h-8 w-fit items-center gap-2 rounded-full bg-[var(--primary-background)] pl-4 pr-3.5 text-[13px] font-medium tracking-tight !text-[var(--primary-foreground)] !no-underline transition-colors hover:bg-[var(--primary-background-hover)] hover:!text-[var(--primary-foreground)]"
      >
        {buttonText}
        <ArrowRight size={12} />
      </TrackingButton>
    </div>
  )
}
