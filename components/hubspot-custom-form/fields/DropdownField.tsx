'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import type { FieldRendererProps } from '../types'
import { themeStyles } from '../types'
import FieldWrapper from './FieldWrapper'

export default function DropdownField({
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
      <Select
        value={stringValue || undefined}
        onValueChange={(val) => onChange(val)}
        disabled={disabled}
      >
        <SelectTrigger
          onBlur={onBlur}
          className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:ring-1 disabled:opacity-50 ${t.input}`}
        >
          <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
        </SelectTrigger>
        <SelectContent>
          {(field.options || []).map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}
