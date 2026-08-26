import type { ReactNode } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import type { Root } from 'hast'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { components } from '@/components/MDXComponents'
import { remarkCodeTitleToMeta } from '@/utils/mdx/remarkCodeTitleToMeta'
import { docsRehypePlugins } from '@/utils/mdx/rehypeDocsPlugins'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkCodeTitleToMeta)
  .use(remarkMath)
  .use(remarkRehype)

  .use(docsRehypePlugins as any)

export async function markdownToHast(markdown: string): Promise<Root> {
  const mdast = processor.parse(markdown)
  return (await processor.run(mdast)) as Root
}

export function renderHast(tree: Root): ReactNode {
  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,

    components: components as any,
  })
}
