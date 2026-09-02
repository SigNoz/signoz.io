// ListicleIcon pixel-samples icons to detect near-white logos, but canvas
// reads are blocked for cross-origin images. This route re-serves allow-listed icons
// same-origin so they are readable. /_next/image can't do this: it rejects
// SVGs.

import { NextRequest, NextResponse } from 'next/server'
import { isSrcAllowedForNextImage } from '@/constants/allowedImageDomains'

export const dynamic = 'force-dynamic'

const MAX_BYTES = 2 * 1024 * 1024

const isAllowedIconSrc = (src: string): boolean => {
  try {
    new URL(src)
  } catch {
    return false
  }
  return isSrcAllowedForNextImage(src)
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get('src')
  if (!src || !isAllowedIconSrc(src)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const upstream = await fetch(src, { signal: AbortSignal.timeout(10_000) })
    const contentType = upstream.headers.get('content-type') || ''
    if (!upstream.ok || !contentType.startsWith('image/')) {
      return new NextResponse('Not found', { status: 404 })
    }

    const body = await upstream.arrayBuffer()
    if (body.byteLength > MAX_BYTES) {
      return new NextResponse('Not found', { status: 404 })
    }

    // Content-Disposition keeps script-bearing SVGs from rendering on direct
    // navigation (the site-wide CSP allows inline scripts, so it can't);
    // <img> loads ignore it, which is all the probe uses.
    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Vercel-CDN-Cache-Control': 'max-age=86400',
        'Content-Disposition': 'attachment',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
