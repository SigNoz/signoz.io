export type IconTitleDescriptionCardData = {
  icon: React.ReactNode
  iconText: string
  title: string
  description: string
}

export type IconTitleDescriptionCardGridProps = {
  cards: IconTitleDescriptionCardData[]
  className?: string
}
