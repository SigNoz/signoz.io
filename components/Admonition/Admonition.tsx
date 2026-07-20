'use client'

import { Callout } from '@signozhq/ui/callout'
import type { CalloutColor, CalloutProps } from '@signozhq/ui/callout'

type AdmonitionSizeVariant = 'sm' | 'lg'

export type AdmonitionProps = {
  type?: string
  title?: string
  variant?: AdmonitionSizeVariant
  defaultCollapsed?: boolean | 'true' | 'false'
  children?: React.ReactNode
  className?: string
}

type CalloutMapping = {
  type: NonNullable<CalloutProps['type']>
  color: CalloutColor
}

const getCalloutMapping = (type?: string): CalloutMapping => {
  switch (type) {
    case 'tip':
      return { type: 'success', color: 'forest' }
    case 'warning':
      return { type: 'warning', color: 'amber' }
    case 'danger':
      return { type: 'error', color: 'cherry' }
    case 'important':
      return { type: 'info', color: 'aqua' }
    case 'info':
    case 'note':
    default:
      return { type: 'info', color: 'robin' }
  }
}

const getTitle = (type?: string) => {
  switch (type) {
    case 'tip':
      return 'Tip'
    case 'warning':
      return 'Warning'
    case 'danger':
      return 'Danger'
    case 'info':
      return 'Info'
    case 'important':
      return 'Important'
    default:
      return 'Note'
  }
}

const Admonition = ({
  type,
  title,
  variant,
  defaultCollapsed,
  children,
  className,
}: AdmonitionProps) => {
  const mapping = getCalloutMapping(type)
  const displayTitle = title ?? getTitle(type)
  const size = variant === 'sm' ? 'small' : 'medium'
  const isDefaultCollapsed = defaultCollapsed === true || defaultCollapsed === 'true'

  return (
    <Callout
      title={displayTitle}
      type={mapping.type}
      color={mapping.color}
      size={size}
      showIcon
      action="expandable"
      defaultExpanded={!isDefaultCollapsed}
      className={className}
    >
      {children}
    </Callout>
  )
}

export default Admonition
