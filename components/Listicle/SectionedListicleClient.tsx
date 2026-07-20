'use client'

import { useEffect, useMemo, useState } from 'react'
import { Typography } from '@signozhq/ui/typography'
import type { ListicleRenderSection } from '@/constants/listicles/utils'
import ListicleCardGrid from './ListicleCardGrid'

interface SectionedListicleClientProps {
  sections: ListicleRenderSection[]
  defaultSection?: string
  gridCols?: string
}

export default function SectionedListicleClient({
  sections,
  defaultSection,
  gridCols,
}: SectionedListicleClientProps) {
  const sectionTabs = useMemo(
    () => [
      { id: 'all', label: 'All' },
      ...sections.map((section) => ({
        id: section.id,
        label: section.label,
      })),
    ],
    [sections]
  )
  const [activeSection, setActiveSection] = useState(
    defaultSection && sectionTabs.some((section) => section.id === defaultSection)
      ? defaultSection
      : 'all'
  )

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && sectionTabs.some((section) => section.id === hash)) {
        setActiveSection(hash)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [sectionTabs])

  const visibleSections =
    activeSection === 'all' ? sections : sections.filter((section) => section.id === activeSection)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {sectionTabs.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => {
              setActiveSection(section.id)
              window.history.replaceState(null, '', `#${section.id}`)
            }}
            className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-[var(--primary-background)] text-[var(--primary-foreground)]'
                : 'bg-[var(--l2-background)] text-[var(--l1-foreground)] hover:bg-[var(--l2-background-hover)]'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {visibleSections.map((section) => (
        <div key={section.id} className="mb-10">
          <Typography.Title level={2} className="mb-4 text-[var(--l1-foreground)]">
            {section.title}
          </Typography.Title>
          {section.subsections && section.subsections.length > 0 ? (
            section.subsections.map((subsection) => (
              <div key={subsection.id}>
                <Typography.Title level={3} className="mb-4 text-[var(--l1-foreground)]">
                  {subsection.title}
                </Typography.Title>
                <ListicleCardGrid
                  items={subsection.items}
                  sectionName={subsection.sectionName}
                  gridCols={subsection.gridCols || section.gridCols || gridCols}
                />
              </div>
            ))
          ) : (
            <ListicleCardGrid
              items={section.items}
              sectionName={section.sectionName}
              gridCols={section.gridCols || gridCols}
            />
          )}
        </div>
      ))}
    </div>
  )
}
