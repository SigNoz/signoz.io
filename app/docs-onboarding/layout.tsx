import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { RegionProvider } from '@/components/Region/RegionContext'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'
import { getDocsSideNav } from '@/utils/docsSideNav'
import { DocsSideNavProvider } from '@/components/DocsSidebar/DocsSideNavContext'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DocsOnboardingLayout({ children }: { children: ReactNode }) {
  const sideNav = await getDocsSideNav()

  return (
    <TooltipProviderWrapper>
      <DocsSideNavProvider sideNav={sideNav}>
        <RegionProvider>{children}</RegionProvider>
      </DocsSideNavProvider>
    </TooltipProviderWrapper>
  )
}
