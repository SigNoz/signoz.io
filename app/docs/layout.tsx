'use client'

import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function DocsRootLayout({ children }: LayoutProps) {
  return <>{children}</>
}
