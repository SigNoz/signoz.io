import { visit } from 'unist-util-visit'

export default function rehypeEscapeBraces() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (node.value) {
        node.value = node.value.replace(/{/g, '{`{`').replace(/}/g, '{`}`}')
      }
    })
  }
}
