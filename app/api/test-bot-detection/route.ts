import { NextRequest, NextResponse } from 'next/server'
import { detectBotFromUserAgent } from '../../../utils/logEvent'

export async function GET(req: NextRequest) {
  try {
    const userAgent = req.headers.get('user-agent') || ''
    const botDetection = detectBotFromUserAgent(userAgent)

    return NextResponse.json({
      userAgent,
      ...botDetection,
      headers: Object.fromEntries(req.headers.entries()),
      ip: req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Bot detection test error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userAgent = req.headers.get('user-agent') || ''
    const botDetection = detectBotFromUserAgent(userAgent)

    return NextResponse.json({
      message: 'POST request received',
      userAgent,
      ...botDetection,
      requestBody: body,
      headers: Object.fromEntries(req.headers.entries()),
      ip: req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Bot detection test error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
