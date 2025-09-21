'use client'

import { Dialog, Transition } from '@headlessui/react'
import { liteClient as algoliasearch, type SearchClient } from 'algoliasearch/lite'
import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Fragment,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import {
  InstantSearch,
  Highlight,
  Snippet,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch'
import { ArrowUpRight, Clock3, Command, Loader2, Search, X } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'
import { cn } from 'app/lib/utils'

type SearchButtonProps = {
  disableShortcut?: boolean
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  searchClient: SearchClient
  indexName: string
}

type DocHit = {
  objectID: string
  url?: string
  content?: string
  type?: string
  hierarchy?: {
    lvl0?: string | null
    lvl1?: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

const SearchButton = ({ disableShortcut = false }: SearchButtonProps) => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  const hasAlgoliaConfig = Boolean(appId && apiKey && indexName)

  const baseClient = useMemo(() => {
    if (!hasAlgoliaConfig || !appId || !apiKey) {
      return null
    }
    return algoliasearch(appId, apiKey)
  }, [hasAlgoliaConfig, appId, apiKey])

  const searchClient = useMemo(() => {
    if (!baseClient) {
      return null
    }

    return {
      ...baseClient,
      search(requests: Parameters<SearchClient['search']>[0]) {
        if (requests.every(({ params }) => !params?.query)) {
          return Promise.resolve({
            results: requests.map(() => ({
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
          })
        }

        return baseClient.search(requests)
      },
    } satisfies SearchClient
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
          'group flex items-center gap-2 rounded-full bg-[rgb(23,25,34)] px-4 py-1.5 text-sm text-slate-300 transition',
          'hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
          'dark:bg-[rgb(23,25,34)] dark:hover:bg-slate-700/80 dark:focus-visible:ring-slate-600'
        )}
      >
        <Search className="h-4 w-4 text-slate-400 transition group-hover:text-white" />
        <span className="hidden text-sm sm:inline">Search docs...</span>
        {!disableShortcut && (
          <span className="ml-2 hidden items-center gap-1 rounded-md border border-slate-700 bg-slate-900/60 px-1.5 py-0.5 text-[11px] font-medium text-slate-400 sm:flex">
            <Command className="h-3 w-3" />K
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

const SearchModal = ({ isOpen, onClose, onSelect, searchClient, indexName }: SearchModalProps) => (
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
        <div className="flex min-h-full items-start justify-center px-4 py-24">
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
                <SearchHeader onClose={onClose} />
                <SearchResults onSelect={onSelect} />
              </InstantSearch>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

const SearchHeader = ({ onClose }: { onClose: () => void }) => {
  const { query, refine, isSearchStalled } = useSearchBox()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (query) {
        event.stopPropagation()
        refine('')
      } else {
        onClose()
      }
    }
  }

  return (
    <div className="px-2 py-2">
      <div className="flex h-14 items-center rounded-2xl bg-[#131419]/95 px-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.4)] ring-1 ring-black/40">
        <Search className="h-5 w-5 flex-shrink-0 text-white/70" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => refine(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search anything..."
          className="ml-4 flex-1 border-none bg-transparent text-base text-white outline-none placeholder:text-white/50 focus:outline-none focus:ring-0"
        />
        {isSearchStalled ? <Loader2 className="mr-3 h-4 w-4 animate-spin text-white/60" /> : null}
        <div className="bg-white/12 mx-3 h-6 w-px" />
        <button
          type="button"
          onClick={() => (query ? refine('') : onClose())}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition hover:text-white"
          aria-label={query ? 'Clear search' : 'Close search'}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

const SearchResults = ({ onSelect }: { onSelect: (url: string) => void }) => {
  const { hits } = useHits<DocHit>()
  const { status } = useInstantSearch()
  const { query } = useSearchBox()

  const grouped = useMemo(() => {
    const sections = new Map<string, DocHit[]>()
    hits.forEach((hit) => {
      const group = hit.hierarchy?.lvl0?.trim() || 'Results'
      const list = sections.get(group) || []
      list.push(hit)
      sections.set(group, list)
    })
    return Array.from(sections.entries())
  }, [hits])

  const renderEmptyState = status === 'loading' || status === 'stalled'

  return (
    <div className="max-h-[65vh] overflow-y-auto px-2 pb-4">
      {renderEmptyState && (
        <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-black/40 px-6 py-10 text-center text-sm text-white/70">
          <Loader2 className="h-6 w-6 animate-spin text-primary-300" />
          <p>Searching the SigNoz docs…</p>
        </div>
      )}

      {!renderEmptyState && !query && hits.length === 0 && null}

      {!renderEmptyState && query && hits.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-black/40 px-6 py-10 text-center text-sm text-white/70">
          <Clock3 className="h-6 w-6 text-white/50" />
          <p>No results found.</p>
        </div>
      )}

      {!renderEmptyState && hits.length > 0 && (
        <div className="space-y-6">
          {grouped.map(([section, sectionHits]) => (
            <div key={section}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {section === 'Results' ? 'All Results' : section}
              </p>
              <ul className="space-y-2">
                {sectionHits.map((hit) => (
                  <li key={hit.objectID}>
                    <button
                      type="button"
                      onClick={() => hit.url && onSelect(hit.url)}
                      className="group flex w-full items-center gap-3 rounded-lg bg-black/40 px-3 py-2.5 text-left text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <ResultIcon label={section} />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2 text-[11px] text-white/50">
                          <Badge>{deriveBadge(hit)}</Badge>
                          {hit.url && <span className="truncate">{safeHostname(hit.url)}</span>}
                        </div>
                        <p className="text-[15px] font-semibold leading-6 text-white group-hover:text-primary-100">
                          <Highlight hit={hit} attribute="hierarchy.lvl1" />
                        </p>
                        <p className="line-clamp-2 text-[13px] text-white/65">
                          <Snippet hit={hit} attribute="content" />
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-white/40 transition group-hover:text-primary-200" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ResultIcon = ({ label }: { label: string }) => (
  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
    <span className="text-sm font-semibold uppercase tracking-widest">
      {label.trim().slice(0, 2).toUpperCase() || 'SN'}
    </span>
  </div>
)

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white/55">
    {children}
  </span>
)

const deriveBadge = (hit: DocHit) => {
  if (hit.type && hit.type !== 'content') {
    return hit.type.replace(/lvl/, 'Section ')
  }

  return hit.hierarchy?.lvl2 || hit.hierarchy?.lvl1 || 'Docs'
}

const safeHostname = (rawUrl: string) => {
  try {
    return new URL(rawUrl).hostname.replace('www.', '')
  } catch (error) {
    return rawUrl
  }
}

export default SearchButton
