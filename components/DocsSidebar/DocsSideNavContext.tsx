'use client'

import React, { createContext, useContext, type ReactNode } from 'react'
import type { NavItem } from './types'

const DocsSideNavContext = createContext<NavItem[] | null>(null)

export function DocsSideNavProvider({
  sideNav,
  children,
}: {
  sideNav: NavItem[]
  children: ReactNode
}) {
  return <DocsSideNavContext.Provider value={sideNav}>{children}</DocsSideNavContext.Provider>
}

export function useDocsSideNav(): NavItem[] {
  const ctx = useContext(DocsSideNavContext)
  if (!ctx) {
    throw new Error('useDocsSideNav must be used within a DocsSideNavProvider')
  }
  return ctx
}
