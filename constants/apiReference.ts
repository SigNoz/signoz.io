import type { SemverParts } from '@/utils/semverTags'

export const GITHUB_SPEC_RAW_URL_TEMPLATE =
  'https://raw.githubusercontent.com/SigNoz/signoz/{version}/docs/api/openapi.yml'

export const MIN_API_SPEC_VERSION: SemverParts = [0, 105, 0]

export const API_SPEC_REVALIDATE_SECONDS = 86400 // 24h

export const API_VERSIONS_CACHE_KEY = 'api-reference-versions-v1'
export const API_VERSIONS_CACHE_TAG = 'api-reference-versions'
