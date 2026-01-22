import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { waitUntil, ipAddress } from '@vercel/functions'
import { v4 as uuidv4 } from 'uuid'
import { detectBotFromUserAgent, logEventServerSide } from './utils/logEvent'

// Extract OS from user agent (server-side version)
const getOSFromUserAgent = (userAgent: string): string => {
  if (!userAgent) return 'unknown'

  const ua = userAgent.toLowerCase()

  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('ipad')) return 'iPad'
  if (ua.includes('iphone') || ua.includes('like mac')) return 'iOS'
  if (ua.includes('mac')) return 'MacOS'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('linux')) return 'Linux'

  return 'unknown'
}

export function middleware(req: NextRequest) {
  // Get or generate anonymous ID
  let anonymousId = req.cookies.get('gb_anonymous_id')?.value
  const shouldSetCookie = !anonymousId

  if (!anonymousId) {
    anonymousId = uuidv4()
  }

  // Get user agent and detect bot
  const userAgent = req.headers.get('user-agent') || ''
  const { isBot, botType } = detectBotFromUserAgent(userAgent)

  // Get request details
  const pathname = req.nextUrl.pathname
  const referer = req.headers.get('referer') || req.headers.get('referrer') || 'direct'
  const ip =
    req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const vercelIp = ipAddress(req) || 'unknown'

  // Log bot requests
  if (isBot) {
    // Use waitUntil to ensure logging completes before function termination
    waitUntil(
      logEventServerSide({
        eventName: 'Bot Page Request',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          custom_user_agent: userAgent,
          custom_bot_type: botType,
          custom_os: getOSFromUserAgent(userAgent),
          custom_referrer: referer,
          custom_ip: ip,
          custom_source: 'server',
          custom_is_bot: true,
          custom_request_method: req.method,
          custom_has_javascript: false,
          custom_vercel_ip: vercelIp,
        },
        anonymousId,
      })
    )
  }

  // Prepare response
  const res = NextResponse.next()

  const currentVercelIpCookie = req.cookies.get('vercel_ip')?.value
  if (currentVercelIpCookie !== vercelIp && vercelIp !== 'unknown') {
    res.cookies.set('vercel_ip', vercelIp, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60,
    })
  }

  // Set user IP in a cookie accessible to the client
  const currentIpCookie = req.cookies.get('user_ip')?.value
  if (currentIpCookie !== ip && ip !== 'unknown') {
    res.cookies.set('user_ip', ip, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60,
    })
  }

  // Set cookie if it wasn't already set
  if (shouldSetCookie && anonymousId) {
    res.cookies.set('gb_anonymous_id', anonymousId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // one year
      sameSite: 'lax',
    })
  }

  // Add custom headers for debugging (optional - remove in production if not needed)
  if (isBot) {
    res.headers.set('x-bot-detected', 'true')
    res.headers.set('x-bot-type', botType || 'unknown')
  }

  return res
}

// Run this middleware on all routes to catch all bot requests
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
