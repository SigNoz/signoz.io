'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import { cn } from 'app/lib/utils'

type AppTooltipProps = {
  children: ReactNode
  content: ReactNode
  contentClassName?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Radix delay in ms; defaults to provider (theme) value */
  delayDuration?: number
}

export function AppTooltip({
  children,
  content,
  contentClassName,
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
            'z-[100] max-w-sm rounded-md border border-signoz_slate-400 bg-signoz_ink-200 px-2 py-1.5 text-xs text-signoz_vanilla-100 shadow-md',
            contentClassName
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-signoz_ink-200" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
