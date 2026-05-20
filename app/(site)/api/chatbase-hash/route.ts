import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateUserHash } from '@/utils/userServer'

export async function GET() {
  const secret = process.env.CHATBASE_SECRET_KEY

  if (!secret) {
    return NextResponse.json({ error: 'Secret not configured' }, { status: 500 })
  }

  const cookieStore = await cookies()
  const anonymousId = cookieStore.get('app_anonymous_id')?.value

  if (!anonymousId) {
    return NextResponse.json({ error: 'No anonymous ID' }, { status: 400 })
  }

  const userHash = generateUserHash(anonymousId, secret)

  return NextResponse.json({
    userId: anonymousId,
    userHash,
    headers: {
      'Cache-Control': 'private, no-store',
    },
  })
}
