'use client'

import React from 'react'
import { Check } from 'lucide-react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function MultipleCheckboxesField({
  field,
  value,
  error,
  touched,
  onChange,
  disabled,
  theme = 'dark',
}: FieldRendererProps) {
  const selectedValues = Array.isArray(value)
    ? value
    : typeof value === 'string' && value
      ? value.split(';')
      : []
  const t = themeStyles[theme]

  const toggle = (optValue: string) => {
    const next = selectedValues.includes(optValue)
      ? selectedValues.filter((v) => v !== optValue)
      : [...selectedValues, optValue]
    onChange(next)
  }

  return (
    <FieldWrapper field={field} error={error} touched={touched} theme={theme}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {(field.options || []).map((opt) => {
          const isChecked = selectedValues.includes(opt.value)
          return (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(opt.value)}
                disabled={disabled}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                  isChecked
                    ? 'border-signoz_robin-500 bg-signoz_robin-500'
                    : `${t.checkboxBorder} bg-transparent`
                }`}
              >
                {isChecked && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
              </span>
              <span className={`text-sm ${t.text}`}>{opt.label}</span>
            </label>
          )
        })}
      </div>
    </FieldWrapper>
  )
}
