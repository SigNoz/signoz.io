import { NextResponse } from 'next/server'

const GITHUB_API_URL = 'https://api.github.com/repos/SigNoz/signoz/releases'
const PER_PAGE = 100
const MAX_PAGES = 10
const SEMVER_TAG_RE = /^v(\d+)\.(\d+)\.(\d+)$/
const MIN_VERSION: [number, number, number] = [0, 8, 0]

interface GitHubApiRelease {
  tag_name: string
  published_at: string
  html_url: string
  draft: boolean
  prerelease: boolean
}

function parseSemver(tag: string): [number, number, number] | null {
  const m = SEMVER_TAG_RE.exec(tag)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

function isAtLeastMinVersion(parts: [number, number, number]): boolean {
  for (let i = 0; i < 3; i++) {
    if (parts[i] > MIN_VERSION[i]) return true
    if (parts[i] < MIN_VERSION[i]) return false
  }
  return true
}

function compareSemver(a: [number, number, number], b: [number, number, number]): number {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i]
  }
  return 0
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

async function fetchAllReleases(): Promise<GitHubApiRelease[]> {
  const allReleases: GitHubApiRelease[] = []
  let url: string | null = `${GITHUB_API_URL}?per_page=${PER_PAGE}`

  for (let page = 0; page < MAX_PAGES && url; page++) {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'signoz-upgrade-path-tool',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        console.warn('GitHub API rate limit hit, returning partial results')
        break
      }
      throw new Error(`GitHub API responded with ${res.status}`)
    }

    const data: GitHubApiRelease[] = await res.json()
    allReleases.push(...data)

    url = parseLinkHeader(res.headers.get('link'))
  }

  return allReleases
}

export async function GET() {
  try {
    const raw = await fetchAllReleases()

    const releases: Array<{
      version: string
      publishedAt: string
      htmlUrl: string
      isPatch: boolean
      parentVersion: string
    }> = []

    const patchMap: Record<
      string,
      { label: string; href: string; parts: [number, number, number] }
    > = {}

    for (const r of raw) {
      if (r.draft || r.prerelease) continue

      const parts = parseSemver(r.tag_name)
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
        if (!existing || compareSemver(parts, existing.parts) > 0) {
          patchMap[parentVersion] = {
            label: r.tag_name,
            href: r.html_url,
            parts,
          }
        }
      }
    }

    const patches: Record<string, { label: string; href: string }> = {}
    for (const [parent, info] of Object.entries(patchMap)) {
      patches[parent] = { label: info.label, href: info.href }
    }

    return NextResponse.json(
      { releases, patches },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
      }
    )
  } catch (error) {
    console.error('Failed to fetch GitHub releases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch releases', releases: [], patches: {} },
      { status: 502 }
    )
  }
}
