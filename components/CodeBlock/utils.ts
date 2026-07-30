import { isValidElement, type ReactElement, type ReactNode } from 'react'
import type { HighlightKind, MinimapLineMeta } from './types'

export const DEFAULT_COLLAPSE_THRESHOLD = 20

const REACT_LAZY_TYPE = Symbol.for('react.lazy')

type LazyElement = ReactElement & {
  $$typeof: symbol
  _payload?: { status?: string | number; value?: ReactNode }
}

function isLazyElement(node: unknown): node is LazyElement {
  return (
    typeof node === 'object' && node !== null && (node as LazyElement).$$typeof === REACT_LAZY_TYPE
  )
}

export function unwrapReactNode(node: ReactNode): ReactNode {
  if (!isLazyElement(node)) return node
  const payload = node._payload
  const status = payload?.status
  // React 19 uses string statuses; older builds used numeric enums (1 = fulfilled).
  const fulfilled = status === 'fulfilled' || status === 1
  if (fulfilled && payload && 'value' in payload) {
    return unwrapReactNode(payload.value as ReactNode)
  }
  return null
}

export function hasDataAttr(props: Record<string, unknown>, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(props, name)
}

export function getTextContent(node: ReactNode): string {
  node = unwrapReactNode(node)
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)

  if (Array.isArray(node)) {
    const lineNodes = node.filter((child): child is ReactElement => {
      const unwrapped = unwrapReactNode(child)
      return (
        isValidElement(unwrapped) &&
        !isLazyElement(unwrapped) &&
        hasDataAttr((unwrapped as ReactElement).props as Record<string, unknown>, 'data-line')
      )
    })
    if (lineNodes.length > 0) {
      return lineNodes
        .map((line) => {
          const el = unwrapReactNode(line) as ReactElement
          return getTextContent((el.props as { children?: ReactNode }).children).replace(/\n$/, '')
        })
        .join('\n')
    }

    return node.map((child) => getTextContent(child)).join('')
  }

  if (isValidElement(node)) {
    return getTextContent((node.props as { children?: ReactNode }).children)
  }

  return ''
}

export function countCodeLines(node: ReactNode): number {
  node = unwrapReactNode(node)
  if (node == null) return 0

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
    n = unwrapReactNode(n)
    if (n == null) return
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
