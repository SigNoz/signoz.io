'use client'

import React from 'react'
import type { HubspotField } from '../../../types/hubspotForm'
import type { FormTheme } from '../types'
import { themeStyles } from '../types'

type FieldWrapperProps = {
  field: HubspotField
  error?: string
  touched: boolean
  hideLabel?: boolean
  theme?: FormTheme
  children: React.ReactNode
}

export default function FieldWrapper({
  field,
  error,
  touched,
  hideLabel,
  theme = 'dark',
  children,
}: FieldWrapperProps) {
  const showError = touched && error
  const t = themeStyles[theme]

  return (
    <div className="flex flex-col gap-2">
      {!hideLabel && (
        <span className={`block text-[11px] font-medium uppercase tracking-wide ${t.label}`}>
          {field.label}
          {field.required && ' *'}
        </span>
      )}
      {children}
      {field.description && (
        <span className={`text-[10px] ${t.description}`}>{field.description}</span>
      )}
      {showError && <p className={`text-xs ${t.error}`}>{error}</p>}
    </div>
  )
}
