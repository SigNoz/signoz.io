import type {
  ListicleConfig,
  ListicleItem,
  SectionConfig,
  SubsectionConfig,
} from '@/components/Listicle/types'
import { listicleConfigs } from './registry'

export interface ListicleRenderSubsection {
  id: string
  title: string
  sectionName: string
  gridCols?: string
  items: ListicleItem[]
}

export interface ListicleRenderSection {
  id: string
  label: string
  title: string
  sectionName: string
  gridCols?: string
  items: ListicleItem[]
  subsections?: ListicleRenderSubsection[]
}

interface ListicleItemsOptions {
  sectionId?: string | null
}

const toItems = (items?: ListicleItem[]): ListicleItem[] => (items ? [...items] : [])

const toRenderSubsection = (subsection: SubsectionConfig): ListicleRenderSubsection => ({
  id: subsection.id,
  title: subsection.title,
  sectionName: subsection.sectionName,
  gridCols: subsection.gridCols,
  items: toItems(subsection.items),
})

const toRenderSection = (section: SectionConfig): ListicleRenderSection => ({
  id: section.id,
  label: section.label,
  title: section.title,
  sectionName: section.sectionName,
  gridCols: section.gridCols,
  items: toItems(section.items),
  subsections: section.subsections?.map(toRenderSubsection),
})

const normalizeSectionId = (config: ListicleConfig, sectionId?: string | null): string => {
  if (!sectionId || sectionId === 'all') {
    return 'all'
  }

  const hasSection = (config.sections || []).some((section) => section.id === sectionId)
  return hasSection ? sectionId : 'all'
}

export const getListicleConfig = async (name: string): Promise<ListicleConfig | null> => {
  try {
    const { getListicleConfigFromCms } = await import('@/utils/listicles')
    return await getListicleConfigFromCms(name)
  } catch {
    return listicleConfigs[name] || null
  }
}

export const getListicleSectionItems = (
  config: ListicleConfig,
  sectionId?: string | null
): ListicleRenderSection[] => {
  if (config.pattern === 'sectioned') {
    const activeSectionId = normalizeSectionId(config, sectionId)
    const sections = config.sections || []
    const selectedSections =
      activeSectionId === 'all'
        ? sections
        : sections.filter((section) => section.id === activeSectionId)

    return selectedSections.map(toRenderSection)
  }

  if (config.staticSections && config.staticSections.length > 0) {
    return config.staticSections.map((section, index) => ({
      id: `${config.id}-${index}`,
      label: section.title,
      title: section.title,
      sectionName: section.sectionName,
      gridCols: section.gridCols,
      items: toItems(section.items),
    }))
  }

  if (!config.items || config.items.length === 0) {
    return []
  }

  return [
    {
      id: config.id,
      label: config.wrapperTitle || config.sectionName,
      title: config.wrapperTitle || '',
      sectionName: config.sectionName,
      gridCols: config.gridCols,
      items: toItems(config.items),
    },
  ]
}

export const getListicleItems = (
  config: ListicleConfig,
  options: ListicleItemsOptions = {}
): ListicleItem[] =>
  getListicleSectionItems(config, options.sectionId).flatMap((section) => [
    ...section.items,
    ...(section.subsections || []).flatMap((subsection) => subsection.items),
  ])
