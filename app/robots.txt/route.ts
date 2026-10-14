import { buildRobotsTxt } from '@/utils/robotsTxt'

// Prerender at build time, matching the static metadata route this replaces.
export const dynamic = 'force-static'

export function GET() {
  const isProduction = process.env.VERCEL_ENV === 'production'

  return new Response(buildRobotsTxt(isProduction), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
