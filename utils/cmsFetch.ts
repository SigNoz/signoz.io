import { CMS_FETCH_TIMEOUT_MS } from '@/constants/cache'

const errorName = (error: unknown): string => (error instanceof Error ? error.name : '')

export async function cmsFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const method = init.method ?? 'GET'
  const startedAt = Date.now()
  console.log(`[cms-fetch] → ${method} ${url}`)

  try {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
    })
    console.log(`[cms-fetch] ← ${response.status} ${method} ${url} (${Date.now() - startedAt}ms)`)
    return response
  } catch (error) {
    const elapsed = Date.now() - startedAt
    const name = errorName(error)
    if (name === 'TimeoutError') {
      console.error(
        `[cms-fetch] ✗ aborted by ${CMS_FETCH_TIMEOUT_MS}ms timeout after ${elapsed}ms: ${method} ${url}`
      )
    } else if (name === 'AbortError') {
      console.error(`[cms-fetch] ✗ aborted (not by timeout) after ${elapsed}ms: ${method} ${url}`)
    } else {
      console.error(`[cms-fetch] ✗ failed after ${elapsed}ms: ${method} ${url}`, error)
    }
    throw error
  }
}
