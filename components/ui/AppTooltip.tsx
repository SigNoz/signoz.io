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
            'z-[200] max-w-sm rounded-md border border-signoz_slate-500 bg-signoz_ink-400 px-3 py-2 text-left text-xs leading-snug text-signoz_vanilla-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]',
            contentClassName
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-signoz_ink-400" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
