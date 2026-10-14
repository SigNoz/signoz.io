import { buildLlmsFullMarkdown } from '@/utils/docs/buildLlmsFullMarkdown'
import { agentResponse } from '@/utils/agentResponseHeaders'

// Prerendered at build. The full docs corpus is ~8MB, above the 4.5MB limit
// for buffered Vercel Function responses; Node.js functions stream by default,
// which is what lets the daily background regeneration serve it. If a
// regeneration ever fails, Next keeps serving the last good copy.
export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const body = await buildLlmsFullMarkdown()

  // Statically rendered (force-static): conditional 304s are left to the CDN.
  return agentResponse(body, { contentType: 'text/plain; charset=utf-8' })
}
