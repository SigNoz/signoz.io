import { cacheLife, cacheTag } from 'next/cache'
import { GITHUB_RELEASE_TAG_REVALIDATE_SECONDS } from '@/constants/cache'

const CACHE_TAG_PREFIX = 'github-release-tag'

function githubFetchHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'signoz-web',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

async function checkRelease(version: string): Promise<boolean> {
  'use cache'
  cacheLife({ revalidate: GITHUB_RELEASE_TAG_REVALIDATE_SECONDS })
  cacheTag(`${CACHE_TAG_PREFIX}-${version}`)

  const tag = version.startsWith('v') ? version : `v${version}`
  const url = `https://api.github.com/repos/SigNoz/signoz/releases/tags/${encodeURIComponent(tag)}`

  try {
    const response = await fetch(url, {
      headers: githubFetchHeaders(),
      cache: 'no-store',
    })

    if (response.status === 404) {
      return false
    }

    if (!response.ok) {
      console.warn(`GitHub release check for ${tag} returned ${response.status}`)
      return true
    }

    const data = await response.json()
    return data.draft === false
  } catch (error) {
    console.warn(`GitHub release check failed for ${tag}:`, error)
    return true
  }
}

export async function isGitHubReleasePublished(version: string): Promise<boolean> {
  return checkRelease(version)
}
