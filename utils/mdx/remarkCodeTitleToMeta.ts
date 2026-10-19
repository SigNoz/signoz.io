import type { Root, Code } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * Convert fence info `lang:filename` into rehype-pretty-code `title="filename"` meta
 * so existing docs keep `` ```yaml:config.yaml {4} `` authoring.
 *
 * Leaves language-only fences untouched. Appends title meta when absent;
 * does not overwrite an existing title="…".
 */
export const remarkCodeTitleToMeta: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node: Code) => {
      const lang = node.lang
      if (!lang || !lang.includes(':')) return

      const colonIndex = lang.indexOf(':')
      const language = lang.slice(0, colonIndex)
      const title = lang.slice(colonIndex + 1)

      if (!language || !title) return

      node.lang = language

      const existingMeta = node.meta ?? ''
      if (/title\s*=\s*"/.test(existingMeta)) return

      const titleMeta = `title="${title}"`
      node.meta = existingMeta.trim() ? `${titleMeta} ${existingMeta}` : titleMeta
    })
  }
}
