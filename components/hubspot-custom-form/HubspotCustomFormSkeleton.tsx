'use client'

import React from 'react'
import type { FormTheme } from './types'
import { themeStyles } from './types'

export default function HubspotCustomFormSkeleton({ theme = 'dark' }: { theme?: FormTheme }) {
  const t = themeStyles[theme]

  return (
    <div className="flex animate-pulse flex-col gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className={`h-3 w-24 rounded ${t.skeleton}`} />
          <div className={`h-11 w-full rounded-md ${t.skeleton}`} />
        </div>
      ))}
      <div className={`h-11 w-full rounded-md ${t.skeleton}`} />
    </div>
  )
}
