import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { clearPathsCache } from '@/utils/strapi'
import { clearHubIndexCache } from '@/utils/opentelemetryHub'

interface RevalidationResult {
  path?: string
  tag?: string
  revalidated: boolean
  type: 'route' | 'path' | 'tag'
  timestamp: string
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
      clearPathsCache()
      clearHubIndexCache()
      console.log('Cleared paths and hub index cache')
    }

    if (revalidateAll) {
      revalidatePath('/', 'layout')
      revalidateTag('mdx-content-list')
      revalidateTag('comparisons-list')
      revalidateTag('mdx-paths')
      clearHubIndexCache()

      results.push({
        path: '/',
        revalidated: true,
        type: 'route',
        timestamp: new Date().toISOString(),
      })
    }

    if (path) {
      revalidatePath(path)
      revalidateTag(`mdx-content-${path}`)

      results.push({
        path,
        revalidated: true,
        type: 'path',
        timestamp: new Date().toISOString(),
      })
    }

    if (paths && Array.isArray(paths)) {
      for (const p of paths) {
        revalidatePath(p)
        revalidateTag(`mdx-content-${p}`)

        results.push({
          path: p,
          revalidated: true,
          type: 'path',
          timestamp: new Date().toISOString(),
        })
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
        if (t === 'mdx-content-list' || t === 'comparisons-list') {
          clearHubIndexCache()
        }

        results.push({
          tag: t,
          revalidated: true,
          type: 'tag',
          timestamp: new Date().toISOString(),
        })
      }
    }

    console.log('Revalidation completed:', results)

    return NextResponse.json({
      revalidated: true,
      results,
      timestamp: new Date().toISOString(),
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
      clearHubIndexCache()
      console.log('Cleared paths and hub index cache')
    }

    if (revalidateAll) {
      revalidatePath('/', 'layout')
      revalidateTag('mdx-content-list')
      revalidateTag('comparisons-list')
      revalidateTag('mdx-paths')
      clearHubIndexCache()

      results.push({
        path: '/',
        revalidated: true,
        type: 'route',
        timestamp: new Date().toISOString(),
      })
    }

    if (path) {
      revalidatePath(path)
      revalidateTag(`mdx-content-${path}`)

      results.push({
        path,
        revalidated: true,
        type: 'path',
        timestamp: new Date().toISOString(),
      })
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
