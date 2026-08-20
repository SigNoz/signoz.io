import React from 'react'
import { buildAgentMdxComponentsForDoc } from './agentMarkdownStubs'
import { htmlToMarkdown, normalizeWhitespace } from './markdownCore'
import { buildMarkdownDocument, MORE_DOCS_POINTER } from './buildMarkdownDocument'
import { mdxOptions } from '../mdx/options'

type DocMarkdownSource = {
  slug?: string
  title: string
  description?: string
  docTags?: unknown
  body: { raw: string }
}

const getDocTags = (doc: DocMarkdownSource): string[] => {
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

const hasMatchingLeadingH1 = (markdown: string, title: string): boolean => {
  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue
    const match = line.match(/^#\s+(.+?)\s*#*\s*$/)
    return match ? normalizeHeadingText(match[1]) === normalizeHeadingText(title) : false
  }
  return false
}

type RenderMarkdownOptions = {
  footerLines?: string[]
}

const wrapDocument = (
  doc: DocMarkdownSource,
  bodyMarkdown: string,
  options: RenderMarkdownOptions = {}
): string =>
  normalizeWhitespace(
    buildMarkdownDocument({
      title: doc.title,
      includeTitle: !hasMatchingLeadingH1(bodyMarkdown, doc.title),
      description: doc.description,
      tags: getDocTags(doc),
      bodyMarkdown,
      footerLines: options.footerLines ?? [MORE_DOCS_POINTER],
    })
  )

const compileMdxToMarkdown = async (doc: DocMarkdownSource): Promise<string> => {
  const { compileMDX } = await import('next-mdx-remote/rsc')
  const { renderToStaticMarkup } = await import('react-dom/server')

  const components = await buildAgentMdxComponentsForDoc(doc)

  // remarkImgToJsx injects <Image> at compile time for images in public/.
  if (!components.Image) {
    components.Image = ((props: { src?: string; alt?: string }) =>
      React.createElement('img', { src: props.src, alt: props.alt || '' })) as any
  }

  const { content } = await compileMDX({
    source: doc.body.raw,
    components: components as Parameters<typeof compileMDX>[0]['components'],
    options: mdxOptions as Parameters<typeof compileMDX>[0]['options'],
  })

  return htmlToMarkdown(renderToStaticMarkup(content), { cleanForDocsUi: true })
}

export async function renderDocMarkdownForAgents(
  doc: DocMarkdownSource,
  options: RenderMarkdownOptions = {}
): Promise<string> {
  try {
    const bodyMarkdown = await compileMdxToMarkdown(doc)
    if (!bodyMarkdown) throw new Error('Empty markdown from MDX compilation')
    return wrapDocument(doc, bodyMarkdown, options)
  } catch (error) {
    console.error(`Agent markdown render failed for "${doc.slug}":`, error)
    return wrapDocument(doc, doc.body.raw, options)
  }
}
