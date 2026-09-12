import { renderDocMarkdownForAgents } from '@/utils/docs/renderDocMarkdownForAgents'
import { slugFromParams } from '@/utils/docs/markdownRouting'
import {
  CONTENT_MARKDOWN_SECTIONS,
  type ContentMarkdownSection,
} from '@/utils/agentMarkdownRouting'
import { fetchBlogBySlug, fetchComparisonBySlug, fetchGuideBySlug } from '@/utils/cachedData'
import { getContentBySlug } from '@/utils/contentRepository'
import { agentResponse, agentNotFoundResponse } from '@/utils/agentResponseHeaders'

type ContentRecord = {
  title?: unknown
  description?: unknown
  summary?: unknown
  tags?: unknown
  content?: unknown
}

const CONTENT_FETCHERS: Record<
  ContentMarkdownSection,
  (slug: string) => Promise<ContentRecord | undefined | null>
> = {
  blog: (slug) => fetchBlogBySlug(slug),
  comparisons: (slug) => fetchComparisonBySlug(slug),
  guides: (slug) => fetchGuideBySlug(slug),
  opentelemetry: (slug) => getContentBySlug('opentelemetries', slug),
  faqs: (slug) => getContentBySlug('faqs', slug),
  customers: (slug) => getContentBySlug('case-studies', slug),
}

const isContentMarkdownSection = (value: string): value is ContentMarkdownSection =>
  (CONTENT_MARKDOWN_SECTIONS as readonly string[]).includes(value)

export async function generateStaticParams() {
  return []
}

const notFoundResponse = agentNotFoundResponse

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim().length > 0 ? value : undefined

export async function GET(
  _: Request,
  props: { params: Promise<{ section: string; slug?: string[] }> }
) {
  const params = await props.params

  if (!isContentMarkdownSection(params.section)) {
    return notFoundResponse()
  }

  const slug = slugFromParams(params.slug || [])
  if (!slug) {
    return notFoundResponse()
  }

  const post = await CONTENT_FETCHERS[params.section](slug)
  const rawMdx = asString(post?.content)

  if (!post || !rawMdx) {
    return notFoundResponse(`/${params.section}/${slug}`)
  }

  const markdown = await renderDocMarkdownForAgents(
    {
      slug: `${params.section}/${slug}`,
      title: asString(post.title) || slug,
      description: asString(post.description) || asString(post.summary),
      docTags: post.tags,
      body: { raw: rawMdx },
    },
    { footerLines: [] }
  )

  return agentResponse(markdown, { varyAccept: true })
}
