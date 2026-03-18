import { waitUntil } from '@vercel/functions'
import { NextResponse } from 'next/server'
import type { SubmissionRelayPayload } from '../../../types/submissionRelay'
import { relaySubmission } from '@/utils/submissionRelay'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_REQUEST_BYTES = 32 * 1024

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeEmail = (email: string) => email.trim().toLowerCase()
const getTrimmedString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined

export async function POST(req: Request) {
  let rawBody: string

  try {
    rawBody = await req.text()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON body' }, { status: 400 })
  }

  if (new TextEncoder().encode(rawBody).length > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, message: 'Request body too large' }, { status: 413 })
  }

  let body: unknown

  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON body' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return NextResponse.json({ ok: false, message: 'Invalid request body' }, { status: 400 })
  }

  const {
    email,
    signupId,
    source,
    createdAt,
    formName,
    pageLocation,
    pageUrl,
    formId,
    conversionId,
    dataRegion,
    connector,
    method,
    details,
  } = body

  if (typeof email !== 'string') {
    return NextResponse.json({ ok: false, message: 'Email is required' }, { status: 400 })
  }

  const normalizedEmail = normalizeEmail(email)

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 })
  }

  const trimmedSignupId = getTrimmedString(signupId)
  const trimmedSource = getTrimmedString(source)
  const trimmedCreatedAt = getTrimmedString(createdAt)
  const trimmedFormName = getTrimmedString(formName)
  const trimmedPageLocation = getTrimmedString(pageLocation)
  const trimmedPageUrl = getTrimmedString(pageUrl)
  const trimmedFormId = getTrimmedString(formId)
  const trimmedConversionId = getTrimmedString(conversionId)
  const trimmedDataRegion = getTrimmedString(dataRegion)
  const trimmedConnector = getTrimmedString(connector)
  const trimmedMethod = getTrimmedString(method)

  const payload: SubmissionRelayPayload = {
    email: normalizedEmail,
    signupId: trimmedSignupId ?? `submission-${Date.now()}`,
    ...(trimmedSource && { source: trimmedSource }),
    ...(trimmedCreatedAt && { createdAt: trimmedCreatedAt }),
    ...(trimmedFormName && { formName: trimmedFormName }),
    ...(trimmedPageLocation && { pageLocation: trimmedPageLocation }),
    ...(trimmedPageUrl && { pageUrl: trimmedPageUrl }),
    ...(trimmedFormId && { formId: trimmedFormId }),
    ...(trimmedConversionId && { conversionId: trimmedConversionId }),
    ...(trimmedDataRegion && { dataRegion: trimmedDataRegion }),
    ...(trimmedConnector && { connector: trimmedConnector }),
    ...(trimmedMethod && { method: trimmedMethod }),
    ...(isRecord(details) && Object.keys(details).length > 0 ? { details } : {}),
  }

  waitUntil(
    relaySubmission(payload).catch((error) => {
      console.error('Submission relay failed', error)
    })
  )

  return NextResponse.json({ ok: true }, { status: 202 })
}
