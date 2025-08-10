import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, tag, secret } = body

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const timestamp = new Date().toISOString()

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      console.log(`[ISR] Revalidated path: ${path} at ${timestamp}`)
      return NextResponse.json({ 
        message: `Path ${path} revalidated successfully`,
        timestamp,
        type: 'path'
      })
    }

    if (tag) {
      // Revalidate by tag
      revalidateTag(tag)
      console.log(`[ISR] Revalidated tag: ${tag} at ${timestamp}`)
      return NextResponse.json({ 
        message: `Tag ${tag} revalidated successfully`,
        timestamp,
        type: 'tag'
      })
    }

    return NextResponse.json({ message: 'No path, tag, or type provided' }, { status: 400 })
  } catch (error) {
    console.error('[ISR] Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error.message },
      { status: 500 }
    )
  }
}

// to check revalidation status
export async function GET() {
  return NextResponse.json({
    message: 'ISR Revalidation API is active',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: 'Trigger revalidation with { path, tag, secret }'
    }
  })
}