import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h4 className="text-xl font-extrabold leading-9 tracking-tight text-signoz_robin-100 dark:text-signoz_robin-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14">
      {children}
    </h4>
  )
}
