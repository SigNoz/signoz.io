'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function FileField({
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
        type="file"
        name={field.name}
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0]
          onChange(file ? file.name : stringValue)
        }}
        onBlur={onBlur}
        className={`file:bg-primary/10 file:text-primary w-full rounded-md border px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:px-3 file:py-1 file:text-sm disabled:opacity-50 ${t.input}`}
      />
    </FieldWrapper>
  )
}
