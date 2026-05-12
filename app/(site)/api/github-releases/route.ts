import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { compareSemverParts, parseSemverTag, type SemverParts } from '@/utils/semverTags'
import {
  GITHUB_RELEASES_EDGE_S_MAXAGE_SECONDS,
  GITHUB_RELEASES_PARTIAL_INSTANCE_MEMO_MS,
  GITHUB_RELEASES_PARTIAL_S_MAXAGE_SECONDS,
  GITHUB_RELEASES_REVALIDATE_SECONDS,
  GITHUB_RELEASES_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/constants/cache'

const GITHUB_API_URL = 'https://api.github.com/repos/SigNoz/signoz/releases'
const PER_PAGE = 100
const MAX_PAGES = 10
const MIN_VERSION: SemverParts = [0, 8, 0]

const CACHE_TAG = 'github-releases-signoz'

interface GitHubApiRelease {
  tag_name: string
  published_at: string
  html_url: string
  draft: boolean
  prerelease: boolean
}

interface GitHubReleasesPayload {
  releases: Array<{
    version: string
    publishedAt: string
    htmlUrl: string
    isPatch: boolean
    parentVersion: string
  }>
  patches: Record<string, { label: string; href: string }>
  partial?: true
}

class PartialGitHubPayload extends Error {
  constructor(readonly payload: GitHubReleasesPayload) {
    super('github-releases-partial')
    this.name = 'PartialGitHubPayload'
  }
}

function isAtLeastMinVersion(parts: SemverParts): boolean {
  for (let i = 0; i < 3; i++) {
    if (parts[i] > MIN_VERSION[i]) return true
    if (parts[i] < MIN_VERSION[i]) return false
  }
  return true
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

function githubFetchHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'signoz-upgrade-path-tool',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchAllReleases(): Promise<{ raw: GitHubApiRelease[]; partial: boolean }> {
  const allReleases: GitHubApiRelease[] = []
  let url: string | null = `${GITHUB_API_URL}?per_page=${PER_PAGE}`
  let partial = false

  for (let page = 0; page < MAX_PAGES && url; page++) {
    const res = await fetch(url, {
      headers: githubFetchHeaders(),
      cache: 'no-store',
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        console.warn('GitHub API rate limit hit, returning partial results')
        partial = true
        break
      }
      throw new Error(`GitHub API responded with ${res.status}`)
    }

    const data: GitHubApiRelease[] = await res.json()
    allReleases.push(...data)

    url = parseLinkHeader(res.headers.get('link'))
  }

  return { raw: allReleases, partial }
}

function transformRawToPayload(raw: GitHubApiRelease[], partial: boolean): GitHubReleasesPayload {
  const releases: GitHubReleasesPayload['releases'] = []

  const patchMap: Record<string, { label: string; href: string; parts: SemverParts }> = {}

  for (const r of raw) {
    if (r.draft || r.prerelease) continue

    const parts = parseSemverTag(r.tag_name)
    if (!parts) continue
    if (!isAtLeastMinVersion(parts)) continue

    const isPatch = parts[2] > 0
    const parentVersion = `v${parts[0]}.${parts[1]}.0`

    releases.push({
      version: r.tag_name,
      publishedAt: r.published_at,
      htmlUrl: r.html_url,
      isPatch,
      parentVersion,
    })

    if (isPatch) {
      const existing = patchMap[parentVersion]
      if (!existing || compareSemverParts(parts, existing.parts) > 0) {
        patchMap[parentVersion] = {
          label: r.tag_name,
          href: r.html_url,
          parts,
        }
      }
    }
  }

  const patches: GitHubReleasesPayload['patches'] = {}
  for (const [parent, info] of Object.entries(patchMap)) {
    patches[parent] = { label: info.label, href: info.href }
  }

  return {
    releases,
    patches,
    ...(partial ? { partial: true as const } : {}),
  }
}

async function fetchAndBuildPayload(): Promise<GitHubReleasesPayload> {
  const { raw, partial } = await fetchAllReleases()
  return transformRawToPayload(raw, partial)
}

const getCachedFullReleasesPayload = unstable_cache(
  async (): Promise<GitHubReleasesPayload> => {
    const payload = await fetchAndBuildPayload()
    if (payload.partial) {
      throw new PartialGitHubPayload(payload)
    }
    return payload
  },
  ['signoz-github-releases-payload-v1'],
  {
    revalidate: GITHUB_RELEASES_REVALIDATE_SECONDS,
    tags: [CACHE_TAG],
  }
)

/** Same-instance memo when GitHub returns partial data (rate limit) to avoid hammering the API. */
let partialPayloadMemo: { payload: GitHubReleasesPayload; at: number } | null = null

function getPartialPayloadFromMemo(): GitHubReleasesPayload | null {
  if (
    partialPayloadMemo &&
    Date.now() - partialPayloadMemo.at < GITHUB_RELEASES_PARTIAL_INSTANCE_MEMO_MS
  ) {
    return partialPayloadMemo.payload
  }
  return null
}

function rememberPartialPayload(payload: GitHubReleasesPayload): void {
  partialPayloadMemo = { payload, at: Date.now() }
}

function clearPartialMemo(): void {
  partialPayloadMemo = null
}

function cacheControlFull(): string {
  return `public, s-maxage=${GITHUB_RELEASES_EDGE_S_MAXAGE_SECONDS}, stale-while-revalidate=${GITHUB_RELEASES_STALE_WHILE_REVALIDATE_SECONDS}`
}

function cacheControlPartial(): string {
  return `public, s-maxage=${GITHUB_RELEASES_PARTIAL_S_MAXAGE_SECONDS}, stale-while-revalidate=60`
}

export async function GET() {
  try {
    const memo = getPartialPayloadFromMemo()
    if (memo) {
      return NextResponse.json(memo, {
        headers: {
          'Cache-Control': cacheControlPartial(),
        },
      })
    }

    try {
      const payload = await getCachedFullReleasesPayload()
      clearPartialMemo()
      return NextResponse.json(payload, {
        headers: {
          'Cache-Control': cacheControlFull(),
        },
      })
    } catch (err) {
      if (err instanceof PartialGitHubPayload) {
        rememberPartialPayload(err.payload)
        return NextResponse.json(err.payload, {
          headers: {
            'Cache-Control': cacheControlPartial(),
          },
        })
      }
      throw err
    }
  } catch (error) {
    console.error('Failed to fetch GitHub releases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch releases', releases: [], patches: {} },
      { status: 502 }
    )
  }
}
