import React from 'react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="relative mx-auto px-2 sm:px-6 xl:px-0">{children}</section>
}
