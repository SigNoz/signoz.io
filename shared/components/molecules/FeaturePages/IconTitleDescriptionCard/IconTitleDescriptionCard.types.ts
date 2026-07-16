export type IconTitleDescriptionCardVariant = 'lg' | 'xl'

export type IconTitleDescriptionCardProps = {
  icon: React.ReactNode
  iconText: string
  title: string | React.ReactNode
  description: string | React.ReactNode
  className?: string
  variant?: IconTitleDescriptionCardVariant
  titleLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
