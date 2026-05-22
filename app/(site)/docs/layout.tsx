import React, { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | SigNoz Docs',
    default: 'SigNoz Docs',
  },
}

interface LayoutProps {
  children: ReactNode
}

export default function DocsRootLayout({ children }: LayoutProps) {
  return <>{children}</>
}
