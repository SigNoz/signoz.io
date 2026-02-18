'use client'

import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'

const FORM_LOAD_TIMEOUT_MS = 10_000

function FormBlockedFallback() {
  return (
    <div className="rounded-lg border border-signoz_amber-500/30 bg-signoz_amber-500/5 px-5 py-4 text-center">
      <p className="mb-1 text-sm font-medium text-signoz_amber-400">Unable to load the form</p>
      <p className="mb-3 text-xs leading-relaxed text-signoz_vanilla-400">
        Your browser&apos;s tracking protection or an ad blocker may be preventing this form from
        loading. Try disabling tracking protection for this page, using a different browser, or
        reach out to us directly.
      </p>
      <a
        href="mailto:cloud-support@signoz.io"
        className="inline-block rounded-full border border-signoz_robin-500 px-4 py-1.5 text-xs font-medium text-signoz_robin-500 no-underline transition-colors hover:bg-signoz_robin-500 hover:text-white"
      >
        Email us at cloud-support@signoz.io
      </a>
    </div>
  )
}

function PricingForm({ portalId, formId }) {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId,
    formId,
    target: '#my-hubspot-form',
  })

  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (formCreated) return
    const timer = setTimeout(() => setTimedOut(true), FORM_LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [formCreated])

  const showFallback = error || (timedOut && !formCreated)

  return (
    <div id="my-hubspot-form">
      {!formCreated && !showFallback && <p className="text--center">Loading...</p>}
      {showFallback && !formCreated && <FormBlockedFallback />}
    </div>
  )
}

export default PricingForm
