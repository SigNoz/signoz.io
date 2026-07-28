import { isValidElement, type ReactNode } from 'react'
import type { HighlightKind, MinimapLineMeta } from './types'

export const DEFAULT_COLLAPSE_THRESHOLD = 20

export function hasDataAttr(props: Record<string, unknown>, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(props, name)
}

export function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) {
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

export function countCodeLines(node: ReactNode): number {
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

export function collectMinimapLines(node: ReactNode): MinimapLineMeta[] {
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

export function minimapLineWidthPercent(length: number, maxLength: number): number {
  if (maxLength <= 0 || length <= 0) return 22
  return Math.round(22 + (length / maxLength) * 70)
}
