import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import type { PluggableList } from 'unified'
import type { List, Root } from 'mdast'

// Markdown renumbers ordered lists from their first item; keep the numbers typed in the text.
function remarkKeepTypedListNumbers() {
  return (tree: Root, file: { value: unknown }) => {
    const source = String(file.value)
    visit(tree, 'list', (list: List) => {
      if (!list.ordered) return
      list.children.forEach((item, index) => {
        const typed = source.slice(item.position?.start.offset ?? 0).match(/^(\d+)[.)]/)?.[1]
        if (typed === undefined || Number(typed) === (list.start ?? 1) + index) return
        item.data = {
          ...item.data,
          hProperties: { ...item.data?.hProperties, value: Number(typed) },
        }
      })
    })
  }
}

export const LEGAL_REMARK_PLUGINS: PluggableList = [
  [remarkGfm, { singleTilde: false }],
  remarkKeepTypedListNumbers,
]
