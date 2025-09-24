'use client'

import { Dialog, Transition } from '@headlessui/react'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { useRouter } from 'next/navigation'
import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
} from 'react'
import {
  InstantSearch,
  Highlight,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch'
import { Clock3, Command, Loader2, Search, Sparkles } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'

type SearchButtonProps = {
  disableShortcut?: boolean
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

const SearchButton = ({ disableShortcut = false }: SearchButtonProps) => {
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
  const [isOpen, setIsOpen] = useState(false)

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
        setIsOpen((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableShortcut, hasAlgoliaConfig])

  const handleSelect = useCallback(
    (itemUrl: string) => {
      if (!itemUrl) {
        return
      }

      close()

      requestAnimationFrame(() => {
        try {
          const targetUrl = new URL(itemUrl, window.location.origin)
          if (targetUrl.origin === window.location.origin) {
            router.push(`${targetUrl.pathname}${targetUrl.hash}`)
          } else {
            window.location.assign(itemUrl)
          }
        } catch (error) {
          window.location.assign(itemUrl)
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
        onClick={open}
        className={cn(
          'group flex shrink-0 items-center gap-1.5 rounded-full bg-signoz_slate-500 px-3 py-1 text-xs text-slate-300 transition',
          'hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
          'dark:bg-signoz_slate-500 dark:hover:bg-slate-700/80 dark:focus-visible:ring-slate-600'
        )}
      >
        <Search className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-white" />
        <span className="hidden text-xs sm:inline">Search docs...</span>
        {!disableShortcut && (
          <span className="ml-1.5 hidden items-center gap-1 rounded-md border border-slate-700 bg-slate-900/60 px-1 py-[1px] text-[10px] font-medium text-slate-400 sm:flex">
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
      resultsRef.current?.clearActiveResult()
      return
    }

    if (mode === 'search') {
      focusSearchInput()
    }
  }, [mode, focusSearchInput])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/55" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center px-3 py-10 sm:px-4 sm:py-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl overflow-visible bg-transparent text-white">
                <InstantSearch indexName={indexName} searchClient={searchClient}>
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
                  ) : (
                    <AskAIContent />
                  )}
                </InstantSearch>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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
          'flex flex-col gap-3 rounded-2xl bg-signoz_slate-500/95 p-4 text-white shadow-[0_18px_40px] shadow-black/40 ring-1 ring-black/40',
          'sm:h-14 sm:flex-row sm:items-center sm:gap-4',
          isSearchMode ? undefined : 'sm:justify-between'
        )}
      >
        {isSearchMode ? (
          <>
            <div className="flex items-center gap-3 sm:flex-1">
              <Search className="h-5 w-5 flex-shrink-0 text-white/70" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => refine(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => resultsRef.current?.clearActiveResult()}
                placeholder="Search SigNoz's Docs..."
                className="flex-1 border-none bg-transparent text-base text-white outline-none placeholder:text-white/50 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-none sm:justify-end">
              {isSearchStalled ? <Loader2 className="h-4 w-4 animate-spin text-white/60" /> : null}
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
              <Sparkles className="h-5 w-5 text-white/70" />
              <span className="font-medium text-white">Ask your question below</span>
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

const SearchResults = forwardRef<SearchResultsHandle, SearchResultsProps>(
  ({ onSelect, onClose, onFocusInput }, ref) => {
    const { hits } = useHits<DocHit>()
    const { status } = useInstantSearch()
    const { query } = useSearchBox()

    const renderEmptyState = status === 'loading' || status === 'stalled'

    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useEffect(() => {
      itemRefs.current = itemRefs.current.slice(0, hits.length)
    }, [hits.length])

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
      if (hits.length === 0) {
        return false
      }

      setActiveIndex(0)
      return true
    }, [hits.length])

    const focusLastResult = useCallback(() => {
      if (hits.length === 0) {
        return false
      }

      const lastIndex = hits.length - 1
      setActiveIndex(lastIndex)
      return true
    }, [hits.length])

    const focusNextResult = useCallback(() => {
      if (hits.length === 0) {
        return false
      }

      const nextIndex = activeIndex == null ? 0 : Math.min(activeIndex + 1, hits.length - 1)

      if (nextIndex === activeIndex) {
        return false
      }

      setActiveIndex(nextIndex)
      return true
    }, [activeIndex, hits.length])

    const focusPreviousResult = useCallback(() => {
      if (hits.length === 0) {
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
    }, [activeIndex, hits.length, onFocusInput])

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
        hasHits: () => hits.length > 0,
      }),
      [
        clearActiveResult,
        focusFirstResult,
        focusLastResult,
        focusNextResult,
        focusPreviousResult,
        hits.length,
      ]
    )

    return (
      <div className="max-h-[65vh] overflow-y-auto px-2 pb-2">
        {renderEmptyState && (
          <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-signoz_slate-500 px-6 py-10 text-center text-sm text-white/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary-300" />
            <p>Searching the SigNoz docs…</p>
          </div>
        )}

        {!renderEmptyState && !query && hits.length === 0 && null}

        {!renderEmptyState && query && hits.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-signoz_slate-500 px-6 py-10 text-center text-sm text-white/70">
            <Clock3 className="h-6 w-6 text-white/50" />
            <p>No results found.</p>
          </div>
        )}

        {!renderEmptyState && hits.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-2xl bg-signoz_slate-500 shadow-[0_20px_45px] shadow-black/40">
            <ul className="divide-white/6 my-0 divide-y p-0 text-sm" role="listbox">
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
                    className="border-b border-gray-800/70"
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
                        'w-full px-8 py-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                        isActive ? 'bg-white/10' : 'hover:bg-white/10'
                      )}
                    >
                      <p className="text-[15px] font-semibold leading-6 text-white">
                        {titleAttribute ? (
                          <Highlight
                            hit={hit}
                            attribute={titleAttribute as any}
                            classNames={{
                              highlighted: 'bg-white/15 text-white px-1 py-[2px] rounded-sm',
                            }}
                          />
                        ) : (
                          fallbackTitle
                        )}
                      </p>
                      {hit.url && (
                        <p className="mb-0 mt-2 text-[13px] text-white/55">
                          <Breadcrumbs url={hit.url} hierarchy={hit.hierarchy} />
                        </p>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

SearchResults.displayName = 'SearchResults'

const Breadcrumbs = ({ url, hierarchy }: { url: string; hierarchy?: DocHit['hierarchy'] }) => {
  const hierarchySegments = [hierarchy?.lvl0, hierarchy?.lvl1, hierarchy?.lvl2, hierarchy?.lvl3]
    .map((segment) => segment?.trim())
    .filter(Boolean) as string[]

  if (hierarchySegments.length > 0) {
    return <>{hierarchySegments.join(' › ')}</>
  }

  try {
    const parsed = new URL(url)
    const pathSegments = parsed.pathname
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
      'flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-xs font-medium text-white/70',
      'sm:w-auto',
      className
    )}
  >
    <button
      type="button"
      onClick={() => onModeChange('search')}
      className={cn(
        'flex w-full items-center justify-center gap-1 rounded-md px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:justify-start',
        mode === 'search' ? 'bg-white/15 text-white shadow-inner' : 'hover:text-white'
      )}
    >
      <Search className="h-3.5 w-3.5" />
      Search
    </button>
    <button
      type="button"
      onClick={() => onModeChange('ask-ai')}
      className={cn(
        'flex w-full items-center justify-center gap-1 rounded-md px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:justify-start',
        mode === 'ask-ai' ? 'bg-white/15 text-white shadow-inner' : 'hover:text-white'
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Ask AI
    </button>
  </div>
)

const AskAIContent = () => (
  <div className="max-h-[65vh] overflow-y-auto px-2 pb-2">
    <div className="mt-2 overflow-hidden rounded-2xl bg-signoz_slate-500 shadow-[0_20px_45px] shadow-black/40">
      <div className="w-full bg-signoz_slate-500">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/ZXMN63dnzm9r1LEY0He6U"
          className="h-[420px] w-full border-0 sm:h-[520px]"
          frameBorder="0"
          title="SigNoz Chat Assistant"
          allow="microphone"
        />
      </div>
      <div className="border-t border-white/10 bg-black/20 px-6 py-4 text-xs text-white/60">
        Responses are AI-generated from SigNoz docs. Double-check important details before acting.
      </div>
    </div>
  </div>
)

export default SearchButton
