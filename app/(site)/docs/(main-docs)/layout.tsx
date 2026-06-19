import { ReactNode } from 'react'

import { getDocsSideNav } from '@/utils/docsSideNav'
import DocsMainLayoutClient from './DocsMainLayoutClient'

interface LayoutProps {
  children: ReactNode
}

export default async function DocLayout({ children }: LayoutProps) {
  const docsSideNavItems = await getDocsSideNav()

  return <DocsMainLayoutClient docsSideNavItems={docsSideNavItems}>{children}</DocsMainLayoutClient>
}
