export interface FeatureCardProps {
  icon: React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  variant?: 'default' | 'combined'
  className?: string
}
