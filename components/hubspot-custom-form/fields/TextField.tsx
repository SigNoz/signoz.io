'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

const INPUT_TYPE_MAP: Record<string, string> = {
  single_line_text: 'text',
  email: 'email',
  phone: 'tel',
  number: 'number',
}

export default function TextField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
  theme = 'dark',
}: FieldRendererProps) {
  const inputType = INPUT_TYPE_MAP[field.fieldType] || 'text'
  const stringValue = typeof value === 'string' ? value : ''
  const t = themeStyles[theme]

  return (
    <FieldWrapper field={field} error={error} touched={touched} theme={theme}>
      <input
        type={inputType}
        name={field.name}
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={field.placeholder || ''}
        min={field.validation?.minAllowedValue}
        max={field.validation?.maxAllowedValue}
        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition [appearance:textfield] focus:ring-1 disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${t.input}`}
      />
    </FieldWrapper>
  )
}
