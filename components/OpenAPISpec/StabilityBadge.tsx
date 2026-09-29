'use client'

import { AppTooltip, type AppTooltipSide } from '@/components/ui/AppTooltip'
import { cn } from 'app/lib/utils'
import type { StabilityCopy, StabilityLevel } from '@/constants/apiReferenceStability'

const LEVEL_CLASS_NAMES: Record<StabilityLevel, string> = {
  development:
    'border-[color:var(--callout-error-border)] bg-[color:var(--callout-error-background)] text-[color:var(--callout-error-title)]',
  alpha:
    'border-[color:var(--callout-warning-border)] bg-[color:var(--callout-warning-background)] text-[color:var(--callout-warning-title)]',
  beta: 'border-[color:var(--callout-primary-border)] bg-[color:var(--callout-primary-background)] text-[color:var(--callout-primary-title)]',
  stable:
    'border-[color:var(--callout-success-border)] bg-[color:var(--callout-success-background)] text-[color:var(--callout-success-title)]',
}

const VARIANT_CLASS_NAMES = {
  // Stoplight stacks operation content in a stretch-aligned column, so the pill opts out.
  full: 'self-start px-2 py-px text-[11px] leading-4',
  short: 'self-center px-1.5 text-[10px] leading-[15px]',
} as const

const BASE_CLASS_NAME =
  'inline-flex shrink-0 cursor-help appearance-none items-center whitespace-nowrap rounded-full border border-solid font-semibold uppercase tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)]'

interface StabilityBadgeProps {
  level: StabilityLevel
  copy: StabilityCopy
  variant: keyof typeof VARIANT_CLASS_NAMES
  side?: AppTooltipSide
  interactive?: boolean
}

export default function StabilityBadge({
  level,
  copy,
  variant,
  side = 'top',
  interactive = false,
}: StabilityBadgeProps) {
  const className = cn(BASE_CLASS_NAME, VARIANT_CLASS_NAMES[variant], LEVEL_CLASS_NAMES[level])
  const label = variant === 'short' ? copy.shortLabel : copy.label

  const content = (
    <>
      <span className="mb-0.5 block font-semibold">{copy.label}</span>
      <span className="block">{copy.description}</span>
    </>
  )

  return (
    <AppTooltip content={content} side={side} contentClassName="max-w-[22rem]">
      {interactive ? (
        <button type="button" className={className}>
          {label}
        </button>
      ) : (
        <span
          role="note"
          aria-label={`${copy.label}: ${copy.description}`}
          tabIndex={0}
          className={className}
        >
          {label}
        </span>
      )}
    </AppTooltip>
  )
}
