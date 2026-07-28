'use client'

import React, {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from 'app/lib/utils'
import styles from './CodeBlock.module.css'

function hasDataAttr(props: Record<string, unknown>, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(props, name)
}

const DEFAULT_COLLAPSE_THRESHOLD = 20

type CodeTabsContextValue = {
  insideTabs: boolean
}

const CodeTabsContext = createContext<CodeTabsContextValue>({
  insideTabs: false,
})

export type CodeBlockProps = {
  children?: ReactNode
  className?: string
  title?: string
  /** Show minimap strip on the right. */
  showMinimap?: boolean
  /** When false, never show collapse controls. Default true. */
  collapsible?: boolean
  /** Line count above which collapse controls appear. Default 20. */
  collapseThreshold?: number
  /** Start expanded. Default true (use `defaultCollapsed` fence meta to start collapsed). */
  defaultExpanded?: boolean
  /** data-* from rehype pipeline */
  'data-code-title'?: string
  'data-minimap'?: string
  'data-no-collapse'?: string
  'data-default-collapsed'?: string
  'data-collapse-threshold'?: string
  'data-no-line-numbers'?: string
  'data-language'?: string
  [key: string]: unknown
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) {
    // Shiki grid lines are sibling spans without literal newlines — rejoin them.
    const parts: string[] = []
    let sawDataLine = false
    for (const child of node) {
      if (
        isValidElement(child) &&
        hasDataAttr(child.props as Record<string, unknown>, 'data-line')
      ) {
        if (sawDataLine) parts.push('\n')
        sawDataLine = true
      }
      parts.push(getTextContent(child))
    }
    return parts.join('')
  }
  if (isValidElement(node)) {
    return getTextContent((node.props as { children?: ReactNode }).children)
  }
  return ''
}

function countCodeLines(node: ReactNode): number {
  // Only count Shiki/rehype-pretty-code line rows. Do not split text nodes —
  // interstitial "\n" between [data-line] spans would inflate the count
  // ("\n".split("\n") === ["", ""] → 2).
  if (!isValidElement(node)) {
    if (Array.isArray(node)) {
      return node.reduce<number>((sum, child) => sum + countCodeLines(child), 0)
    }
    return 0
  }

  const props = node.props as Record<string, unknown>
  if (hasDataAttr(props, 'data-line')) {
    return 1
  }

  return countCodeLines(props.children as ReactNode)
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

type HighlightKind = 'none' | 'robin' | 'cherry' | 'forest' | 'amber'

type MinimapLineMeta = {
  length: number
  kind: HighlightKind
}

const MINIMAP_KIND_CLASS: Record<'robin' | 'cherry' | 'forest' | 'amber', string> = {
  robin: styles.minimapRobin,
  cherry: styles.minimapCherry,
  forest: styles.minimapForest,
  amber: styles.minimapAmber,
}

/** Minimap bars span ~22–92% of the rail based on line length (Figma-ish). */
function minimapLineWidthPercent(length: number, maxLength: number): number {
  if (maxLength <= 0 || length <= 0) return 22
  return Math.round(22 + (length / maxLength) * 70)
}

function CodeBlockMinimap({
  lines,
  preRef,
}: {
  lines: MinimapLineMeta[]
  preRef: React.RefObject<HTMLPreElement | null>
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [viewport, setViewport] = useState({ top: 0, height: 1, scrollable: false })

  const maxLength = useMemo(
    () => lines.reduce((max, line) => Math.max(max, line.length), 0),
    [lines]
  )

  const syncViewport = useCallback(() => {
    const pre = preRef.current
    if (!pre) return
    const { scrollTop, scrollHeight, clientHeight } = pre
    if (scrollHeight <= 0) {
      setViewport({ top: 0, height: 1, scrollable: false })
      return
    }
    const scrollable = scrollHeight - clientHeight > 1
    setViewport({
      top: scrollTop / scrollHeight,
      height: Math.min(1, clientHeight / scrollHeight),
      scrollable,
    })
  }, [preRef])

  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    syncViewport()
    pre.addEventListener('scroll', syncViewport, { passive: true })
    const observer = new ResizeObserver(syncViewport)
    observer.observe(pre)
    return () => {
      pre.removeEventListener('scroll', syncViewport)
      observer.disconnect()
    }
  }, [preRef, syncViewport, lines.length])

  /** Map a Y ratio on the track to pre scrollTop (center the click). */
  const scrollToTrackRatio = useCallback(
    (ratio: number, behavior: ScrollBehavior = 'auto') => {
      const pre = preRef.current
      if (!pre) return
      const maxScroll = Math.max(0, pre.scrollHeight - pre.clientHeight)
      if (maxScroll <= 0) return

      const clamped = Math.max(0, Math.min(1, ratio))
      const nextTop = clamped * pre.scrollHeight - pre.clientHeight / 2
      pre.scrollTo({
        top: Math.max(0, Math.min(nextTop, maxScroll)),
        behavior,
      })
    },
    [preRef]
  )

  const ratioFromPointer = useCallback((clientY: number) => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()
    if (rect.height <= 0) return 0
    return (clientY - rect.top) / rect.height
  }, [])

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return
      event.preventDefault()
      draggingRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      scrollToTrackRatio(ratioFromPointer(event.clientY))
    },
    [ratioFromPointer, scrollToTrackRatio]
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      scrollToTrackRatio(ratioFromPointer(event.clientY))
    },
    [ratioFromPointer, scrollToTrackRatio]
  )

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  if (lines.length <= 0) return null

  const viewportStyle: CSSProperties | undefined = viewport.scrollable
    ? {
        top: `${viewport.top * 100}%`,
        height: `${viewport.height * 100}%`,
      }
    : undefined

  return (
    <div className={styles.minimap}>
      <div
        ref={trackRef}
        className={styles.minimapTrack}
        role="scrollbar"
        aria-label="Code minimap"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(viewport.top * 100)}
        aria-disabled={!viewport.scrollable}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          const pre = preRef.current
          if (!pre) return
          const maxScroll = Math.max(0, pre.scrollHeight - pre.clientHeight)
          if (maxScroll <= 0) return
          const step = pre.clientHeight * 0.8
          if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault()
            pre.scrollTo({ top: Math.min(pre.scrollTop + step, maxScroll) })
          } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault()
            pre.scrollTo({ top: Math.max(pre.scrollTop - step, 0) })
          } else if (event.key === 'Home') {
            event.preventDefault()
            pre.scrollTo({ top: 0 })
          } else if (event.key === 'End') {
            event.preventDefault()
            pre.scrollTo({ top: maxScroll })
          }
        }}
      >
        <div className={styles.minimapContent}>
          {lines.map((line, i) => {
            const kind = line.kind
            return (
              <div
                key={i}
                className={cn(
                  styles.minimapLine,
                  kind !== 'none' ? MINIMAP_KIND_CLASS[kind] : undefined
                )}
                style={{ width: `${minimapLineWidthPercent(line.length, maxLength)}%` }}
              />
            )
          })}
        </div>
        {viewportStyle ? <div className={styles.minimapViewport} style={viewportStyle} /> : null}
      </div>
    </div>
  )
}

function collectMinimapLines(node: ReactNode): MinimapLineMeta[] {
  const lines: MinimapLineMeta[] = []

  const walk = (n: ReactNode) => {
    if (!isValidElement(n)) {
      if (Array.isArray(n)) n.forEach(walk)
      return
    }
    const props = n.props as Record<string, unknown>
    if (hasDataAttr(props, 'data-line')) {
      const id = String(props['data-highlighted-line-id'] ?? '').toLowerCase()
      const highlighted = hasDataAttr(props, 'data-highlighted-line')
      let kind: HighlightKind = 'none'
      if (id === 'cherry' || id === 'forest' || id === 'amber' || id === 'robin') {
        kind = id
      } else if (highlighted) {
        kind = 'robin'
      }
      lines.push({
        length: getTextContent(props.children as ReactNode).replace(/\n/g, '').length,
        kind,
      })
      return
    }
    walk(props.children as ReactNode)
  }

  walk(node)
  return lines
}

function CopyButton({
  text,
  className,
  withLabel = false,
}: {
  text: string
  className?: string
  withLabel?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can fail in insecure contexts; fail silently.
    }
  }, [text])

  return (
    <button type="button" aria-label="Copy code" className={className} onClick={onCopy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      {withLabel ? <span>{copied ? 'Copied' : 'Copy'}</span> : null}
    </button>
  )
}

export default function CodeBlock({
  children,
  className,
  title: titleProp,
  showMinimap: showMinimapProp,
  collapsible: collapsibleProp,
  collapseThreshold: collapseThresholdProp,
  defaultExpanded: defaultExpandedProp,
  ...rest
}: CodeBlockProps) {
  const { insideTabs } = useContext(CodeTabsContext)
  const preRef = useRef<HTMLPreElement>(null)

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

  const lineCount = useMemo(() => countCodeLines(children), [children])
  const minimapLines = useMemo(() => collectMinimapLines(children), [children])
  const copyText = useMemo(() => getTextContent(children).replace(/\n$/, ''), [children])

  const canCollapse = collapsible && lineCount > collapseThreshold
  const [expanded, setExpanded] = useState(defaultExpanded)

  const hasTopBar = Boolean(title) && !insideTabs

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
    <div
      className={cn(
        styles.root,
        canCollapse && !expanded && styles.collapsed,
        insideTabs && styles.nested,
        className
      )}
      data-sz-codeblock=""
      data-expanded={canCollapse ? expanded : undefined}
    >
      {hasTopBar ? (
        <div className={styles.header}>
          {/* Single filename — static label (Figma underline opacity:0), not an active tab */}
          <div className={styles.tabList}>
            <span className={styles.fileTitle}>
              <FileIcon className={styles.titleIcon} />
              <span className={styles.title}>{title}</span>
            </span>
          </div>
          <CopyButton text={copyText} className={cn(styles.copy, styles.copyHoverReveal)} />
        </div>
      ) : !insideTabs ? (
        <CopyButton text={copyText} withLabel className={cn(styles.copy, styles.copyFloating)} />
      ) : null}

      <div className={styles.body}>
        <pre
          ref={preRef}
          className={cn(
            styles.pre,
            typeof preProps.className === 'string' ? preProps.className : undefined
          )}
          {...(preProps as React.HTMLAttributes<HTMLPreElement>)}
        >
          {children}
        </pre>
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
}

export type CodeTabProps = {
  value: string
  label: string
  default?: boolean
  children?: ReactNode
  icon?: ReactNode
}

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>
}

export type CodeTabsProps = {
  children: ReactNode
  className?: string
  /** Optional URL sync key (mirrors docs Tabs). */
  entityName?: string
}

/**
 * In-chrome tabbed code blocks. Registered for MDX but unused in content for now.
 * Each child should be a <CodeTab> wrapping one or more fenced blocks.
 */
export function CodeTabs({ children, className }: CodeTabsProps) {
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
      <div className={cn(styles.root, className)} data-sz-codeblock="" data-sz-codeblock-tabs="">
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
          <CopyButton text={activeCopyText} className={cn(styles.copy, styles.copyHoverReveal)} />
        </div>
        <div className={styles.tabPanel} role="tabpanel">
          {activeTab}
        </div>
      </div>
    </CodeTabsContext.Provider>
  )
}
