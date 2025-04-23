import React, { ReactNode } from 'react'

type EligibilityPointProps = {
  point: {
    title: string
    icon: ReactNode
    bgColor: string
    textColor: string
  }
  index: number
}

export default function EligibilityPoint({ point, index }: EligibilityPointProps) {
  return (
    <div className="flex items-center">
      <div
        className={`h-10 w-10 rounded-full ${point.bgColor} mr-4 flex items-center justify-center`}
      >
        {point.icon}
      </div>
      <div className="text-signoz_vanilla-100">{point.title}</div>
    </div>
  )
}
