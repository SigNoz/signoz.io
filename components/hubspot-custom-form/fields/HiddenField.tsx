'use client'

import React from 'react'
import type { FieldRendererProps } from '../types'

export default function HiddenField({ field, value }: FieldRendererProps) {
  const stringValue = typeof value === 'string' ? value : field.defaultValue || ''

  return <input type="hidden" name={field.name} value={stringValue} />
}
