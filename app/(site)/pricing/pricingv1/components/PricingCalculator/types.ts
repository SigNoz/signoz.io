export type Section = 'traces' | 'logs' | 'metrics'

export interface PricingCalculatorProps {
  show?: Section[]
  showHeader?: boolean
  showFooter?: boolean
  embedded?: boolean
}
