import React, { ReactNode } from 'react'
import { Metadata } from 'next'
import { getDocsSideNav } from '@/utils/docsSideNav'
import { DocsSideNavProvider } from '@/components/DocsSidebar/DocsSideNavContext'
import MobileDocsSideNav from '@/components/DocsSidebar/MobileDocsSideNav'
import { RegionProvider } from '@/components/Region/RegionContext'

export const metadata: Metadata = {
  title: {
    template: '%s | SigNoz Docs',
    default: 'SigNoz Docs',
  },
}

interface LayoutProps {
  children: ReactNode
}

export default async function DocsRootLayout({ children }: LayoutProps) {
  const sideNav = await getDocsSideNav()

  return (
    <RegionProvider>
      <DocsSideNavProvider sideNav={sideNav}>
        <MobileDocsSideNav />
        {children}
      </DocsSideNavProvider>
    </RegionProvider>
  )
}
