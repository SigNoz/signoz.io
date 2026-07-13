import type React from 'react'

export type CellValue =
  | { type: 'check'; label?: string }
  | { type: 'cross'; label?: string }
  | { type: 'dash' }
  | { type: 'text'; content: string | React.ReactNode }
  | { type: 'badge'; icon: 'clock' | 'flame' | 'cloud' | 'server'; label: string }

export type ComparisonCategory = {
  category: string
  rows: {
    feature: string
    signoz: CellValue
    clickstack: CellValue
  }[]
}
