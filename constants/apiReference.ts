import type { SemverParts } from '@/utils/semverTags'

export const GITHUB_SPEC_RAW_URL_TEMPLATE =
  'https://raw.githubusercontent.com/SigNoz/signoz/{version}/docs/api/openapi.yml'

export const MIN_API_SPEC_VERSION: SemverParts = [0, 105, 0]

/**
 * Revalidation interval for the OpenAPI spec routes.
 *
 * NOTE: Next 15's segment-config static analyzer only accepts primitive literals
 * for `export const revalidate = ...`. It does not follow imports or evaluate
 * identifiers. Pages that need this value must inline the literal `86400` and
 * leave a `// see API_SPEC_REVALIDATE_SECONDS` comment so future edits stay in sync.
 *
 * Still imported by `app/api/api-reference-openapi/[version]/route.ts` for the
 * runtime `Cache-Control` header — that use is fine.
 */
export const API_SPEC_REVALIDATE_SECONDS = 86400 // 24h

export const API_VERSIONS_CACHE_KEY = 'api-reference-versions-v1'
export const API_VERSIONS_CACHE_TAG = 'api-reference-versions'
