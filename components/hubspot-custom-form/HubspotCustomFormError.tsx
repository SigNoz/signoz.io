'use client'

import React from 'react'
import type { FormTheme } from './types'
import { themeStyles } from './types'

type HubspotCustomFormErrorProps = {
  message?: string
  onRetry?: () => void
  theme?: FormTheme
}

export default function HubspotCustomFormError({
  message,
  onRetry,
  theme = 'dark',
}: HubspotCustomFormErrorProps) {
  const t = themeStyles[theme]

  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-md border p-6 text-center ${t.errorPanel}`}
    >
      <p className="text-sm">
        {message ||
          'Unable to load the form. This may be caused by a browser extension or network issue.'}
      </p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium text-white transition"
          >
            Retry
          </button>
        )}
        <a
          href="mailto:cloud-support@signoz.io"
          className="text-primary hover:text-accent-primary text-sm underline underline-offset-2 transition"
        >
          Email us instead
        </a>
      </div>
    </div>
  )
}
