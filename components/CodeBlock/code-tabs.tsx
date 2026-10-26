'use client'

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useMemo,
  useState,
  type ReactElement,
} from 'react'
import { cn } from 'app/lib/utils'
import { CodeBlockCopyButton } from './code-block-copy-button'
import styles from './code-block.module.css'
import { FileIcon } from './icons'
import type { CodeTabProps, CodeTabsContextValue, CodeTabsProps } from './types'
import { getTextContent } from './utils'

export const CodeTabsContext = createContext<CodeTabsContextValue>({
  insideTabs: false,
})

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>
}
CodeTab.displayName = 'CodeTab'

export const CodeTabs = forwardRef<HTMLDivElement, CodeTabsProps>(function CodeTabs(
  { children, className },
  ref
) {
  const tabs = Children.toArray(children).filter((child): child is ReactElement<CodeTabProps> =>
    isValidElement(child)
  )

  const defaultValue =
    tabs.find((tab) => tab.props.default)?.props.value ?? tabs[0]?.props.value ?? null

  const [activeOverride, setActiveOverride] = useState<string | null>(null)
  const active =
    activeOverride && tabs.some((tab) => tab.props.value === activeOverride)
      ? activeOverride
      : defaultValue

  const contextValue = useMemo<CodeTabsContextValue>(() => ({ insideTabs: true }), [])

  if (tabs.length === 0) return null

  const activeTab = tabs.find((tab) => tab.props.value === active) ?? tabs[0]
  const activeCopyText = getTextContent(activeTab.props.children).replace(/\n$/, '')

  return (
    <CodeTabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(styles.root, className)}
        data-slot="code-block"
        data-sz-codeblock=""
        data-sz-codeblock-tabs=""
      >
        <div className={styles.header}>
          <div className={styles.tabList} role="tablist">
            {tabs.map((tab) => {
              const selected = tab.props.value === activeTab.props.value
              return (
                <button
                  key={tab.props.value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(styles.tab, styles.tabButton, selected && styles.tabActive)}
                  onClick={() => setActiveOverride(tab.props.value)}
                >
                  <span className={styles.tabInner}>
                    {tab.props.icon ?? <FileIcon className={styles.tabIcon} />}
                    <span>{tab.props.label}</span>
                  </span>
                  <span className={styles.tabUnderline} aria-hidden="true" />
                </button>
              )
            })}
          </div>
          <CodeBlockCopyButton
            text={activeCopyText}
            className={cn(styles.copy, styles.copyHoverReveal)}
          />
        </div>
        <div className={styles.tabPanel} role="tabpanel">
          {activeTab}
        </div>
      </div>
    </CodeTabsContext.Provider>
  )
})
CodeTabs.displayName = 'CodeTabs'
