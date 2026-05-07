'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

export function TooltipProviderWrapper({ children }: { children: ReactNode }) {
  return <TooltipProvider delayDuration={400}>{children}</TooltipProvider>
}
