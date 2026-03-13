export type IconTitleDescriptionCardVariant = 'lg' | 'xl'

export type IconTitleDescriptionCardProps = {
  icon: React.ReactNode
  iconText: string
  title: string | React.ReactNode
  description: string | React.ReactNode
  className?: string
  variant?: IconTitleDescriptionCardVariant
}
