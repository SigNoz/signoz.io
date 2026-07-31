'use client'

import { useEffect, useMemo, useState } from 'react'
import { TabsRoot, TabsList, TabsTrigger } from '@signozhq/ui/tabs'
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
      <TabsRoot
        className="mb-8"
        value={activeSection}
        activationMode="manual"
        onValueChange={(value) => {
          setActiveSection(value)
          window.history.replaceState(null, '', `#${value}`)
        }}
      >
        <TabsList variant="primary" className="flex flex-wrap">
          {sectionTabs.map((section) => (
            <TabsTrigger key={section.id} value={section.id} variant="primary">
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsRoot>

      {visibleSections.map((section) => (
        <div key={section.id} className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--l1-foreground)]">
            {section.title}
          </h2>
          {section.subsections && section.subsections.length > 0 ? (
            section.subsections.map((subsection) => (
              <div key={subsection.id}>
                <h3 className="mb-4 text-xl font-semibold text-[var(--l1-foreground)]">
                  {subsection.title}
                </h3>
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
