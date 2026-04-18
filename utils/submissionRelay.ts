import 'server-only'

import type { SubmissionRelayPayload } from '../types/submissionRelay'

const RELAY_TIMEOUT_MS = 5_000

export async function relaySubmission(payload: SubmissionRelayPayload) {
  const url = process.env.SIGNUP_TRACKER_WEBHOOK_URL
  const secret = process.env.SIGNUP_TRACKER_WEBHOOK_SECRET

  if (!url || !secret) {
    console.warn('Submission relay is not configured')
    return
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), RELAY_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Submission relay failed: ${response.status} ${text}`)
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
