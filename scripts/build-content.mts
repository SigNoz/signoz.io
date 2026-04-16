#!/usr/bin/env node
// scripts/build-content.mts
import * as coreModule from '../lib/content-pipeline/core'
import * as schemaModule from '../lib/content-pipeline/schema'

// Handle ESM/CJS interop
const core = (coreModule as any).default || coreModule
const schema = (schemaModule as any).default || schemaModule
const { buildAllCollections } = core
const { collections } = schema
import * as path from 'path'

// MDX plugins (same as contentlayer.config.ts)
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkExtractFrontmatter, remarkCodeTitles, remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
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

const mdxOptions = {
  remarkPlugins: [
    remarkExtractFrontmatter,
    remarkGfm,
    remarkCodeTitles,
    remarkMath,
    remarkImgToJsx,
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      behavior: 'prepend',
      headingProperties: { className: ['content-header'] },
      content: icon,
    }],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    rehypePresetMinify,
  ],
}

async function main() {
  const startTime = Date.now()
  console.log('Building content...\n')

  await buildAllCollections(collections, {
    outputDir: path.resolve('.content'),
    cacheDir: path.resolve('.content-cache'),
    mdxOptions,
  })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`\nContent built in ${elapsed}s`)
}

main().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
