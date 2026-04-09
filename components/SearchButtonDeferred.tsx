'use client'

import dynamic from 'next/dynamic'
import { Search, Command } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'

type SearchButtonDeferredProps = {
  disableShortcut?: boolean
}

const HYDRATE_SEARCH_AFTER_MS = 3000

const loadSearchButton = () => import('./SearchButton')

const DeferredSearchButton = dynamic(loadSearchButton, {
  ssr: false,
})

const SearchButtonDeferred = ({ disableShortcut = false }: SearchButtonDeferredProps) => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  const hasAlgoliaConfig = Boolean(siteMetadata.search && appId && apiKey && indexName)
  const [shouldHydrate, setShouldHydrate] = useState(false)
  const [shouldOpenOnMount, setShouldOpenOnMount] = useState(false)

  const hydrateSearch = useCallback(() => {
    setShouldHydrate(true)
    void loadSearchButton()
  }, [])

  useEffect(() => {
    if (shouldHydrate || !hasAlgoliaConfig) {
      return
    }

    const timeoutId = globalThis.setTimeout(hydrateSearch, HYDRATE_SEARCH_AFTER_MS)

    return () => {
      globalThis.clearTimeout(timeoutId)
    }
  }, [hasAlgoliaConfig, hydrateSearch, shouldHydrate])

  useEffect(() => {
    if (disableShortcut) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.metaKey || event.ctrlKey
      if (!isModifierPressed || event.key.toLowerCase() !== 'k') {
        return
      }

      event.preventDefault()
      setShouldOpenOnMount(true)
      hydrateSearch()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableShortcut, hydrateSearch])

  const handlePreviewClick = () => {
    setShouldOpenOnMount(true)
    hydrateSearch()
  }

  if (!hasAlgoliaConfig) {
    return null
  }

  if (shouldHydrate) {
    return (
      <DeferredSearchButton disableShortcut={disableShortcut} initiallyOpen={shouldOpenOnMount} />
    )
  }

  return (
    <button
      type="button"
      onMouseEnter={hydrateSearch}
      onClick={handlePreviewClick}
      className={cn(
        'group flex shrink-0 items-center gap-1.5 rounded-full bg-signoz_slate-500 px-3 py-1 text-xs text-slate-300 transition',
        'hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        'dark:bg-signoz_slate-500 dark:hover:bg-slate-700/80 dark:focus-visible:ring-slate-600'
      )}
      aria-label="Open docs search"
    >
      <Search className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-white" />
      <span className="hidden text-xs sm:inline">Search docs...</span>
      {!disableShortcut && (
        <span className="ml-1.5 hidden items-center gap-1 rounded-md border border-slate-700 bg-slate-900/60 px-1 py-[1px] text-[10px] font-medium text-slate-400 sm:flex">
          <Command className="h-2.5 w-2.5" />K
        </span>
      )}
    </button>
  )
}

export default SearchButtonDeferred
