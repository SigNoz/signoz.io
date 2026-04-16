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
import FieldWrapper from './FieldWrapper'

export default function DropdownField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
}: FieldRendererProps) {
  const stringValue = typeof value === 'string' ? value : ''

  return (
    <FieldWrapper field={field} error={error} touched={touched}>
      <Select
        value={stringValue || undefined}
        onValueChange={(val) => onChange(val)}
        disabled={disabled}
      >
        <SelectTrigger
          onBlur={onBlur}
          className="w-full rounded-md border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-3 text-sm text-signoz_vanilla-300 outline-none transition hover:bg-signoz_ink-400 focus:border-signoz_robin-500 focus:ring-1 focus:ring-signoz_robin-500 disabled:opacity-50"
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
