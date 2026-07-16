import { IconTitleDescriptionCardVariant } from './IconTitleDescriptionCard.types'

export type IconTitleDescriptionCardData = {
  icon?: React.ReactNode
  iconText?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  className?: string
}

export type IconTitleDescriptionCardGridProps = {
  cards: IconTitleDescriptionCardData[]
  className?: string
  variant?: IconTitleDescriptionCardVariant
  titleLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
