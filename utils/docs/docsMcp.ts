import siteMetadata from '@/data/siteMetadata'
import { normalizeDocsSlugFromPathname } from '@/utils/docs/markdownRouting'
import type { DocsSearchResult } from '@/utils/docs/searchDocsWithAlgolia'

/**
 * Public, read-only MCP server for SigNoz documentation, served at /docs/mcp
 * over stateless Streamable HTTP with JSON responses. It needs no account and
 * has no access to anyone's telemetry; the authenticated SigNoz MCP server
 * covers live data.
 */

export const DOCS_MCP_PATH = '/docs/mcp'
// The site uses trailingSlash, so the slash-terminated URL avoids a 308 hop.
export const DOCS_MCP_URL = `${siteMetadata.siteUrl}${DOCS_MCP_PATH}/`
export const DOCS_MCP_SERVER_NAME = 'signoz-docs'
export const DOCS_MCP_SERVER_VERSION = '1.0.0'

// Newest first. Unsupported client versions are answered with the newest.
export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05']
export const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0]

export const MAX_REQUEST_BYTES = 64 * 1024
export const MAX_SEARCH_TEXT_LENGTH = 300
export const MAX_URL_LENGTH = 500
export const MAX_HEADING_LENGTH = 200
export const DEFAULT_SEARCH_LIMIT = 10
export const MAX_SEARCH_LIMIT = 25

export const DOCS_MCP_INSTRUCTIONS = [
  'Public SigNoz documentation server. Use signoz_search_docs to find official SigNoz docs pages, then signoz_fetch_doc to read a page (or one section) as Markdown.',
  "This server only serves public documentation. It has no access to anyone's SigNoz account, traces, logs, metrics, dashboards, or alerts.",
  `To query live observability data, connect the authenticated SigNoz MCP server: ${siteMetadata.siteUrl}/docs/ai/signoz-mcp-server/`,
  `Full docs index: ${siteMetadata.siteUrl}/llms.txt`,
].join('\n')

export type DocsMcpDeps = {
  searchDocs: (query: string, limit: number) => Promise<DocsSearchResult[]>
  /** Agent markdown for a docs slug (as served at /docs/<slug>.md), or null when missing. */
  fetchDocMarkdown: (slug: string) => Promise<string | null>
}

type JsonRpcId = string | number | null

type JsonRpcRequest = {
  jsonrpc: '2.0'
  id?: JsonRpcId
  method: string
  params?: Record<string, unknown>
}

type JsonRpcResponse =
  | { jsonrpc: '2.0'; id: JsonRpcId; result: unknown }
  | { jsonrpc: '2.0'; id: JsonRpcId; error: { code: number; message: string } }

export const JSON_RPC_ERRORS = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
}

export const DOCS_MCP_TOOLS = [
  {
    name: 'signoz_search_docs',
    title: 'Search SigNoz docs',
    description:
      'Search official SigNoz documentation and return ranked pages with URLs, Markdown URLs, and snippets for product, setup, instrumentation, configuration, API, deployment, or troubleshooting questions. Send 2 to 6 keywords for one topic and keep product and technology names as the user wrote them; split multi-intent questions into separate calls. Use signoz_fetch_doc to read a result.',
    inputSchema: {
      type: 'object',
      properties: {
        searchText: {
          type: 'string',
          description: '2 to 6 keywords for one topic, for example "Kubernetes pod logs".',
          maxLength: MAX_SEARCH_TEXT_LENGTH,
        },
        limit: {
          type: 'integer',
          description: `Maximum results to return. Default: ${DEFAULT_SEARCH_LIMIT}, max: ${MAX_SEARCH_LIMIT}.`,
          minimum: 1,
          maximum: MAX_SEARCH_LIMIT,
        },
      },
      required: ['searchText'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              section: { type: 'string' },
              url: { type: 'string' },
              markdownUrl: { type: 'string' },
              snippet: { type: 'string' },
            },
            required: ['title', 'url', 'markdownUrl'],
          },
        },
      },
      required: ['results'],
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
  {
    name: 'signoz_fetch_doc',
    title: 'Fetch a SigNoz docs page',
    description:
      'Return the full Markdown of one official SigNoz docs page, or one section of it. Use after signoz_search_docs, or when an exact https://signoz.io/docs/... URL or /docs/... path is known. Only SigNoz docs URLs are accepted.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'Full https://signoz.io/docs/... URL or /docs/... path.',
          maxLength: MAX_URL_LENGTH,
        },
        heading: {
          type: 'string',
          description:
            'Optional heading anchor ID or heading text, for example "prerequisites" or "## Prerequisites". Returns only that section.',
          maxLength: MAX_HEADING_LENGTH,
        },
      },
      required: ['url'],
    },
    annotations: READ_ONLY_ANNOTATIONS,
  },
]

const SIGNOZ_HOSTS = new Set(['signoz.io', 'www.signoz.io'])
const SAFE_SLUG = /^[\w\-./]+$/

export class DocsUrlError extends Error {}

/** Resolve a docs URL or path to a docs slug plus any `#anchor`. Throws DocsUrlError. */
export const resolveDocsUrl = (input: string): { slug: string; anchor?: string } => {
  const raw = input.trim()
  let parsed: URL
  try {
    parsed = new URL(raw.startsWith('docs/') ? `/${raw}` : raw, siteMetadata.siteUrl)
  } catch {
    throw new DocsUrlError(`Not a valid URL: ${raw}`)
  }

  if (!['https:', 'http:'].includes(parsed.protocol) || !SIGNOZ_HOSTS.has(parsed.hostname)) {
    throw new DocsUrlError('Only SigNoz docs URLs (https://signoz.io/docs/...) are supported.')
  }

  const pathname = decodeURIComponent(parsed.pathname)
  if (pathname !== '/docs' && !pathname.startsWith('/docs/')) {
    throw new DocsUrlError('Only SigNoz docs URLs (https://signoz.io/docs/...) are supported.')
  }

  const slug = normalizeDocsSlugFromPathname(pathname) || 'introduction'
  if (!SAFE_SLUG.test(slug) || slug.split('/').some((part) => part === '..' || part === '.')) {
    throw new DocsUrlError(`Not a valid docs path: ${pathname}`)
  }
  if (slug === 'mcp' || slug === 'sitemap') {
    throw new DocsUrlError(`Not a docs page: ${pathname}`)
  }

  const anchor = parsed.hash.replace(/^#/, '')
  return anchor ? { slug, anchor } : { slug }
}

const slugifyHeading = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[`*_[\]()]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const normalizeHeadingQuery = (value: string): string => slugifyHeading(value.replace(/^#+\s*/, ''))

const HEADING_LINE = /^(#{1,6})\s+(.+?)\s*#*\s*$/

/** Extract one section (heading through the next heading of the same or higher level). */
export const extractMarkdownSection = (
  markdown: string,
  heading: string
): { section: string | null; headings: string[] } => {
  const lines = markdown.split('\n')
  const target = normalizeHeadingQuery(heading)
  const headings: string[] = []
  let inFence = false
  let start = -1
  let startLevel = 0
  let end = lines.length

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (inFence) continue

    const match = line.match(HEADING_LINE)
    if (!match) continue

    const level = match[1].length
    headings.push(match[2])

    if (start === -1) {
      if (target && slugifyHeading(match[2]) === target) {
        start = index
        startLevel = level
      }
    } else if (level <= startLevel && end === lines.length) {
      end = index
    }
  }

  return {
    section: start === -1 ? null : lines.slice(start, end).join('\n').trim(),
    headings,
  }
}

const toolText = (text: string, isError = false) => ({
  content: [{ type: 'text', text }],
  ...(isError ? { isError: true } : {}),
})

const parseLimit = (value: unknown): number | null => {
  if (value === undefined || value === null || value === '') return DEFAULT_SEARCH_LIMIT
  const numeric = typeof value === 'string' ? Number(value) : value
  if (typeof numeric !== 'number' || !Number.isInteger(numeric) || numeric < 1) return null
  return Math.min(numeric, MAX_SEARCH_LIMIT)
}

const formatSearchResults = (query: string, results: DocsSearchResult[]): string => {
  if (results.length === 0) {
    return `No SigNoz docs pages matched "${query}". Try fewer or different keywords.`
  }

  return results
    .map((result, index) => {
      const lines = [
        `${index + 1}. ${result.title}${result.section ? ` — ${result.section}` : ''}`,
        `   URL: ${result.url}`,
        `   Markdown: ${result.markdownUrl}`,
      ]
      if (result.snippet) lines.push(`   ${result.snippet}`)
      return lines.join('\n')
    })
    .join('\n\n')
}

const callSearchDocs = async (args: Record<string, unknown>, deps: DocsMcpDeps) => {
  const rawQuery = args.searchText ?? args.query
  if (typeof rawQuery !== 'string' || !rawQuery.trim()) {
    return toolText('searchText is required: send 2 to 6 keywords for one topic.', true)
  }
  const query = rawQuery.trim()
  if (query.length > MAX_SEARCH_TEXT_LENGTH) {
    return toolText(`searchText must be at most ${MAX_SEARCH_TEXT_LENGTH} characters.`, true)
  }

  const limit = parseLimit(args.limit)
  if (limit === null) {
    return toolText(`limit must be an integer between 1 and ${MAX_SEARCH_LIMIT}.`, true)
  }

  try {
    const results = await deps.searchDocs(query, limit)
    return {
      ...toolText(formatSearchResults(query, results)),
      structuredContent: { results },
    }
  } catch (error) {
    console.error('Docs MCP search failed:', error)
    return toolText(
      `Docs search is temporarily unavailable. Browse the docs index at ${siteMetadata.siteUrl}/llms.txt instead.`,
      true
    )
  }
}

const callFetchDoc = async (args: Record<string, unknown>, deps: DocsMcpDeps) => {
  const url = args.url
  if (typeof url !== 'string' || !url.trim()) {
    return toolText('url is required: a https://signoz.io/docs/... URL or /docs/... path.', true)
  }
  if (url.length > MAX_URL_LENGTH) {
    return toolText(`url must be at most ${MAX_URL_LENGTH} characters.`, true)
  }

  const heading = args.heading
  if (
    heading !== undefined &&
    (typeof heading !== 'string' || heading.length > MAX_HEADING_LENGTH)
  ) {
    return toolText(`heading must be a string of at most ${MAX_HEADING_LENGTH} characters.`, true)
  }

  let resolved: { slug: string; anchor?: string }
  try {
    resolved = resolveDocsUrl(url)
  } catch (error) {
    if (error instanceof DocsUrlError) return toolText(error.message, true)
    throw error
  }

  let markdown: string | null
  try {
    markdown = await deps.fetchDocMarkdown(resolved.slug)
  } catch (error) {
    console.error(`Docs MCP fetch failed for "${resolved.slug}":`, error)
    return toolText('Fetching this docs page failed. Try again shortly.', true)
  }

  if (markdown === null) {
    return toolText(
      `No SigNoz docs page found at /docs/${resolved.slug}/. Use signoz_search_docs to find the right page.`,
      true
    )
  }

  const requestedHeading = (typeof heading === 'string' && heading.trim()) || resolved.anchor
  if (!requestedHeading) {
    return toolText(markdown)
  }

  const { section, headings } = extractMarkdownSection(markdown, requestedHeading)
  if (section === null) {
    return toolText(
      `Heading "${requestedHeading}" was not found on /docs/${resolved.slug}/. Available headings:\n${headings.map((value) => `- ${value}`).join('\n')}`,
      true
    )
  }

  return toolText(section)
}

const negotiateProtocolVersion = (requested: unknown): string =>
  typeof requested === 'string' && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
    ? requested
    : LATEST_PROTOCOL_VERSION

const rpcResult = (id: JsonRpcId, result: unknown): JsonRpcResponse => ({
  jsonrpc: '2.0',
  id,
  result,
})

const rpcError = (id: JsonRpcId, code: number, message: string): JsonRpcResponse => ({
  jsonrpc: '2.0',
  id,
  error: { code, message },
})

const isJsonRpcRequest = (message: unknown): message is JsonRpcRequest =>
  typeof message === 'object' &&
  message !== null &&
  (message as JsonRpcRequest).jsonrpc === '2.0' &&
  typeof (message as JsonRpcRequest).method === 'string'

const isValidId = (id: unknown): id is JsonRpcId => typeof id === 'string' || typeof id === 'number'

/**
 * Handle one JSON-RPC message. Returns null for notifications and client
 * responses, which get no reply.
 */
export async function handleDocsMcpMessage(
  message: unknown,
  deps: DocsMcpDeps
): Promise<JsonRpcResponse | null> {
  if (!isJsonRpcRequest(message)) {
    const looksLikeClientResponse =
      typeof message === 'object' &&
      message !== null &&
      'id' in message &&
      ('result' in message || 'error' in message)
    if (looksLikeClientResponse) return null

    const id = (message as { id?: unknown } | null)?.id
    return rpcError(isValidId(id) ? id : null, JSON_RPC_ERRORS.INVALID_REQUEST, 'Invalid Request')
  }

  if (!('id' in message) || message.id === undefined) {
    // Notifications (notifications/initialized, notifications/cancelled, ...).
    return null
  }

  const { id, method } = message
  if (!isValidId(id)) {
    return rpcError(
      null,
      JSON_RPC_ERRORS.INVALID_REQUEST,
      'Invalid Request: id must be a string or number'
    )
  }

  const params = (message.params ?? {}) as Record<string, unknown>

  switch (method) {
    case 'initialize':
      return rpcResult(id, {
        protocolVersion: negotiateProtocolVersion(params.protocolVersion),
        capabilities: { tools: { listChanged: false } },
        serverInfo: {
          name: DOCS_MCP_SERVER_NAME,
          title: 'SigNoz Docs',
          version: DOCS_MCP_SERVER_VERSION,
          websiteUrl: `${siteMetadata.siteUrl}/docs/`,
        },
        instructions: DOCS_MCP_INSTRUCTIONS,
      })
    case 'ping':
      return rpcResult(id, {})
    case 'tools/list':
      return rpcResult(id, { tools: DOCS_MCP_TOOLS })
    case 'tools/call': {
      const name = params.name
      const args =
        typeof params.arguments === 'object' && params.arguments !== null
          ? (params.arguments as Record<string, unknown>)
          : {}

      if (name === 'signoz_search_docs') return rpcResult(id, await callSearchDocs(args, deps))
      if (name === 'signoz_fetch_doc') return rpcResult(id, await callFetchDoc(args, deps))
      return rpcError(id, JSON_RPC_ERRORS.INVALID_PARAMS, `Unknown tool: ${String(name)}`)
    }
    default:
      return rpcError(id, JSON_RPC_ERRORS.METHOD_NOT_FOUND, `Method not found: ${method}`)
  }
}

export const DOCS_MCP_CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, MCP-Protocol-Version',
  'Access-Control-Max-Age': '86400',
}

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...DOCS_MCP_CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })

const emptyResponse = (status: number, extraHeaders: Record<string, string> = {}): Response =>
  new Response(null, {
    status,
    headers: { ...DOCS_MCP_CORS_HEADERS, 'Cache-Control': 'no-store', ...extraHeaders },
  })

/** GET (SSE stream) and DELETE (session end) are not offered by this stateless server. */
export const docsMcpMethodNotAllowed = (): Response =>
  emptyResponse(405, { Allow: 'POST, OPTIONS' })

export const docsMcpPreflight = (): Response => emptyResponse(204)

/** Handle a Streamable HTTP POST: one JSON-RPC message or a batch. */
export async function handleDocsMcpPost(request: Request, deps: DocsMcpDeps): Promise<Response> {
  const protocolHeader = request.headers.get('mcp-protocol-version')
  if (protocolHeader && !SUPPORTED_PROTOCOL_VERSIONS.includes(protocolHeader)) {
    return jsonResponse(
      rpcError(
        null,
        JSON_RPC_ERRORS.INVALID_REQUEST,
        `Unsupported MCP-Protocol-Version: ${protocolHeader}. Supported: ${SUPPORTED_PROTOCOL_VERSIONS.join(', ')}`
      ),
      400
    )
  }

  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > MAX_REQUEST_BYTES) {
    return jsonResponse(rpcError(null, JSON_RPC_ERRORS.INVALID_REQUEST, 'Request too large'), 413)
  }

  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_REQUEST_BYTES) {
    return jsonResponse(rpcError(null, JSON_RPC_ERRORS.INVALID_REQUEST, 'Request too large'), 413)
  }

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return jsonResponse(rpcError(null, JSON_RPC_ERRORS.PARSE_ERROR, 'Parse error'), 400)
  }

  if (Array.isArray(payload)) {
    if (payload.length === 0) {
      return jsonResponse(rpcError(null, JSON_RPC_ERRORS.INVALID_REQUEST, 'Invalid Request'), 400)
    }
    const responses = (
      await Promise.all(payload.map((message) => handleDocsMcpMessage(message, deps)))
    ).filter((response): response is JsonRpcResponse => response !== null)
    return responses.length > 0 ? jsonResponse(responses) : emptyResponse(202)
  }

  const response = await handleDocsMcpMessage(payload, deps)
  return response ? jsonResponse(response) : emptyResponse(202)
}
