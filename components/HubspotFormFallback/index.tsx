'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import Button from '@/components/ui/Button'

const FORM_LOAD_TIMEOUT_MS = 10_000
const MIN_FORM_HEIGHT_PX = 100

export function FormBlockedFallback() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-signoz_slate-100 bg-signoz_ink-300 px-6 py-8 text-center">
      <p className="text-base font-semibold text-signoz_vanilla-100">Unable to load the form</p>
      <p className="max-w-sm text-sm leading-relaxed text-signoz_vanilla-400">
        Your browser&apos;s tracking protection or an ad blocker may be preventing this form from
        loading. Try disabling tracking protection for this page, or use a different browser.
      </p>
      <Button
        variant="outline"
        rounded="full"
        href="mailto:cloud-support@signoz.io"
        className="mt-1"
      >
        Email us at cloud-support@signoz.io
      </Button>
    </div>
  )
}

type UseHubspotFormFallbackProps = {
  portalId: string
  formId: string
  target: string
}

export function useHubspotFormFallback(props: UseHubspotFormFallbackProps) {
  const { error, formCreated } = useHubspotForm(props)

  const formRef = useRef<HTMLDivElement>(null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (error) {
      setShowFallback(true)
      return
    }
    if (formCreated) return

    const timer = setTimeout(() => {
      const el = formRef.current
      if (el && el.offsetHeight < MIN_FORM_HEIGHT_PX) {
        setShowFallback(true)
      }
    }, FORM_LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [error, formCreated])

  return { formCreated, error, showFallback, formRef }
}
