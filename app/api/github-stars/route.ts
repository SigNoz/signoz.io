import { NextResponse } from 'next/server'
import { GITHUB_STARS_EDGE_S_MAXAGE_SECONDS } from '@/constants/cache'

const GITHUB_REPO_API_URL = 'https://api.github.com/repos/SigNoz/signoz'

interface GitHubRepoPayload {
  stargazers_count: number
}

function githubFetchHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

async function fetchGitHubStars(): Promise<number> {
  const response = await fetch(GITHUB_REPO_API_URL, {
    headers: githubFetchHeaders(),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`)
  }

  const data: GitHubRepoPayload = await response.json()

  if (!Number.isFinite(data.stargazers_count)) {
    throw new Error('GitHub API response did not include stargazers_count')
  }

  return data.stargazers_count
}

export async function GET() {
  try {
    const stars = await fetchGitHubStars()

    return NextResponse.json(
      { stars },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${GITHUB_STARS_EDGE_S_MAXAGE_SECONDS}, stale-while-revalidate=86400`,
        },
      }
    )
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub stars' }, { status: 502 })
  }
}
