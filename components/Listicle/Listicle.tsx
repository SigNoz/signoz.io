import { Typography } from '@signozhq/ui/typography'
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
            <Typography.Title level={2} className="mb-4 text-[var(--l1-foreground)]">
              {section.title}
            </Typography.Title>
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
      title={config.title}
      description={config.description}
      items={items}
      sectionName={config.sectionName}
      viewAllHref={config.viewAllHref}
      viewAllText={config.viewAllText}
      gridCols={config.gridCols || DEFAULT_GRID_COLS}
    />
  )

  if (config.wrapperTitle) {
    return (
      <div className="mb-10">
        <Typography.Title level={2} className="mb-4 text-[var(--l1-foreground)]">
          {config.wrapperTitle}
        </Typography.Title>
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

export default async function Listicle({ name, defaultSection }: ListicleProps) {
  const config = await getListicleConfig(name)
  if (!config) {
    return (
      <Typography.Text className="py-4 text-[var(--danger-foreground)]">
        Unknown listicle: &ldquo;{name}&rdquo;
      </Typography.Text>
    )
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
