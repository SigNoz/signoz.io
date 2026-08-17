import type { ReactNode } from 'react'

export type CodeBlockProps = {
  children?: ReactNode
  className?: string
  title?: string
  showMinimap?: boolean
  collapsible?: boolean
  collapseThreshold?: number
  defaultExpanded?: boolean
  testId?: string
  preProps?: React.HTMLAttributes<HTMLPreElement>
}

export type CodeBlockMdxProps = {
  children?: ReactNode
  className?: string
  title?: string
  showMinimap?: boolean
  collapsible?: boolean
  collapseThreshold?: number
  defaultExpanded?: boolean
  'data-code-title'?: string
  'data-minimap'?: string
  'data-no-collapse'?: string
  'data-default-collapsed'?: string
  'data-collapse-threshold'?: string
  'data-no-line-numbers'?: string
  'data-language'?: string
  [key: string]: unknown
}

export type CodeTabProps = {
  value: string
  label: string
  default?: boolean
  children?: ReactNode
  icon?: ReactNode
}

export type CodeTabsProps = {
  children: ReactNode
  className?: string
  entityName?: string
}

export type HighlightKind = 'none' | 'robin' | 'cherry' | 'forest' | 'amber'

export type MinimapLineMeta = {
  length: number
  kind: HighlightKind
}

export type CodeTabsContextValue = {
  insideTabs: boolean
}
