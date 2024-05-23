// types.ts

export type Doc = {
  type: string
  route: string
  label: string
  className?: string
}

export type Category = {
  type: string
  label: string
  route: string
  link?: {
    type?: string
    title?: string
    description?: string
    slug?: string
    id?: string
  }
  items: Array<Doc | Category>
}

export type NavItem = Doc | Category
