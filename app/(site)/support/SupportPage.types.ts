import { ReactNode } from 'react'

export interface SupportTier {
  name: string
  subtitle?: string
  cta?: {
    text: string
    href: string
    variant: 'default' | 'secondary'
    tracking: { clickType: string; clickName: string }
  }
}

export type CellValue =
  | { type: 'text'; value: string }
  | { type: 'check' }
  | { type: 'dash' }
  | { type: 'link'; text: string; href: string }
  | { type: 'check-text'; value: string }

export interface TableRow {
  label: string | ReactNode
  community: CellValue
  teams: CellValue
  enterprise: CellValue
}

export interface TableCategory {
  name: string
  rows: TableRow[]
}

export interface SeverityDefinition {
  level: string
  description: string
  example: string
}

export interface SupportStat {
  value: string
  title: string
  description: string
}

export interface EscalationStep {
  level: string
  title: string
  description: string
}

export interface ContactChannel {
  category: string
  items: { icon?: string; text: string; description?: string; href?: string }[]
}

export interface ReachUsButton {
  text: string
  href: string
  variant: 'default' | 'secondary'
  icon?: ReactNode
  tracking: { clickType: string; clickName: string; clickLocation: string }
}

export interface WhyDifferentItem {
  title: string
  description: string
}

export interface ComplianceBadge {
  src: string
  alt: string
  width: number
  height: number
}
