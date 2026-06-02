export interface FeatureShowcaseProps {
  title?: React.ReactNode
  description?: React.ReactNode
  image?: string
  imageAlt?: string
  imageElement?: React.ReactNode
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
  children?: React.ReactNode
  contentClassName?: string
  imageClassName?: string
  className?: string
}
