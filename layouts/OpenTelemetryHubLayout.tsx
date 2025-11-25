'use client'

import '../css/opentelemetry-hub.css'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ExternalLink, Menu, X } from 'lucide-react'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import authorsDirectory from '@/constants/authors.json'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import { Sidebar } from './open-telemetry-hub/Sidebar'
import { LanguageSelector } from './open-telemetry-hub/LanguageSelector'
import {
  categoryContainsRoute,
  filterByLanguage,
  findDocByRoute,
  findFirstDoc,
  findFirstDocWithLanguage,
  normalizeLanguage,
  normalizeRoute,
} from './open-telemetry-hub/navigation'
import type {
  HubPathMeta,
  LanguageOption,
  LayoutProps,
  SidebarCategory,
  SidebarItem,
  TocItemProps,
} from './open-telemetry-hub/types'

const LANGUAGE_STORAGE_KEY = 'ot-hub-language'

export default function OpenTelemetryHubLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  navItems,
  currentHubPath,
  pathMeta,
  defaultLanguage,
  availableLanguages,
  currentRoute,
}: LayoutProps) {
  const { title } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    defaultLanguage ? defaultLanguage : availableLanguages.length ? 'ALL' : null
  )
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const hasRestoredLanguage = useRef(false)
  const router = useRouter()
  const pathname = usePathname()

  // Restore persisted language if available and allowed
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (!stored) return
    const normalizedStored = normalizeLanguage(stored)
    // If page has a default language, only override when user preference is "ALL"
    if (defaultLanguage && normalizedStored !== 'all') {
      return
    }
    const normalized = normalizeLanguage(stored)
    const match = availableLanguages.find((lang) => normalizeLanguage(lang) === normalized)
    if (normalized === 'all' || match) {
      setSelectedLanguage(stored)
      hasRestoredLanguage.current = true
    }
  }, [availableLanguages, defaultLanguage])

  useEffect(() => {
    if (hasRestoredLanguage.current) return

    if (defaultLanguage && selectedLanguage !== 'ALL') {
      setSelectedLanguage(defaultLanguage)
      return
    }
    if (!defaultLanguage && !selectedLanguage && availableLanguages.length > 0) {
      setSelectedLanguage('ALL')
      return
    }
    if (!defaultLanguage && !selectedLanguage) {
      setSelectedLanguage(null)
    }
  }, [availableLanguages, defaultLanguage, selectedLanguage])

  useEffect(() => {
    // Close any mobile overlays when navigating
    setIsMobileNavOpen(false)
    setIsLangOpen(false)
  }, [pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
        rootMargin: '-10% -20% -80% -20%',
        threshold: 0,
      }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  const normalizedRoute = useMemo(
    () => normalizeRoute(currentRoute || pathname),
    [currentRoute, pathname]
  )
  const currentNavDoc = useMemo(
    () => findDocByRoute(navItems as SidebarItem[], normalizedRoute),
    [navItems, normalizedRoute]
  )
  const filteredNav = useMemo(
    () => filterByLanguage(navItems, selectedLanguage),
    [navItems, selectedLanguage]
  )
  const orderedPathMeta = useMemo(() => {
    const order = ['learn', 'quick-start']
    const ordered = order
      .map((key) => pathMeta.find((p) => p.key === key))
      .filter(Boolean) as HubPathMeta[]
    const remaining = pathMeta.filter((p) => !order.includes(p.key))
    return [...ordered, ...remaining]
  }, [pathMeta])

  const languagesCategoryKey = useMemo(() => 'Language and Frameworks', [])

  const languageOptions = useMemo<LanguageOption[]>(() => {
    const dedup = new Map<string, string>()
    availableLanguages.forEach((lang) => {
      dedup.set(normalizeLanguage(lang), lang)
    })
    return [
      { value: 'ALL', label: 'All' },
      ...Array.from(dedup.values()).map((lang) => ({ value: lang, label: lang })),
    ]
  }, [availableLanguages])

  const updatedDate = content.lastmod || content.date
  const formattedUpdatedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const readingTimeText = (() => {
    // readingTime is attached by contentlayer only for certain content types.
    if ('readingTime' in content && content.readingTime) {
      return (
        content.readingTime.text ||
        (content.readingTime.minutes ? `${Math.ceil(content.readingTime.minutes)} min read` : null)
      )
    }
    return null
  })()

  const renderedAuthors = useMemo<RenderedAuthor[]>(() => {
    const directory = authorsDirectory as Record<
      string,
      { name?: string; url?: string; image_url?: string }
    >

    if (authorDetails && authorDetails.length > 0) {
      return authorDetails
        .map((detail, idx) => {
          const slug = authors?.[idx]
          const fallbackProfile = slug ? directory[slug] : undefined

          const name = detail.name || fallbackProfile?.name

          if (!name) return null

          return {
            name,
            url: detail.url || fallbackProfile?.url,
            image: fallbackProfile?.image_url,
          }
        })
        .filter(Boolean) as RenderedAuthor[]
    }

    if (authors && authors.length > 0) {
      return authors
        .map((slug) => {
          const profile = directory[slug]
          if (!profile?.name) return null
          return {
            name: profile.name,
            url: profile.url,
            image: profile.image_url,
          }
        })
        .filter(Boolean) as RenderedAuthor[]
    }

    return []
  }, [authorDetails, authors])

  const MAX_VISIBLE_TAGS = 2
  const tagsArray = Array.isArray(content.tags) ? content.tags : []
  const primaryTags = tagsArray.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTags = tagsArray.slice(MAX_VISIBLE_TAGS)
  const hiddenTagsTitle = hiddenTags.length ? hiddenTags.join(', ') : undefined
  const hasMetaInfo =
    renderedAuthors.length > 0 ||
    Boolean(readingTimeText) ||
    Boolean(formattedUpdatedDate) ||
    primaryTags.length > 0

  useEffect(() => {
    // If current route is not visible after filtering, move to first available doc for selected language
    const routeExists = (items: SidebarItem[]): boolean => {
      for (const item of items) {
        if (item.type === 'doc' && normalizeRoute(item.route) === normalizedRoute) return true
        if (item.type === 'category' && routeExists(item.items)) return true
      }
      return false
    }

    if (!filteredNav.length) {
      return
    }

    if (!routeExists(filteredNav)) {
      const firstLangDoc =
        selectedLanguage && selectedLanguage !== 'ALL'
          ? findFirstDocWithLanguage(filteredNav as SidebarItem[], selectedLanguage)
          : undefined
      const fallback = firstLangDoc || findFirstDoc(filteredNav)
      if (fallback) {
        router.push(fallback.route)
      }
    }
  }, [filteredNav, normalizedRoute, router, selectedLanguage])

  const handleLanguageChange = useCallback(
    (value: string) => {
      const nextLanguage = value || null
      setSelectedLanguage(nextLanguage)
      if (typeof window !== 'undefined') {
        if (nextLanguage) {
          window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
        } else {
          window.localStorage.removeItem(LANGUAGE_STORAGE_KEY)
        }
      }

      const currentLangNorm = normalizeLanguage(currentNavDoc?.language)
      const nextLangNorm = normalizeLanguage(nextLanguage)

      const matchesCurrent =
        currentNavDoc &&
        (!currentLangNorm || currentLangNorm === nextLangNorm || nextLangNorm === 'all')

      if (matchesCurrent) {
        return
      }

      if (nextLangNorm !== 'all') {
        const targetDoc = findFirstDocWithLanguage(navItems as SidebarItem[], nextLanguage)
        if (targetDoc) {
          router.push(targetDoc.route)
          return
        }

        const filtered = filterByLanguage(navItems, nextLanguage)
        const fallback = findFirstDoc(filtered)
        if (fallback) {
          router.push(fallback.route)
        }
        return
      }

      // For "ALL", stay on the current route unless it disappears
      const filteredAll = filterByLanguage(navItems, null)
      const existsInAll = filteredAll.some((item) => {
        if (item.type === 'doc') return normalizeRoute(item.route) === normalizedRoute
        return categoryContainsRoute(item as SidebarCategory, normalizedRoute)
      })
      if (!existsInAll) {
        const fallbackAll = findFirstDoc(filteredAll as SidebarItem[])
        if (fallbackAll) {
          router.push(fallbackAll.route)
        }
      }
    },
    [currentNavDoc, navItems, normalizedRoute, router]
  )

  const handleLanguageOptionSelect = useCallback(
    (value: string) => {
      handleLanguageChange(value)
      setIsLangOpen(false)
    },
    [handleLanguageChange]
  )

  const toggleLanguageSelector = useCallback(() => {
    setIsLangOpen((prev) => !prev)
  }, [])

  const showSidebar = currentHubPath !== 'quick-start' && (filteredNav?.length ?? 0) > 0
  const docClasses = [
    'doc overflow-clip px-3 md:px-6 lg:px-8',
    !showSidebar ? 'doc-no-sidebar' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const hasToc = Array.isArray(toc) && toc.length > 0

  const metaInfoCard = hasMetaInfo && (
    <ArticleMetaDetailsCard
      authors={renderedAuthors}
      readingTimeText={readingTimeText}
      formattedUpdatedDate={formattedUpdatedDate}
      primaryTags={primaryTags}
      hiddenTags={hiddenTags}
      hiddenTagsTitle={hiddenTagsTitle}
    />
  )

  const languageSelector =
    availableLanguages.length > 0 ? (
      <LanguageSelector
        options={languageOptions}
        selectedLanguage={selectedLanguage}
        isOpen={isLangOpen}
        onToggle={toggleLanguageSelector}
        onChange={handleLanguageOptionSelect}
      />
    ) : null

  return (
    <main ref={mainRef}>
      <SectionContainer>
        <ProgressBar target={mainRef} />

        <div className="mb-4 hidden flex-wrap items-center justify-between gap-3 border-b border-signoz_ink-300 px-4 pb-3 pt-6 md:px-6 lg:flex lg:px-8">
          <div className="doc-header flex flex-wrap items-center gap-6">
            {orderedPathMeta.map((path) => {
              if (!path.firstRoute) return null
              const isActive = path.key === currentHubPath
              const isQuickStart = path.key === 'quick-start'
              const label =
                path.key === 'learn'
                  ? 'Learn OpenTelemetry'
                  : path.key === 'quick-start'
                    ? 'OpenTelemetry Quick Start'
                    : path.label
              const iconColor = isActive ? 'text-white' : 'text-gray-400'
              return (
                <Link
                  key={path.key}
                  href={path.firstRoute}
                  target={isQuickStart ? '_blank' : undefined}
                  rel={isQuickStart ? 'noopener noreferrer' : undefined}
                  className={`border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-white/60 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {isQuickStart && <ExternalLink size={14} className={iconColor} />}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className={docClasses}>
          {showSidebar && (
            <div className="doc-sidenav hidden lg:block">
              <Sidebar
                items={filteredNav}
                activeRoute={normalizedRoute}
                persistExpansionKey={languagesCategoryKey}
                languageSelector={languageSelector}
              />
            </div>
          )}

          <div className="doc-content md:px-0 lg:px-4">
            {(showSidebar || hasToc) && (
              <div className="mb-4 flex flex-wrap gap-3 lg:hidden">
                {showSidebar && (
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-signoz_ink-300 bg-signoz_ink-500/60 px-3 pb-1 pt-6 text-sm text-white shadow-sm transition-colors hover:border-signoz_robin-500"
                    onClick={() => setIsMobileNavOpen(true)}
                  >
                    <Menu size={16} />
                    <span className="font-semibold">See All Guides</span>
                  </button>
                )}
              </div>
            )}

            <article className="prose prose-slate max-w-none px-3 py-6 dark:prose-invert">
              <h1 className="text-3xl font-bold">{title}</h1>
              {(formattedUpdatedDate || readingTimeText) && (
                <div className="mb-2 mt-3 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
                  {formattedUpdatedDate && <span>Updated {formattedUpdatedDate}</span>}
                  {readingTimeText && <span>{readingTimeText}</span>}
                </div>
              )}
              {children}
            </article>
            {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
              <div className="lg:hidden">
                <div className="rounded-xl border border-signoz_ink-300/80 bg-signoz_ink-500/50 p-4 text-xs text-white/90 shadow-lg">
                  <div className="flex flex-col gap-4">
                    {renderedAuthors.length > 0 && (
                      <div className="flex items-center gap-3">
                        {renderedAuthors[0].image && (
                          <Image
                            src={renderedAuthors[0].image}
                            alt={renderedAuthors[0].name}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full border border-white/10 object-cover"
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                            Author{renderedAuthors.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-sm text-white">
                            {renderedAuthors.map((author, idx) => (
                              <span key={`${author.name}-${idx}`}>
                                {author.url ? (
                                  <Link
                                    href={author.url}
                                    className="!text-gray-200 transition-colors hover:text-signoz_robin-400"
                                  >
                                    {author.name}
                                  </Link>
                                ) : (
                                  author.name
                                )}
                                {idx < renderedAuthors.length - 1 && (
                                  <span className="text-white/60">, </span>
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {primaryTags.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                          Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {primaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                          {hiddenTags.length > 0 && (
                            <span
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                              title={hiddenTagsTitle}
                            >
                              +{hiddenTags.length} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {(hasMetaInfo || hasToc) && (
            <aside className="doc-right hidden lg:block" aria-label="On this page navigation">
              <div className="doc-right-inner">
                {metaInfoCard}

                {hasToc && (
                  <div className="doc-toc">
                    <div className="mb-3 text-xs uppercase text-gray-400">On this page</div>

                    <div
                      ref={tocContainerRef}
                      className="doc-toc-items doc-toc-scroll border-l border-signoz_slate-500 pl-3"
                    >
                      <TableOfContents
                        toc={toc}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        scrollableContainerRef={tocContainerRef}
                      />
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {showSidebar && isMobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileNavOpen(false)}
              aria-label="Close navigation overlay"
            />

            <div className="absolute inset-y-0 right-0 w-[90%] max-w-sm overflow-y-auto border-l border-signoz_ink-300 bg-signoz_ink-500 shadow-2xl">
              <div className="flex items-center justify-between border-b border-signoz_ink-300 px-4 py-3">
                <div className="text-sm font-semibold text-white">Guide</div>
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-300 transition-colors hover:bg-signoz_ink-400/50 hover:text-white"
                  onClick={() => setIsMobileNavOpen(false)}
                  aria-label="Close navigation"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3">
                <Sidebar
                  items={filteredNav}
                  activeRoute={normalizedRoute}
                  persistExpansionKey={languagesCategoryKey}
                  onNavigate={() => setIsMobileNavOpen(false)}
                  languageSelector={languageSelector}
                />
              </div>
            </div>
          </div>
        )}

        {hasToc && (
          <div className="lg:hidden">
            <FloatingTableOfContents />
          </div>
        )}
      </SectionContainer>
    </main>
  )
}
