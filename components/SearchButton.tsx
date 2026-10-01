'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@signozhq/ui/dialog'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { useRouter } from 'next/navigation'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import {
  Configure,
  InstantSearch,
  Highlight,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch'
import { Clock3, Command, Loader2, Search, Sparkles } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'
import { useLogEvent } from 'hooks/useLogEvent'
import { usePathname } from 'next/navigation'
import { openDecimalChat } from '@/utils/decimal'

type SearchButtonProps = {
  disableShortcut?: boolean
  initiallyOpen?: boolean
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  searchClient: AlgoliaSearchClient
  indexName: string
}

type DocHit = {
  objectID: string
  url?: string
  content?: string
  title?: string
  type?: string
  hierarchy?: {
    lvl0?: string | null
    lvl1?: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

type CeisiumHit = {
  url: string
  title: string
  snippet: string
}

type CeisiumSearchState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  results: CeisiumHit[]
  error?: string
}

const CEISIUM_PROJECT_ID = 'prj_a99d649826d34067'
const CEISIUM_SITE_PREFIX = 'https://signoz.io/'
const CEISIUM_PUBLIC_SEARCH_KEY = process.env.NEXT_PUBLIC_CEISIUM_PUBLIC_SEARCH_KEY

type SearchMode = 'search' | 'ask-ai'

type AlgoliaSearchClient = ReturnType<typeof algoliasearch>

type SearchResultsHandle = {
  focusFirstResult: () => boolean
  focusLastResult: () => boolean
  focusNextResult: () => boolean
  focusPreviousResult: () => boolean
  clearActiveResult: () => void
  hasHits: () => boolean
}

const SearchButton = ({ disableShortcut = false, initiallyOpen = false }: SearchButtonProps) => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  const hasAlgoliaConfig = Boolean(appId && apiKey && indexName)

  const baseClient = useMemo<AlgoliaSearchClient | null>(() => {
    if (!hasAlgoliaConfig || !appId || !apiKey) {
      return null
    }
    return algoliasearch(appId, apiKey)
  }, [hasAlgoliaConfig, appId, apiKey])

  const searchClient = useMemo<AlgoliaSearchClient | null>(() => {
    if (!baseClient) {
      return null
    }

    const clientWithOverride: AlgoliaSearchClient = {
      ...baseClient,
      search(requests) {
        const normalizedRequests = (
          Array.isArray(requests) ? requests : [requests]
        ) as ReadonlyArray<{ params?: { query?: string | null } } & Record<string, unknown>>

        if (normalizedRequests.every((request) => !request.params?.query)) {
          return Promise.resolve({
            results: normalizedRequests.map(() => ({
              hits: [],
              nbHits: 0,
              page: 0,
              nbPages: 0,
              hitsPerPage: 20,
              processingTimeMS: 0,
              exhaustiveNbHits: true,
              query: '',
              params: '',
            })),
            // Cast required because Algolia types expect readonly array but we're returning static object
          })
        }

        return baseClient.search(requests)
      },
    }

    return clientWithOverride
  }, [baseClient])

  const router = useRouter()
  const logEvent = useLogEvent()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const trackSearchOpen = useCallback(
    (trigger: 'click' | 'cmd+k') => {
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'Search',
          clickName: trigger === 'cmd+k' ? 'Cmd+K Search' : 'Search Icon Click',
          clickText: 'Search Docs',
          clickLocation: 'Top Navbar',
          pageLocation: pathname,
          trigger,
        },
      })
    },
    [logEvent, pathname]
  )

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (disableShortcut || !hasAlgoliaConfig) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.metaKey || event.ctrlKey
      if (!isModifierPressed) {
        return
      }

      if (event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen((current) => {
          if (!current) trackSearchOpen('cmd+k')
          return !current
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableShortcut, hasAlgoliaConfig, trackSearchOpen])

  useEffect(() => {
    if (!initiallyOpen) {
      return
    }

    setIsOpen(true)
  }, [initiallyOpen])

  const handleSelect = useCallback(
    (itemUrl: string) => {
      if (!itemUrl) {
        return
      }

      let targetUrl: URL
      try {
        targetUrl = new URL(itemUrl, window.location.origin)
      } catch {
        return
      }

      if (targetUrl.protocol !== 'https:' && targetUrl.protocol !== 'http:') {
        return
      }

      close()

      requestAnimationFrame(() => {
        if (targetUrl.origin === window.location.origin) {
          router.push(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`)
        } else {
          window.location.assign(targetUrl.href)
        }
      })
    },
    [close, router]
  )

  if (!siteMetadata.search || !hasAlgoliaConfig || !searchClient || !indexName) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Algolia InstantSearch configuration is incomplete. Search button hidden.')
    }
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackSearchOpen('click')
          open()
        }}
        aria-label="Open docs search"
        className={cn(
          'group flex h-8 shrink-0 items-center gap-1.5 rounded-[3px] bg-transparent px-3 text-xs text-[var(--l2-foreground)] transition',
          'hover:bg-[var(--l3-background-hover)] hover:text-[var(--l1-foreground-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--l3-border)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--l1-background)]'
        )}
      >
        <Search className="h-3.5 w-3.5 text-[var(--l3-foreground)] transition group-hover:text-[var(--l1-foreground-hover)]" />
        <span className="hidden text-xs sm:inline">Search docs...</span>
        {!disableShortcut && (
          <span className="ml-1.5 hidden items-center gap-1 rounded-md border border-[var(--l1-border)] bg-[var(--l1-background-60)] px-1 py-[1px] text-[10px] font-medium text-[var(--l3-foreground)] sm:flex">
            <Command className="h-2.5 w-2.5" />K
          </span>
        )}
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={close}
        onSelect={handleSelect}
        searchClient={searchClient}
        indexName={indexName}
      />
    </>
  )
}

const SearchModal = ({ isOpen, onClose, onSelect, searchClient, indexName }: SearchModalProps) => {
  const [mode, setMode] = useState<SearchMode>('search')
  const resultsRef = useRef<SearchResultsHandle | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const registerInput = useCallback((input: HTMLInputElement | null) => {
    searchInputRef.current = input
  }, [])

  const focusSearchInput = useCallback(() => {
    if (!searchInputRef.current) {
      return
    }

    searchInputRef.current.focus()
    searchInputRef.current.select()
  }, [])

  useEffect(() => {
    if (isOpen) {
      setMode('search')
    }
  }, [isOpen])

  useEffect(() => {
    if (mode === 'ask-ai') {
      // Decimal has no inline embed, so opening "Ask AI" closes the search
      // dialog and opens the Decimal chat panel instead.
      resultsRef.current?.clearActiveResult()
      onClose()
      openDecimalChat({ presentation: 'modal' })
      return
    }

    if (mode === 'search') {
      focusSearchInput()
    }
  }, [mode, focusSearchInput, onClose])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogPortal>
        <DialogOverlay className="!z-[80]" />
      </DialogPortal>
      <DialogContent
        showOverlay={false}
        position="top"
        width="wide"
        animation="fade"
        offset={96}
        className={cn(
          // ! overrides needed: @signozhq/ui CSS modules beat normal Tailwind
          'overflow-visible !border-none !bg-transparent text-[var(--l1-foreground)] !shadow-none',
          CEISIUM_PUBLIC_SEARCH_KEY ? '!z-[80] !w-full !max-w-5xl' : '!z-[80] !w-full !max-w-2xl'
        )}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          focusSearchInput()
        }}
      >
        <DialogTitle className="sr-only">Search docs</DialogTitle>
        <div
          className={cn(
            'relative w-full overflow-visible bg-transparent px-3 text-[var(--l1-foreground)] sm:px-4',
            CEISIUM_PUBLIC_SEARCH_KEY ? 'max-w-5xl' : 'max-w-2xl'
          )}
        >
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            {CEISIUM_PUBLIC_SEARCH_KEY ? <Configure hitsPerPage={8} /> : null}
            <SearchHeader
              mode={mode}
              onModeChange={setMode}
              onClose={onClose}
              registerInput={registerInput}
              resultsRef={resultsRef}
            />
            {mode === 'search' ? (
              <SearchResults
                ref={resultsRef}
                onSelect={onSelect}
                onClose={onClose}
                onFocusInput={focusSearchInput}
              />
            ) : null}
          </InstantSearch>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const SearchHeader = ({
  onClose,
  mode,
  onModeChange,
  registerInput,
  resultsRef,
}: {
  onClose: () => void
  mode: SearchMode
  onModeChange: (mode: SearchMode) => void
  registerInput: (input: HTMLInputElement | null) => void
  resultsRef: MutableRefObject<SearchResultsHandle | null>
}) => {
  const { query, refine, isSearchStalled } = useSearchBox()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (mode !== 'search') {
      return
    }

    inputRef.current?.focus()
    inputRef.current?.select()
  }, [mode])

  useEffect(() => {
    if (mode !== 'search') {
      registerInput(null)
      return
    }

    registerInput(inputRef.current)
    return () => registerInput(null)
  }, [mode, registerInput])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (query) {
        event.stopPropagation()
        refine('')
        resultsRef.current?.clearActiveResult()
      } else {
        onClose()
      }
      return
    }

    if (event.key === 'ArrowDown') {
      if (resultsRef.current?.focusFirstResult()) {
        event.preventDefault()
      }
      return
    }

    if (event.key === 'ArrowUp') {
      if (resultsRef.current?.focusLastResult()) {
        event.preventDefault()
      }
      return
    }
  }

  const isSearchMode = mode === 'search'

  return (
    <div className="px-2 py-2">
      <div
        className={cn(
          'flex flex-col gap-3 rounded-2xl bg-[color-mix(in_srgb,var(--l2-background)_95%,transparent)] p-4 text-[var(--l1-foreground)] shadow-[0_18px_40px] shadow-black/40 ring-1 ring-[var(--l2-border)]',
          'sm:h-14 sm:flex-row sm:items-center sm:gap-4',
          isSearchMode ? undefined : 'sm:justify-between'
        )}
      >
        {isSearchMode ? (
          <>
            <div className="flex items-center gap-3 sm:flex-1">
              <Search className="h-5 w-5 flex-shrink-0 text-[var(--l2-foreground)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => refine(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => resultsRef.current?.clearActiveResult()}
                placeholder="Search SigNoz's Docs..."
                className="flex-1 border-none bg-transparent text-base text-[var(--l1-foreground)] outline-none placeholder:text-[var(--l3-foreground)] focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-none sm:justify-end">
              {isSearchStalled ? (
                <Loader2 className="h-4 w-4 animate-spin text-[var(--l3-foreground)]" />
              ) : null}
              <SearchModeToggle
                mode={mode}
                onModeChange={onModeChange}
                className="w-full justify-between sm:w-auto"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 text-sm sm:flex-1 sm:text-base">
              <Sparkles className="h-5 w-5 text-[var(--l2-foreground)]" />
              <span className="font-medium text-[var(--l1-foreground)]">
                Ask your question below
              </span>
            </div>
            <SearchModeToggle
              mode={mode}
              onModeChange={onModeChange}
              className="w-full justify-between sm:w-auto"
            />
          </>
        )}
      </div>
    </div>
  )
}

type SearchResultsProps = {
  onSelect: (url: string) => void
  onClose: () => void
  onFocusInput: () => void
}

const useCeisiumSearch = (query: string): CeisiumSearchState => {
  const [state, setState] = useState<CeisiumSearchState & { query: string }>({
    query: '',
    status: 'idle',
    results: [],
  })

  useEffect(() => {
    const searchQuery = query.trim()
    if (!searchQuery || !CEISIUM_PUBLIC_SEARCH_KEY) {
      return
    }

    const controller = new AbortController()
    let cancelled = false

    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch('https://api.ceisium.com/v1/search', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${CEISIUM_PUBLIC_SEARCH_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            project_id: CEISIUM_PROJECT_ID,
            query: searchQuery,
            top_k: 8,
            path_prefix: CEISIUM_SITE_PREFIX,
          }),
        })

        if (!response.ok) {
          const message =
            response.status === 403
              ? 'Origin or result path is not allowed for this key.'
              : response.status === 429
                ? 'Search rate limit reached. Try again soon.'
                : `Search failed (HTTP ${response.status}).`
          throw new Error(message)
        }

        const data: unknown = await response.json()
        if (
          !data ||
          typeof data !== 'object' ||
          !('results' in data) ||
          !Array.isArray(data.results)
        ) {
          throw new Error('Search returned an invalid response.')
        }

        const results = data.results.filter(
          (item: unknown): item is CeisiumHit =>
            item !== null &&
            typeof item === 'object' &&
            'url' in item &&
            typeof item.url === 'string' &&
            'title' in item &&
            typeof item.title === 'string' &&
            'snippet' in item &&
            typeof item.snippet === 'string'
        )

        if (!cancelled) {
          setState({ query: searchQuery, status: 'success', results })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            query: searchQuery,
            status: 'error',
            results: [],
            error: error instanceof Error ? error.message : 'Search failed.',
          })
        }
      }
    }, 250)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  if (!query.trim() || !CEISIUM_PUBLIC_SEARCH_KEY) {
    return { status: 'idle', results: [] }
  }

  return state.query === query.trim() ? state : { status: 'loading', results: [] }
}

const SearchResults = forwardRef<SearchResultsHandle, SearchResultsProps>(
  ({ onSelect, onClose, onFocusInput }, ref) => {
    const { hits } = useHits<DocHit>()
    const { status } = useInstantSearch()
    const { query } = useSearchBox()
    const ceisium = useCeisiumSearch(query)

    const algoliaLoading = status === 'loading' || status === 'stalled'
    const totalHits = hits.length + ceisium.results.length

    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useEffect(() => {
      itemRefs.current = itemRefs.current.slice(0, totalHits)
    }, [totalHits])

    useEffect(() => {
      setActiveIndex(null)
    }, [query])

    useEffect(() => {
      if (activeIndex == null) {
        return
      }

      const target = itemRefs.current[activeIndex]
      if (target && document.activeElement !== target) {
        target.focus()
      }
    }, [activeIndex])

    const focusFirstResult = useCallback(() => {
      if (totalHits === 0) {
        return false
      }

      setActiveIndex(0)
      return true
    }, [totalHits])

    const focusLastResult = useCallback(() => {
      if (totalHits === 0) {
        return false
      }

      const lastIndex = totalHits - 1
      setActiveIndex(lastIndex)
      return true
    }, [totalHits])

    const focusNextResult = useCallback(() => {
      if (totalHits === 0) {
        return false
      }

      const nextIndex = activeIndex == null ? 0 : Math.min(activeIndex + 1, totalHits - 1)

      if (nextIndex === activeIndex) {
        return false
      }

      setActiveIndex(nextIndex)
      return true
    }, [activeIndex, totalHits])

    const focusPreviousResult = useCallback(() => {
      if (totalHits === 0) {
        onFocusInput()
        return false
      }

      if (activeIndex == null || activeIndex <= 0) {
        onFocusInput()
        setActiveIndex(null)
        return false
      }

      const previousIndex = activeIndex - 1
      setActiveIndex(previousIndex)
      return true
    }, [activeIndex, totalHits, onFocusInput])

    const clearActiveResult = useCallback(() => {
      setActiveIndex(null)
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        focusFirstResult,
        focusLastResult,
        focusNextResult,
        focusPreviousResult,
        clearActiveResult,
        hasHits: () => totalHits > 0,
      }),
      [
        clearActiveResult,
        focusFirstResult,
        focusLastResult,
        focusNextResult,
        focusPreviousResult,
        totalHits,
      ]
    )

    if (!query) {
      return null
    }

    return (
      <div className={cn('grid gap-3 px-2 pb-2', CEISIUM_PUBLIC_SEARCH_KEY && 'lg:grid-cols-2')}>
        <section className="min-w-0 overflow-hidden rounded-2xl bg-[var(--l2-background)] shadow-[0_20px_45px] shadow-black/40">
          {CEISIUM_PUBLIC_SEARCH_KEY ? (
            <h2 className="m-0 border-b border-[var(--l2-border)] px-5 py-3 text-sm font-semibold text-[var(--l1-foreground)]">
              Algolia
            </h2>
          ) : null}
          <div className="max-h-[60vh] overflow-y-auto">
            {algoliaLoading ? (
              <SearchStatus loading>Searching…</SearchStatus>
            ) : hits.length === 0 ? (
              <SearchStatus>No results found.</SearchStatus>
            ) : (
              <ul
                className="my-0 divide-y divide-[var(--l2-border)] p-0 text-sm"
                role="listbox"
                aria-label="Algolia results"
              >
                {hits.map((hit, index) => {
                  const titleAttribute = hit.title
                    ? 'title'
                    : hit.hierarchy?.lvl1
                      ? 'hierarchy.lvl1'
                      : hit.hierarchy?.lvl0
                        ? 'hierarchy.lvl0'
                        : undefined

                  const fallbackTitle =
                    hit.title ||
                    hit.hierarchy?.lvl1 ||
                    hit.hierarchy?.lvl0 ||
                    hit.hierarchy?.lvl2 ||
                    hit.hierarchy?.lvl3 ||
                    hit.content ||
                    hit.url ||
                    'Untitled result'

                  const isActive = activeIndex === index

                  return (
                    <li
                      key={hit.objectID}
                      className="border-b border-[var(--l2-border)]"
                      role="presentation"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        ref={(node) => {
                          itemRefs.current[index] = node
                        }}
                        onFocus={() => {
                          if (activeIndex !== index) {
                            setActiveIndex(index)
                          }
                        }}
                        onClick={() => hit.url && onSelect(hit.url)}
                        onKeyDown={(event) => {
                          if (event.key === 'ArrowDown') {
                            event.preventDefault()
                            focusNextResult()
                          } else if (event.key === 'ArrowUp') {
                            event.preventDefault()
                            const moved = focusPreviousResult()
                            if (!moved) {
                              clearActiveResult()
                            }
                          } else if (event.key === 'Escape') {
                            event.preventDefault()
                            clearActiveResult()
                            onFocusInput()
                            onClose()
                          }
                        }}
                        className={cn(
                          'w-full px-8 py-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--l3-border)]',
                          isActive
                            ? 'bg-[color-mix(in_srgb,var(--l1-foreground)_10%,transparent)]'
                            : 'hover:bg-[color-mix(in_srgb,var(--l1-foreground)_10%,transparent)]'
                        )}
                      >
                        <p className="text-[15px] font-semibold leading-6 text-[var(--l1-foreground)]">
                          {titleAttribute ? (
                            <Highlight
                              hit={hit}
                              attribute={titleAttribute as any}
                              classNames={{
                                highlighted:
                                  'bg-[color-mix(in_srgb,var(--l1-foreground)_15%,transparent)] text-[var(--l1-foreground)] px-1 py-[2px] rounded-sm',
                              }}
                            />
                          ) : (
                            fallbackTitle
                          )}
                        </p>
                        {hit.content && (
                          <p className="mb-0 mt-1 line-clamp-2 text-[13px] text-[var(--l2-foreground)]">
                            {hit.content.length > 220
                              ? `${hit.content.slice(0, 220).trimEnd()}…`
                              : hit.content}
                          </p>
                        )}
                        {hit.url && (
                          <p className="mb-0 mt-2 text-[13px] text-[var(--l3-foreground)]">
                            <Breadcrumbs url={hit.url} hierarchy={hit.hierarchy} />
                          </p>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        {CEISIUM_PUBLIC_SEARCH_KEY ? (
          <section className="min-w-0 overflow-hidden rounded-2xl bg-[var(--l2-background)] shadow-[0_20px_45px] shadow-black/40">
            <h2 className="m-0 border-b border-[var(--l2-border)] px-5 py-3 text-sm font-semibold text-[var(--l1-foreground)]">
              Ceisium
            </h2>
            <div className="max-h-[60vh] overflow-y-auto">
              {ceisium.status === 'loading' || ceisium.status === 'idle' ? (
                <SearchStatus loading>Searching…</SearchStatus>
              ) : ceisium.status === 'error' ? (
                <SearchStatus>{ceisium.error}</SearchStatus>
              ) : ceisium.results.length === 0 ? (
                <SearchStatus>No results found.</SearchStatus>
              ) : (
                <ul
                  className="my-0 divide-y divide-[var(--l2-border)] p-0 text-sm"
                  role="listbox"
                  aria-label="Ceisium results"
                >
                  {ceisium.results.map((hit, index) => {
                    const resultIndex = hits.length + index
                    const isActive = activeIndex === resultIndex

                    return (
                      <li key={`${hit.url}-${index}`} role="presentation">
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          ref={(node) => {
                            itemRefs.current[resultIndex] = node
                          }}
                          onFocus={() => setActiveIndex(resultIndex)}
                          onClick={() => onSelect(hit.url)}
                          onKeyDown={(event) => {
                            if (event.key === 'ArrowDown') {
                              event.preventDefault()
                              focusNextResult()
                            } else if (event.key === 'ArrowUp') {
                              event.preventDefault()
                              focusPreviousResult()
                            } else if (event.key === 'Escape') {
                              event.preventDefault()
                              clearActiveResult()
                              onFocusInput()
                              onClose()
                            }
                          }}
                          className={cn(
                            'w-full px-6 py-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--l3-border)]',
                            isActive
                              ? 'bg-[color-mix(in_srgb,var(--l1-foreground)_10%,transparent)]'
                              : 'hover:bg-[color-mix(in_srgb,var(--l1-foreground)_10%,transparent)]'
                          )}
                        >
                          <p className="m-0 text-[15px] font-semibold leading-6 text-[var(--l1-foreground)]">
                            {hit.title}
                          </p>
                          {hit.snippet && (
                            <p className="mb-0 mt-1 line-clamp-2 text-[13px] text-[var(--l2-foreground)]">
                              {hit.snippet}
                            </p>
                          )}
                          <p className="mb-0 mt-2 truncate text-[13px] text-[var(--l3-foreground)]">
                            <Breadcrumbs url={hit.url} />
                          </p>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </section>
        ) : null}
      </div>
    )
  }
)

SearchResults.displayName = 'SearchResults'

const SearchStatus = ({
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
}) => (
  <div className="flex min-h-32 flex-col items-center justify-center gap-3 px-5 py-8 text-center text-sm text-[var(--l2-foreground)]">
    {loading ? (
      <Loader2 className="h-5 w-5 animate-spin" />
    ) : (
      <Clock3 className="h-5 w-5 text-[var(--l3-foreground)]" />
    )}
    <p className="m-0">{children}</p>
  </div>
)

const Breadcrumbs = ({ url, hierarchy }: { url: string; hierarchy?: DocHit['hierarchy'] }) => {
  const hierarchySegments = [hierarchy?.lvl0, hierarchy?.lvl1, hierarchy?.lvl2, hierarchy?.lvl3]
    .map((segment) => segment?.trim())
    .filter(Boolean) as string[]

  if (hierarchySegments.length > 0) {
    return <>{hierarchySegments.join(' › ')}</>
  }

  try {
    const parsed = new URL(url)
    const pathSegments = decodeURIComponent(parsed.pathname)
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.replace(/-/g, ' '))

    return <>{[parsed.hostname.replace('www.', ''), ...pathSegments].join(' › ')}</>
  } catch (error) {
    return <>{url}</>
  }
}

const SearchModeToggle = ({
  mode,
  onModeChange,
  className,
}: {
  mode: SearchMode
  onModeChange: (mode: SearchMode) => void
  className?: string
}) => (
  <div
    className={cn(
      'flex items-center rounded-xl border border-[var(--l2-border)] bg-[var(--l3-background-60)] p-1 text-xs font-medium text-[var(--l2-foreground)]',
      'sm:w-auto',
      className
    )}
  >
    <button
      type="button"
      onClick={() => onModeChange('search')}
      className={cn(
        'flex w-full items-center justify-center gap-1 rounded-md px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--l3-border)] sm:w-auto sm:justify-start',
        mode === 'search'
          ? 'bg-[color-mix(in_srgb,var(--l1-foreground)_15%,transparent)] text-[var(--l1-foreground)] shadow-inner'
          : 'hover:text-[var(--l1-foreground)]'
      )}
    >
      <Search className="h-3.5 w-3.5" />
      Search
    </button>
    <button
      type="button"
      onClick={() => onModeChange('ask-ai')}
      className={cn(
        'flex w-full items-center justify-center gap-1 rounded-md px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--l3-border)] sm:w-auto sm:justify-start',
        mode === 'ask-ai'
          ? 'bg-[color-mix(in_srgb,var(--l1-foreground)_15%,transparent)] text-[var(--l1-foreground)] shadow-inner'
          : 'hover:text-[var(--l1-foreground)]'
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Ask AI
    </button>
  </div>
)

export default SearchButton
