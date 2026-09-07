'use client'

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Grid2X2, List, Search } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'

import {
  customerStoryFilters,
  type CustomerStory,
  type CustomerStoryFilter,
} from './Customers.types'

type ViewMode = 'grid' | 'list'

const initialStoryCount = 9
const mobileViewQuery = '(max-width: 767px)'

function subscribeToMobileView(onChange: () => void) {
  const mediaQuery = window.matchMedia(mobileViewQuery)
  mediaQuery.addEventListener('change', onChange)

  return () => mediaQuery.removeEventListener('change', onChange)
}

function getMobileViewSnapshot() {
  return window.matchMedia(mobileViewQuery).matches
}

function getServerMobileViewSnapshot() {
  return false
}

interface CustomerStoryLibraryProps {
  stories: CustomerStory[]
}

function StoryLogoRow({ story }: { story: CustomerStory }) {
  return (
    <div className="flex min-h-8 items-center gap-3">
      <Image
        alt={story.showCompanyNameWithLogo ? '' : story.logoAlt}
        className="max-h-8 w-auto max-w-28 object-contain"
        height={32}
        src={story.logo}
        width={112}
      />
      {story.showCompanyNameWithLogo ? (
        <span className="text-sm font-medium text-[var(--l1-foreground)]">{story.company}</span>
      ) : null}
    </div>
  )
}

function StoryArrowChip() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-solid border-[var(--l2-border)] bg-[var(--l2-background)] transition-colors group-hover:bg-[var(--l3-background)]">
      <ArrowUpRight
        aria-hidden="true"
        className="text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
        size={20}
        strokeWidth={1.75}
      />
    </div>
  )
}

export default function CustomerStoryLibrary({ stories }: CustomerStoryLibraryProps) {
  const [activeFilter, setActiveFilter] = useState<CustomerStoryFilter>('All stories')
  const [query, setQuery] = useState('')
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode | null>(null)
  const [showAll, setShowAll] = useState(false)
  const hasSearchedRef = useRef(false)
  const lastTrackedSearchRef = useRef<string | null>(null)
  const logEvent = useLogEvent()
  const pathname = usePathname()
  const isMobileView = useSyncExternalStore(
    subscribeToMobileView,
    getMobileViewSnapshot,
    getServerMobileViewSnapshot
  )
  const viewMode = selectedViewMode ?? (isMobileView ? 'list' : 'grid')

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matches = stories.filter((story) => {
      const matchesFilter = activeFilter === 'All stories' || story.filters.includes(activeFilter)
      const matchesQuery =
        !normalizedQuery ||
        [
          story.company,
          story.title,
          story.description,
          story.takeaway,
          story.takeawayLabel,
          story.person,
          story.role,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })

    return [...matches].sort((a, b) => {
      const publishedDateDifference = b.publishedAt.localeCompare(a.publishedAt)
      if (publishedDateDifference !== 0) return publishedDateDifference
      return a.company.localeCompare(b.company)
    })
  }, [activeFilter, query, stories])

  const visibleStories = showAll ? filteredStories : filteredStories.slice(0, initialStoryCount)

  useEffect(() => {
    if (!hasSearchedRef.current || lastTrackedSearchRef.current === query) return

    const timeout = window.setTimeout(() => {
      lastTrackedSearchRef.current = query
      logEvent({
        eventName: 'Customer Story Search',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          activeFilter,
          hasQuery: query.trim().length > 0,
          queryLength: query.trim().length,
          resultCount: filteredStories.length,
          viewMode,
        },
      })
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [activeFilter, filteredStories.length, logEvent, pathname, query, viewMode])

  const trackClick = (
    clickType: string,
    clickName: string,
    clickText: string,
    attributes: Record<string, unknown> = {}
  ) => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType,
        clickName,
        clickLocation: 'Customers Story Library',
        clickText,
        pageLocation: pathname,
        ...attributes,
      },
    })
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <aside className="min-w-0 lg:sticky lg:top-[68px] lg:z-[1] lg:self-start">
        <p className="flex h-11 items-center bg-[linear-gradient(to_right,var(--l2-border),transparent)] bg-[length:100%_1px] bg-bottom bg-no-repeat text-sm font-medium text-[var(--l1-foreground)]">
          Filter stories
        </p>
        <div
          aria-label="Filter customer stories"
          className="mt-3 flex gap-2 overflow-x-auto pb-2 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] lg:flex-col lg:overflow-visible lg:[mask-image:none]"
          role="group"
        >
          {customerStoryFilters.map((filter) => {
            const count =
              filter === 'All stories'
                ? stories.length
                : stories.filter((story) => story.filters.includes(filter)).length

            return (
              <button
                aria-pressed={activeFilter === filter}
                className={cn(
                  'flex shrink-0 items-center justify-between gap-4 rounded border px-3 py-2 text-left text-sm transition-colors lg:-mr-px lg:w-[calc(100%+1px)] lg:rounded-none',
                  activeFilter === filter
                    ? 'border-[var(--l2-border)] text-[var(--l1-foreground)] lg:border-r-[var(--l1-background)]'
                    : 'border-transparent text-[var(--l3-foreground)] hover:text-[var(--l1-foreground)]'
                )}
                key={filter}
                onClick={() => {
                  trackClick('Customer Story Filter', 'Filter Stories', filter, {
                    previousFilter: activeFilter,
                    resultCount: count,
                  })
                  setActiveFilter(filter)
                  setShowAll(false)
                }}
                type="button"
              >
                <span>{filter}</span>
                <span className="font-mono text-[10px] text-[var(--l2-foreground)]">{count}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <div className="relative min-w-0 lg:before:absolute lg:before:-left-10 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-[linear-gradient(to_bottom,transparent,var(--l2-border)_64px,var(--l2-border)_calc(100%-64px),transparent)] lg:before:content-['']">
        <div className="flex flex-col gap-3 md:sticky md:top-14 md:z-20 md:-my-3 md:flex-row md:items-center md:bg-[color-mix(in_srgb,var(--l1-background)_95%,transparent)] md:py-3 md:backdrop-blur-sm">
          <label className="relative flex-1">
            <span className="sr-only">Search customer stories</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--l2-foreground)]"
              size={16}
            />
            <input
              className="h-11 w-full rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] pl-10 pr-4 text-sm text-[var(--l1-foreground)] outline-none placeholder:text-[var(--l3-foreground)] focus:border-[var(--accent-primary)]"
              onChange={(event) => {
                hasSearchedRef.current = true
                setQuery(event.target.value)
                setShowAll(false)
              }}
              placeholder="Search stories"
              type="search"
              value={query}
            />
          </label>

          <div aria-label="Customer story layout" className="flex h-11 p-1" role="group">
            <button
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
              className={cn(
                'flex flex-1 items-center justify-center rounded px-3 transition-colors md:flex-none',
                viewMode === 'grid'
                  ? 'bg-[var(--l3-background)] text-[var(--l1-foreground)]'
                  : 'text-[var(--l3-foreground)] hover:text-[var(--l1-foreground)]'
              )}
              onClick={() => {
                trackClick('Customer Story View', 'Grid View', 'Grid view', {
                  previousViewMode: viewMode,
                  viewMode: 'grid',
                })
                setSelectedViewMode('grid')
              }}
              type="button"
            >
              <Grid2X2 aria-hidden="true" size={15} />
            </button>
            <button
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              className={cn(
                'flex flex-1 items-center justify-center rounded px-3 transition-colors md:flex-none',
                viewMode === 'list'
                  ? 'bg-[var(--l3-background)] text-[var(--l1-foreground)]'
                  : 'text-[var(--l3-foreground)] hover:text-[var(--l1-foreground)]'
              )}
              onClick={() => {
                trackClick('Customer Story View', 'List View', 'List view', {
                  previousViewMode: viewMode,
                  viewMode: 'list',
                })
                setSelectedViewMode('list')
              }}
              type="button"
            >
              <List aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        {visibleStories.length ? (
          <div
            className={cn(
              'mt-6 grid grid-cols-1 border-dashed border-[var(--l2-border)]',
              viewMode === 'grid' ? 'border-l border-t sm:grid-cols-2 xl:grid-cols-3' : 'border-t'
            )}
          >
            {visibleStories.map((story, storyIndex) => (
              <Link
                className={cn(
                  'group relative box-border flex flex-col border-dashed border-[var(--l2-border)] bg-[var(--l1-background)] p-4 transition-colors',
                  viewMode === 'list' ? 'border-b' : 'min-h-[260px] border-b border-r'
                )}
                href={story.href}
                key={story.href}
                onClick={() =>
                  trackClick('Customer Story', 'Customer Story Link', story.title, {
                    activeFilter,
                    hasSearchQuery: query.trim().length > 0,
                    publishedAt: story.publishedAt,
                    storyCompany: story.company,
                    storyPosition: storyIndex + 1,
                    target: story.href,
                    viewMode,
                  })
                }
              >
                {viewMode === 'grid' ? (
                  <div className="flex h-full min-h-0 w-full flex-col">
                    <StoryLogoRow story={story} />
                    <h3 className="m-0 mt-6 text-pretty text-base font-normal leading-6 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]">
                      {story.title}
                    </h3>
                    <div className="mt-auto flex w-full items-end justify-between gap-4 pt-6">
                      <div className="min-w-0">
                        {story.takeaway && story.takeawayLabel ? (
                          <>
                            <p className="m-0 text-pretty text-xl font-medium leading-7 text-[var(--l1-foreground)]">
                              {story.takeaway}
                            </p>
                            <p className="m-0 mt-1 text-sm leading-5 text-[var(--l3-foreground)]">
                              {story.takeawayLabel}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="m-0 text-base font-medium leading-7 text-[var(--l1-foreground)]">
                              {story.person}
                            </p>
                            <p className="m-0 mt-1 text-sm leading-5 text-[var(--l3-foreground)]">
                              {story.role}
                            </p>
                          </>
                        )}
                      </div>
                      <StoryArrowChip />
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-col">
                      <StoryLogoRow story={story} />
                      <h3 className="m-0 mt-3 text-pretty text-base font-normal leading-6 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]">
                        {story.title}
                      </h3>
                    </div>
                    <StoryArrowChip />
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 border border-dashed border-[var(--l2-border)] bg-transparent px-6 py-16 text-center text-sm text-[var(--l3-foreground)]">
            No customer stories match those filters.
          </div>
        )}

        {filteredStories.length > initialStoryCount ? (
          <div className="mt-10 flex justify-center">
            <button
              className="rounded-full border border-[var(--l2-border)] bg-[var(--l2-background)] px-5 py-2.5 text-sm font-medium text-[var(--l1-foreground)] transition-colors hover:bg-[var(--l3-background)]"
              onClick={() => {
                trackClick(
                  'Customer Story List',
                  showAll ? 'Show Fewer Stories' : 'View More Stories',
                  showAll
                    ? 'Show fewer'
                    : `View more (${filteredStories.length - initialStoryCount})`,
                  {
                    activeFilter,
                    hasSearchQuery: query.trim().length > 0,
                    resultCount: filteredStories.length,
                  }
                )
                setShowAll((current) => !current)
              }}
              type="button"
            >
              {showAll ? 'Show fewer' : `View more (${filteredStories.length - initialStoryCount})`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
