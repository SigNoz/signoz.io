'use client'

import React from 'react'
import DOMPurify from 'dompurify'
import { CheckCircle } from 'lucide-react'
import type { FormTheme } from './types'
import { themeStyles } from './types'

type HubspotCustomFormSuccessProps = {
  message?: string
  theme?: FormTheme
}

export default function HubspotCustomFormSuccess({
  message,
  theme = 'dark',
}: HubspotCustomFormSuccessProps) {
  const t = themeStyles[theme]

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <CheckCircle className="text-primary h-7 w-7" />
      {message ? (
        <div
          className={`text-sm ${t.successText} [&_p]:mb-1 [&_p]:last:mb-0`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
        />
      ) : (
        <h3 className={`text-lg font-semibold ${t.successText}`}>We&apos;ll be in touch soon.</h3>
      )}
    </div>
  )
}
