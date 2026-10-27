import type { ComponentType, ReactNode, SVGProps } from 'react'

export type LogoComponent = ComponentType<SVGProps<SVGSVGElement>>
export type LogoContext = 'card' | 'quote'

export type LogoSpec = {
  Logo?: LogoComponent
  cardWidth?: number
  imageClassName?: string
  imageSrc?: string
  isWordmark?: boolean
  name: string
  quoteWidth?: number
  viewBox?: string
}

export type DragState = {
  pointerId: number
  startOffset: number
  startScrollLeft: number
  startX: number
  usesNativeScroll: boolean
}

export type ProofLinkProps = {
  ariaLabel: string
  children: ReactNode
  className?: string
  clickName: string
  clickText: string
  clickLocation?: string
  href: string
  isClone: boolean
}

export type LogoMarkProps = {
  context?: LogoContext
  decorative?: boolean
  logo: LogoSpec
}

export type LogoCardProps = {
  className?: string
  clickLocation?: string
  href?: string
  isClone: boolean
  logo: LogoSpec
}

export type QuoteCardProps = {
  attribution: string
  className?: string
  clickLocation?: string
  href: string
  isClone: boolean
  logo?: LogoSpec
  quote: string
  theme: string
}

export type FeaturedQuoteCardProps = QuoteCardProps

export type BentoCellProps = {
  children: ReactNode
  column: number
  columnSpan?: number
  row: number
  rowSpan?: number
}
