import siteMetadata from '@/data/siteMetadata'
import type { LatestOpenAPISpec, OpenAPIDocument } from '@/utils/openapiSpec'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const

const UNTAGGED = 'other'

type Operation = {
  method: string
  route: string
  summary?: string
  operationId?: string
}

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined

/** One line per operation, grouped by the spec's own tags. */
const collectOperationsByTag = (document: OpenAPIDocument): Map<string, Operation[]> => {
  const byTag = new Map<string, Operation[]>()
  const paths = document.paths || {}

  for (const route of Object.keys(paths).sort()) {
    const pathItem = paths[route]
    if (!pathItem || typeof pathItem !== 'object') continue

    for (const method of HTTP_METHODS) {
      const operation = (pathItem as Record<string, unknown>)[method]
      if (!operation || typeof operation !== 'object') continue

      const op = operation as Record<string, unknown>
      const tags = Array.isArray(op.tags) ? op.tags.filter(asString) : []
      const entry: Operation = {
        method: method.toUpperCase(),
        route,
        summary: asString(op.summary) || asString(op.description),
        operationId: asString(op.operationId),
      }

      for (const tag of tags.length > 0 ? tags : [UNTAGGED]) {
        const key = String(tag)
        const existing = byTag.get(key)
        if (existing) existing.push(entry)
        else byTag.set(key, [entry])
      }
    }
  }

  return byTag
}

const renderOperation = (operation: Operation): string => {
  const summary = operation.summary ? `: ${operation.summary.replace(/\s+/g, ' ')}` : ''
  const id = operation.operationId ? ` (\`${operation.operationId}\`)` : ''
  return `- \`${operation.method} ${operation.route}\`${id}${summary}`
}

const renderServers = (document: OpenAPIDocument): string[] => {
  const servers = Array.isArray(document.servers) ? document.servers : []
  const lines = servers
    .map((server) => {
      if (!server || typeof server !== 'object') return null
      const url = asString((server as Record<string, unknown>).url)
      if (!url) return null
      const description = asString((server as Record<string, unknown>).description)
      return description ? `- \`${url}\`: ${description}` : `- \`${url}\``
    })
    .filter((line): line is string => line !== null)

  return lines.length > 0 ? lines : ['- See the `servers` block in the machine-readable spec.']
}

const renderSecuritySchemes = (document: OpenAPIDocument): string[] => {
  const schemes = document.components?.securitySchemes || {}
  const lines = Object.entries(schemes).map(([name, scheme]) => {
    const type = asString(scheme?.type)
    const description = asString(scheme?.description)
    const detail =
      type === 'apiKey'
        ? `\`${asString(scheme?.name) || name}\` ${asString(scheme?.in) || 'header'}`
        : type === 'http'
          ? `HTTP \`${asString(scheme?.scheme) || 'bearer'}\``
          : type || 'unspecified'
    return `- \`${name}\` (${detail})${description ? `: ${description}` : ''}`
  })

  return lines.length > 0
    ? lines
    : ['- See the `securitySchemes` block in the machine-readable spec.']
}

/**
 * Markdown representation of /api-reference. The HTML page renders the spec in
 * an interactive viewer that converts poorly, so the markdown twin is built
 * from the spec itself: auth, servers, and an endpoint index agents can scan
 * before fetching the full 700KB+ document.
 */
export function buildApiReferenceMarkdown(spec: LatestOpenAPISpec): string {
  const { document, version } = spec
  const byTag = collectOperationsByTag(document)
  // Multi-tagged operations appear in every group they are tagged with, so the
  // headline total counts unique method/route pairs instead of grouped entries.
  const operationCount = new Set([...byTag.values()].flat().map((op) => `${op.method} ${op.route}`))
    .size
  const pathCount = Object.keys(document.paths || {}).length
  const title = asString(document.info?.title) || 'SigNoz'
  const description = asString(document.info?.description)
  const openapiVersion = asString(document.openapi)

  const endpointSections = [...byTag.keys()].sort().flatMap((tag) => {
    const operations = (byTag.get(tag) || []).slice().sort((a, b) => {
      if (a.route === b.route) return a.method.localeCompare(b.method)
      return a.route.localeCompare(b.route)
    })
    return [`### ${tag}`, '', ...operations.map(renderOperation), '']
  })

  return [
    `# ${title} API Reference`,
    '',
    description || 'HTTP API for SigNoz Cloud and Self-Hosted SigNoz.',
    '',
    `- Machine-readable spec: [openapi.json](${siteMetadata.siteUrl}/openapi.json) — YAML at [openapi.yaml](${siteMetadata.siteUrl}/openapi.yaml)`,
    `- Spec release: \`${version}\`${openapiVersion ? ` (OpenAPI ${openapiVersion})` : ''}`,
    `- Interactive reference: ${siteMetadata.siteUrl}/api-reference/`,
    `- Per-release specs: ${siteMetadata.siteUrl}/api/api-reference-openapi/<release> (a release tag, e.g. \`${version}\`, or \`latest\`)`,
    `- Documentation: ${siteMetadata.siteUrl}/docs/introduction/`,
    '',
    '## Authentication',
    '',
    ...renderSecuritySchemes(document),
    '',
    '## Base URL',
    '',
    ...renderServers(document),
    '',
    `## Endpoints (${operationCount} operations across ${pathCount} paths)`,
    '',
    ...endpointSections,
  ].join('\n')
}
