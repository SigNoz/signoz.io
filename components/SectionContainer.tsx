import React from 'react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="relative mx-auto">{children}</section>
}
