import React, { Children, isValidElement, cloneElement, type ReactNode } from 'react'
import { unwrapReactNode } from '@/components/CodeBlock/utils'

export type Replacement = {
  search: string
  replace: string
}

type TextLeafRef = { value: string }

/**
 * Collect depth-first text leaves so we can substitute placeholders that Shiki
 * may have split across spans (e.g. `<` + `region` + `>`) without flattening
 * the highlighted tree (which drops [data-line] padding and colors).
 */
const collectTextLeaves = (node: ReactNode, leaves: TextLeafRef[]): void => {
  node = unwrapReactNode(node)
  if (node == null) return
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
  node = unwrapReactNode(node)
  if (node == null) return null
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

/**
 * Substitute placeholders in a React children tree without flattening Shiki spans.
 * Placeholders that span multiple text leaves (e.g. `<` + `region` + `>`) are handled.
 */
export const processCodeChildren = (
  children: ReactNode,
  replacements: Replacement[]
): ReactNode => {
  if (replacements.length === 0) return children

  const resolved = unwrapReactNode(children) ?? children

  const leaves: TextLeafRef[] = []
  collectTextLeaves(resolved, leaves)
  if (leaves.length === 0) return children

  const changed = applyReplacementsToLeaves(leaves, replacements)
  if (!changed) return children

  // Fast path: single string child
  if (typeof resolved === 'string' || typeof resolved === 'number') {
    return leaves[0]?.value ?? ''
  }

  return rebuildWithLeaves(resolved, leaves, { at: 0 })
}
