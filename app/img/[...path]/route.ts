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

  const publicImgDir = path.join(process.cwd(), 'public', 'img')
  const dataAssetsImgDir = path.join(process.cwd(), 'data-assets', 'img')
  const searchDirs =
    process.env.NODE_ENV === 'development' ? [publicImgDir, dataAssetsImgDir] : [publicImgDir]

  for (const directory of searchDirs) {
    const asset = await readAsset(directory, parts)
    if (!asset) continue

    return new NextResponse(new Uint8Array(asset), {
      headers: {
        'Content-Type':
          CONTENT_TYPES[path.extname(parts.at(-1) || '').toLowerCase()] ||
          'application/octet-stream',
        'Cache-Control':
          process.env.NODE_ENV === 'development'
            ? 'no-store'
            : 'public, max-age=31536000, immutable',
      },
    })
  }

  return new NextResponse('Not found', { status: 404 })
}
