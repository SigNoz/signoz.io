import { NextRequest, NextResponse } from 'next/server'
import { getNotFoundSuggestions, hasAlgoliaConfig } from '@/components/not-found/suggestions'

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname') || '/'
  const count = Math.min(parseInt(request.nextUrl.searchParams.get('count') || '3', 10), 10)

  const suggestions = await getNotFoundSuggestions(pathname, count)
  const hasAlgolia = hasAlgoliaConfig()

  return NextResponse.json(
    {
      suggestions,
      suggestionIntro: hasAlgolia ? 'You might be looking for:' : 'Popular docs to get started:',
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
