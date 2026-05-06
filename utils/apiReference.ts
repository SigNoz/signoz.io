import { unstable_cache } from 'next/cache'
import {
  compareSemverParts,
  compareSemverTags,
  parseSemverTag,
  type SemverParts,
} from '@/utils/semverTags'
import {
  GITHUB_SPEC_RAW_URL_TEMPLATE,
  MIN_API_SPEC_VERSION,
  API_SPEC_REVALIDATE_SECONDS,
  API_VERSIONS_CACHE_KEY,
  API_VERSIONS_CACHE_TAG,
} from '@/constants/apiReference'

const GITHUB_API_URL = 'https://api.github.com/repos/SigNoz/signoz/releases'
const PER_PAGE = 100
const MAX_PAGES = 10

interface GitHubApiRelease {
  tag_name: string
  published_at: string
  draft: boolean
  prerelease: boolean
}

function githubFetchHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'signoz-api-reference',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

function parseLinkHeader(header: string | null): string | null {
  if (!header) return null
  const parts = header.split(',')
  for (const part of parts) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/)
    if (match) return match[1]
  }
  return null
}

function isAtLeastMinVersion(parts: SemverParts): boolean {
  return compareSemverParts(parts, MIN_API_SPEC_VERSION) >= 0
}

export async function fetchOpenAPISpec(version: string): Promise<string | null> {
  const parts = parseSemverTag(version)
  if (!parts) return null

  const url = GITHUB_SPEC_RAW_URL_TEMPLATE.replace('{version}', version)
  try {
    const res = await fetch(url, {
      headers: {
        ...githubFetchHeaders(),
      },
      next: { revalidate: API_SPEC_REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      console.error(`[api-reference] Failed to fetch spec for ${version}: ${res.status}`)
      return null
    }
    return res.text()
  } catch (err) {
    console.error(`[api-reference] Error fetching spec for ${version}:`, err)
    return null
  }
}

export interface APIVersionInfo {
  version: string
  publishedAt: string
}

async function fetchAllAPIVersions(): Promise<APIVersionInfo[]> {
  const allReleases: GitHubApiRelease[] = []
  let url: string | null = `${GITHUB_API_URL}?per_page=${PER_PAGE}`

  for (let page = 0; page < MAX_PAGES && url; page++) {
    const res = await fetch(url, {
      headers: githubFetchHeaders(),
      next: { revalidate: API_SPEC_REVALIDATE_SECONDS },
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        console.warn('[api-reference] GitHub API rate limit hit, returning partial results')
        break
      }
      throw new Error(`GitHub API responded with ${res.status}`)
    }

    const data: GitHubApiRelease[] = await res.json()
    allReleases.push(...data)

    url = parseLinkHeader(res.headers.get('link'))
  }

  // Filter to valid, non-draft, non-prerelease releases >= MIN_API_SPEC_VERSION
  // Keep only the highest patch per minor version
  const minorBest: Record<string, { version: string; parts: SemverParts; publishedAt: string }> = {}

  for (const r of allReleases) {
    if (r.draft || r.prerelease) continue

    const parts = parseSemverTag(r.tag_name)
    if (!parts) continue
    if (!isAtLeastMinVersion(parts)) continue

    const minorKey = `${parts[0]}.${parts[1]}`
    const existing = minorBest[minorKey]
    if (!existing || compareSemverParts(parts, existing.parts) > 0) {
      minorBest[minorKey] = {
        version: r.tag_name,
        parts,
        publishedAt: r.published_at,
      }
    }
  }

  return Object.values(minorBest)
    .sort((a, b) => compareSemverTags(b.version, a.version))
    .map(({ version, publishedAt }) => ({ version, publishedAt }))
}

export const fetchAvailableAPIVersions = unstable_cache(
  fetchAllAPIVersions,
  [API_VERSIONS_CACHE_KEY],
  {
    revalidate: API_SPEC_REVALIDATE_SECONDS,
    tags: [API_VERSIONS_CACHE_TAG],
  }
)

export async function resolveLatestVersion(): Promise<string | null> {
  const versions = await fetchAvailableAPIVersions()
  return versions.length > 0 ? versions[0].version : null
}
