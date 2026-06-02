export interface SplitSectionPanel {
  title: React.ReactNode
  description: React.ReactNode
  image?: string
  imageAlt?: string
  imageElement?: React.ReactNode
  className?: string
  contentClassName?: string
  imageClassName?: string
  button?: {
    text: string
    href: string
    tracking?: {
      clickType: string
      clickName?: string
      clickLocation?: string
      clickText?: string
    }
  }
}

export interface SplitSectionProps {
  left: SplitSectionPanel | React.ReactNode
  right: SplitSectionPanel | React.ReactNode
  withVerticalDivider?: boolean
  className?: string
}
