export interface GridLayoutProps {
  children: React.ReactNode
  cols?: number
  className?: string
  variant?: 'default' | 'equal' | 'split'
}