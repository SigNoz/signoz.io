import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { clearPathsCache } from '@/utils/strapi'
import { getStrapiDocumentCacheTags, parseCmsUrlPath } from '@/utils/cmsRevalidatePaths'

type PathInput = string | { urlPath: string; contentKey?: string }

interface RevalidationResult {
  path?: string
  tag?: string
  tags?: string[]
  revalidated: boolean
  type: 'route' | 'path' | 'tag' | 'cmsPath'
  timestamp: string
}

function normalizePathInput(input: PathInput): { urlPath: string; contentKey?: string } {
  if (typeof input === 'string') {
    return { urlPath: input }
  }
  return { urlPath: input.urlPath, contentKey: input.contentKey }
}

function revalidateCmsUrlPath(
  urlPath: string,
  explicitContentKey: string | undefined,
  results: RevalidationResult[]
) {
  const normalized = urlPath.startsWith('/') ? urlPath : `/${urlPath}`
  revalidatePath(normalized)

  const contentKey =
    explicitContentKey?.replace(/^\/+/, '').replace(/\/$/, '') ||
    parseCmsUrlPath(normalized)?.contentKey

  const tags: string[] = []
  if (contentKey) {
    const parsed = parseCmsUrlPath(normalized)
    if (parsed) {
      const strapiTags = getStrapiDocumentCacheTags({
        ...parsed,
        contentKey,
      })
      for (const t of strapiTags) {
        revalidateTag(t)
        tags.push(t)
      }
    }
  }

  results.push({
    path: normalized,
    tags,
    revalidated: true,
    type: 'cmsPath',
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paths, path, tags, tag, secret, revalidateAll = false, clearCache = false } = body

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const results: RevalidationResult[] = []

    if (clearCache) {
      // Clears in-memory Strapi paths list only for this serverless instance; safe no-op across cold starts.
      clearPathsCache()
      console.log('Cleared paths cache (instance-local)')
    }

    if (revalidateAll) {
      revalidatePath('/', 'layout')
      revalidateTag('mdx-content-list')
      revalidateTag('comparisons-list')

      results.push({
        path: '/',
        revalidated: true,
        type: 'route',
        timestamp: new Date().toISOString(),
      })
    }

    if (path) {
      const { urlPath, contentKey } = normalizePathInput(path as PathInput)
      revalidateCmsUrlPath(urlPath, contentKey, results)
    }

    if (paths && Array.isArray(paths)) {
      for (const item of paths) {
        const { urlPath, contentKey } = normalizePathInput(item as PathInput)
        revalidateCmsUrlPath(urlPath, contentKey, results)
      }
    }

    if (tag) {
      revalidateTag(tag)

      results.push({
        tag,
        revalidated: true,
        type: 'tag',
        timestamp: new Date().toISOString(),
      })
    }

    if (tags && Array.isArray(tags)) {
      for (const t of tags) {
        revalidateTag(t)

        results.push({
          tag: t,
          revalidated: true,
          type: 'tag',
          timestamp: new Date().toISOString(),
        })
      }
    }

    console.log('Revalidation completed:', JSON.stringify(results))

    return NextResponse.json({
      revalidated: true,
      results,
      timestamp: new Date().toISOString(),
      vercelEnv: process.env.VERCEL_ENV ?? null,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        message: 'Error revalidating paths',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const contentKey = searchParams.get('contentKey') || undefined
  const tag = searchParams.get('tag')
  const secret = searchParams.get('secret')
  const revalidateAll = searchParams.get('revalidateAll') === 'true'
  const clearCache = searchParams.get('clearCache') === 'true'

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const results: RevalidationResult[] = []

    if (clearCache) {
      clearPathsCache()
      console.log('Cleared paths cache (instance-local)')
    }

    if (revalidateAll) {
      revalidatePath('/', 'layout')
      revalidateTag('mdx-content-list')
      revalidateTag('comparisons-list')

      results.push({
        path: '/',
        revalidated: true,
        type: 'route',
        timestamp: new Date().toISOString(),
      })
    }

    if (path) {
      revalidateCmsUrlPath(path, contentKey, results)
    }

    if (tag) {
      revalidateTag(tag)

      results.push({
        tag,
        revalidated: true,
        type: 'tag',
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      revalidated: true,
      results,
      timestamp: new Date().toISOString(),
      vercelEnv: process.env.VERCEL_ENV ?? null,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        message: 'Error revalidating paths',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
