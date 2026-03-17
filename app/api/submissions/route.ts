import { waitUntil } from '@vercel/functions'
import { NextResponse } from 'next/server'
import type { SubmissionRelayPayload } from '../../../types/submissionRelay'
import { relaySubmission } from '@/utils/submissionRelay'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeEmail = (email: string) => email.trim().toLowerCase()

export async function POST(req: Request) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON body' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return NextResponse.json({ ok: false, message: 'Invalid request body' }, { status: 400 })
  }

  const { email, signupId, ...rest } = body

  if (typeof email !== 'string') {
    return NextResponse.json({ ok: false, message: 'Email is required' }, { status: 400 })
  }

  const normalizedEmail = normalizeEmail(email)

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 })
  }

  const payload: SubmissionRelayPayload = {
    ...rest,
    email: normalizedEmail,
    signupId:
      typeof signupId === 'string' && signupId.trim() !== ''
        ? signupId
        : `submission-${Date.now()}`,
  }

  waitUntil(
    relaySubmission(payload).catch((error) => {
      console.error('Submission relay failed', error)
    })
  )

  return NextResponse.json({ ok: true }, { status: 202 })
}
