'use client'

import { forwardRef, useContext, useRef, useState } from 'react'
import { cn } from 'app/lib/utils'
import { CodeBlockCopyButton } from './code-block-copy-button'
import { CodeBlockMinimap } from './code-block-minimap'
import styles from './code-block.module.css'
import { CodeTabsContext } from './code-tabs'
import { FileIcon } from './icons'
import type { CodeBlockProps } from './types'
import {
  DEFAULT_COLLAPSE_THRESHOLD,
  collectMinimapLines,
  countCodeLines,
  getTextContent,
} from './utils'

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  {
    children,
    className,
    title,
    showMinimap = false,
    collapsible = true,
    collapseThreshold = DEFAULT_COLLAPSE_THRESHOLD,
    defaultExpanded = true,
    testId,
    preProps,
  },
  ref
) {
  const { insideTabs } = useContext(CodeTabsContext)
  const preRef = useRef<HTMLPreElement>(null)

  const lineCount = countCodeLines(children)
  const minimapLines = collectMinimapLines(children)
  const copyText = getTextContent(children).replace(/\n$/, '')

  const canCollapse = collapsible && lineCount > collapseThreshold
  const [expanded, setExpanded] = useState(defaultExpanded)

  const hasTopBar = Boolean(title) && !insideTabs

  return (
    <div
      ref={ref}
      className={cn(
        styles.root,
        canCollapse && !expanded && styles.collapsed,
        insideTabs && styles.nested,
        className
      )}
      data-slot="code-block"
      data-sz-codeblock=""
      data-expanded={canCollapse ? expanded : undefined}
      data-testid={testId}
    >
      {hasTopBar ? (
        <div className={styles.header}>
          <div className={styles.tabList}>
            <span className={styles.fileTitle}>
              <FileIcon className={styles.titleIcon} />
              <span className={styles.title}>{title}</span>
            </span>
          </div>
          <CodeBlockCopyButton
            text={copyText}
            className={cn(styles.copy, styles.copyHoverReveal)}
          />
        </div>
      ) : null}

      <div className={styles.body}>
        <div className={styles.codePane}>
          {!hasTopBar && !insideTabs ? (
            <CodeBlockCopyButton
              text={copyText}
              withLabel
              className={cn(styles.copy, styles.copyFloating)}
            />
          ) : null}
          <pre
            ref={preRef}
            {...preProps}
            className={cn(
              styles.pre,
              typeof preProps?.className === 'string' ? preProps.className : undefined
            )}
          >
            {children}
          </pre>
        </div>
        {showMinimap ? <CodeBlockMinimap lines={minimapLines} preRef={preRef} /> : null}
      </div>

      {canCollapse ? (
        <button
          type="button"
          className={styles.collapseToggle}
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? 'Collapse' : `Expand ${lineCount} lines`}
        </button>
      ) : null}
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export default CodeBlock
