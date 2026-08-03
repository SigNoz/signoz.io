import { ReactNode } from 'react'
import { Metadata } from 'next'
import { getDocsSideNav } from '@/utils/docsSideNav'
import { DocsSideNavProvider } from '@/components/DocsSidebar/DocsSideNavContext'
import MobileDocsSideNav from '@/components/DocsSidebar/MobileDocsSideNav'
import DocsShell from '@/components/DocsSidebar/DocsShell'
import { RegionProvider } from '@/components/Region/RegionContext'
import DocsChrome from '@/components/NozPeek/DocsChrome'

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
        <DocsShell>{children}</DocsShell>
        <DocsChrome />
      </DocsSideNavProvider>
    </RegionProvider>
  )
}
