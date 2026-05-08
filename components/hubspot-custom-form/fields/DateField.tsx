'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function DateField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
  theme = 'dark',
}: FieldRendererProps) {
  const stringValue = typeof value === 'string' ? value : ''
  const t = themeStyles[theme]

  return (
    <FieldWrapper field={field} error={error} touched={touched} theme={theme}>
      <input
        type="date"
        name={field.name}
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:ring-1 disabled:opacity-50 ${t.input}`}
      />
    </FieldWrapper>
  )
}
