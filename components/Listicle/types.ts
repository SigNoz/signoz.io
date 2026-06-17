export type IconSpec = string | { badge: string; color: string }

export interface ListicleItem {
  name: string
  href: string
  clickName?: string
  icon: IconSpec
}

export interface SubsectionConfig {
  id: string
  title: string
  sectionName: string
  gridCols?: string
  items: ListicleItem[]
}

export interface SectionConfig {
  id: string
  label: string
  title: string
  sectionName: string
  gridCols?: string
  items?: ListicleItem[]
  subsections?: SubsectionConfig[]
}

export interface ListicleConfig {
  id: string
  pattern: 'flat' | 'sectioned' | 'searchable'
  markdownTitle: string
  sectionName: string
  title?: string
  description?: string
  gridCols?: string
  viewAllHref?: string
  viewAllText?: string
  searchPlaceholder?: string
  items?: ListicleItem[]
  sections?: SectionConfig[]
  staticSections?: {
    title: string
    sectionName: string
    gridCols?: string
    items: ListicleItem[]
  }[]
  wrapperTitle?: string
}
