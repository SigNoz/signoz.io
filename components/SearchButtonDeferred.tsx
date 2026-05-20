'use client'

import { Search } from 'lucide-react'
import { useCallback, useEffect, useState, type ComponentType } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'
import { Button } from '@/components/ui/Button'

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
  onHydrate,
  onClick,
}: {
  onHydrate: () => void
  onClick: () => void
}) => (
  <Button
    isButton
    variant="ghost"
    rounded="full"
    aria-label="Open docs search"
    onMouseEnter={onHydrate}
    onClick={onClick}
    className={cn(
      'group h-8 w-8 shrink-0 bg-signoz_slate-500 !p-0 text-slate-300 transition',
      'hover:bg-slate-700/50 hover:text-white',
      'dark:bg-signoz_slate-500 dark:hover:bg-slate-700/80'
    )}
  >
    <Search className="h-4 w-4 text-slate-400 transition group-hover:text-white" />
  </Button>
)

const SearchButtonDeferred = ({ disableShortcut = false }: SearchButtonDeferredProps) => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  const hasAlgoliaConfig = Boolean(siteMetadata.search && appId && apiKey && indexName)
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
      setShouldOpenOnMount(true)
      hydrateSearch()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableShortcut, hydrateSearch, shouldHydrate, LoadedSearchButton])

  const handlePreviewClick = () => {
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

  return <SearchButtonPreview onHydrate={hydrateSearch} onClick={handlePreviewClick} />
}

export default SearchButtonDeferred
