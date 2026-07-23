import React, { ReactNode } from 'react'
import { Metadata } from 'next'
import { getDocsSideNav } from '@/utils/docsSideNav'
import { DocsSideNavProvider } from '@/components/DocsSidebar/DocsSideNavContext'
import MobileDocsSideNav from '@/components/DocsSidebar/MobileDocsSideNav'

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
    <DocsSideNavProvider sideNav={sideNav}>
      <MobileDocsSideNav />
      {children}
    </DocsSideNavProvider>
  )
}
