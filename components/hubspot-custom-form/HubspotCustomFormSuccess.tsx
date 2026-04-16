'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

type HubspotCustomFormSuccessProps = {
  message?: string
}

export default function HubspotCustomFormSuccess({ message }: HubspotCustomFormSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <CheckCircle className="h-7 w-7 text-signoz_robin-500" />
      {message ? (
        <div
          className="text-sm text-signoz_vanilla-300 [&_p]:mb-1 [&_p]:last:mb-0"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <h3 className="text-lg font-semibold text-signoz_vanilla-300">
          We&apos;ll be in touch soon.
        </h3>
      )}
    </div>
  )
}
