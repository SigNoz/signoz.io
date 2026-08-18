'use client'

import type { HTMLAttributes } from 'react'
import { CodeBlock } from './code-block'
import type { CodeBlockMdxProps } from './types'
import { DEFAULT_COLLAPSE_THRESHOLD } from './utils'

export default function CodeBlockMdx({
  children,
  className,
  title: titleProp,
  showMinimap: showMinimapProp,
  collapsible: collapsibleProp,
  collapseThreshold: collapseThresholdProp,
  defaultExpanded: defaultExpandedProp,
  ...rest
}: CodeBlockMdxProps) {
  const title =
    titleProp || (typeof rest['data-code-title'] === 'string' ? rest['data-code-title'] : undefined)

  const showMinimap = showMinimapProp ?? rest['data-minimap'] != null
  const noCollapse = rest['data-no-collapse'] != null
  const collapsible = collapsibleProp ?? !noCollapse
  const defaultExpanded =
    defaultExpandedProp ?? (rest['data-default-collapsed'] != null ? false : true)

  const thresholdFromData =
    typeof rest['data-collapse-threshold'] === 'string'
      ? Number(rest['data-collapse-threshold'])
      : NaN
  const collapseThreshold =
    collapseThresholdProp ??
    (Number.isFinite(thresholdFromData) ? thresholdFromData : DEFAULT_COLLAPSE_THRESHOLD)

  const {
    'data-code-title': _title,
    'data-minimap': _minimap,
    'data-no-collapse': _noCollapse,
    'data-default-collapsed': _defaultCollapsed,
    'data-collapse-threshold': _threshold,
    'data-no-line-numbers': _noLineNumbers,
    ...preProps
  } = rest

  return (
    <CodeBlock
      className={className}
      title={title}
      showMinimap={showMinimap}
      collapsible={collapsible}
      collapseThreshold={collapseThreshold}
      defaultExpanded={defaultExpanded}
      preProps={preProps as HTMLAttributes<HTMLPreElement>}
    >
      {children}
    </CodeBlock>
  )
}
