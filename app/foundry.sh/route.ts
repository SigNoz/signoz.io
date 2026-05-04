import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import {
  FOUNDRY_SCRIPT_EDGE_S_MAXAGE_SECONDS,
  FOUNDRY_SCRIPT_FALLBACK_INSTANCE_MEMO_MS,
  FOUNDRY_SCRIPT_FALLBACK_S_MAXAGE_SECONDS,
  FOUNDRY_SCRIPT_REVALIDATE_SECONDS,
  FOUNDRY_SCRIPT_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/constants/cache'

const FOUNDRY_SCRIPT_URL =
  'https://raw.githubusercontent.com/SigNoz/foundry/main/scripts/foundry.sh'

const CACHE_TAG = 'foundry-installer-script'

const SCRIPT_CONTENT_TYPE = 'text/x-shellscript; charset=utf-8'

class RateLimitedScriptFetch extends Error {
  constructor(readonly status: number) {
    super('foundry-script-rate-limited')
    this.name = 'RateLimitedScriptFetch'
  }
}

function fetchHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'User-Agent': 'signoz-foundry-installer-route',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchFoundryScript(): Promise<string> {
  const res = await fetch(FOUNDRY_SCRIPT_URL, {
    headers: fetchHeaders(),
    cache: 'no-store',
  })

  if (!res.ok) {
    if (res.status === 403 || res.status === 429) {
      console.warn(`GitHub rate limit hit fetching foundry script (status ${res.status})`)
      throw new RateLimitedScriptFetch(res.status)
    }
    throw new Error(`GitHub responded with ${res.status} fetching foundry script`)
  }

  return res.text()
}

const getCachedFoundryScript = unstable_cache(
  async (): Promise<string> => fetchFoundryScript(),
  ['signoz-foundry-installer-script-v1'],
  {
    revalidate: FOUNDRY_SCRIPT_REVALIDATE_SECONDS,
    tags: [CACHE_TAG],
  }
)

/** Same-instance memo of the last successful body, used as fallback when GitHub rate limits us. */
let fallbackScriptMemo: { body: string; at: number } | null = null

function getFallbackScriptFromMemo(): string | null {
  if (
    fallbackScriptMemo &&
    Date.now() - fallbackScriptMemo.at < FOUNDRY_SCRIPT_FALLBACK_INSTANCE_MEMO_MS
  ) {
    return fallbackScriptMemo.body
  }
  return null
}

function rememberScript(body: string): void {
  fallbackScriptMemo = { body, at: Date.now() }
}

function cacheControlFull(): string {
  return `public, s-maxage=${FOUNDRY_SCRIPT_EDGE_S_MAXAGE_SECONDS}, stale-while-revalidate=${FOUNDRY_SCRIPT_STALE_WHILE_REVALIDATE_SECONDS}`
}

function cacheControlFallback(): string {
  return `public, s-maxage=${FOUNDRY_SCRIPT_FALLBACK_S_MAXAGE_SECONDS}, stale-while-revalidate=60`
}

export async function GET() {
  try {
    try {
      const body = await getCachedFoundryScript()
      rememberScript(body)
      return new NextResponse(body, {
        headers: {
          'Content-Type': SCRIPT_CONTENT_TYPE,
          'Cache-Control': cacheControlFull(),
        },
      })
    } catch (err) {
      if (err instanceof RateLimitedScriptFetch) {
        const fallback = getFallbackScriptFromMemo()
        if (fallback) {
          return new NextResponse(fallback, {
            headers: {
              'Content-Type': SCRIPT_CONTENT_TYPE,
              'Cache-Control': cacheControlFallback(),
            },
          })
        }
      }
      throw err
    }
  } catch (error) {
    console.error('Failed to fetch foundry installer script:', error)
    return NextResponse.json({ error: 'Failed to fetch foundry installer script' }, { status: 502 })
  }
}
