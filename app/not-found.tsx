import { headers } from 'next/headers'
import NotFoundRecovery from '@/components/not-found/NotFoundRecovery'
import { NOT_FOUND_PATHNAME_HEADER } from '@/components/not-found/constants'
import { getNotFoundSuggestions, hasAlgoliaConfig } from '@/components/not-found/suggestions'

export default async function NotFound() {
  const requestHeaders = headers()
  // The unmatched pathname is forwarded by middleware via this header.
  const pathname = requestHeaders.get(NOT_FOUND_PATHNAME_HEADER) || '/'
  const suggestions = await getNotFoundSuggestions(pathname, 3)
  const suggestionIntro = hasAlgoliaConfig()
    ? 'You might be looking for:'
    : 'Popular docs to get started:'

  return (
    <NotFoundRecovery
      pathname={pathname}
      suggestions={suggestions}
      suggestionIntro={suggestionIntro}
    />
  )
}
