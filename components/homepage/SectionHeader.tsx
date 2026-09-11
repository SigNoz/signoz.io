import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

import Eyebrow from './Eyebrow'

export interface SectionHeaderCta {
  label: string
  href: string
  clickLocation: string
  clickName: string
  clickText?: string
  clickType?: string
  variant?: 'primary' | 'secondary'
  newTab?: boolean
}

interface SectionHeaderProps {
  title: ReactNode
  mutedTitle?: ReactNode
  eyebrow?: string
  description?: ReactNode
  cta?: SectionHeaderCta
  className?: string
}

export default function SectionHeader({
  title,
  mutedTitle,
  eyebrow,
  description,
  cta,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6',
        className
      )}
    >
      <div>
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h2 className="m-0 max-w-3xl text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl sm:leading-none md:text-6xl">
          {title}
          {mutedTitle && (
            <>
              <br />
              <span className="text-[var(--l2-foreground)]">{mutedTitle}</span>
            </>
          )}
        </h2>
      </div>
      {(description || cta) && (
        <div className="max-w-xl md:max-w-md">
          {description && (
            <p className="m-0 text-base leading-7 tracking-normal text-[var(--l2-foreground)] sm:text-lg sm:leading-8">
              {description}
            </p>
          )}
          {cta && (
            <TrackingLink
              className={cn(
                'btn-tactile mt-6 no-underline',
                cta.variant === 'primary' ? 'btn-tactile--primary' : 'btn-tactile--secondary'
              )}
              clickLocation={cta.clickLocation}
              clickName={cta.clickName}
              clickText={cta.clickText ?? cta.label}
              clickType={cta.clickType ?? 'Secondary CTA'}
              href={cta.href}
              target={cta.newTab ? '_blank' : undefined}
            >
              {cta.label}
              <ArrowRight size={12} aria-hidden="true" />
            </TrackingLink>
          )}
        </div>
      )}
    </div>
  )
}
