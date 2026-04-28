import * as fs from 'fs/promises'
import * as path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

const icon = fromHtmlIsomorphic(
  `<span class="content-header-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
  </span>`,
  { fragment: true }
)

const mdxPlugins = {
  remarkPlugins: [
    remarkExtractFrontmatter,
    remarkGfm,
    remarkCodeTitles,
    remarkMath,
    remarkImgToJsx,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
        headingProperties: { className: ['content-header'] },
        content: icon,
      },
    ],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
  ],
}

export interface CompileTask {
  filePath: string
  collectionDirectory: string
}

export interface CompileResult {
  frontmatter: Record<string, any>
  content: string
  code: string
  relativePath: string
  fileName: string
}

export default async function compileFile(task: CompileTask): Promise<CompileResult> {
  const { filePath, collectionDirectory } = task

  const raw = await fs.readFile(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)

  const cwd = process.cwd()
  const { code } = await bundleMDX({
    source: content,
    cwd,
    mdxOptions: (opts, _frontmatter) => ({
      ...opts,
      remarkPlugins: [...(opts.remarkPlugins ?? []), ...mdxPlugins.remarkPlugins] as any,
      rehypePlugins: [...(opts.rehypePlugins ?? []), ...mdxPlugins.rehypePlugins] as any,
    }),
    esbuildOptions: (opts) => ({
      ...opts,
      external: ['@/components/*', '@/layouts/*', '@/data/*', '@/shared/*', 'react', 'react-dom'],
      alias: {
        '@/components': path.join(cwd, 'components'),
        '@/layouts': path.join(cwd, 'layouts'),
        '@/data': path.join(cwd, 'data'),
        '@/shared': path.join(cwd, 'shared'),
      },
    }),
  })

  const relativePath = path.relative(collectionDirectory, filePath)
  const fileName = path.basename(filePath)

  return { frontmatter, content, code, relativePath, fileName }
}
