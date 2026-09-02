import { parse } from 'yaml'
import { fetchOpenAPISpec, resolveLatestVersion } from '@/utils/apiReference'

export type OpenAPIDocument = Record<string, unknown> & {
  info?: Record<string, unknown>
  servers?: unknown[]
  paths?: Record<string, Record<string, unknown>>
  components?: { securitySchemes?: Record<string, Record<string, unknown>> }
}

export type LatestOpenAPISpec = {
  version: string
  /** Raw YAML exactly as published in the SigNoz release. */
  yaml: string
  document: OpenAPIDocument
}

/**
 * The upstream spec ships with an empty `info.version`, which reads as a
 * malformed document to spec validators and agent tooling. Stamp the release
 * tag the spec was fetched from instead.
 */
export const stampSpecVersion = (document: OpenAPIDocument, version: string): OpenAPIDocument => {
  const info = { ...(document.info || {}) }
  if (!info.version || typeof info.version !== 'string' || info.version.trim() === '') {
    info.version = version.replace(/^v/, '')
  }
  return { ...document, info }
}

/**
 * Fetch and parse the spec for one published release. `version` is a release
 * tag; callers resolve `latest` themselves.
 */
export async function getOpenAPISpecForVersion(version: string): Promise<LatestOpenAPISpec | null> {
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
    yaml,
    document: stampSpecVersion(parsed as OpenAPIDocument, version),
  }
}

/** Fetch and parse the spec for the newest published SigNoz release. */
export async function getLatestOpenAPISpec(): Promise<LatestOpenAPISpec | null> {
  const version = await resolveLatestVersion()
  if (!version) return null

  return getOpenAPISpecForVersion(version)
}
