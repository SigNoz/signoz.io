import { ButtonGroupProps } from '../ButtonGroup/ButtonGroup.types'
import { SectionLayoutProps } from '../SectionLayout/SectionLayout.types'

export interface FeaturePageHeaderProps {
  title: React.ReactNode
  description: React.ReactNode
  buttons: ButtonGroupProps['buttons']
  heroImage?: string | React.ReactNode
  heroImageAlt?: string
  children?: React.ReactNode
  sectionLayoutVariant?: SectionLayoutProps['variant']
  sectionLayoutClassName?: string
  className?: string
}
