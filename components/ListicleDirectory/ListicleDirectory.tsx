import { getListicleConfig, getListicleSectionItems } from '@/constants/listicles/utils'
import ListicleIconFilter from '../Listicle/ListicleIconFilter'
import ListicleDirectoryClient from './ListicleDirectoryClient'

interface ListicleDirectoryProps {
  name: string
  defaultSection?: string
  countLabel?: string
}

export default async function ListicleDirectory({
  name,
  defaultSection,
  countLabel = 'integrations',
}: ListicleDirectoryProps) {
  const config = await getListicleConfig(name)
  if (!config) {
    return (
      <div className="py-4 text-[var(--accent-cherry)]">Unknown listicle: &ldquo;{name}&rdquo;</div>
    )
  }

  const sections = getListicleSectionItems(config).map((section) => ({
    id: section.id,
    label: section.label,
    title: section.title,
    description: section.description,
    sectionName: section.sectionName,
    items: [...section.items, ...(section.subsections || []).flatMap((sub) => sub.items)],
  }))

  // data-docs-full-width-page lifts the docs layout max-width caps via :has()
  return (
    <div data-docs-full-width-page="">
      <ListicleIconFilter />
      <ListicleDirectoryClient
        sections={sections}
        defaultSection={defaultSection}
        searchPlaceholder={config.searchPlaceholder ?? 'Search for integrations...'}
        countLabel={countLabel}
      />
    </div>
  )
}
