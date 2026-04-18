'use client'

import type { SubmissionRelayPayload } from '../types/submissionRelay'

const SUBMISSION_RELAY_ROUTE = '/api/submissions'

const normalizeEmail = (email: string) => email.trim().toLowerCase()

export const createSubmissionRelayId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const sendSubmissionRelayInBackground = (payload: SubmissionRelayPayload) => {
  if (typeof payload.email !== 'string' || payload.email.trim() === '') return

  try {
    const requestBody = JSON.stringify({
      ...payload,
      email: normalizeEmail(payload.email),
    })

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function' &&
      typeof Blob !== 'undefined'
    ) {
      const beaconBody = new Blob([requestBody], { type: 'application/json' })

      if (navigator.sendBeacon(SUBMISSION_RELAY_ROUTE, beaconBody)) {
        return
      }
    }

    void fetch(SUBMISSION_RELAY_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      keepalive: true,
    }).catch((error) => {
      console.error('Background submission relay failed', error)
    })
  } catch (error) {
    console.error('Background submission relay payload failed', error)
  }
}
