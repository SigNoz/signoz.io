export type IconTitleDescriptionCardData = {
  icon: React.ReactNode
  iconText: string
  title: string | React.ReactNode
  description: string | React.ReactNode
}

export type IconTitleDescriptionCardGridProps = {
  cards: IconTitleDescriptionCardData[]
  className?: string
}
