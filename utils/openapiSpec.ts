import { parse, stringify } from 'yaml'
import { fetchOpenAPISpec, resolveLatestVersion } from '@/utils/apiReference'
import { computeWeakEtag } from '@/utils/agentResponseHeaders'
import { API_SPEC_REVALIDATE_SECONDS } from '@/constants/apiReference'

export type OpenAPIDocument = Record<string, unknown> & {
  info?: Record<string, unknown>
  servers?: unknown[]
  paths?: Record<string, Record<string, unknown>>
  components?: { securitySchemes?: Record<string, Record<string, unknown>> }
}

export type OpenAPISpec = {
  /** Release tag the spec was fetched from, e.g. `v0.139.0`. */
  version: string
  document: OpenAPIDocument
}

/**
 * The upstream spec ships with an empty `info.version`, which reads as a
 * malformed document to spec validators and agent tooling. Stamp the release
 * tag the spec was fetched from instead.
 */
export const stampSpecVersion = (document: OpenAPIDocument, version: string): OpenAPIDocument => {
  const info = { ...(document.info || {}) }
  if (typeof info.version !== 'string' || info.version.trim() === '') {
    info.version = version.replace(/^v/, '')
  }
  return { ...document, info }
}

/**
 * Fetch and parse the spec for one published release. `version` is a release
 * tag; callers resolve `latest` themselves.
 */
export async function getOpenAPISpecForVersion(version: string): Promise<OpenAPISpec | null> {
  const yaml = await fetchOpenAPISpec(version)
  if (!yaml) return null

  let parsed: unknown
  try {
    parsed = parse(yaml)
  } catch (err) {
    console.error(`[openapi] Failed to parse spec for ${version}:`, err)
    return null
  }

  if (!parsed || typeof parsed !== 'object') return null

  return {
    version,
    document: stampSpecVersion(parsed as OpenAPIDocument, version),
  }
}

/** Fetch and parse the spec for the newest published SigNoz release. */
export async function getLatestOpenAPISpec(): Promise<OpenAPISpec | null> {
  const version = await resolveLatestVersion()
  if (!version) return null

  return getOpenAPISpecForVersion(version)
}

const SPEC_CONTENT_TYPES = {
  json: 'application/json; charset=utf-8',
  yaml: 'application/yaml; charset=utf-8',
} as const

/**
 * Shared response builder for /openapi.json and /openapi.yaml. The spec is
 * discovered via llms.txt rather than search, so it is noindexed like every
 * other agent surface. Cache policy follows the split documented in
 * utils/agentResponseHeaders.ts: Vercel strips s-maxage/SWR from
 * Cache-Control, so the edge policy goes in Vercel-CDN-Cache-Control.
 */
export function openapiSpecResponse(spec: OpenAPISpec, format: 'json' | 'yaml'): Response {
  const body = format === 'json' ? JSON.stringify(spec.document) : stringify(spec.document)

  return new Response(body, {
    headers: {
      'Content-Type': SPEC_CONTENT_TYPES[format],
      'Cache-Control': 'public, max-age=300',
      'Vercel-CDN-Cache-Control': `public, s-maxage=${API_SPEC_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      ETag: computeWeakEtag(body),
      'X-Robots-Tag': 'noindex',
      'X-SigNoz-API-Version': spec.version,
    },
  })
}
