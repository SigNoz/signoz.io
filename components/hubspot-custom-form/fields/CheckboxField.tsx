'use client'

import React from 'react'
import { Check } from 'lucide-react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function CheckboxField({
  field,
  value,
  error,
  touched,
  onChange,
  disabled,
  theme = 'dark',
}: FieldRendererProps) {
  const checked = value === true || value === 'true'
  const t = themeStyles[theme]

  return (
    <FieldWrapper field={field} error={error} touched={touched} hideLabel theme={theme}>
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          disabled={disabled}
          className="sr-only"
        />
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
            checked
              ? 'border-signoz_robin-500 bg-signoz_robin-500'
              : `${t.checkboxBorder} bg-transparent`
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
        </span>
        <span className={`text-sm ${t.text}`}>
          {field.label}
          {field.required && <span className={t.textMuted}> *</span>}
        </span>
      </label>
    </FieldWrapper>
  )
}
