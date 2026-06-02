// Dev-only route: serves images from `data-assets/` for local CMS previews.
// Excluded from Vercel deployments via .vercelignore — in production,
// Next.js serves public/img as static files automatically.

import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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

function isInsideDirectory(baseDir: string, filePath: string) {
  const relativePath = path.relative(baseDir, filePath)
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
}

async function readAsset(baseDir: string, parts: string[]) {
  const filePath = path.join(baseDir, ...parts)

  if (!isInsideDirectory(baseDir, filePath)) {
    return null
  }

  try {
    const stats = await fs.stat(filePath)
    if (!stats.isFile()) return null

    return fs.readFile(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

export async function GET(_request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params
  const parts = params.path || []

  if (parts.length === 0 || hasUnsafePathSegment(parts)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const dataAssetsDir = path.join(process.cwd(), 'data-assets')

  const asset = await readAsset(dataAssetsDir, parts)
  if (asset) {
    return new NextResponse(new Uint8Array(asset), {
      headers: {
        'Content-Type':
          CONTENT_TYPES[path.extname(parts.at(-1) || '').toLowerCase()] ||
          'application/octet-stream',
        'Cache-Control': 'no-store',
      },
    })
  }

  return new NextResponse('Not found', { status: 404 })
}
