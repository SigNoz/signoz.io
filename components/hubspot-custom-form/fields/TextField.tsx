'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
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
}: FieldRendererProps) {
  const inputType = INPUT_TYPE_MAP[field.fieldType] || 'text'
  const stringValue = typeof value === 'string' ? value : ''

  return (
    <FieldWrapper field={field} error={error} touched={touched}>
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
        className="w-full rounded-md border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-3 text-sm text-signoz_vanilla-300 placeholder-gray-500/50 outline-none transition focus:border-signoz_robin-500 focus:ring-1 focus:ring-signoz_robin-500 disabled:opacity-50"
      />
    </FieldWrapper>
  )
}
