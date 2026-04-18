import type { Doc } from 'contentlayer/generated'
import { buildAgentMdxComponentsForDoc } from './agentMarkdownStubs'
import { htmlToMarkdown, normalizeWhitespace } from './markdownCore'
import { buildMarkdownDocument, MORE_DOCS_POINTER } from './buildMarkdownDocument'

// Next.js static generation is the primary cache for this route. This Map is only a
// best-effort warm-process optimization, and eviction is intentionally FIFO rather than LRU
// because each docs slug is normally rendered once under force-static.
const markdownCache = new Map<string, string>()
const MAX_MARKDOWN_CACHE_ENTRIES = 2000
type GenericNode = {
  type?: string
  name?: string
  value?: string
  children?: GenericNode[]
}

const getDocTags = (doc: Doc): string[] => {
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

const buildFallbackMarkdown = (doc: Doc): string => {
  const includeTitle = !hasMatchingLeadingH1(doc.body.raw, doc.title)
  return buildMarkdownDocument({
    title: doc.title,
    includeTitle,
    description: doc.description,
    tags: getDocTags(doc),
    bodyMarkdown: doc.body.raw,
    footerLines: [MORE_DOCS_POINTER],
  })
}

const sanitizeMdxForAgentRendering = () => {
  const toComponentPlaceholder = (name?: string): GenericNode => ({
    type: 'paragraph',
    children: [
      {
        type: 'text',
        value: `[${name && name.trim().length > 0 ? name : 'Component'}]`,
      },
    ],
  })

  const transformNode = (node: GenericNode): GenericNode[] => {
    if (!node || !node.type) {
      return []
    }

    if (
      node.type === 'mdxjsEsm' ||
      node.type === 'mdxFlowExpression' ||
      node.type === 'mdxTextExpression'
    ) {
      return []
    }

    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      const childNodes = Array.isArray(node.children)
        ? node.children.flatMap((child) => transformNode(child))
        : []

      if (childNodes.length > 0) {
        return childNodes
      }

      return [toComponentPlaceholder(node.name)]
    }

    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children = node.children.flatMap((child) => transformNode(child))
    }

    return [node]
  }

  return (tree: GenericNode) => {
    if (!tree || !Array.isArray(tree.children)) {
      return
    }

    tree.children = tree.children.flatMap((child) => transformNode(child))
  }
}

const convertRawMdxToMarkdown = async (rawMdx: string): Promise<string> => {
  const { unified } = await import('unified')
  const { default: remarkParse } = await import('remark-parse')
  const { default: remarkMdx } = await import('remark-mdx')
  const { default: remarkGfm } = await import('remark-gfm')
  const { default: remarkRehype } = await import('remark-rehype')
  const { default: rehypeStringify } = await import('rehype-stringify')

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(sanitizeMdxForAgentRendering)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)

  const html = String(await processor.process(rawMdx))
  return htmlToMarkdown(html, { cleanForDocsUi: true })
}

const getMdxComponentFromCode = async (code: string) => {
  const React = await import('react')
  const ReactDOM = await import('react-dom')
  const jsxRuntime = await import('react/jsx-runtime')

  const scope = {
    React,
    ReactDOM,
    _jsx_runtime: jsxRuntime,
  }

  // This is effectively eval(), but the input is Contentlayer-compiled MDX from trusted
  // repository content at build/render time. Do not use this with untrusted input.
  const fn = new Function(...Object.keys(scope), code)
  const moduleExports = fn(...Object.values(scope)) as { default?: unknown }

  if (!moduleExports?.default) {
    throw new Error('Compiled MDX module did not return a default component')
  }

  return moduleExports.default as unknown
}

const convertCompiledMdxToMarkdown = async (doc: Doc): Promise<string> => {
  const React = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const mdxComponents = buildAgentMdxComponentsForDoc(doc)
  const MdxComponent = await getMdxComponentFromCode(doc.body.code)
  const element = React.createElement(MdxComponent as any, {
    components: mdxComponents,
    toc: doc.toc || [],
  })
  const html = renderToStaticMarkup(element as any)

  return htmlToMarkdown(html, { cleanForDocsUi: true })
}

const setMarkdownCache = (key: string, value: string): void => {
  if (!markdownCache.has(key) && markdownCache.size >= MAX_MARKDOWN_CACHE_ENTRIES) {
    const oldestKey = markdownCache.keys().next().value
    if (oldestKey) {
      markdownCache.delete(oldestKey)
    }
  }

  markdownCache.set(key, value)
}

export async function renderDocMarkdownForAgents(doc: Doc): Promise<string> {
  const cacheKey = doc.slug || doc._id
  const cached = markdownCache.get(cacheKey)

  if (cached) {
    return cached
  }

  try {
    let bodyMarkdown = ''

    try {
      bodyMarkdown = await convertCompiledMdxToMarkdown(doc)
    } catch (compiledRenderError) {
      console.error(
        `Failed compiled MDX render for doc slug "${doc.slug}". Falling back to raw MDX conversion.`,
        compiledRenderError
      )
      bodyMarkdown = await convertRawMdxToMarkdown(doc.body.raw)
    }

    if (!bodyMarkdown) {
      throw new Error('Empty markdown generated from MDX source')
    }

    const includeTitle = !hasMatchingLeadingH1(bodyMarkdown, doc.title)
    const renderedMarkdown = normalizeWhitespace(
      buildMarkdownDocument({
        title: doc.title,
        includeTitle,
        description: doc.description,
        tags: getDocTags(doc),
        bodyMarkdown,
        footerLines: [MORE_DOCS_POINTER],
      })
    )
    setMarkdownCache(cacheKey, renderedMarkdown)
    return renderedMarkdown
  } catch (error) {
    console.error(`Failed to render markdown for doc slug "${doc.slug}"`, error)
    const fallbackMarkdown = buildFallbackMarkdown(doc)
    setMarkdownCache(cacheKey, fallbackMarkdown)
    return fallbackMarkdown
  }
}
