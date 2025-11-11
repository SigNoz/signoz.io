export interface ArticleDetail {
  title: string
  description: string
  href: string
  learningOutcomes?: string[]
}

export interface SeriesData {
  name: string
  description: string
  longDescription?: string
  seriesOverviewHref: string
  heroImageUrl?: string
  keywords?: string[]
  articles: ArticleDetail[]
}

export interface ArticleSeriesJson {
  [key: string]: SeriesData
}
