import { waitUntil } from '@vercel/functions'
import { NextResponse } from 'next/server'
import type { LogEventPayload } from '@/utils/logEvent'
import { capturePostHogAnalyticsEvent } from '@/utils/posthogAnalytics'

export const runtime = 'nodejs'

const MAX_REQUEST_BYTES = 128 * 1024

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getTrimmedString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim()
  }

  return req.headers.get('x-real-ip') || undefined
}

const parsePayload = (body: Record<string, unknown>): LogEventPayload | null => {
  const eventName = getTrimmedString(body.eventName)
  const eventType = getTrimmedString(body.eventType)

  if (!eventName || !['identify', 'group', 'track'].includes(eventType || '')) {
    return null
  }

  return {
    eventName,
    eventType: eventType as LogEventPayload['eventType'],
    attributes: isRecord(body.attributes) ? body.attributes : {},
    userId: getTrimmedString(body.userId),
    groupId: getTrimmedString(body.groupId),
    anonymousId: getTrimmedString(body.anonymousId),
    timestamp: getTrimmedString(body.timestamp),
  }
}

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

  const payload = parsePayload(body)

  if (!payload) {
    return NextResponse.json({ ok: false, message: 'Invalid event payload' }, { status: 400 })
  }

  waitUntil(
    capturePostHogAnalyticsEvent(payload, {
      ip: getClientIp(req),
      referrer: req.headers.get('referer') || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
    }).catch((error) => {
      console.error('PostHog event failed', error)
    })
  )

  return NextResponse.json({ ok: true }, { status: 202 })
}
