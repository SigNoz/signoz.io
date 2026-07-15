'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { useState, type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const rangeByColor = {
  secondary: 'bg-primary',
  danger: 'bg-sakura-500',
  warning: 'bg-warning-background',
} as const

const thumbByToken: Record<string, string> = {
  'robin-500': 'bg-primary',
  'sakura-500': 'bg-sakura-500',
  'amber-500': 'bg-warning-background',
}

const tooltipByToken: Record<string, { bg: string; text: string; border: string }> = {
  'robin-500': {
    bg: 'bg-primary',
    text: 'text-white',
    border: 'border-robin-600',
  },
  'sakura-500': {
    bg: 'bg-sakura-500',
    text: 'text-white',
    border: 'border-sakura-600',
  },
  'amber-500': {
    bg: 'bg-warning-background',
    text: 'text-foreground',
    border: 'border-amber-600',
  },
}

export type PricingSliderColor = keyof typeof rangeByColor

type PricingRangeSliderProps = {
  value: number
  onChange: (value: number | number[]) => void
  min: number
  max: number
  step: number
  color: PricingSliderColor
  minLabel: string
  maxLabel: string
  tooltipText: string
  /** Tailwind token suffix e.g. robin-500 */
  thumbColorToken: string
  'aria-label': string
  className?: string
  /** Renders beside the slider (e.g. manual numeric input) */
  endSlot?: ReactNode
  /** When set (e.g. 1–6 discrete), shows one label per step under the track instead of only min/max */
  markLabels?: string[]
}

export function PricingRangeSlider({
  value,
  onChange,
  min,
  max,
  step,
  color,
  minLabel,
  maxLabel,
  tooltipText,
  thumbColorToken,
  'aria-label': ariaLabel,
  className,
  endSlot,
  markLabels,
}: PricingRangeSliderProps) {
  const thumbBg = thumbByToken[thumbColorToken] ?? 'bg-primary'
  const tooltipColors = tooltipByToken[thumbColorToken] ?? tooltipByToken['robin-500']
  const rangeBg = rangeByColor[color]
  const [isDragging, setIsDragging] = useState(false)

  const body = (
    <>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none items-center py-2 select-none"
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? min)}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onLostPointerCapture={() => setIsDragging(false)}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
      >
        <SliderPrimitive.Track className="bg-muted relative h-1.5 w-full grow rounded-full">
          <SliderPrimitive.Range className={cn('absolute h-full rounded-full', rangeBg)} />
        </SliderPrimitive.Track>
        <TooltipPrimitive.Root open={isDragging || undefined} delayDuration={0}>
          <TooltipPrimitive.Trigger asChild>
            <SliderPrimitive.Thumb
              className={cn(
                'border-card focus-visible:ring-ring block h-5 w-5 cursor-grab rounded-full border-2 shadow-md focus:outline-none focus-visible:ring-2 active:cursor-grabbing',
                thumbBg
              )}
              aria-valuetext={tooltipText}
            />
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side="top"
              sideOffset={8}
              className={cn(
                'z-[200] rounded-full border px-2 py-1 text-xs font-medium shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
                tooltipColors.bg,
                tooltipColors.text,
                tooltipColors.border
              )}
            >
              {tooltipText}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </SliderPrimitive.Root>
      <div className="text-muted-foreground mt-1 flex justify-between text-sm">
        {markLabels && markLabels.length > 0 ? (
          markLabels.map((label, i) => <span key={i}>{label}</span>)
        ) : (
          <>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </>
        )}
      </div>
    </>
  )

  if (endSlot) {
    return (
      <div className={cn('flex w-full max-w-md items-start gap-2', className)}>
        <div className="min-w-0 flex-1">{body}</div>
        <div className="flex shrink-0 items-center pt-1">{endSlot}</div>
      </div>
    )
  }

  return <div className={cn('w-full max-w-full', className)}>{body}</div>
}
