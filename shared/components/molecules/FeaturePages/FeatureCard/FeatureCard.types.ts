export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string | React.ReactNode
  variant?: 'default' | 'combined'
  className?: string
}
