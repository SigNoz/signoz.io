'use client'

import React from 'react'
import { Check } from 'lucide-react'
import type { FieldRendererProps } from '../types'
import FieldWrapper from './FieldWrapper'

export default function CheckboxField({
  field,
  value,
  error,
  touched,
  onChange,
  disabled,
}: FieldRendererProps) {
  const checked = value === true || value === 'true'

  return (
    <FieldWrapper field={field} error={error} touched={touched} hideLabel>
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
              : 'border-signoz_slate-100 bg-transparent'
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
        </span>
        <span className="text-sm text-signoz_vanilla-300">
          {field.label}
          {field.required && <span className="text-gray-500"> *</span>}
        </span>
      </label>
    </FieldWrapper>
  )
}
