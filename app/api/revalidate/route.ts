import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()
    const { tag, secret } = requestData

    // Check for secret if configured
    if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid revalidation token' }, { status: 401 })
    }

    // Verify tag is provided
    if (!tag) {
      return NextResponse.json({ message: 'Missing tag parameter' }, { status: 400 })
    }

    // Revalidate the tag
    revalidateTag(tag)

    return NextResponse.json({
      revalidated: true,
      message: `Tag "${tag}" revalidated successfully`,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error processing revalidation request', error: String(error) },
      { status: 500 }
    )
  }
}
