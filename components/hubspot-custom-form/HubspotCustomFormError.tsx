'use client'

import React from 'react'

type HubspotCustomFormErrorProps = {
  message?: string
  onRetry?: () => void
}

export default function HubspotCustomFormError({ message, onRetry }: HubspotCustomFormErrorProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-signoz_slate-400 bg-signoz_ink-400 p-6 text-center">
      <p className="text-sm text-signoz_vanilla-300">
        {message ||
          'Unable to load the form. This may be caused by a browser extension or network issue.'}
      </p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md bg-signoz_robin-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-signoz_robin-500/90"
          >
            Retry
          </button>
        )}
        <a
          href="mailto:cloud-support@signoz.io"
          className="text-sm text-signoz_robin-500 underline underline-offset-2 transition hover:text-signoz_robin-400"
        >
          Email us instead
        </a>
      </div>
    </div>
  )
}
