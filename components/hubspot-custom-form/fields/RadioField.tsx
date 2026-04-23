'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function RadioField({
  field,
  value,
  error,
  touched,
  onChange,
  disabled,
  selectVariant = 'radio',
  theme = 'dark',
}: FieldRendererProps) {
  const stringValue = typeof value === 'string' ? value : ''
  const t = themeStyles[theme]

  if (selectVariant === 'radio') {
    return (
      <FieldWrapper field={field} error={error} touched={touched} theme={theme}>
        <div className="flex flex-col gap-2">
          {(field.options || []).map((opt) => {
            const isSelected = stringValue === opt.value
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-md text-sm transition ${
                  isSelected ? 'text-signoz_robin-500' : t.textMuted
                } ${disabled ? 'opacity-50' : ''}`}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  disabled={disabled}
                  className="sr-only"
                />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                    isSelected ? 'border-signoz_robin-500' : t.radioBorder
                  }`}
                >
                  {isSelected && <span className="h-2 w-2 rounded-full bg-signoz_robin-500" />}
                </span>
                <span>{opt.label}</span>
              </label>
            )
          })}
        </div>
      </FieldWrapper>
    )
  }

  return (
    <FieldWrapper field={field} error={error} touched={touched} theme={theme}>
      <div className="flex flex-wrap gap-2">
        {(field.options || []).map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm transition disabled:opacity-50 ${
              stringValue === opt.value ? t.pillSelected : t.pillUnselected
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FieldWrapper>
  )
}
