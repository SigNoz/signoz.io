'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface ConditionalMainProps {
  children: ReactNode
}

export default function ConditionalMain({ children }: ConditionalMainProps) {
  const pathname = usePathname()
  const isWordleRoute = pathname === '/todaysdevopswordle/'
  
  if (isWordleRoute) {
    return <main className="mb-auto">{children}</main>
  }
  
  return <main className="mb-auto mt-[48px]">{children}</main>
}