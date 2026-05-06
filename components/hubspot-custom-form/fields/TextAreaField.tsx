'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function TextAreaField({
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
      <textarea
        name={field.name}
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={field.placeholder || ''}
        rows={2}
        className={`w-full resize-none rounded-md border px-4 py-3 text-sm outline-none transition focus:ring-1 disabled:opacity-50 ${t.input}`}
      />
    </FieldWrapper>
  )
}
