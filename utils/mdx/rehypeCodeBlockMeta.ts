import type { Element, ElementContent, Parents, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const CUSTOM_FLAG_RE =
  /(?:^|\s)(?<flag>noLineNumbers|minimap|noCollapse|defaultCollapsed|collapse(?:=?\{(?<threshold>\d+)\})?)(?=\s|$)/g

export type CodeBlockMetaFlags = {
  noLineNumbers: boolean
  minimap: boolean
  noCollapse: boolean
  defaultCollapsed: boolean
  collapseThreshold: number | null
}

export function parseCodeBlockMetaFlags(meta: string): {
  flags: CodeBlockMetaFlags
  cleanedMeta: string
} {
  const flags: CodeBlockMetaFlags = {
    noLineNumbers: false,
    minimap: false,
    noCollapse: false,
    defaultCollapsed: false,
    collapseThreshold: null,
  }

  let cleanedMeta = meta
  for (const match of meta.matchAll(CUSTOM_FLAG_RE)) {
    const flag = match.groups?.flag
    if (!flag) continue

    if (flag === 'noLineNumbers') flags.noLineNumbers = true
    else if (flag === 'minimap') flags.minimap = true
    else if (flag === 'noCollapse') flags.noCollapse = true
    else if (flag === 'defaultCollapsed') flags.defaultCollapsed = true
    else if (flag.startsWith('collapse')) {
      flags.collapseThreshold = match.groups?.threshold ? Number(match.groups.threshold) : 20
    }

    cleanedMeta = cleanedMeta.replace(match[0], ' ')
  }

  return { flags, cleanedMeta: cleanedMeta.replace(/\s+/g, ' ').trim() }
}

/** Strip custom flags so rehype-pretty-code does not mis-parse them. */
export function filterCodeBlockMetaString(meta: string): string {
  return parseCodeBlockMetaFlags(meta).cleanedMeta
}

/**
 * Before pretty-code: copy custom meta flags onto the parent <pre> as data attrs,
 * and strip those tokens from code.data.meta.
 *
 * Note: rehype-pretty-code later promotes that <pre> into a <figure>, carrying
 * these data attrs onto the figure — rehypeCodeBlockDefaults moves them back.
 */
export const rehypeExtractCodeBlockMeta: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element, _index, parent) => {
      if (node.tagName !== 'code') return
      if (!parent || parent.type !== 'element' || parent.tagName !== 'pre') return

      const rawMeta = String(
        (node.data as { meta?: string } | undefined)?.meta ?? node.properties?.metastring ?? ''
      )
      if (!rawMeta) return

      const { flags, cleanedMeta } = parseCodeBlockMetaFlags(rawMeta)

      if (node.data) {
        ;(node.data as { meta?: string }).meta = cleanedMeta
      } else {
        node.data = { meta: cleanedMeta } as Element['data']
      }
      if (node.properties?.metastring != null) {
        node.properties.metastring = cleanedMeta
      }

      parent.properties = parent.properties ?? {}
      if (flags.noLineNumbers) parent.properties['data-no-line-numbers'] = ''
      if (flags.minimap) parent.properties['data-minimap'] = ''
      if (flags.noCollapse) parent.properties['data-no-collapse'] = ''
      if (flags.defaultCollapsed) parent.properties['data-default-collapsed'] = ''
      if (flags.collapseThreshold != null) {
        parent.properties['data-collapse-threshold'] = String(flags.collapseThreshold)
      }
    })
  }
}

const CODEBLOCK_DATA_KEYS = [
  'data-no-line-numbers',
  'data-minimap',
  'data-no-collapse',
  'data-default-collapsed',
  'data-collapse-threshold',
] as const

/**
 * After pretty-code: enable line numbers by default; flatten figure wrappers so
 * the MDX `pre` component receives title + flags as data attributes.
 */
export const rehypeCodeBlockDefaults: Plugin<[], Root> = () => {
  return (tree) => {
    const figures: Array<{ parent: Parents; index: number; node: Element }> = []

    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'figure') return
      if (!parent || typeof index !== 'number') return
      if (node.properties?.['data-rehype-pretty-code-figure'] == null) return
      figures.push({ parent, index, node })
    })

    // Replace from the end so earlier indices stay valid.
    for (let i = figures.length - 1; i >= 0; i--) {
      const { parent, index, node } = figures[i]
      let title: string | null = null
      let pre: Element | null = null
      const leftovers: ElementContent[] = []

      for (const child of node.children) {
        if (child.type !== 'element') {
          leftovers.push(child)
          continue
        }
        if (
          child.tagName === 'figcaption' &&
          child.properties?.['data-rehype-pretty-code-title'] != null
        ) {
          title = hastText(child)
          continue
        }
        if (child.tagName === 'pre') {
          pre = child
          continue
        }
        leftovers.push(child)
      }

      if (!pre) continue

      pre.properties = pre.properties ?? {}
      if (title) {
        pre.properties['data-code-title'] = title
      }

      // Flags were attached to the original pre, which pretty-code turned into figure.
      for (const key of CODEBLOCK_DATA_KEYS) {
        if (node.properties?.[key] != null) {
          pre.properties[key] = node.properties[key]
        }
      }

      parent.children.splice(index, 1, pre, ...leftovers)
    }

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return
      applyLineNumberDefaults(node)
    })
  }
}

function applyLineNumberDefaults(pre: Element) {
  const noLineNumbers = pre.properties?.['data-no-line-numbers'] != null
  const code = pre.children.find(
    (child): child is Element => child.type === 'element' && child.tagName === 'code'
  )
  if (!code) return

  code.properties = code.properties ?? {}
  if (noLineNumbers) {
    delete code.properties['data-line-numbers']
    delete code.properties['data-line-numbers-max-digits']
    return
  }

  const lineCount = code.children.filter(
    (child): child is Element => child.type === 'element' && child.properties?.['data-line'] != null
  ).length

  if (lineCount === 0) return

  code.properties['data-line-numbers'] = ''
  code.properties['data-line-numbers-max-digits'] = String(String(lineCount).length)
}

function hastText(node: Element): string {
  let text = ''
  for (const child of node.children) {
    if (child.type === 'text') text += child.value
    else if (child.type === 'element') text += hastText(child)
  }
  return text
}
