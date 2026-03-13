import React from 'react'

export interface LibraryTabProps {
  value: string
  label: string
  category: string
  children: React.ReactNode
}

export default function LibraryTab({ children }: LibraryTabProps) {
  return <>{children}</>
}
