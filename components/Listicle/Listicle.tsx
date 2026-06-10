import {
  getListicleConfig,
  getListicleItems,
  getListicleSectionItems,
} from '@/constants/listicles/utils'
import type { ListicleConfig } from './types'
import ListicleCardGrid from './ListicleCardGrid'
import SearchableListicleClient from './SearchableListicleClient'
import SectionedListicleClient from './SectionedListicleClient'

interface ListicleProps {
  name: string
  defaultSection?: string
}

const DEFAULT_GRID_COLS = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'

function FlatPattern({ config }: { config: ListicleConfig }) {
  if (config.staticSections) {
    const sections = getListicleSectionItems(config)

    return (
      <div>
        {sections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
            <ListicleCardGrid
              items={section.items}
              sectionName={section.sectionName}
              gridCols={section.gridCols || config.gridCols || DEFAULT_GRID_COLS}
            />
          </div>
        ))}
      </div>
    )
  }

  const items = getListicleItems(config)
  const content = (
    <ListicleCardGrid
      items={items}
      sectionName={config.sectionName}
      viewAllText={config.viewAllText}
      gridCols={config.gridCols || DEFAULT_GRID_COLS}
    />
  )

  if (config.wrapperTitle) {
    return (
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">{config.wrapperTitle}</h2>
        {content}
      </div>
    )
  }

  return content
}

function SearchablePattern({ config }: { config: ListicleConfig }) {
  return (
    <SearchableListicleClient
      items={getListicleItems(config)}
      sectionName={config.sectionName}
      viewAllText={config.viewAllText}
      gridCols={config.gridCols || DEFAULT_GRID_COLS}
      searchPlaceholder={config.searchPlaceholder}
    />
  )
}

function SectionedPattern({
  config,
  defaultSection,
}: {
  config: ListicleConfig
  defaultSection?: string
}) {
  return (
    <SectionedListicleClient
      sections={getListicleSectionItems(config)}
      defaultSection={defaultSection}
      gridCols={config.gridCols || DEFAULT_GRID_COLS}
    />
  )
}

export default function Listicle({ name, defaultSection }: ListicleProps) {
  const config = getListicleConfig(name)
  if (!config) {
    return <div className="py-4 text-red-500">Unknown listicle: &ldquo;{name}&rdquo;</div>
  }

  switch (config.pattern) {
    case 'flat':
      return <FlatPattern config={config} />
    case 'searchable':
      return <SearchablePattern config={config} />
    case 'sectioned':
      return <SectionedPattern config={config} defaultSection={defaultSection} />
    default:
      return null
  }
}
