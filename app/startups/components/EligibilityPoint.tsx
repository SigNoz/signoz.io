'use client'

import React from 'react'
import { IconRenderer } from '../icons'

type EligibilityPointProps = {
  point: {
    title: string
    iconName: string
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
        <IconRenderer iconName={point.iconName} />
      </div>
      <div className="text-signoz_vanilla-100">{point.title}</div>
    </div>
  )
}
