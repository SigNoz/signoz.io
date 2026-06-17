import type {
  IconSpec,
  ListicleConfig,
  ListicleItem,
  SectionConfig,
  SubsectionConfig,
} from '@/components/Listicle/types'

export type CmsListicleItem = {
  name: string
  href: string
  click_name?: string | null
  icon_path?: string | null
  icon_badge?: string | null
  icon_color?: string | null
}

export type CmsListicleSubsection = {
  section_id: string
  title: string
  section_name: string
  grid_cols?: string | null
  items?: CmsListicleItem[] | null
}

export type CmsListicleSection = {
  section_id: string
  label: string
  title: string
  section_name: string
  grid_cols?: string | null
  items?: CmsListicleItem[] | null
  subsections?: CmsListicleSubsection[] | null
}

export type CmsListicleStaticSection = {
  title: string
  section_name: string
  grid_cols?: string | null
  items?: CmsListicleItem[] | null
}

export type CmsListicle = {
  key: string
  pattern: ListicleConfig['pattern']
  markdown_title: string
  section_name: string
  title?: string | null
  description?: string | null
  grid_cols?: string | null
  view_all_href?: string | null
  view_all_text?: string | null
  search_placeholder?: string | null
  wrapper_title?: string | null
  items?: CmsListicleItem[] | null
  sections?: CmsListicleSection[] | null
  static_sections?: CmsListicleStaticSection[] | null
}

function optionalString(value?: string | null): string | undefined {
  return value || undefined
}

function setOptionalString(target: object, key: string, value?: string | null) {
  const normalized = optionalString(value)
  if (normalized) {
    ;(target as Record<string, string>)[key] = normalized
  }
}

function transformIcon(item: CmsListicleItem): IconSpec | undefined {
  if (item.icon_path) return item.icon_path
  if (item.icon_badge && item.icon_color) {
    return {
      badge: item.icon_badge,
      color: item.icon_color,
    }
  }

  if (item.icon_badge || item.icon_color) {
    console.warn(
      `Listicle item "${item.name}": partial badge icon (badge=${item.icon_badge}, color=${item.icon_color}) — both required`
    )
  }

  return undefined
}

function transformItem(item: CmsListicleItem): ListicleItem {
  const icon = transformIcon(item)
  if (!icon) {
    console.warn(`Listicle item "${item.name}": missing icon data from CMS`)
  }

  const transformed: ListicleItem = {
    name: item.name,
    href: item.href,
    icon: icon ?? '',
  }

  setOptionalString(transformed, 'clickName', item.click_name)

  return transformed
}

function transformSubsection(subsection: CmsListicleSubsection): SubsectionConfig {
  const transformed: SubsectionConfig = {
    id: subsection.section_id,
    title: subsection.title,
    sectionName: subsection.section_name,
    items: (subsection.items || []).map(transformItem),
  }

  setOptionalString(transformed, 'gridCols', subsection.grid_cols)

  return transformed
}

function transformSection(section: CmsListicleSection): SectionConfig {
  const transformed: SectionConfig = {
    id: section.section_id,
    label: section.label,
    title: section.title,
    sectionName: section.section_name,
  }

  setOptionalString(transformed, 'gridCols', section.grid_cols)

  if (section.items && section.items.length > 0) {
    transformed.items = section.items.map(transformItem)
  }

  if (section.subsections && section.subsections.length > 0) {
    transformed.subsections = section.subsections.map(transformSubsection)
  }

  return transformed
}

function transformStaticSection(section: CmsListicleStaticSection) {
  const transformed = {
    title: section.title,
    sectionName: section.section_name,
    items: (section.items || []).map(transformItem),
  }

  setOptionalString(transformed, 'gridCols', section.grid_cols)

  return transformed
}

export function transformCmsListicle(listicle: CmsListicle): ListicleConfig {
  const config: ListicleConfig = {
    id: listicle.key,
    pattern: listicle.pattern,
    markdownTitle: listicle.markdown_title,
    sectionName: listicle.section_name,
  }

  setOptionalString(config, 'title', listicle.title)
  setOptionalString(config, 'description', listicle.description)
  setOptionalString(config, 'gridCols', listicle.grid_cols)
  setOptionalString(config, 'viewAllHref', listicle.view_all_href)
  setOptionalString(config, 'viewAllText', listicle.view_all_text)
  setOptionalString(config, 'searchPlaceholder', listicle.search_placeholder)
  setOptionalString(config, 'wrapperTitle', listicle.wrapper_title)

  if (listicle.items && listicle.items.length > 0) {
    config.items = listicle.items.map(transformItem)
  }

  if (listicle.sections && listicle.sections.length > 0) {
    config.sections = listicle.sections.map(transformSection)
  }

  if (listicle.static_sections && listicle.static_sections.length > 0) {
    config.staticSections = listicle.static_sections.map(transformStaticSection)
  }

  return config
}
