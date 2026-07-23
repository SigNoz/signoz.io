import { waitUntil } from '@vercel/functions'
import { NextResponse } from 'next/server'
import type { LogEventPayload } from '@/utils/logEvent'
import { capturePostHogAnalyticsEvent } from '@/utils/posthogAnalytics'

const MAX_REQUEST_BYTES = 128 * 1024
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 120
const rateLimitBuckets = new Map<string, { count: number; windowStart: number }>()

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

const getContentLength = (req: Request) => {
  const rawContentLength = req.headers.get('content-length')
  if (!rawContentLength) return undefined

  const contentLength = Number(rawContentLength)
  return Number.isFinite(contentLength) && contentLength >= 0 ? contentLength : undefined
}

const getHostFromSource = (source: string) => {
  const trimmedSource = source.trim()
  if (!trimmedSource) return undefined

  try {
    return new URL(trimmedSource.includes('://') ? trimmedSource : `https://${trimmedSource}`).host
  } catch {
    return undefined
  }
}

const getConfiguredAllowedHosts = () =>
  (process.env.SITE_LOG_ALLOWED_HOSTS || '')
    .split(',')
    .map(getHostFromSource)
    .filter((host): host is string => Boolean(host))

const isAllowedRequestSource = (req: Request) => {
  const requestHost = req.headers.get('host')
  const source = req.headers.get('origin') || req.headers.get('referer')

  if (!requestHost || !source) return false

  try {
    const sourceHost = new URL(source).host
    const allowedHosts = new Set([
      requestHost,
      ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
      ...getConfiguredAllowedHosts(),
    ])

    if (sourceHost === 'localhost' || sourceHost.startsWith('localhost:')) {
      return true
    }

    return allowedHosts.has(sourceHost)
  } catch {
    return false
  }
}

const isRateLimited = (key: string) => {
  const now = Date.now()
  const existing = rateLimitBuckets.get(key)

  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { count: 1, windowStart: now })
    return false
  }

  existing.count += 1

  if (rateLimitBuckets.size > 1000) {
    rateLimitBuckets.forEach((bucket, bucketKey) => {
      if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitBuckets.delete(bucketKey)
      }
    })
  }

  return existing.count > RATE_LIMIT_MAX_REQUESTS
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
  if (!isAllowedRequestSource(req)) {
    return NextResponse.json({ ok: false, message: 'Invalid request source' }, { status: 403 })
  }

  const clientIp = getClientIp(req)

  if (isRateLimited(clientIp || 'unknown')) {
    return NextResponse.json({ ok: false, message: 'Too many requests' }, { status: 429 })
  }

  const contentLength = getContentLength(req)
  if (contentLength && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, message: 'Request body too large' }, { status: 413 })
  }

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
      ip: clientIp,
      referrer: req.headers.get('referer') || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
    }).catch((error) => {
      console.error('PostHog event failed', error)
    })
  )

  return NextResponse.json({ ok: true }, { status: 202 })
}
