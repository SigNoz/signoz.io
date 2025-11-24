'use client'

import '../css/opentelemetry-hub.css'

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import SidebarAuthorInfo from '@/components/SidebarAuthorInfo/SidebarAuthorInfo'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, ChevronRight, FileCode, FileText, Code, Menu, X } from 'lucide-react'
import Image from 'next/image'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiGo,
  SiPhp,
  SiDotnet,
  SiRubyonrails,
  SiRust,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiElixir,
  SiSpring,
} from 'react-icons/si'
import type { IconBaseProps, IconType } from 'react-icons'
import authorsDirectory from '@/constants/authors.json'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'

const LANGUAGE_STORAGE_KEY = 'ot-hub-language'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

type HubPathMeta = {
  key: string
  label: string
  firstRoute?: string
}

type HubNavDoc = {
  type: 'doc'
  route: string
  label: string
  language?: string
}

type HubNavCategory = {
  type: 'category'
  label: string
  route?: string
  items: HubNavItem[]
}

type HubNavItem = HubNavDoc | HubNavCategory

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  navItems: HubNavItem[]
  currentHubPath: string
  pathMeta: HubPathMeta[]
  defaultLanguage: string | null
  availableLanguages: string[]
  currentRoute: string
}

type SidebarCategory = {
  type: 'category'
  label: string
  route?: string
  items: SidebarItem[]
}

type SidebarDoc = {
  type: 'doc'
  route: string
  label: string
  language?: string
}

type SidebarItem = SidebarCategory | SidebarDoc

function normalizeRoute(route: string) {
  if (!route) return ''
  if (route.endsWith('/')) {
    return route.slice(0, -1)
  }
  return route
}

function normalizeLanguage(lang?: string | null) {
  return (lang || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

function filterByLanguage(items: HubNavItem[], language: string | null): SidebarItem[] {
  if (language === 'ALL') {
    return items as SidebarItem[]
  }
  return items
    .map((item) => {
      if (item.type === 'doc') {
        if (
          item.language &&
          language &&
          normalizeLanguage(item.language) !== normalizeLanguage(language)
        ) {
          return null
        }
        return item
      }

      const filteredChildren = filterByLanguage(item.items, language)
      if (!filteredChildren.length) {
        return null
      }
      return {
        ...item,
        items: filteredChildren,
      }
    })
    .filter(Boolean) as SidebarItem[]
}

function findFirstDoc(items: SidebarItem[]): SidebarDoc | undefined {
  for (const item of items) {
    if (item.type === 'doc') return item
    const child = findFirstDoc(item.items)
    if (child) return child
  }
  return undefined
}

function categoryContainsRoute(category: SidebarCategory, route: string) {
  for (const item of category.items) {
    if (item.type === 'doc' && normalizeRoute(item.route) === route) return true
    if (item.type === 'category' && categoryContainsRoute(item, route)) return true
  }
  return false
}

function findDocByRoute(items: SidebarItem[], route: string): SidebarDoc | null {
  for (const item of items) {
    if (item.type === 'doc' && normalizeRoute(item.route) === route) return item
    if (item.type === 'category') {
      const found = findDocByRoute(item.items, route)
      if (found) return found
    }
  }
  return null
}

function findFirstDocWithLanguage(
  items: SidebarItem[],
  language: string | null
): SidebarDoc | undefined {
  const target = normalizeLanguage(language)
  for (const item of items) {
    if (item.type === 'doc' && normalizeLanguage(item.language) === target) return item
    if (item.type === 'category') {
      const found = findFirstDocWithLanguage(item.items, language)
      if (found) return found
    }
  }
  return undefined
}

const JavaIcon = (props: IconBaseProps): React.FC<IconBaseProps> =>
  (
    <img src="/img/icons/java-icon.svg" alt="Java" className="h-[16px] w-[16px]" />
  ) as unknown as React.FC<IconBaseProps>

function LanguageIcon({ lang }: { lang: string }) {
  const normalized = normalizeLanguage(lang)
  const size = 16
  const brandColors: Record<string, string> = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    nodejs: '#539e43',
    nextjs: '#ffffff',
    nestjs: '#e0234e',
    python: '#3776ab',
    java: '#f89820',
    spring: '#6db33f',
    dotnet: '#512bd4',
    net: '#512bd4',
    golang: '#00add8',
    go: '#00add8',
    php: '#777bb4',
    ruby: '#cc342d',
    rust: '#dea584',
    angular: '#dd0031',
    react: '#61dafb',
  }
  const iconMap: Record<string, IconType> = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    nodejs: SiNodedotjs,
    node: SiNodedotjs,
    nextjs: SiNextdotjs,
    nestjs: SiNestjs,
    python: SiPython,
    java: JavaIcon as unknown as IconType,
    spring: SiSpring,
    dotnet: SiDotnet,
    net: SiDotnet,
    golang: SiGo,
    go: SiGo,
    php: SiPhp,
    ruby: SiRubyonrails,
    rust: SiRust,
    angular: SiAngular,
    react: SiReact,
    elixir: SiElixir,
  }

  const IconComp = iconMap[normalized]
  const color = brandColors[normalized] || '#9ca3af'
  if (IconComp) {
    return <IconComp size={size} color={color} />
  }
  return <FileCode size={size} color={color} />
}

function Sidebar({
  items,
  activeRoute,
  onNavigate,
  languageSelector,
  persistExpansionKey,
}: {
  items: SidebarItem[]
  activeRoute: string
  onNavigate?: () => void
  languageSelector?: ReactNode
  persistExpansionKey?: string
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    const expandedSet = new Set<string>(persistExpansionKey ? [persistExpansionKey] : [])
    const markParents = (nodes: SidebarItem[], trail: string[]) => {
      for (const node of nodes) {
        if (node.type === 'doc') continue
        const key = [...trail, node.label].join('>')
        if (categoryContainsRoute(node, activeRoute)) {
          expandedSet.add(key)
          markParents(node.items, [...trail, node.label])
        }
      }
    }
    markParents(items, [])
    setExpanded(expandedSet)
  }, [activeRoute, items])

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const renderItems = (nodes: SidebarItem[], trail: string[]) => {
    return (
      <ul className="list-none space-y-1 p-0">
        {nodes.map((node) => {
          if (node.type === 'doc') {
            const isActive = normalizeRoute(node.route) === activeRoute
            return (
              <li key={node.route} className="group mx-2 my-1 transition-all duration-200">
                <Link
                  href={node.route}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400 shadow-sm'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                  onClick={onNavigate}
                >
                  <FileText
                    className="flex-shrink-0 opacity-60 group-hover:opacity-100"
                    size={14}
                  />
                  <span className="truncate">{node.label}</span>
                </Link>
              </li>
            )
          }

          const key = [...trail, node.label].join('>')
          const isExpanded = expanded.has(key)

          return (
            <li key={key} className="group mx-2 my-1">
              <div
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isExpanded
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-200 hover:bg-gray-800/50 hover:text-white'
                }`}
                onClick={() => toggle(key)}
              >
                <div className="flex-shrink-0 opacity-60 group-hover:opacity-100">
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
                <span className="truncate">{node.label}</span>
              </div>
              {isExpanded && node.items.length > 0 && (
                <div className="mt-1 border-l border-gray-700/50 pl-3">
                  {renderItems(node.items, [...trail, node.label])}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav className="docs-sidebar sticky top-[80px] h-[calc(100vh-100px)] w-full overflow-y-auto py-4 text-white">
      {languageSelector}
      {renderItems(items, [])}
    </nav>
  )
}

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

  const languageOptions = useMemo(() => {
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

  const readingTimeText =
    // @ts-expect-error contentlayer readingTime
    content.readingTime?.text || // @ts-ignore
    (content.readingTime?.minutes ? `${Math.ceil(content.readingTime.minutes)} min read` : null)

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

  const handleLanguageChange = (value: string) => {
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
  }

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

  const languageSelector = availableLanguages.length > 0 && (
    <div className="mb-4 px-3">
      <div className="mb-1 text-xs uppercase text-gray-400">Language</div>
      <div className="relative">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/40 px-3 py-2 text-sm text-white shadow-sm transition-colors hover:border-signoz_robin-500 focus:border-signoz_robin-500 focus:outline-none"
          onClick={() => setIsLangOpen((v) => !v)}
        >
          <span className="flex items-center gap-4 truncate">
            {selectedLanguage && normalizeLanguage(selectedLanguage) !== 'all' ? (
              <LanguageIcon lang={selectedLanguage} />
            ) : (
              <Code size={16} color="#9ca3af" />
            )}
            <span className="truncate">
              {selectedLanguage && normalizeLanguage(selectedLanguage) !== 'all'
                ? selectedLanguage
                : 'All'}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isLangOpen && (
          <div className="absolute z-20 mt-2 w-full rounded-lg border border-signoz_ink-300 bg-signoz_ink-500/80 shadow-lg backdrop-blur-sm">
            <div className="max-h-72 overflow-y-auto py-2">
              {languageOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`flex w-full items-center gap-4 px-3 py-2 text-sm transition-colors ${
                    normalizeLanguage(selectedLanguage) === normalizeLanguage(opt.value)
                      ? 'bg-signoz_ink-400/80 text-white'
                      : 'text-gray-200 hover:bg-signoz_ink-400/40'
                  }`}
                  onClick={() => {
                    handleLanguageChange(opt.value)
                    setIsLangOpen(false)
                  }}
                >
                  {normalizeLanguage(opt.value) === 'all' ? (
                    <Code size={16} color="#9ca3af" />
                  ) : (
                    <LanguageIcon lang={opt.value} />
                  )}
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <main ref={mainRef}>
      <SectionContainer>
        <ProgressBar target={mainRef} />

        <div className="mb-4 hidden flex-wrap items-center justify-between gap-3 border-b border-signoz_ink-300 px-4 pb-3 pt-6 md:px-6 lg:flex lg:px-8">
          <div className="doc-header flex flex-wrap items-center gap-6">
            {orderedPathMeta.map((path) => {
              if (!path.firstRoute) return null
              const isActive = path.key === currentHubPath
              const label =
                path.key === 'learn'
                  ? 'Learn OpenTelemetry'
                  : path.key === 'quick-start'
                    ? 'OpenTelemetry Quick Start'
                    : path.label
              return (
                <Link
                  key={path.key}
                  href={path.firstRoute}
                  className={`border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-white/60 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
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
