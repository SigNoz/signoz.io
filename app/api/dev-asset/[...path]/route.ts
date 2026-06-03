// Dev-only route: serves static assets from `data-assets/` for local CMS previews.
// Reached via afterFiles rewrites in next.config.js (dev only).
// Excluded from Vercel deployments via .vercelignore.

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

export async function GET(_request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params
  const parts = params.path || []

  if (parts.length === 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  const baseDir = path.resolve(process.cwd(), 'data-assets')
  const filePath = path.resolve(baseDir, ...parts)

  if (!filePath.startsWith(baseDir + path.sep)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const stats = await fs.stat(filePath)
    if (!stats.isFile()) return new NextResponse('Not found', { status: 404 })

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
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return new NextResponse('Not found', { status: 404 })
    }
    throw error
  }
}
