'use client'
import { TooltipProvider } from '@radix-ui/react-tooltip'

export function TooltipProviderWrapper({ children }: { children: React.ReactNode }) {
  return <TooltipProvider delayDuration={400}>{children}</TooltipProvider>
}
