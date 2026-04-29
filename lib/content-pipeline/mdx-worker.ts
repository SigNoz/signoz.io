import * as fs from 'fs/promises'
import * as path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import readingTimeLib from 'reading-time'
import GithubSlugger from 'github-slugger'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

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

import { collections } from './schema'
import { coerceFields, type CollectionHelpers, type TocItem, type DocumentBase } from './define'
import { buildAgentMdxComponentsForDoc } from '../../utils/docs/agentMarkdownStubs'
import { htmlToMarkdown, normalizeWhitespace } from '../../utils/docs/markdownCore'
import { buildMarkdownDocument, MORE_DOCS_POINTER } from '../../utils/docs/buildMarkdownDocument'

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

// Helpers for computed fields (same as in core.ts)
function createHelpers(): CollectionHelpers {
  return {
    readingTime(text: string) {
      const result = readingTimeLib(text)
      return {
        minutes: Math.ceil(result.minutes),
        words: result.words,
        text: result.text,
      }
    },
    extractToc(markdown: string): TocItem[] {
      const slugger = new GithubSlugger()
      const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
      const regXCodeBlock = /```[\s\S]*?```/g
      const contentWithoutCodeBlocks = markdown.replace(regXCodeBlock, '')
      const headings: TocItem[] = []
      for (const match of contentWithoutCodeBlocks.matchAll(regXHeader)) {
        const flag = match.groups?.flag
        const content = match.groups?.content?.trim()
        if (content) {
          headings.push({
            value: content,
            url: `#${slugger.slug(content)}`,
            depth: flag?.length ?? 1,
          })
        }
      }
      return headings
    },
  }
}

const helpers = createHelpers()

// Agent markdown rendering for Doc collection
interface DocForAgent {
  slug?: string
  title: string
  description?: string
  docTags?: string[]
  toc?: TocItem[]
  body: { raw: string; code: string }
}

const getDocTags = (doc: DocForAgent): string[] => {
  if (!Array.isArray(doc.docTags)) return []
  return doc.docTags.filter(
    (tag): tag is string => typeof tag === 'string' && tag.trim().length > 0
  )
}

const normalizeHeadingText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getLeadingH1Text = (markdown: string): string | null => {
  const lines = markdown.split(/\r?\n/)
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    const headingMatch = line.match(/^#\s+(.+?)\s*#*\s*$/)
    return headingMatch ? headingMatch[1].trim() : null
  }
  return null
}

const hasMatchingLeadingH1 = (markdown: string, title: string): boolean => {
  const leadingH1 = getLeadingH1Text(markdown)
  if (!leadingH1) return false
  return normalizeHeadingText(leadingH1) === normalizeHeadingText(title)
}

const getMdxComponentFromCode = (code: string) => {
  const jsxRuntime = require('react/jsx-runtime')
  const scope = {
    React,
    ReactDOM: require('react-dom'),
    _jsx_runtime: jsxRuntime,
  }
  const fn = new Function(...Object.keys(scope), code)
  const moduleExports = fn(...Object.values(scope)) as { default?: unknown }
  if (!moduleExports?.default) {
    throw new Error('Compiled MDX module did not return a default component')
  }
  return moduleExports.default as unknown
}

async function renderAgentMarkdown(doc: DocForAgent): Promise<string> {
  const mdxComponents = buildAgentMdxComponentsForDoc(doc as any)
  const MdxComponent = getMdxComponentFromCode(doc.body.code)
  const element = React.createElement(MdxComponent as any, {
    components: mdxComponents,
    toc: doc.toc || [],
  })
  const html = renderToStaticMarkup(element as any)
  const bodyMarkdown = await htmlToMarkdown(html, { cleanForDocsUi: true })

  if (!bodyMarkdown) {
    throw new Error('Empty markdown generated from MDX source')
  }

  const includeTitle = !hasMatchingLeadingH1(bodyMarkdown, doc.title)
  return normalizeWhitespace(
    buildMarkdownDocument({
      title: doc.title,
      includeTitle,
      description: doc.description,
      tags: getDocTags(doc),
      bodyMarkdown,
      footerLines: [MORE_DOCS_POINTER],
    })
  )
}

export interface CompileTask {
  filePath: string
  collectionName: string // Name to look up in collections
  outputDir: string
}

// Minimal result - all heavy data written to disk by worker
export interface CompileResult {
  slugPath: string
  meta: Record<string, unknown> // Metadata only, no body
}

export default async function compileFile(task: CompileTask): Promise<CompileResult> {
  const { filePath, collectionName, outputDir } = task

  const collection = collections[collectionName]
  if (!collection) {
    throw new Error(`Unknown collection: ${collectionName}`)
  }

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

  // Build document (same as core.ts did)
  const relativePath = path.relative(collection.directory, filePath)
  const fileName = path.basename(filePath)

  const validated = coerceFields(frontmatter, collection.fields)
  const baseDoc: DocumentBase = {
    _file: {
      path: relativePath,
      directory: path.dirname(relativePath),
      name: fileName,
    },
    body: {
      raw: content,
      code,
    },
  }

  const docWithFields = { ...validated, ...baseDoc }
  const computed = collection.computedFieldsFn(docWithFields as any, helpers)
  const doc = { ...docWithFields, ...computed }

  // Get slug for filenames
  const rawSlug = (doc as any).slug || fileName.replace(/\.mdx$/, '')
  const slugPath =
    rawSlug
      .replace(/\/$/, '')
      .split('/')
      .filter((s: string) => s !== '..' && s !== '.')
      .join('/') || 'index'

  // Write both files directly in worker
  const metaPath = path.join(outputDir, `${slugPath}.meta.json`)
  const bodyPath = path.join(outputDir, `${slugPath}.body.json`)

  const { body, ...meta } = doc as any

  await fs.mkdir(path.dirname(metaPath), { recursive: true })

  const writePromises: Promise<void>[] = [
    fs.writeFile(metaPath, JSON.stringify(meta)),
    fs.writeFile(bodyPath, JSON.stringify(body)),
  ]

  // Generate agent markdown for Doc collection only
  if (collectionName === 'Doc') {
    const agentPath = path.join(outputDir, `${slugPath}.agent.txt`)
    writePromises.push(
      renderAgentMarkdown(doc as DocForAgent)
        .then((agentMarkdown) => fs.writeFile(agentPath, agentMarkdown))
        .catch((err) => {
          console.error(`Failed to render agent markdown for ${slugPath}:`, err.message)
          // Write empty file on failure to avoid missing file errors
          return fs.writeFile(agentPath, '')
        })
    )
  }

  await Promise.all(writePromises)

  // Return only what main thread needs for tracking
  return { slugPath, meta }
}
