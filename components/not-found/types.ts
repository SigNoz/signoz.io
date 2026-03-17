export type SuggestedDoc = {
  title: string
  href: string
}

export type AlgoliaHit = {
  url?: string
  title?: string
  hierarchy?: {
    lvl0?: string | null
    lvl1?: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}
