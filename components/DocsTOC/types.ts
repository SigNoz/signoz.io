// types.ts

export type Doc = {
  type: 'doc'
  route: string
  label: string
  className?: string
}

export type Category = {
  type: 'category'
  label: string
  route: string
  link?: {
    type: 'generated-index' | 'doc'
    title: string
    description?: string
    slug?: string
    id?: string
  }
  items: Array<Doc | Category | string>
}

export type TocItem = Doc | Category
