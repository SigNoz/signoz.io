import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { RegionProvider } from '@/components/Region/RegionContext'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function DocsOnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProviderWrapper>
      <RegionProvider>{children}</RegionProvider>
    </TooltipProviderWrapper>
  )
}
