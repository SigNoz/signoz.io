// Dev-only route: serves images from `data-assets/img` for local CMS previews.
// In production Next.js serves `public/img` as static files automatically,
// so this handler just returns 404 — keeping the serverless function tiny.

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NOT_FOUND = new NextResponse('Not found', { status: 404 })

const CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function hasUnsafePathSegment(parts: string[]) {
  return parts.some((part) => part === '..' || part.includes('/') || part.includes('\\'))
}

export async function GET(_request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  if (process.env.NODE_ENV !== 'development') {
    return NOT_FOUND
  }

  const params = await props.params
  const parts = params.path || []

  if (parts.length === 0 || hasUnsafePathSegment(parts)) {
    return NOT_FOUND
  }

  // Dynamic imports so fs/path are NOT traced into the production bundle
  const { promises: fs } = await import('fs')
  const path = await import('path')

  const baseDir = path.join(process.cwd(), 'data-assets')
  const filePath = path.join(baseDir, ...parts)

  const relativePath = path.relative(baseDir, filePath)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return NOT_FOUND
  }

  try {
    const stats = await fs.stat(filePath)
    if (!stats.isFile()) return NOT_FOUND

    const asset = await fs.readFile(filePath)
    return new NextResponse(new Uint8Array(asset), {
      headers: {
        'Content-Type':
          CONTENT_TYPES[path.extname(parts.at(-1) || '').toLowerCase()] ||
          'application/octet-stream',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return NOT_FOUND
    throw error
  }
}
