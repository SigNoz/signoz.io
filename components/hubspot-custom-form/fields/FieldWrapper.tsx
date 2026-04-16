'use client'

import React from 'react'
import type { HubspotField } from '../../../types/hubspotForm'

type FieldWrapperProps = {
  field: HubspotField
  error?: string
  touched: boolean
  hideLabel?: boolean
  children: React.ReactNode
}

export default function FieldWrapper({
  field,
  error,
  touched,
  hideLabel,
  children,
}: FieldWrapperProps) {
  const showError = touched && error

  return (
    <div className="flex flex-col gap-2">
      {!hideLabel && (
        <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
          {field.label}
          {field.required && ' *'}
        </span>
      )}
      {children}
      {field.description && <span className="text-[10px] text-gray-500">{field.description}</span>}
      {showError && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
