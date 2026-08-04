'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Grid2X2, List, Search } from 'lucide-react'

import { cn } from 'app/lib/utils'

import { customerStories, customerStoryFilters, type CustomerStoryFilter } from './customerStories'

type ViewMode = 'grid' | 'list'

const initialStoryCount = 9

export default function CustomerStoryGrid() {
  const [activeFilter, setActiveFilter] = useState<CustomerStoryFilter>('All stories')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showAll, setShowAll] = useState(false)

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const stories = customerStories.filter((story) => {
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

    return [...stories].sort((a, b) => {
      const publishedDateDifference = b.publishedAt.localeCompare(a.publishedAt)
      if (publishedDateDifference !== 0) return publishedDateDifference
      return a.company.localeCompare(b.company)
    })
  }, [activeFilter, query])

  const visibleStories = showAll ? filteredStories : filteredStories.slice(0, initialStoryCount)

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="border-b border-signoz_slate-400 pb-3 text-sm font-medium text-signoz_vanilla-100">
          Filter stories
        </p>
        <div
          aria-label="Filter customer stories"
          className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
          role="group"
        >
          {customerStoryFilters.map((filter) => {
            const count =
              filter === 'All stories'
                ? customerStories.length
                : customerStories.filter((story) => story.filters.includes(filter)).length

            return (
              <button
                aria-pressed={activeFilter === filter}
                className={cn(
                  'flex shrink-0 items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors lg:w-full',
                  activeFilter === filter
                    ? 'bg-signoz_ink-300 text-signoz_vanilla-100'
                    : 'text-signoz_vanilla-400 hover:bg-signoz_ink-400 hover:text-signoz_vanilla-100'
                )}
                key={filter}
                onClick={() => {
                  setActiveFilter(filter)
                  setShowAll(false)
                }}
                type="button"
              >
                <span>{filter}</span>
                <span className="font-mono text-[10px] text-signoz_vanilla-400">{count}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-3 md:sticky md:top-16 md:z-20 md:-my-3 md:flex-row md:items-center md:bg-signoz_ink-500/95 md:py-3 md:backdrop-blur-sm">
          <label className="relative flex-1">
            <span className="sr-only">Search customer stories</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-signoz_vanilla-400"
              size={16}
            />
            <input
              className="h-11 w-full rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 pl-10 pr-4 text-sm text-signoz_vanilla-100 outline-none placeholder:text-signoz_vanilla-400 focus:border-signoz_robin-400"
              onChange={(event) => {
                setQuery(event.target.value)
                setShowAll(false)
              }}
              placeholder="Search stories"
              type="search"
              value={query}
            />
          </label>

          <div
            aria-label="Customer story layout"
            className="flex h-11 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-1"
            role="group"
          >
            <button
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
              className={cn(
                'flex flex-1 items-center justify-center rounded px-3 transition-colors md:flex-none',
                viewMode === 'grid'
                  ? 'bg-signoz_vanilla-200 text-signoz_ink-500'
                  : 'text-signoz_vanilla-400 hover:text-signoz_vanilla-100'
              )}
              onClick={() => setViewMode('grid')}
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
                  ? 'bg-signoz_vanilla-200 text-signoz_ink-500'
                  : 'text-signoz_vanilla-400 hover:text-signoz_vanilla-100'
              )}
              onClick={() => setViewMode('list')}
              type="button"
            >
              <List aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        {visibleStories.length ? (
          <div
            className={cn(
              'mt-6 grid',
              viewMode === 'grid'
                ? 'grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1 gap-3'
            )}
          >
            {visibleStories.map((story) => (
              <Link
                className={cn(
                  'group relative overflow-hidden rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 transition-colors hover:border-signoz_slate-300 hover:bg-signoz_ink-300',
                  viewMode === 'list'
                    ? 'flex min-h-0 flex-col p-5'
                    : 'flex min-h-[330px] flex-col p-6'
                )}
                href={story.href}
                key={story.href}
              >
                <div className="flex flex-col">
                  <div
                    className={cn(
                      'flex items-center gap-3 pr-8',
                      viewMode === 'list' ? 'min-h-8' : 'min-h-9'
                    )}
                  >
                    <Image
                      alt={story.showCompanyNameWithLogo ? '' : story.logoAlt}
                      className="max-h-8 w-auto max-w-28 object-contain"
                      height={32}
                      src={story.logo}
                      width={112}
                    />
                    {story.showCompanyNameWithLogo ? (
                      <span className="text-sm font-medium text-signoz_vanilla-200">
                        {story.company}
                      </span>
                    ) : null}
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="absolute right-6 top-6 shrink-0 text-signoz_vanilla-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signoz_vanilla-100"
                    size={18}
                  />
                  <h3
                    className={cn(
                      'text-pretty font-normal text-signoz_vanilla-300',
                      viewMode === 'list' ? 'mt-4 text-lg leading-6' : 'mt-7 text-xl leading-7'
                    )}
                  >
                    {story.title}
                  </h3>
                </div>

                <div className={cn(viewMode === 'list' ? 'mt-5' : 'mt-auto h-28 shrink-0 pt-6')}>
                  {story.takeaway && story.takeawayLabel ? (
                    <>
                      <p
                        className={cn(
                          'text-pretty font-medium text-signoz_vanilla-100',
                          viewMode === 'list' ? 'text-xl leading-7' : 'text-2xl leading-8'
                        )}
                      >
                        {story.takeaway}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-signoz_vanilla-400">
                        {story.takeawayLabel}
                      </p>
                    </>
                  ) : (
                    <div>
                      <p
                        className={cn(
                          'font-medium text-signoz_vanilla-200',
                          viewMode === 'list' ? 'text-sm' : 'text-base'
                        )}
                      >
                        {story.person}
                      </p>
                      <p className="mt-1 text-sm text-signoz_vanilla-400">{story.role}</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 px-6 py-16 text-center text-sm text-signoz_vanilla-400">
            No customer stories match those filters.
          </div>
        )}

        {filteredStories.length > initialStoryCount ? (
          <div className="mt-10 flex justify-center">
            <button
              className="rounded-full border border-signoz_slate-400 bg-signoz_ink-400 px-5 py-2.5 text-sm font-medium text-signoz_vanilla-200 transition-colors hover:border-signoz_slate-300 hover:bg-signoz_ink-300"
              onClick={() => setShowAll((current) => !current)}
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
