'use client'

import React from 'react'

export default function HubspotCustomFormSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-3 w-24 rounded bg-signoz_slate-400" />
          <div className="h-11 w-full rounded-md bg-signoz_slate-400" />
        </div>
      ))}
      <div className="h-11 w-full rounded-md bg-signoz_slate-400" />
    </div>
  )
}
