'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

import { Sidebar } from './Sidebar'
import { LanguageSelector } from './LanguageSelector'
import {
  categoryContainsRoute,
  filterByLanguage,
  findDocByRoute,
  findFirstDoc,
  findFirstDocWithLanguage,
  normalizeLanguage,
  normalizeRoute,
} from './navigation'
import type { HubNavItem, LanguageOption, SidebarCategory, SidebarItem } from './types'
import { Menu, X } from 'lucide-react'

const LANGUAGE_STORAGE_KEY = 'ot-hub-language'

interface OpenTelemetrySidebarClientProps {
  navItems: HubNavItem[]
  normalizedRoute: string
  availableLanguages: string[]
  defaultLanguage?: string | null
  languagesCategoryKey: string
  showSidebar: boolean
  mobileTriggerId: string
  mobileOverlayId: string
}

/**
 * Handles all navigation and language selection interactivity so the main
 * layout can stay a server component.
 */
export default function OpenTelemetrySidebarClient({
  navItems,
  normalizedRoute,
  availableLanguages,
  defaultLanguage,
  languagesCategoryKey,
  showSidebar,
  mobileTriggerId,
  mobileOverlayId,
}: OpenTelemetrySidebarClientProps) {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    defaultLanguage ? defaultLanguage : availableLanguages.length ? 'ALL' : null
  )
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [triggerContainer, setTriggerContainer] = useState<HTMLElement | null>(null)
  const [overlayContainer, setOverlayContainer] = useState<HTMLElement | null>(null)
  const hasRestoredLanguage = useRef(false)

  useEffect(() => {
    setTriggerContainer(document.getElementById(mobileTriggerId))
    setOverlayContainer(document.getElementById(mobileOverlayId))
  }, [mobileOverlayId, mobileTriggerId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (!stored) return
    const normalizedStored = normalizeLanguage(stored)
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
    setIsLangOpen(false)
    setIsMobileNavOpen(false)
  }, [normalizedRoute])

  const normalizedRouteMemo = useMemo(() => normalizeRoute(normalizedRoute), [normalizedRoute])

  const currentNavDoc = useMemo(
    () => findDocByRoute(navItems as SidebarItem[], normalizedRouteMemo),
    [navItems, normalizedRouteMemo]
  )

  const filteredNav = useMemo(
    () => filterByLanguage(navItems, selectedLanguage),
    [navItems, selectedLanguage]
  )

  useEffect(() => {
    const routeExists = (items: SidebarItem[]): boolean => {
      for (const item of items) {
        if (item.type === 'doc' && normalizeRoute(item.route) === normalizedRouteMemo) return true
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
      const fallback = firstLangDoc || findFirstDoc(filteredNav as SidebarItem[])
      if (fallback) {
        router.push(fallback.route)
      }
    }
  }, [filteredNav, normalizedRouteMemo, router, selectedLanguage])

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
        const fallback = findFirstDoc(filtered as SidebarItem[])
        if (fallback) {
          router.push(fallback.route)
        }
        return
      }

      const filteredAll = filterByLanguage(navItems, null)
      const existsInAll = filteredAll.some((item) => {
        if (item.type === 'doc') return normalizeRoute(item.route) === normalizedRouteMemo
        return categoryContainsRoute(item as SidebarCategory, normalizedRouteMemo)
      })
      if (!existsInAll) {
        const fallbackAll = findFirstDoc(filteredAll as SidebarItem[])
        if (fallbackAll) {
          router.push(fallbackAll.route)
        }
      }
    },
    [currentNavDoc, navItems, normalizedRouteMemo, router]
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

  const languageSelector =
    availableLanguages.length > 0 ? (
      <LanguageSelector
        options={languageOptions}
        selectedLanguage={selectedLanguage}
        isOpen={isLangOpen}
        onToggle={toggleLanguageSelector}
        onChange={handleLanguageOptionSelect}
        onClose={() => setIsLangOpen(false)}
      />
    ) : null

  const desktopSidebar =
    showSidebar && filteredNav.length ? (
      <div className="doc-sidenav hidden lg:block">
        <Sidebar
          items={filteredNav}
          activeRoute={normalizedRouteMemo}
          persistExpansionKey={languagesCategoryKey}
          languageSelector={languageSelector}
        />
      </div>
    ) : null

  const triggerButton =
    triggerContainer && showSidebar
      ? createPortal(
          <button
            type="button"
            className="my-6 flex w-full items-center justify-end gap-2 rounded-lg border border-signoz_ink-300 bg-signoz_ink-500/60 px-3 py-3 text-sm text-white shadow-sm transition-colors hover:border-signoz_robin-500"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Menu size={16} />
            <span className="font-semibold">See All Guides</span>
          </button>,
          triggerContainer
        )
      : null

  const mobileSidebar =
    overlayContainer && showSidebar
      ? createPortal(
          isMobileNavOpen ? (
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
                    activeRoute={normalizedRouteMemo}
                    persistExpansionKey={languagesCategoryKey}
                    onNavigate={() => setIsMobileNavOpen(false)}
                    languageSelector={languageSelector}
                  />
                </div>
              </div>
            </div>
          ) : null,
          overlayContainer
        )
      : null

  return (
    <>
      {desktopSidebar}
      {triggerButton}
      {mobileSidebar}
    </>
  )
}
