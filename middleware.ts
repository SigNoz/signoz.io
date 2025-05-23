import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function middleware(req: NextRequest) {
  // If the anon ID cookie is already set, continue
  if (req.cookies.has('gb_anonymous_id')) {
    return NextResponse.next()
  }

  // Otherwise generate a new UUID and set it on the response
  const res = NextResponse.next()
  res.cookies.set('gb_anonymous_id', uuidv4(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // one year
    sameSite: 'lax',
  })
  return res
}

// Only run this middleware on the following paths
export const config = {
  matcher: ['/', '/docs/:path*', '/teams/:path*', '/pricing/:path*'],
}
