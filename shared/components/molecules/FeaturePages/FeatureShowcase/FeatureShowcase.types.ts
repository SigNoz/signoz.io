import { FeatureButtonConfig } from '../FeatureButton/FeatureButton.types'

export interface FeatureShowcaseProps {
  title?: React.ReactNode
  description?: React.ReactNode
  image?: string
  imageAlt?: string
  imageElement?: React.ReactNode
  button?: FeatureButtonConfig
  children?: React.ReactNode
  contentClassName?: string
  imageClassName?: string
  className?: string
}
