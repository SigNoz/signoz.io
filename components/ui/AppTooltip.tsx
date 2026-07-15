'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import { cn } from 'app/lib/utils'

export type AppTooltipSide = 'top' | 'right' | 'bottom' | 'left'

type AppTooltipProps = {
  children: ReactNode
  content: ReactNode
  contentClassName?: string
  /** Matches tooltip surface fill so the arrow blends with the body */
  arrowClassName?: string
  side?: AppTooltipSide
  /** Radix delay in ms; defaults to provider (theme) value */
  delayDuration?: number
}

export function AppTooltip({
  children,
  content,
  contentClassName,
  arrowClassName,
  side = 'right',
  delayDuration,
}: AppTooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            'border-border bg-card text-l1-foreground z-[200] max-w-sm rounded-md border px-3 py-2 text-left text-xs leading-snug shadow-md',
            contentClassName
          )}
        >
          {content}
          <TooltipPrimitive.Arrow
            className={cn('fill-card', arrowClassName)}
            width={10}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
