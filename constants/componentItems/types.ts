import type { ReactNode } from 'react'

export interface ComponentItem {
  name: string
  href: string
  clickName: string
  icon?: string | ReactNode
}
