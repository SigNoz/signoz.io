'use client'

import { useEffect, useState } from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import { withComponentIcons } from '@/constants/componentItems'
import type { ComponentItem } from '@/constants/componentItems'
import {
  LISTICLE_REGISTRY,
  type ListicleConfig,
  type ListicleSectionDef,
} from '@/constants/componentItems/listicleRegistry'

interface DocsListicleProps {
  dataKey?: string
  defaultFilter?: string
  gridCols?: string
  sectionName?: string
  viewAllHref?: string
  viewAllText?: string
  title?: string
  description?: string
  searchable?: boolean
  searchPlaceholder?: string
  hashNavigation?: boolean
  staticSections?: boolean
  items?: ListicleConfig['items']
  sections?: ListicleSectionDef[]
}

type SectionedItems = Record<
  string,
  readonly ComponentItem[] | Record<string, readonly ComponentItem[]>
>

function isFlat(items: ListicleConfig['items']): items is readonly ComponentItem[] {
  return Array.isArray(items)
}

function getSectionItems(
  items: SectionedItems,
  section: ListicleSectionDef
): readonly ComponentItem[] | Record<string, readonly ComponentItem[]> | undefined {
  const key = section.dataKey || section.id
  return items[key] as
    | readonly ComponentItem[]
    | Record<string, readonly ComponentItem[]>
    | undefined
}

function NavigationPills({
  sections,
  activeSection,
  onSelect,
}: {
  sections: ListicleSectionDef[]
  activeSection: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSelect(section.id)}
          className={
            'inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
            (activeSection === section.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700')
          }
        >
          {section.label}
        </button>
      ))}
    </div>
  )
}

function Section({
  section,
  items,
  gridCols,
}: {
  section: ListicleSectionDef
  items: readonly ComponentItem[]
  gridCols?: string
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">{section.title || section.label}</h2>
      <IconCardGrid
        cards={withComponentIcons(items)}
        sectionName={section.trackingName || section.label}
        gridCols={gridCols}
      />
    </div>
  )
}

function NestedSection({
  section,
  nestedItems,
  gridCols,
}: {
  section: ListicleSectionDef
  nestedItems: Record<string, readonly ComponentItem[]>
  gridCols?: string
}) {
  if (!section.subsections) return null

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">{section.title || section.label}</h2>
      {section.subsections.map((sub) => {
        const subItems = nestedItems[sub.id]
        if (!subItems?.length) return null
        return (
          <div key={sub.id}>
            <h3 className="mb-4 text-xl font-semibold">{sub.title}</h3>
            <IconCardGrid
              cards={withComponentIcons(subItems)}
              sectionName={sub.trackingName || sub.title}
              gridCols={gridCols}
            />
          </div>
        )
      })}
    </div>
  )
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div className="relative mx-auto mb-8 max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:text-sm"
      />
    </div>
  )
}

function FlatDisplay({ config }: { config: ListicleConfig }) {
  const cards = withComponentIcons(config.items as readonly ComponentItem[])
  return (
    <IconCardGrid
      cards={cards}
      sectionName={config.sectionName || ''}
      gridCols={config.gridCols}
      viewAllHref={config.viewAllHref}
      viewAllText={config.viewAllText}
      title={config.title}
      description={config.description}
    />
  )
}

function SearchableDisplay({ config }: { config: ListicleConfig }) {
  const [searchQuery, setSearchQuery] = useState('')
  const allCards = withComponentIcons(config.items as readonly ComponentItem[])

  const filteredCards = allCards.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={config.searchPlaceholder || 'Search...'}
      />
      {filteredCards.length > 0 ? (
        <IconCardGrid
          cards={filteredCards}
          sectionName={config.sectionName || ''}
          viewAllText={config.viewAllText}
          gridCols={config.gridCols}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No items found matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
}

function StaticSectionsDisplay({ config }: { config: ListicleConfig }) {
  const items = config.items as SectionedItems
  const sections = config.sections || []

  return (
    <div>
      {sections.map((section) => {
        const sectionData = getSectionItems(items, section)
        if (!sectionData || !Array.isArray(sectionData)) return null
        return (
          <Section
            key={section.id}
            section={section}
            items={sectionData}
            gridCols={config.gridCols}
          />
        )
      })}
    </div>
  )
}

function TabbedDisplay({
  config,
  defaultFilter,
}: {
  config: ListicleConfig
  defaultFilter?: string
}) {
  const sections = config.sections || []
  const items = config.items as SectionedItems

  const validFilter =
    defaultFilter && sections.some((s) => s.id === defaultFilter) ? defaultFilter : 'all'
  const [activeSection, setActiveSection] = useState(validFilter)

  useEffect(() => {
    if (!config.hashNavigation) return

    const checkHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && sections.some((s) => s.id === hash)) {
        setActiveSection(hash)
      }
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const renderSectionContent = (section: ListicleSectionDef) => {
    const sectionData = getSectionItems(items, section)
    if (!sectionData) return null

    if (Array.isArray(sectionData)) {
      return (
        <Section
          key={section.id}
          section={section}
          items={sectionData}
          gridCols={config.gridCols}
        />
      )
    }

    if (section.subsections) {
      return (
        <NestedSection
          key={section.id}
          section={section}
          nestedItems={sectionData as Record<string, readonly ComponentItem[]>}
          gridCols={config.gridCols}
        />
      )
    }

    return null
  }

  const nonAllSections = sections.filter((s) => s.id !== 'all')

  return (
    <div>
      <NavigationPills
        sections={sections}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />
      {nonAllSections.map(
        (section) =>
          (activeSection === 'all' || activeSection === section.id) && renderSectionContent(section)
      )}
    </div>
  )
}

export default function DocsListicle({ dataKey, defaultFilter, ...overrides }: DocsListicleProps) {
  const registryConfig = dataKey ? LISTICLE_REGISTRY[dataKey] : undefined

  if (!registryConfig && !overrides.items) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`DocsListicle: unknown dataKey "${dataKey}"`)
    }
    return null
  }

  const config: ListicleConfig = {
    ...registryConfig,
    ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined)),
  } as ListicleConfig

  const hasFlat = isFlat(config.items)
  const hasSections = config.sections && config.sections.length > 0

  if (config.searchable && hasFlat) {
    return <SearchableDisplay config={config} />
  }

  if (hasSections && config.staticSections) {
    return <StaticSectionsDisplay config={config} />
  }

  if (hasSections && !hasFlat) {
    return <TabbedDisplay config={config} defaultFilter={defaultFilter} />
  }

  if (hasFlat) {
    return <FlatDisplay config={config} />
  }

  return null
}
