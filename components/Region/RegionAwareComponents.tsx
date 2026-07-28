'use client'

import React, { Children, isValidElement, cloneElement, ReactNode } from 'react'
import CodeBlock from '@/components/CodeBlock'
import { useRegion } from './RegionContext'

// CodeBlock copy control uses this aria-label.
const COPY_BUTTON_SELECTOR = '[aria-label="Copy code"]'

// Use Element (not HTMLElement): the button's icon is an <svg>/<path>, which are
// SVGElement, so an HTMLElement check would miss hovers/clicks on the icon itself.
const isCopyButtonTarget = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest(COPY_BUTTON_SELECTOR)

type Replacement = {
  search: string
  replace: string
}

const getTextContent = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node
  }
  if (typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('')
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return getTextContent(props.children)
  }
  return ''
}

type TextLeafRef = { value: string }

/**
 * Collect depth-first text leaves so we can substitute placeholders that Shiki
 * may have split across spans (e.g. `<` + `region` + `>`) without flattening
 * the highlighted tree (which drops [data-line] padding and colors).
 */
const collectTextLeaves = (node: ReactNode, leaves: TextLeafRef[]): void => {
  if (typeof node === 'string' || typeof node === 'number') {
    leaves.push({ value: String(node) })
    return
  }
  if (Array.isArray(node)) {
    node.forEach((child) => collectTextLeaves(child, leaves))
    return
  }
  if (isValidElement(node)) {
    collectTextLeaves((node.props as { children?: ReactNode }).children, leaves)
  }
}

const applyReplacementsToLeaves = (leaves: TextLeafRef[], replacements: Replacement[]) => {
  const combined = leaves.map((leaf) => leaf.value).join('')
  if (!replacements.some(({ search }) => combined.includes(search))) return false

  type Range = { start: number; end: number; replace: string }
  const ranges: Range[] = []
  for (const { search, replace } of replacements) {
    let from = 0
    while (from <= combined.length) {
      const index = combined.indexOf(search, from)
      if (index === -1) break
      ranges.push({ start: index, end: index + search.length, replace })
      from = index + search.length
    }
  }
  if (ranges.length === 0) return false
  ranges.sort((a, b) => a.start - b.start)

  const starts: number[] = []
  let cursor = 0
  for (const leaf of leaves) {
    starts.push(cursor)
    cursor += leaf.value.length
  }

  let rangeIndex = 0
  for (let leafIndex = 0; leafIndex < leaves.length; leafIndex++) {
    const leafStart = starts[leafIndex]
    const leafText = leaves[leafIndex].value
    let local = 0
    let out = ''

    while (local < leafText.length) {
      const abs = leafStart + local
      while (rangeIndex < ranges.length && ranges[rangeIndex].end <= abs) {
        rangeIndex++
      }
      const range = rangeIndex < ranges.length ? ranges[rangeIndex] : null

      if (range && abs >= range.start && abs < range.end) {
        if (abs === range.start) out += range.replace
        local = Math.min(leafText.length, range.end - leafStart)
        continue
      }

      out += leafText[local]
      local++
    }

    leaves[leafIndex].value = out
  }

  return true
}

const rebuildWithLeaves = (
  node: ReactNode,
  leaves: TextLeafRef[],
  index: { at: number }
): ReactNode => {
  if (typeof node === 'string' || typeof node === 'number') {
    return leaves[index.at++]?.value ?? ''
  }
  if (Array.isArray(node)) {
    return Children.toArray(node.map((child) => rebuildWithLeaves(child, leaves, index)))
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    if (props.children == null) return node
    return cloneElement(node as React.ReactElement<{ children?: ReactNode }>, {
      children: rebuildWithLeaves(props.children, leaves, index),
    })
  }
  return node
}

const processCodeChildren = (children: ReactNode, replacements: Replacement[]): ReactNode => {
  if (replacements.length === 0) return children

  const leaves: TextLeafRef[] = []
  collectTextLeaves(children, leaves)
  if (leaves.length === 0) return children

  const changed = applyReplacementsToLeaves(leaves, replacements)
  if (!changed) return children

  // Fast path: single string child
  if (typeof children === 'string' || typeof children === 'number') {
    return leaves[0]?.value ?? ''
  }

  return rebuildWithLeaves(children, leaves, { at: 0 })
}

export const RegionAwarePre = (props: any) => {
  const { region, notifyRegionCopy, isOnboarding } = useRegion()

  const replacements = React.useMemo(() => {
    const list: Replacement[] = []
    if (region && region !== 'none') {
      list.push({ search: '<region>', replace: region })
    }
    return list
  }, [region])

  // Only blocks that originally carry a `<region>` placeholder are region-aware.
  // Use the combined text content (not per-node): syntax highlighting tokenizes
  // `<region>` across separate spans, so a per-node check would miss it — the same
  // reason processCodeChildren falls back to combined text for substitution.
  const isRegionAware = React.useMemo(
    () => getTextContent(props.children).includes('<region>'),
    [props.children]
  )

  const modifiedChildren = React.useMemo(() => {
    if (replacements.length === 0) return props.children
    return processCodeChildren(props.children, replacements)
  }, [props.children, replacements])

  const renderedChildren = Array.isArray(modifiedChildren)
    ? Children.toArray(modifiedChildren)
    : modifiedChildren

  const [hintVisible, setHintVisible] = React.useState(false)

  if (!isRegionAware || isOnboarding) {
    return <CodeBlock {...props}>{renderedChildren}</CodeBlock>
  }

  // What the copy button actually puts on the clipboard (region already substituted).
  const copiedText = getTextContent(modifiedChildren)
  const selectedRegion = region && region !== 'none' ? region : ''

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isCopyButtonTarget(e.target)) {
      notifyRegionCopy(copiedText)
    }
  }

  return (
    <div
      className="relative"
      onClickCapture={handleClickCapture}
      onMouseOver={(e) => isCopyButtonTarget(e.target) && setHintVisible(true)}
      onMouseLeave={() => setHintVisible(false)}
    >
      <CodeBlock {...props}>{renderedChildren}</CodeBlock>
      {hintVisible && (
        <div
          role="tooltip"
          className="absolute right-2 top-12 z-20 w-56 rounded-md border border-signoz_slate-500 bg-signoz_ink-400 px-3 py-2 text-xs leading-snug text-signoz_vanilla-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
        >
          {selectedRegion ? (
            <>
              Heads up: this snippet uses the{' '}
              <code className="rounded bg-signoz_slate-400 px-1 py-0.5 font-semibold">
                {selectedRegion}
              </code>{' '}
              region. Double-check it matches your workspace region before copying.
            </>
          ) : (
            <>
              Set your workspace region above — this snippet still uses the{' '}
              <code className="rounded bg-signoz_slate-400 px-1 py-0.5 font-semibold">
                &lt;region&gt;
              </code>{' '}
              placeholder.
            </>
          )}
        </div>
      )}
    </div>
  )
}

export const RegionAwareCode = (props: any) => {
  const { region } = useRegion()

  const replacements = React.useMemo(() => {
    const list: Replacement[] = []
    if (region && region !== 'none') {
      list.push({ search: '<region>', replace: region })
    }
    return list
  }, [region])

  const modifiedChildren = React.useMemo(() => {
    if (replacements.length === 0) return props.children
    return processCodeChildren(props.children, replacements)
  }, [props.children, replacements])

  return (
    <code {...props}>
      {Array.isArray(modifiedChildren) ? Children.toArray(modifiedChildren) : modifiedChildren}
    </code>
  )
}
