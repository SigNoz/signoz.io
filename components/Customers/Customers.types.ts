export const customerStoryFilters = [
  'All stories',
  'AI & agent workflows',
  'Logs & alerting',
  'Tracing & performance',
  'Kubernetes & infrastructure',
  'Tool consolidation',
] as const

export type CustomerStoryFilter = (typeof customerStoryFilters)[number]

export type CustomerStoryType = 'Customer story' | 'From the SigNoz blog'

export interface CustomerStory {
  company: string
  description: string
  featured?: boolean
  filters: string[]
  href: string
  logo: string
  logoAlt: string
  person: string
  publishedAt: string
  quote?: string
  role: string
  showCompanyNameWithLogo?: boolean
  takeaway?: string
  takeawayLabel?: string
  title: string
  type: CustomerStoryType
}

export interface CustomerVideo {
  company: string
  videoId: string
  title: string
}

export interface QuoteSegment {
  text: string
  emphasis?: boolean
}

export interface QuoteSlide {
  segments: QuoteSegment[]
  person: string
  role: string
  company: string
  logo: string
  href: string
  sourceLabel: string
}

export interface ProofLogo {
  name: string
  imageSrc?: string
  componentKey?: string
  isWordmark?: boolean
  cardWidth?: number
  quoteWidth?: number
  imageClassName?: string
  viewBox?: string
}

export interface ProofQuote {
  quote: string
  attribution: string
  company?: string
  href: string
  logo?: ProofLogo
  themes: string[]
}

export interface ProofWallContent {
  quotes: ProofQuote[]
  logos: ProofLogo[]
}

export interface CustomersPageContent {
  featuredVideos: CustomerVideo[]
  quoteCarousel: QuoteSlide[]
  proofWall: ProofWallContent
}
