'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import { cn } from 'app/lib/utils'

export type AppTooltipSide = 'top' | 'right' | 'bottom' | 'left'

type AppTooltipProps = {
  children: ReactNode
  content: ReactNode
  contentClassName?: string
  side?: AppTooltipSide
  /** Radix delay in ms; defaults to provider (theme) value */
  delayDuration?: number
  sideOffset?: number
}

export function AppTooltip({
  children,
  content,
  contentClassName,
  side = 'right',
  delayDuration,
  sideOffset = 6,
}: AppTooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          collisionPadding={8}
          avoidCollisions
          className={cn(
            'z-[200] max-w-sm rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)] px-3 py-2 text-left text-xs leading-snug text-[var(--l1-foreground)] shadow-[0_6px_12px_0_color-mix(in_srgb,var(--base-black)_20%,transparent)]',
            contentClassName
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--l2-background)]" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
