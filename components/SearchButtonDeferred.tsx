'use client'

import { Command, Search } from 'lucide-react'
import { useCallback, useEffect, useState, type ComponentType } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'
import { useLogEvent } from 'hooks/useLogEvent'
import { usePathname } from 'next/navigation'

type SearchButtonDeferredProps = {
  disableShortcut?: boolean
}

const HYDRATE_SEARCH_AFTER_MS = 3000

const loadSearchButton = () => import('./SearchButton')

type SearchButtonProps = {
  disableShortcut?: boolean
  initiallyOpen?: boolean
}

const SearchButtonPreview = ({
  disableShortcut,
  onHydrate,
  onClick,
}: {
  disableShortcut: boolean
  onHydrate: () => void
  onClick: () => void
}) => (
  <button
    type="button"
    onMouseEnter={onHydrate}
    onClick={onClick}
    className={cn(
      'group bg-muted text-muted-foreground flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs transition',
      'hover:bg-muted hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      'dark:bg-muted dark:hover:bg-muted dark:focus-visible:ring-ring'
    )}
    aria-label="Open docs search"
  >
    <Search className="text-muted-foreground group-hover:text-foreground h-3.5 w-3.5 transition" />
    <span className="hidden text-xs sm:inline">Search docs...</span>
    {!disableShortcut && (
      <span className="border-border bg-background/60 text-muted-foreground ml-1.5 hidden items-center gap-1 rounded-md border px-1 py-[1px] text-[10px] font-medium sm:flex">
        <Command className="h-2.5 w-2.5" />K
      </span>
    )}
  </button>
)

const SearchButtonDeferred = ({ disableShortcut = false }: SearchButtonDeferredProps) => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  const hasAlgoliaConfig = Boolean(siteMetadata.search && appId && apiKey && indexName)
  const logEvent = useLogEvent()
  const pathname = usePathname()
  const [shouldHydrate, setShouldHydrate] = useState(false)
  const [shouldOpenOnMount, setShouldOpenOnMount] = useState(false)
  const [LoadedSearchButton, setLoadedSearchButton] =
    useState<ComponentType<SearchButtonProps> | null>(null)

  const hydrateSearch = useCallback(() => {
    if (LoadedSearchButton) {
      setShouldHydrate(true)
      return
    }

    void loadSearchButton().then((module) => {
      setLoadedSearchButton(() => module.default)
      setShouldHydrate(true)
    })
  }, [LoadedSearchButton])

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
    if (disableShortcut || (shouldHydrate && LoadedSearchButton)) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.metaKey || event.ctrlKey
      if (!isModifierPressed || event.key.toLowerCase() !== 'k') {
        return
      }

      event.preventDefault()
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'Search',
          clickName: 'Cmd+K Search',
          clickText: 'Search Docs',
          clickLocation: 'Top Navbar',
          pageLocation: pathname,
          trigger: 'cmd+k',
        },
      })
      setShouldOpenOnMount(true)
      hydrateSearch()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableShortcut, hydrateSearch, shouldHydrate, LoadedSearchButton, logEvent, pathname])

  const handlePreviewClick = () => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Search',
        clickName: 'Search Icon Click',
        clickText: 'Search Docs',
        clickLocation: 'Top Navbar',
        pageLocation: pathname,
        trigger: 'click',
      },
    })
    setShouldOpenOnMount(true)
    hydrateSearch()
  }

  if (!hasAlgoliaConfig) {
    return null
  }

  if (shouldHydrate && LoadedSearchButton) {
    return (
      <LoadedSearchButton disableShortcut={disableShortcut} initiallyOpen={shouldOpenOnMount} />
    )
  }

  return (
    <SearchButtonPreview
      disableShortcut={disableShortcut}
      onHydrate={hydrateSearch}
      onClick={handlePreviewClick}
    />
  )
}

export default SearchButtonDeferred
