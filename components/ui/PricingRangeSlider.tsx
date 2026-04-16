'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { useState, type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const rangeByColor = {
  secondary: 'bg-signoz_robin-500',
  danger: 'bg-signoz_sakura-500',
  warning: 'bg-signoz_amber-500',
} as const

const thumbByToken: Record<string, string> = {
  'signoz_robin-500': 'bg-signoz_robin-500',
  'signoz_sakura-500': 'bg-signoz_sakura-500',
  'signoz_amber-500': 'bg-signoz_amber-500',
}

const tooltipByToken: Record<string, { bg: string; text: string; border: string }> = {
  'signoz_robin-500': {
    bg: 'bg-signoz_robin-500',
    text: 'text-white',
    border: 'border-signoz_robin-600',
  },
  'signoz_sakura-500': {
    bg: 'bg-signoz_sakura-500',
    text: 'text-white',
    border: 'border-signoz_sakura-600',
  },
  'signoz_amber-500': {
    bg: 'bg-signoz_amber-500',
    text: 'text-signoz_ink-500',
    border: 'border-signoz_amber-600',
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
  /** Tailwind token suffix e.g. signoz_robin-500 */
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
  const thumbBg = thumbByToken[thumbColorToken] ?? 'bg-signoz_robin-500'
  const tooltipColors = tooltipByToken[thumbColorToken] ?? tooltipByToken['signoz_robin-500']
  const rangeBg = rangeByColor[color]
  const [isDragging, setIsDragging] = useState(false)

  const body = (
    <>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center py-2"
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
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-signoz_slate-500">
          <SliderPrimitive.Range className={cn('absolute h-full rounded-full', rangeBg)} />
        </SliderPrimitive.Track>
        <TooltipPrimitive.Root open={isDragging || undefined} delayDuration={0}>
          <TooltipPrimitive.Trigger asChild>
            <SliderPrimitive.Thumb
              className={cn(
                'block h-5 w-5 cursor-grab rounded-full border-2 border-signoz_vanilla-100 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-400 active:cursor-grabbing',
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
      <div className="mt-1 flex justify-between text-sm text-signoz_vanilla-400">
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
