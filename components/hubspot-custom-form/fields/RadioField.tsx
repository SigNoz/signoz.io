'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import FieldWrapper from './FieldWrapper'

export default function RadioField({
  field,
  value,
  error,
  touched,
  onChange,
  disabled,
  selectVariant = 'radio',
}: FieldRendererProps) {
  const stringValue = typeof value === 'string' ? value : ''

  if (selectVariant === 'radio') {
    return (
      <FieldWrapper field={field} error={error} touched={touched}>
        <div className="flex flex-col gap-2">
          {(field.options || []).map((opt) => {
            const isSelected = stringValue === opt.value
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-md text-sm transition ${
                  isSelected ? 'text-signoz_robin-500' : 'text-gray-400'
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
                    isSelected ? 'border-signoz_robin-500' : 'border-signoz_slate-100'
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
    <FieldWrapper field={field} error={error} touched={touched}>
      <div className="flex flex-wrap gap-2">
        {(field.options || []).map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm transition disabled:opacity-50 ${
              stringValue === opt.value
                ? 'border-signoz_robin-500 bg-signoz_robin-500/10 text-signoz_robin-500'
                : 'border-signoz_slate-400 bg-signoz_ink-400 text-gray-400 hover:border-signoz_slate-200 hover:text-signoz_vanilla-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FieldWrapper>
  )
}
