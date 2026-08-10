import { buildLlmsFullMarkdown } from '@/utils/docs/buildLlmsFullMarkdown'
import { agentResponse } from '@/utils/agentResponseHeaders'

export const dynamic = 'force-static'
export const revalidate = 86400

// Vercel ISR cache entries are capped around 10MB; warn before we hit it.
const SIZE_WARNING_BYTES = 9 * 1024 * 1024

export async function GET(request: Request) {
  const body = await buildLlmsFullMarkdown()

  const bytes = Buffer.byteLength(body, 'utf8')
  if (bytes > SIZE_WARNING_BYTES) {
    console.warn(`llms-full.txt is ${bytes} bytes and is approaching the ISR cache entry limit`)
  }

  return agentResponse(request, body, { contentType: 'text/plain; charset=utf-8' })
}
