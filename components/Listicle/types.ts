export type IconSpec = string | { badge: string; color: string }

export interface ListicleItem {
  name: string
  href: string
  clickName?: string
  description?: string
  icon?: IconSpec
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
  description?: string
  sectionName: string
  gridCols?: string
  items?: ListicleItem[]
  subsections?: SubsectionConfig[]
  /** Other listicles whose cards this section also shows: "<listicle>[#<sectionId>][@<href prefix>]" */
  include?: (string | { from: string; nameSuffix?: string })[]
  /** Hrefs to drop from the section; an entry that ends in "/*" drops every card under that path */
  exclude?: string[]
  /** With `uniqueAcrossSections`, sections claim cards in this order (default: section order) */
  claimOrder?: number
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
  /** Keep each card in only the first section that claims it (see `claimOrder`) */
  uniqueAcrossSections?: boolean
}
