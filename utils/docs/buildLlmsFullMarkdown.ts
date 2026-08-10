import siteMetadata from '@/data/siteMetadata'
import { fetchAllDocsForPage } from '@/utils/cachedData'
import { getDocsRouteList, INTRO_DESCRIPTION } from './agentDiscovery'
import {
  buildIntroductionSectionsMarkdown,
  INTRO_MARKDOWN_TITLE,
} from './buildIntroductionAgentMarkdown'

type LlmsDoc = {
  slug?: string
  title?: string
  description?: string
  summary?: string
  draft?: boolean
  body?: { raw?: string }
}

const parseAttribute = (attributes: string, name: string): string | null => {
  const match = attributes.match(new RegExp(`\\b${name}=["']([^"']*)["']`))
  return match ? match[1] : null
}

const figureToImage = (attributes: string): string => {
  const src = parseAttribute(attributes, 'src')
  if (!src) return ''
  const alt = parseAttribute(attributes, 'alt') || ''
  const caption = parseAttribute(attributes, 'caption')
  return caption ? `![${alt}](${src})\n*${caption}*` : `![${alt}](${src})`
}

const labeledTagToHeading = (attributes: string): string => {
  const label = parseAttribute(attributes, 'label') || parseAttribute(attributes, 'value')
  return label ? `**${label}**` : ''
}

const admonitionToLabel = (attributes: string): string => {
  const type = parseAttribute(attributes, 'type')
  const title = parseAttribute(attributes, 'title')
  const formattedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : null
  const label = [formattedType, title].filter(Boolean).join(': ')
  return label ? `**${label}**` : ''
}

// Attribute run for a single tag: spans newlines, allows > inside quoted
// values (e.g. label="Version >= 0.76.0"), but cannot cross the closing >.
const ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`

const cleanSegment = (segment: string): string =>
  segment
    // Multi-line and single-line import/export statements.
    .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];?[^\S\n]*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?[^\S\n]*$/gm, '')
    .replace(/^export\s+(?:const|default|function)\b[^\n]*$/gm, '')
    // MDX comments.
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    // Figures become plain markdown images.
    .replace(new RegExp(`<Figure\\b(${ATTRS}?)/>`, 'g'), (_match, attributes) =>
      figureToImage(attributes)
    )
    // Keep tab/admonition labels so the surrounding content stays attributed.
    .replace(new RegExp(`<(?:TabItem|CodeTab)\\b(${ATTRS})>`, 'g'), (_match, attributes) =>
      labeledTagToHeading(attributes)
    )
    .replace(new RegExp(`<Admonition\\b(${ATTRS})>`, 'g'), (_match, attributes) =>
      admonitionToLabel(attributes)
    )
    // Remaining component tags (self-closing, opening, closing) are dropped.
    .replace(new RegExp(`</?[A-Z][\\w.]*\\b${ATTRS}>`, 'g'), '')

export const cleanDocSourceForLlms = (source: string): string => {
  // Fenced code blocks pass through untouched so JSX/XML examples survive.
  const segments = source.split(/(```[\s\S]*?```)/)
  const cleaned = segments
    .map((segment, index) => (index % 2 === 1 ? segment : cleanSegment(segment)))
    .join('')

  return cleaned.replace(/\n{3,}/g, '\n\n').trim()
}

const normalizeDescription = (doc: LlmsDoc): string | undefined => {
  const value = doc.description || doc.summary
  if (typeof value !== 'string') return undefined
  const collapsed = value.replace(/\s+/g, ' ').trim()
  return collapsed.length > 0 ? collapsed : undefined
}

const buildDocSection = (doc: LlmsDoc): string => {
  const parts = [`## ${doc.title}`, `URL: ${siteMetadata.siteUrl}/docs/${doc.slug}/`]
  const description = normalizeDescription(doc)
  if (description) {
    parts.push(description)
  }
  const body = cleanDocSourceForLlms(doc.body?.raw || '')
  if (body) {
    parts.push(body)
  }
  return parts.join('\n\n')
}

const buildIntroductionSection = (): string =>
  [
    `## ${INTRO_MARKDOWN_TITLE}`,
    `URL: ${siteMetadata.siteUrl}/docs/introduction/`,
    INTRO_DESCRIPTION,
    // Demote the intro's section headings below the per-doc heading level.
    buildIntroductionSectionsMarkdown().replace(/^## /gm, '### '),
  ].join('\n\n')

export async function buildLlmsFullMarkdown(): Promise<string> {
  const [docs, routeList] = await Promise.all([fetchAllDocsForPage(), getDocsRouteList()])

  const publishable = (docs as LlmsDoc[]).filter(
    (doc) => !doc.draft && typeof doc.slug === 'string' && doc.slug.length > 0 && doc.title
  )

  const navOrder = new Map(routeList.map((item, index) => [item.route, index]))
  const inNav: LlmsDoc[] = []
  const outOfNav: LlmsDoc[] = []
  for (const doc of publishable) {
    if (navOrder.has(`/docs/${doc.slug}`)) {
      inNav.push(doc)
    } else {
      outOfNav.push(doc)
    }
  }
  inNav.sort(
    (a, b) => (navOrder.get(`/docs/${a.slug}`) ?? 0) - (navOrder.get(`/docs/${b.slug}`) ?? 0)
  )
  outOfNav.sort((a, b) => (a.slug as string).localeCompare(b.slug as string))

  const sections = [
    buildIntroductionSection(),
    ...[...inNav, ...outOfNav].map((doc) => buildDocSection(doc)),
  ]

  const header = [
    '# SigNoz Documentation',
    '',
    '> Complete SigNoz documentation in a single markdown file. For the curated index, see https://signoz.io/llms.txt. Markdown versions of individual pages are available by appending `.md` to documentation URLs.',
  ].join('\n')

  return [header, ...sections].join('\n\n---\n\n')
}
