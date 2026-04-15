import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { RegionProvider } from '../../components/Region/RegionContext'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function DocsOnboardingLayout({ children }: { children: ReactNode }) {
  return <RegionProvider>{children}</RegionProvider>
}
