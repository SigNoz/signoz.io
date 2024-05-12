import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="container relative mx-auto  px-4 sm:px-6 xl:px-0">{children}</section>
}
